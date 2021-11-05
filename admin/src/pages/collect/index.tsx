import React, { FC, useState, useEffect } from 'react';
import dayjs from 'dayjs'
import { Form, Row, Col, Input, Button, Table, message, Popconfirm, Select } from 'antd';
import { setHeight } from 'utils'
import useCopy from 'hooks/useCopy'
import {
  collectList,
  collectUpdate,
  collectCategoryAll,
  collectCreate,
  CollectParams,
  collectDelete
} from 'request'
import ModalForm from 'components/modalForm';
import FileUpload from 'components/fileUpload';

const scrollHeight = setHeight(265)
const { Option } = Select;
const { TextArea, Search } = Input; 

interface CollectQuery {
  pageNo: number;
  pageSize: number;
  name: string;
  category: string;
}

interface DataType extends CollectParams {
  id: number;
  key: string;
}

interface OptionTypes {
  id?: number;
  name: string;
}

const columns: Columns[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 50,
    fixed: 'left'
  },
  {
    title: '网站名称',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Logo',
    dataIndex: 'logo',
    width: 100,
    render: logo => (
      <div className="w-10 h-10 overflow-hidden">
        <img className="w-full h-full" src={logo} alt="" />
      </div>
    ),
  },
  {
    title: '网址',
    dataIndex: 'url',
    width: 300,
    render: (url, record, i) => (
      <div>
        <Search
          defaultValue={url}
          readOnly
          enterButton="复制"
          size="small"
          onSearch={(e: string) => useCopy(e)}
        />
      </div>
    ),
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 250,
  },
  {
    title: '分类',
    dataIndex: 'category',
    width: 150
  },
  {
    title: '日期',
    dataIndex: 'created_at',
    width: 150,
    render: (text: any, record: any, index: any) => {
      return dayjs(text).format('YYYY-MM-DD HH:mm')
    }
  }
];

const Collect: FC = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<number>>([])
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [defaultImg, setDefaultImg] = useState<string>('')
  const [collect, setCollect] = useState<DataType[]>([])
  const [insert, setInsert] = useState<number>(0)
  const [cates, setCates] = useState<Array<OptionTypes>>([])
  const [params, setParams] = useState<CollectQuery>({
    pageNo: 1,
    pageSize: 10,
    name: '',
    category: ''
  })
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [formVal, setFormVal] = useState<CollectParams>({
    name: '',
    url: '',
    description: '',
    category: '',
    logo: ''
  })
  const [subKey, setSubKey] = useState<number>(0) // 新建或修改 新建：0，修改：1

  useEffect(() => {
    collectCategoryAll({}).then((res) => {
      setCates(res?.data)
    }).catch(error => console.log('error：', error))
  }, [])

  useEffect(() => {
    setTableLoading(true)
    collectList(params).then(({ data: { list, meta: { count } } }) => {
      if (list.length > 0) {
        const cateList = list.map((cate: any) => {
          return Object.assign({}, { key: cate.id }, cate)
        })
        setCollect(cateList)
      } else {
        setCollect([])
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

  const searchFinish = ({ name, category }: { name: string, category: string }) => {
    setParams({ ...params, name, category })
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
    setDefaultImg('')
  };

  // 新建分类提交
  const modalFinish = async (values: any) => {
    try {
      const updateParams = values
      if (subKey === 1) {
        updateParams.id = selectedRowKeys[0]
      }
      const res: any = subKey === 0 ? await collectCreate(values) : await collectUpdate(updateParams)

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
      message.error('操作失败！')
    }
  };
  // 更新分类
  const cateUpdate = () => {
    if (selectedRowKeys.length !== 1) {
      message.warning('请选择且只能选择一条数据')
    } else {
      const item = collect.filter(item => item.id === selectedRowKeys[0])
      setFormVal({
        name: item[0].name,
        logo: item[0].logo,
        category: item[0].category,
        url: item[0].url,
        description: item[0].description,
      })
      setDefaultImg(item[0].logo)
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
        const { msg, status }: any = await collectDelete({ ids: selectedRowKeys })
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

  const SelectItem = (cates: Array<OptionTypes>) => {
    return cates.map(({ name }, i) => {
      return <Option value={name} key={i}>{name}</Option>
    })
  }

  const getFiles = (val: any) => {
    formVal.logo = val[0].url
    setFormVal({ ...formVal })
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
              <Input placeholder="网站名称" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="" name="category">
              <Input placeholder="分类" />
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
        dataSource={collect}
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
        title="编辑收藏"
        val={formVal}
        bodyStyle={{ height: '360px' }}
      >
        <Form.Item
          label="Logo"
          name="logo"
          rules={[{ required: true, message: '请上传Logo！' }]}
        >
          <FileUpload style={{ width: '80px', height: '80px' }} sendFile={getFiles} initSrc={defaultImg} />
        </Form.Item>
        <Form.Item
          label="网站名称"
          name="name"
          rules={[{ required: true, message: '请输入网站名称！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="分类"
          name="category"
          rules={[{ required: true, message: '请选择分类！' }]}
        >
          <Select style={{ width: 250 }}>{SelectItem(cates)}</Select>
        </Form.Item>
        <Form.Item
          label="网址"
          name="url"
          rules={[{ required: true, message: '请输入网址！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="描述"
          name="description"
          rules={[{ required: true, message: '请输入描述！' }]}
        >
          <TextArea />
        </Form.Item>
      </ModalForm>
    </div>
  )
}

export default Collect;
