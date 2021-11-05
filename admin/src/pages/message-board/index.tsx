import React, { FC, useState, useEffect, useRef } from "react";
import dayjs from 'dayjs'
import { Form, Row, Col, Input, Button, Table, message, Popconfirm } from 'antd';
import { SmileOutlined } from '@ant-design/icons'
import { setHeight } from 'utils'
import { messageList, messageReply, messagesDelete } from 'request'
import ModalForm from 'components/modalForm';
import { useSelector } from 'react-redux';
import { StoreState } from 'store/state';
import Emoji from 'components/emojiBox'

const scrollHeight = setHeight(265)
interface MessageParams {
  pageNo: number;
  pageSize: number;
  nickname: string;
}

interface DataType {
  id: number;
  userId: number;
  touristId: number;
  key: string;
  nickname: string;
  qq_email: string;
  avatar: string;
  content: string;
  created_at: string;
  at_name: string;
  parent_message_id: number;
}

interface FormProps {
  avatar: string;
  nickname: string;
  qq_email: string;
  userId: number;
  touristId: number;
  content: string;
  m_content: string;
  at_name: string;
  parent_message_id: number;
}

const columns: Columns[] = [
  {
    title: '留言ID',
    dataIndex: 'id',
    width: 130,
    fixed: 'left'
  },
  {
    title: '游客ID',
    dataIndex: 'touristId',
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
    title: '留言',
    dataIndex: 'content',
    width: 230,
    render: (text: any) => {
      return <div className="flex flex-wrap" dangerouslySetInnerHTML={{__html: text}}></div>
    }
  },
  {
    title: '@名称',
    dataIndex: 'at_name',
    width: 100,
  },
  {
    title: 'Email',
    dataIndex: 'qq_email',
    width: 180,
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

const MessageBoard: FC = () => {
  const [form] = Form.useForm();
  const { userInfo } = useSelector((state: StoreState) => state);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<number>>([])
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<DataType[]>([])
  const [insert, setInsert] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [params, setParams] = useState<MessageParams>({
    pageNo: 1,
    pageSize: 10,
    nickname: ''
  })
  // 回复留言参数
  const [formValue, setFormValue] = useState<FormProps>({
    avatar: '',
    nickname: '',
    userId: userInfo.id,
    touristId: 0,
    content: '',
    at_name: '',
    parent_message_id: 0,
    qq_email: '',
    m_content: ''
  })
  // 回复谁
  const [toMessages, setToMessages] = useState({
    nickname: '',
    content: '',
    reply_content: ''
  })
  // 输入框 dom
  const replyRef = useRef(null)
  // Emoji 显示隐藏
  const [isEmojiShow, setIsEmojiShow] = useState<boolean>(false)
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
    messageList(params).then(({ data: { list, meta: { count } } }) => {
      if (list.length > 0) {
        const messageList = list.map((c: DataType) => {
          return Object.assign({}, { key: c.id }, c)
        })
        setMessages(messageList)
      } else {
        setMessages([])
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

    const { nickname, touristId, parent_message_id, content, userId, id, qq_email } = messages.filter(item => item.id === selectedRowKeys[0])[0]
    formValue.at_name = nickname
    formValue.touristId = touristId
    formValue.qq_email = qq_email
    formValue.parent_message_id = Number(parent_message_id) === Number(userId) ? id : parent_message_id
    setFormValue(formValue)

    setToMessages({
      nickname: nickname,
      content: content,
      reply_content: ''
    })
    setIsVisible(true);
  };

  const modalConfirm = () => {
    setIsVisible(false);
    setIsEmojiShow(false);
  };

  const modalCancel = () => {
    setIsVisible(false);
    setIsEmojiShow(false);
  };
  // 回复评论
  const modalFinish = async (values: { reply_content: string, content: string }) => {
    formValue.avatar = userInfo.avatar as string
    formValue.nickname = userInfo.username as string
    formValue.userId = userInfo.id
    formValue.content = values.reply_content
    formValue.m_content = values.content

    setFormValue(formValue)
    try {
      const res: any = await messageReply(formValue)
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
        const { msg, status }: any = await messagesDelete({ ids: selectedRowKeys })
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
  // Emoji 显示隐藏
  const emojiShow = () => {
    setIsEmojiShow(!isEmojiShow)
  }
  // 替换输入框 div 内容
  let [divTx, setDivTx] = useState<string>('')

  // 回复输入
  const replyInput = (e: any) => {
    toMessages.reply_content = e.target.innerHTML
    setToMessages(toMessages)
    setDivTx(e.target.innerHTML)
  }
  // Emoji事件回调
  const checkEmoji = (url: string) => {
    let htmlStr = `<img style="width: 20px;height: 20px" src="${url}" />`
    toMessages.reply_content += htmlStr
    setToMessages(toMessages);
    divTx += htmlStr;
    ;(replyRef as any).current.innerHTML = divTx
    setDivTx(divTx)
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
        dataSource={messages}
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
        title="回复留言"
        bodyStyle={{ height: '280px' }}
        val={toMessages}
      >
        <Form.Item
          label="留言人"
          name="nickname"
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="留言内容"
          name="content"
        >
          {/* <Input.TextArea readOnly rows={2} /> */}
          <div
            dangerouslySetInnerHTML={{__html: toMessages.content}}
            className="h-16 p-1 flex flex-wrap"
            style={{ border: '1px solid #e3e3e3'}}
          ></div>
        </Form.Item>
        <Form.Item
          label="回复内容"
          name="reply_content"
          rules={[{ required: true, message: '请输入回复内容！' }]}
        >
          {/* <Input.TextArea rows={2} /> */}
          <div
            ref={replyRef}
            contentEditable={true}
            className="h-20 p-1 flex flex-wrap"
            style={{ border: '1px solid #e3e3e3'}}
            onInput={replyInput}
          ></div>
        </Form.Item>
        <SmileOutlined
          className="hover:text-gray-500 absolute"
          style={{ fontSize: '20px', margin: '-68px auto auto 68px' }}
          onClick={emojiShow}
        />
        {
          isEmojiShow ? (<div className="absolute" style={{ fontSize: '20px', margin: '-238px auto auto 0px' }}>
          <Emoji emojiCheck={checkEmoji} />
        </div>) : null
        }
      </ModalForm>
    </div>
  )
}

export default MessageBoard
