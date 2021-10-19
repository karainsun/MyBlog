import React, { FC, useState, useEffect } from 'react';
import dayjs from 'dayjs'
import { Form, Row, Col, Input, Button, Table, message, Popconfirm } from 'antd';
import { setHeight } from 'utils'
import { collectCategoryCreate, collectCategoryList, collectCategoryDelete, collectCategoryUpdate } from 'request'
import ModalForm from 'components/modalForm';

const scrollHeight = setHeight(265)

interface Columns {
  title: string;
  dataIndex: string;
  width: number;
  render?: (text: any, record: any, index: any) => void;
}

interface CategoryParams {
  pageNo: number;
  pageSize: number;
  name: string;
}

interface DataType {
  id: number;
  key: string;
  name: string;
  created_at: string;
  parent_name: string;
}

interface FormValProps {
  name: string;
}

const columns: Columns[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 50,
  },
  {
    title: '分类名称',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '日期',
    dataIndex: 'created_at',
    width: 150,
    render: (text) => {
      return dayjs(text).format('YYYY-MM-DD HH:mm')
    }
  }
];

const CollectCategory: FC = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<number>>([])
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [categories, setCategories] = useState<DataType[]>([])
  const [insert, setInsert] = useState<number>(0)
  const [params, setParams] = useState<CategoryParams>({
    pageNo: 1,
    pageSize: 10,
    name: ''
  })
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [formVal, setFormVal] = useState<FormValProps>({
    name: ''
  })
  const [subKey, setSubKey] = useState<number>(0) // 新建或修改 新建：0，修改：1

  useEffect(() => {
    setTableLoading(true)
    collectCategoryList(params).then(({ data: { list, meta: { count } } }) => {
      if (list.length > 0) {
        const cateList = list.map((cate: any) => {
          return Object.assign({}, { key: cate.id }, cate)
        })
        setCategories(cateList)
      } else {
        setCategories([])
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

  const selectChange = (selectedKeys: any) => {
    setSelectedRowKeys(selectedKeys);
  };

  const searchFinish = ({ name }: { name: string }) => {
    setParams({ ...params, name })
  };

  const pageChange = (value: any) => {
    setParams({ ...params, pageNo: value })
  }

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

  // 新建分类提交
  const modalFinish = async (values: any) => {
    try {
      const updateParams = values
      if (subKey === 1) {
        updateParams.id = selectedRowKeys[0]
      }
      const res: any = subKey === 0 ? await collectCategoryCreate(values) : await collectCategoryUpdate(updateParams)

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
  // 更新分类
  const cateUpdate = () => {
    if (selectedRowKeys.length !== 1) {
      message.warning('请选择且只能选择一条数据')
    } else {
      const item = categories.filter(item => item.id === selectedRowKeys[0])
      setFormVal({
        name: item[0].name
      })
      modalShow(1)
    }
  }

  const rowSelection = {
    onChange: selectChange,
    selectedRowKeys
  }
  // 批量删除分类
  const catesDelete = async () => {
    if (selectedRowKeys.length < 1) {
      message.warning('至少选一条删除')
    } else {
      try {
        const { msg, status }: any = await collectCategoryDelete({ ids: selectedRowKeys })
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
              <Input placeholder="分类名称" />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item><Button htmlType="submit">搜索</Button></Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item><Button onClick={modalShow}>新建</Button></Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Popconfirm
                title="Are you sure you want to delete?"
                onConfirm={catesDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>删除</Button>
              </Popconfirm>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item><Button onClick={cateUpdate} type="primary" ghost>编辑</Button></Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        size="middle"
        columns={columns}
        dataSource={categories}
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
        title="添加分类"
        val={formVal}
        bodyStyle={{height: '100px'}}
      >
        <Form.Item
          label="分类名称"
          name="name"
          rules={[{ required: true, message: '请输入分类名称！' }]}
        >
          <Input />
        </Form.Item>
      </ModalForm>
    </div>
  )
}

export default CollectCategory;
