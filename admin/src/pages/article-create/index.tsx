/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState, useRef } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom'
import { Form, Input, Button, Select, Switch, message } from 'antd';
import FileUpload from 'components/fileUpload';
import { articleCreate, categoryAll, tagAll, fileUpload, articleDetail, articleUpdate } from 'request'
import ReactEditor from 'wangeditor-for-react'
import './style.less'

type SLocation = { state?: { id: number } }
type MLocation<S> = { location: S }
type combineProps = RouteComponentProps & MLocation<SLocation>

interface OptionTypes {
  id?: number;
  name: string;
  parent_name?: string;
}

const { TextArea } = Input;
const { Option } = Select;

const ArticleCreat: FC<combineProps> = (props) => {
  const articleId = props.location.state?.id
  const [form] = Form.useForm();
  const [imgList, setImgList] = useState<Array<any>>()
  const [defaultImg, setDefaultImg] = useState<string>('')
  const [cates, setCates] = useState<Array<OptionTypes>>([])
  const [tags, setTags] = useState<Array<OptionTypes>>([])
  const [content, setContent] = useState<any>('')
  const [isCreate, setIsCreate] = useState<boolean>(true)
  let editorRef = useRef<any>(null)
  // const [cateIpt, setCateIpt] = useState<string>('')
  // const [tagIpt, setTagIpt] = useState<string>('')

  const history = useHistory();

  useEffect(() => {
    form.setFields([
      { name: 'isComent', value: true },
      { name: 'isReprint', value: false }
    ]);
    Promise.all([categoryAll({}), tagAll({})]).then((res) => {
      setCates(res[0].data)
      setTags(res[1].data)
    }).catch(error => {
      console.log(error);
    })
    // return () => {
    //   销毁编辑器
    //   editorRef.current.destroy()
    // }
  }, []);
  // 监听图片上传操作
  useEffect(() => {
    form.setFieldsValue({ image: imgList })
  }, [imgList]);
  // 监听文章内容变化
  useEffect(() => {
    form.setFieldsValue({ content: content })
  }, [content]);

  useEffect(() => {
    if (articleId && typeof articleId === 'number') {
      setIsCreate(false)
      articleDetail({ id: articleId }).then(({ code, status, data }: any) => {
        if (code === 200 && status === 'success') {
          for (const key in data) {
            if(key === 'category'){
              form.setFieldsValue({ category: JSON.parse(data.category).name })
            } else if(key === 'tags') {
              const newTags = JSON.parse(data.tags).map((t: any) => t.name)
              form.setFieldsValue({ tags: newTags })
            } else {
              form.setFieldsValue({ [key]: data[key] })
            }
          }
          editorRef.current.editor.txt.html(data.content);
          setDefaultImg(data.image[0].url)
        }
      }).catch(error => {
        console.log('详情加载失败：', error);
      })
    }
  }, [articleId])

  const SelectItem = (cates: Array<OptionTypes>) => {
    return cates.map(({ name }, i) => {
      return <Option value={name} key={i}>{name}</Option>
    })
  }

  const onFinish = (values: any) => {
    let cateObj = cates.filter(e => e.name.indexOf(values.category) != -1)[0]
    let tagArr: any[] = tags.filter(e => values.tags.find((i: string) => e.name === i))

    values.category = JSON.stringify({ id: cateObj.id, name: cateObj.name })
    values.tags = JSON.stringify(tagArr)
    if (!isCreate) values.id = articleId;
    const subFnc = isCreate ? articleCreate(values) : articleUpdate(values)
    subFnc.then((res: any) => {
      if (res.status === 'success') {
        message.success(res.msg)
        history.push('/article/list')
      } else {
        message.warning(res.msg)
      }
    }).catch(error => {
      console.log(error);
      message.error('提交失败')
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('表单未通过验证:', errorInfo);
  };

  const getFiles = (val: any) => {
    setImgList(val)
  }

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
  // 添加分类
  // const addCate = () => {
  //   if (cateIpt.trim() === '') return
  //   const result = cates.some(item => item.name === cateIpt)
  //   if (result) {
  //     setCateIpt('')
  //   } else {
  //     cates.push({ name: cateIpt })
  //     // 使用扩展运算符更新 state
  //     // eslint-disable-line
  //     setCates([...cates])
  //   }
  // }
  // 添加标签
  // const addTag = () => {
  //   if (tagIpt.trim() === '') return
  //   const result = tags.some(item => item.name === tagIpt)
  //   if (result) {
  //     setTagIpt('')
  //   } else {
  //     tags.push({ name: tagIpt })
  //     // 使用扩展运算符更新 state
  //     setTags([...tags])
  //   }
  // }

  // 标签选择事件
  const tagsHandleChange = (e: string[]) => {
    // form.setFieldsValue({ tags: e })
  }

  // const itemStyle = {
  //   display: 'inline-block',
  //   verticalAlign: 'middle',
  //   marginLeft: '20px'
  // }

  return (
    <div className="componentBox noscrollbar" style={{ overflowY: 'scroll' }}>
      <h1 className="font-bold pb-2 mb-6 borderb-1">{isCreate ? '创建' : '编辑'}文章</h1>
      <div className="noscrollbar" style={{ height: 'calc(100vh - 170px)', overflowY: 'scroll' }}>
        <Form
          className="m-auto mr-20"
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          scrollToFirstError={true}
        >
          <Form.Item
            label="文章标题"
            name="title"
            rules={[{ required: true, message: '请填写文章标题！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="文章描述"
            name="description"
            rules={[{ required: true, message: '请填写文章描述！' }]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            label="封面图片"
            name="image"
            rules={[{ required: true, message: '请上传封面！' }]}
          >
            <FileUpload style={{ width: '200px', height: '140px' }} sendFile={getFiles} initSrc={defaultImg} />
          </Form.Item>

          <Form.Item
            label="文章分类"
            name="category"
            rules={[{ required: true, message: '请选择分类！' }]}
          >
            <Select style={{ width: 250 }}>{SelectItem(cates)}</Select>
          </Form.Item>

          {/* <div className="add-cate">
            <Input
              value={cateIpt}
              style={{ width: '150px', ...itemStyle }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCateIpt(e.target.value)}
            />
            <Button style={itemStyle} type="primary" onClick={addCate}>添加</Button>
          </div> */}

          <Form.Item
            label="文章标签"
            name="tags"
            rules={[{ required: true, message: '请选择标签！' }]}
          >
            <Select
              style={{ width: 250 }}
              mode="multiple"
              allowClear
              onChange={tagsHandleChange}
            >
              {SelectItem(tags)}
            </Select>
          </Form.Item>

          {/* <div className="add-cate">
            <Input
              value={tagIpt}
              style={{ width: '150px', ...itemStyle }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagIpt(e.target.value)}
            />
            <Button style={itemStyle} type="primary" onClick={addTag}>添加</Button>
          </div> */}

          <Form.Item
            label="是否置顶"
            name="top"
            valuePropName="checked"
          >
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
            />
          </Form.Item>

          <Form.Item
            label="予评与否"
            name="isComent"
            valuePropName="checked"
          >
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              defaultChecked
            />
          </Form.Item>

          <Form.Item
            label="是否转载"
            name="isReprint"
            valuePropName="checked"
          >
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
            />
          </Form.Item>

          <Form.Item
            label="文章内容"
            name="content"
            rules={[{ required: true, message: '请填写文章内容！' }]}
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
  );
};

export default ArticleCreat;
