import React, { FC, useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button, Table, message, Popconfirm, Tag } from 'antd';
import { Link, useHistory } from "react-router-dom";
import dayjs from 'dayjs'
import { setHeight } from 'utils'
import { articleList, articlesDelete } from 'request'

const scrollHeight = setHeight(265)

interface Columns {
  title: string;
  dataIndex: string;
  width: number;
  fixed?: string;
  render?: (text: any, record: any, index: any) => void;
}

interface DataType {
  id: number;
  key: string;
  title: string;
  description: string;
  tag: string;
}

interface ArticleParams {
  pageNo: number;
  pageSize: number;
  title: string;
  category: string;
}

const columns: Columns[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 50,
    fixed: 'left'
  },
  {
    title: '文章标题',
    dataIndex: 'title',
    width: 200,
  },
  {
    title: '文章描述',
    dataIndex: 'description',
    width: 250,
  },
  {
    title: '封面图',
    dataIndex: 'image',
    width: 100,
    render: img => (
      <div className="w-10 h-6 overflow-hidden">
        <img className="w-full object-fill" src={img[0].url} alt="" />
      </div>
    ),
  },
  {
    title: '分类',
    dataIndex: 'category',
    width: 120,
    render: cate => (
      <span>{cate.name}</span>
    ),
  },
  {
    title: '标签',
    dataIndex: 'tags',
    width: 200,
    render: tags => (
      <span>
        {tags.map((tag: { name: string }) => {
          let color = tag.name.length > 5 ? 'geekblue' : 'green';
          return (
            <Tag color={color} key={tag.name}>
              {tag.name.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: '创建日期',
    dataIndex: 'created_at',
    width: 150,
    render: (text: any, record: any, index: any) => {
      return dayjs(text).format('YYYY-MM-DD HH:mm')
    }
  }
];

const ArticleList: FC = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<number>>([])
  const [articles, setArticles] = useState<Array<DataType>>([])
  const [insert, setInsert] = useState<number>(0)
  const [params, setParams] = useState<ArticleParams>({
    pageNo: 1,
    pageSize: 10,
    title: '',
    category: ''
  })
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const history = useHistory();

  useEffect(() => {
    setTableLoading(true)
    articleList(params).then((res) => {
      if (res.data) {
        const { data: { list, meta: { count } } } = res
        if (list.length > 0) {
          const cateList = list.map((cate: any) => {
            return Object.assign({}, { key: cate.id }, cate)
          })
          setArticles(cateList)
        } else {
          setArticles([])
        }
        setTotal(count)
      }
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setTableLoading(false)
    })
    return () => {
      setInsert(0)
    }
  }, [insert, params])

  // 批量删除文章
  const articlesToDelete = async () => {
    if (selectedRowKeys.length < 1) {
      message.warning('至少选一条删除')
    } else {
      try {
        const { msg, status }: any = await articlesDelete({ ids: selectedRowKeys })
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

  const searchFinish = ({ title, category }: { title: string, category: string }) => {
    setParams({ ...params, title, category })
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
  // 编辑文章
  const toArticleCreate = () => {
    if (selectedRowKeys.length !== 1) {
      message.warning('请选择且只能选择一条')
    } else {
      history.push({ pathname: '/article/create', state: { id: selectedRowKeys[0] } })
    }
  }

  return (
    <div className="componentList">
      <Form
        orm={form}
        name="basic"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 23 }}
        onFinish={searchFinish}
      >
        <Row>
          <Col span={6}>
            <Form.Item label="" name="title">
              <Input placeholder="文章标题" />
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
            <Form.Item><Link to={{ pathname: "/article/create" }}><Button>新建</Button></Link></Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Popconfirm
                title="Are you sure you want to delete?"
                onConfirm={articlesToDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>删除</Button>
              </Popconfirm>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item><Button onClick={toArticleCreate} type="primary" ghost>编辑</Button></Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        size="small"
        columns={columns}
        dataSource={articles}
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
    </div>
  )
};

export default ArticleList;
