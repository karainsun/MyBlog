import React, { FC, useEffect, useState } from 'react';
import { Form, Input, Button, Select, Switch } from 'antd';
import FileUpload from 'components/fileUpload';

const { TextArea } = Input;
const { Option } = Select

const ArticleCreat: FC = () => {
  const [form] = Form.useForm();
  const [imgList, setImgList] = useState<Array<any>>()

  useEffect(() => {
    form.setFields([
      { name: 'category', value: "lucy" },
      { name: 'tags', value: ['JS', 'Vue'] },
      { name: 'isComent', value: true },
      { name: 'isReprint', value: false }
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    form.setFieldsValue({ image: imgList })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgList]);


  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const categorySelect = (value: any) => {
    console.log(`分类： ${value}`);
  }

  const tagsSelect = (value: any) => {
    console.log(`标签： ${value}`);
  }

  const getFiles = (val: any) => {
    setImgList(val)
  } 

  return (
    <div className="componentBox noscrollbar" style={{ overflowY: 'scroll' }}>
      <h1 className="font-bold pb-2 mb-6 borderb-1">创建文章</h1>
      <div className="noscrollbar" style={{ height: 'calc(100vh - 170px)', overflowY: 'scroll' }}>
        <Form
          className="m-auto w-3/4"
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
            <FileUpload sendFile={getFiles} />
          </Form.Item>

          <Form.Item
            label="文章分类"
            name="category"
            rules={[{ required: true, message: '请选择分类！' }]}
          >
            <Select style={{ width: 200 }} onChange={categorySelect}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="kay">Kay</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="文章标签"
            name="tags"
            rules={[{ required: true, message: '请选择标签！' }]}
          >
            <Select
              style={{ width: 500 }}
              onChange={tagsSelect}
              mode="multiple"
              allowClear
            >
              <Option value="JS">JS</Option>
              <Option value="Vue">Vue</Option>
              <Option value="React">React</Option>
              <Option value="Angular">Angular</Option>
            </Select>
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
            <TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ArticleCreat;
