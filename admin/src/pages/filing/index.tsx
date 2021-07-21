import React, { FC, useState } from 'react';
import { Form, Row, Col, Input, Button, Table } from 'antd';
import { setHeight } from 'utils'

const scrollHeight = setHeight(265)

interface Columns {
  title: string;
  dataIndex: string;
  width: number;
}

interface DataType {
  id: number;
  key: string;
  name: string;
  date: string;
}

const columns: Columns[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 50,
  },
  {
    title: '标签名称',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '日期',
    dataIndex: 'date',
    width: 150,
  }
];

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    id: i,
    key: `a${i}`,
    name: `这是第${i}个标签`,
    date: '2021-07-20'
  });
}

const Filing: FC = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeysstate] = useState<Array<any>>([])

  const searchFinish = (values: any) => {
    console.log('Success:', values);
  };

  const selectChange = (selectedKeys: any) => {
    setSelectedRowKeysstate(selectedKeys);
  };

  const rowSelection = {
    onChange: selectChange,
    selectedRowKeys
  }

  return (
    <div className="componentList">
      <Form
        orm={form}
        name="basic"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 23 }}
        initialValues={{ remember: true }}
        onFinish={searchFinish}
      >
        <Row>
          <Col span={6}>
            <Form.Item label="" name="username">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="" name="username">
              <Input />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item><Button htmlType="submit">搜索</Button></Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item><Button>新建</Button></Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item><Button danger>删除</Button></Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item><Button type="primary" ghost>编辑</Button></Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        size="middle"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 50 }}
        rowSelection={rowSelection}
        scroll={{ y: scrollHeight }}
      />,
    </div>
  )
};

export default Filing;
