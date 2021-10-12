import React, { FC, useState, useEffect } from 'react';
import dayjs from 'dayjs'
import { Form, Row, Col, Input, Button, Table, message, Popconfirm } from 'antd';
import { setHeight } from 'utils'
import { tagList, tagCreate, tagUpdate, tagsDelete } from 'request'
import ModalForm from 'components/modalForm';

const scrollHeight = setHeight(265)

interface Columns {
  title: string;
  dataIndex: string;
  width: number;
  render?: (text: any, record: any, index: any) => void;
}

interface DataType {
  id: number;
  key: string;
  name: string;
  created_at: string; 
}

interface TagParams {
  pageNo: number;
  pageSize: number;
  name: string;
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
    title: '创建/修改日期',
    dataIndex: 'created_at',
    width: 150,
    render: (text: any, record: any, index: any) => {
      return dayjs(text).format('YYYY-MM-DD HH:mm')
    }
  }
]; 

const Tags: FC = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<number>>([])
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [tags, setTags] = useState<DataType[]>([])
  const [insert, setInsert] = useState<number>(0)
  const [params, setParams] = useState<TagParams>({
    pageNo: 1,
    pageSize: 10,
    name: ''
  })
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [formVal, setFormVal] = useState<{ name: string }>({
    name: ''
  })
  const [subKey, setSubKey] = useState<number>(0)

  useEffect(() => {
    setTableLoading(true)
    tagList(params).then(({ data: { list, meta: { count } } }) => {
      if (list.length > 0) {
        const tagList = list.map((cate: any) => {
          return Object.assign({}, { key: cate.id }, cate)
        })
        setTags(tagList)
      } else {
        setTags([])
      }
      setTotal(count)
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setTableLoading(false)
    })
    return () => {
      setInsert(0)
    }
  }, [insert, params])

  // 新建分类提交
  const modalFinish = async (values: any) => {
    try {
      const updateParams = values
      if (subKey === 1) {
        updateParams.id = selectedRowKeys[0] 
      }
      const res: any = subKey === 0 ? await tagCreate(values) : await tagUpdate(updateParams)
      if ((res.status as string) === 'success') {
        modalConfirm()
        message.success(res.msg)
        setInsert(insert + 1)
        setSelectedRowKeys([])
      } else {
        message.warning(res.msg)
      }
    } catch (error) {
      console.log(error);
      message.error('创建失败！')
    }
  };
  // 更新标签
  const tagToUpdate = () => {
    if (selectedRowKeys.length !== 1) {
      message.warning('请选择且只能选择一条数据')
    } else { 
      const item = tags.filter(item => item.id === selectedRowKeys[0])  
      setFormVal({
        name: item[0].name 
      })
      modalShow(1) 
    }
  }
  // 批量删除分类
  const tagsToDelete = async () => {
    if (selectedRowKeys.length < 1) {
      message.warning('至少选一条删除')
    } else {
      try {
        const { msg, status }: any = await tagsDelete({ ids: selectedRowKeys })
        if (status === 'success') {
          message.success(msg)
          setSelectedRowKeys([]);
          setInsert(insert + 1)
        } else {
          message.warning(msg)
        }
      } catch (error) {
        console.log(error);
        message.error('删除失败！')
      }
    }
  }

  const searchFinish = ({ name }: { name: string }) => {
    setParams({ ...params, name })
  };

  const modalShow = (num: number) => { 
    setIsVisible(true);
    setSubKey(typeof num === 'object' ? 0 : 1) 
  };

  const modalConfirm = () => {
    setIsVisible(false);
  };

  const modalCancel = () => {
    setIsVisible(false);
  };

  const selectChange = (selectedKeys: any) => { 
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    onChange: selectChange,
    selectedRowKeys
  }

  const pageChange = (value: any) => {
    setParams({ ...params, pageNo: value })
  }

  return (
    <div className="componentList">
      <Form
        form={form}
        name="searchForm"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 23 }}
        onFinish={searchFinish}
      >
        <Row>
          <Col span={6}>
            <Form.Item label="" name="name">
              <Input placeholder="标签名称" />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item><Button htmlType="submit">搜索</Button></Form.Item>
          </Col>
          {/* <Col span={2}>
            <Form.Item><Button onClick={modalShow}>新建</Button></Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Popconfirm
                title="Are you sure you want to delete?"
                onConfirm={tagsToDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>删除</Button>
              </Popconfirm>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item><Button onClick={tagToUpdate} type="primary" ghost>编辑</Button></Form.Item>
          </Col> */}
        </Row>
      </Form>
      <Table
        size="middle"
        columns={columns}
        dataSource={tags}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 10,
          pageSize: params.pageSize,
          current: params.pageNo,
          total: total,
          onChange: pageChange
        }}
        rowSelection={rowSelection}
        scroll={{ y: scrollHeight }}
        loading={tableLoading}
      />
      <ModalForm
        visible={isVisible}
        onCreate={modalFinish}
        onCancel={modalCancel}
        title="添加标签"
        val={formVal}
      >
        <Form.Item
          label="标签名称"
          name="name"
          rules={[{ required: true, message: '请输入分类名称！' }]}
        >
          <Input />
        </Form.Item> 
      </ModalForm>
    </div>
  )
};

export default Tags;
