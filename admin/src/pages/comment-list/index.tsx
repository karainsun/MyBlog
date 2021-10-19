import React, { FC, useState, useEffect } from "react";
import dayjs from 'dayjs'
import { Form, Row, Col, Input, Button, Table, message, Popconfirm } from 'antd';
import { setHeight } from 'utils'
import { commentList, commentReply, commentsDelete } from 'request'
import ModalForm from 'components/modalForm';
import { useSelector } from 'react-redux';
import { StoreState } from 'store/state';

const scrollHeight = setHeight(265)

interface Columns {
  title: string;
  dataIndex: string;
  width: number;
  render?: (text: any, record: any, index: any) => void;
  fixed?: string;
}

interface CommentParams {
  pageNo: number;
  pageSize: number;
  nickname: string;
}

interface DataType {
  id: number;
  userId: number;
  articleId: number;
  key: string;
  nickname: string;
  avatar: string;
  content: string;
  created_at: string;
  at_name: string;
  parent_comment_id: number;
  article_title: string;
}

interface FormProps {
  avatar: string;
  nickname: string;
  userId: number;
  articleId: number;
  content: string;
  at_name: string;
  parent_comment_id: number;
  article_title: string;
}

const columns: Columns[] = [
  {
    title: '评论ID',
    dataIndex: 'id',
    width: 60,
    fixed: 'left'
  },
  {
    title: '游客ID',
    dataIndex: 'userId',
    width: 60,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 100,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 100,
    render: avatar => (
      <div className="w-8 h-8 overflow-hidden">
        <img className="w-full object-fill" src={avatar} alt="" />
      </div>
    )
  },
  {
    title: '评论',
    dataIndex: 'content',
    width: 200,
  },
  {
    title: '@名称',
    dataIndex: 'at_name',
    width: 100,
  },
  {
    title: '文章名称',
    dataIndex: 'article_title',
    width: 200,
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

const Comments: FC = () => {
  const [form] = Form.useForm();
  const { userInfo } = useSelector((state: StoreState) => state);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<number>>([])
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [comments, setComments] = useState<DataType[]>([])
  const [insert, setInsert] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [params, setParams] = useState<CommentParams>({
    pageNo: 1,
    pageSize: 10,
    nickname: ''
  })
  // 回复评论参数
  const [formValue, setFormValue] = useState<FormProps>({
    avatar: '',
    nickname: '',
    userId: userInfo.id,
    articleId: 0,
    content: '',
    at_name: '',
    parent_comment_id: 0,
    article_title: ''
  })
  // 回复谁
  const [toComment, setToComment] = useState({
    nickname: '',
    content: '',
    article_title: ''
  })
  // 选框事件
  const selectChange = (selectedKeys: any) => {
    setSelectedRowKeys(selectedKeys);
  };
  // 分页配置
  const rowSelection = {
    onChange: selectChange,
    selectedRowKeys
  }

  useEffect(() => {
    setTableLoading(true)
    commentList(params).then(({ data: { list, meta: { count } } }) => {
      if (list.length > 0) {
        const commentList = list.map((c: DataType) => {
          return Object.assign({}, { key: c.id }, c)
        })
        setComments(commentList)
      } else {
        setComments([])
      }
      setTotal(count)
    })
      .catch((error) => console.log(error))
      .finally(() => setTableLoading(false))
    return () => {
      setInsert(0)
    }
  }, [insert, params])
  // 搜索
  const searchFinish = ({ nickname }: { nickname: string }) => {
    setParams({ ...params, nickname })
  };
  // 分页
  const pageChange = (value: any) => {
    setParams({ ...params, pageNo: value })
  }
  const modalShow = () => {
    if (selectedRowKeys.length === 0) {
      return message.warning('请选择数据')
    } else if (selectedRowKeys.length > 1) {
      return message.warning('只能选择一条')
    }
    const { nickname, articleId, parent_comment_id, content, article_title} = comments.filter(item => item.id === selectedRowKeys[0])[0]
    formValue.at_name = nickname
    formValue.articleId = articleId
    formValue.parent_comment_id = parent_comment_id
    formValue.article_title = article_title
    setFormValue(formValue)

    setToComment({
      nickname: nickname,
      content: content,
      article_title: article_title
    })
    setIsVisible(true);
  };

  const modalConfirm = () => {
    setIsVisible(false);
  };

  const modalCancel = () => {
    setIsVisible(false);
  };
  // 回复评论
  const modalFinish = async (values: { reply_content: string }) => {
    formValue.avatar = userInfo.avatar as string
    formValue.nickname = userInfo.username as string
    formValue.userId = userInfo.id
    formValue.content = values.reply_content

    setFormValue(formValue)
    try {
      const res: any = await commentReply(formValue)
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
  }
  // 批量删除
  const commentDelete = async () => {
    if (selectedRowKeys.length < 1) {
      message.warning('至少选一条删除')
    } else {
      try {
        const { msg, status }: any = await commentsDelete({ ids: selectedRowKeys })
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
            <Form.Item label="" name="nickname">
              <Input placeholder="昵称" />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item><Button htmlType="submit">搜索</Button></Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item><Button onClick={modalShow}>回复</Button></Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Popconfirm
                title="Are you sure you want to delete?"
                onConfirm={commentDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>删除</Button>
              </Popconfirm>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        size="middle"
        columns={columns}
        dataSource={comments}
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
        title="回复评论"
        bodyStyle={{ height: '280px' }}
        val={toComment}
      >
        <Form.Item
          label="评论人"
          name="nickname"
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="评论内容"
          name="content"
        >
          <Input.TextArea readOnly rows={2} />
        </Form.Item>
        <Form.Item
          label="文章标题"
          name="article_title"
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="回复内容"
          name="reply_content"
          rules={[{ required: true, message: '请输入回复内容！' }]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>
      </ModalForm>
    </div>
  )
}

export default Comments
