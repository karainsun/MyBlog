/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState, useRef } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { connect } from 'react-redux'
import FileUpload from 'components/fileUpload';
import ReactEditor from 'wangeditor-for-react'
import { fileUpload, userDetail, userUpdate } from 'request'
import { produce } from 'immer'
import { StoreState, UserInfo } from 'store/state'
import { setUserInfo } from 'store/actions'

const Setup: FC<{ userInfo: UserInfo, userInfoToSet: (info: any) => void }> = ({ userInfo, userInfoToSet }) => {
  const [form] = Form.useForm();
  const [imgList, setImgList] = useState<Array<any>>()
  const [defaultImg, setDefaultImg] = useState<string>('')
  const [content, setContent] = useState<any>('')
  let editorRef = useRef<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [insert, setInsert] = useState<number>(0)

  useEffect(() => {
    userDetail({ id: userInfo.id }).then(({ code, status, data }: any) => {
      if (code === 200 && status === 'success') {
        userInfoToSet(data)
        let arr = []
        for (const key in data) {
          arr.push({ name: key, value: data[key] })
        }
        form.setFields(arr)
        editorRef.current.editor.txt.html(data.introduction);
        setDefaultImg(data.avatar)
      }
    })
    return () => {
      setInsert(0)
    }
  }, [insert])

  // 监听图片上传操作
  useEffect(() => {
    form.setFieldsValue({ avatar: imgList })
  }, [imgList]);
  // 监听文章内容变化
  useEffect(() => {
    form.setFieldsValue({ introduction: content })
  }, [content]);

  // 七牛上传并插入图片
  const uploadImg = (resultFiles: any, insertImgFn: any) => {
    // resultFiles 是 input 中选中的文件列表
    // insertImgFn 是获取图片 url 后，插入到编辑器的方法
    const formData = new FormData();
    formData.append('file', resultFiles[0]);
    fileUpload(formData).then((res: any) => {
      if (res.code === 200 && res.status === 'success') {
        // 上传图片，返回结果，将图片插入到编辑器中
        insertImgFn(res.data.url)
      }
    }).catch(error => {
      console.log('上传上失败：', error);
      message.error('上传上失败')
    })
  }

  const onFinish = (values: any) => {
    const userCopy = JSON.parse(JSON.stringify(userInfo))
    userCopy.avatar = values.avatar[0].url
    userCopy.introduction = values.introduction
    userCopy.sign = values.sign
    userCopy.username = values.username

    setLoading(true);
    userUpdate(userCopy).then(({msg, code, status }: any) => {
      if (code === 200 && status === 'success') {
        message.success(msg)
        setInsert(insert +1 )
      } else {
        message.warning(msg)
      }
    }).catch(error => {
      console.log('用户信息更新失败：', error);
      message.error('用户信息更新失败')
    }).finally(() => setLoading(false))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('表单未通过验证:', errorInfo);
  };

  const getFiles = (val: any) => {
    setImgList(val)
  }

  return (
    <Spin spinning={loading}>
      <div className="componentBox noscrollbar" style={{ overflowY: 'scroll' }}>
        <h1 className="font-bold pb-2 mb-6 borderb-1">个人设置</h1>
        <div className="noscrollbar" style={{ height: 'calc(100vh - 170px)', overflowY: 'scroll' }}>
          <Form
            className="m-auto w-3/4"
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            scrollToFirstError={true}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入用户名！' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="签名"
              name="sign"
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="头像"
              name="avatar"
            >
              <FileUpload style={{width: '200px', height: '200px' }} sendFile={getFiles} initSrc={defaultImg} />
            </Form.Item>
            <Form.Item
              label="个人简介"
              name="introduction"
            >
              <ReactEditor
              ref={editorRef}
              config={{
                uploadImgShowBase64: true,
                customUploadImg: uploadImg
              }}
              onChange={(html: string) => {
                setContent(html)
              }}
            />
            </Form.Item>

            <Form.Item>
              <Button className="m-auto block mt-4" type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  )
}
const mapStateToProps = produce((state: StoreState) => {
  return {
    userInfo: state.userInfo,
  };
});

const mapDispatchToProps = (dispatch: (e: any) => void) => {
  return {
    userInfoToSet: (e: UserInfo) => dispatch(setUserInfo(e))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Setup));
