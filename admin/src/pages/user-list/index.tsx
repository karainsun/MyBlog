import React, { FC, useState, useEffect, memo } from 'react';
import { Form, Row, Col, Input, Button, Table, message, Popconfirm, Switch } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import dayjs from 'dayjs'
import { setHeight } from 'utils'
import { userList, usersDelete, userStatus } from 'request'
import { UserInfo, StoreState } from 'store/state'
import { produce } from 'immer'
import { connect } from 'react-redux'

const scrollHeight = setHeight(265)

interface DataType extends UserInfo {
  key: string;
}

interface ArticleParams {
  pageNo: number;
  pageSize: number;
  username: string;
  email: string;
}

const UserList: FC<{ userInfo: UserInfo }> = ({ userInfo }) => {
  const columns: Columns[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
      fixed: 'left'
    },
    {
      title: '用户名',
      dataIndex: 'username',
      width: 200,
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      width: 250,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 250,
      render: img => img ? (
        <div className="w-6 h-6 overflow-hidden text-center">
          <img className="w-full object-fill" src={img} alt="" />
        </div>
      ) : <div className="text-center w-6 h-6"><UserOutlined /></div>,
    },
    {
      title: '签名',
      dataIndex: 'sign',
      width: 200,
      render: sign => sign ? sign : '--'
    },
    {
      title: '管理员权限',
      dataIndex: 'is_admin',
      width: 200,
      render: (isAdmin, record) => (
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          checked={isAdmin}
          onClick={() => setRoleStatus(isAdmin, record.id, 'role')}
        />
      )
    },
    {
      title: '禁用',
      dataIndex: 'status',
      width: 200,
      render: (status, record) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="禁用"
          checked={status}
          onClick={() => setRoleStatus(status, record.id, 'status')}
        />
      )
    },
    {
      title: '创建日期',
      dataIndex: 'created_at',
      width: 150,
      render: (date: string) => {
        return dayjs(date).format('YYYY-MM-DD HH:mm')
      }
    }
  ];

  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<number>>([])
  const [users, setUsers] = useState<Array<DataType>>([])
  const [insert, setInsert] = useState<number>(0)
  const [params, setParams] = useState<ArticleParams>({
    pageNo: 1,
    pageSize: 10,
    username: '',
    email: ''
  })
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const history = useHistory();

  useEffect(() => {
    setTableLoading(true)
    userList(params).then(({ data: { list, meta: { count } } }) => {
      if (list.length > 0) {
        const userList = list.map((user: any) => {
          return Object.assign({}, { key: user.id }, user)
        })
        setUsers(userList)
      } else {
        setUsers([])
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

  // 批量删除用户
  const usersToDelete = async () => {
    if (selectedRowKeys.length < 1) {
      message.warning('至少选一条删除')
    } else {
      try {
        const { msg, status }: any = await usersDelete({ ids: selectedRowKeys })
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

  const searchFinish = ({ username, email }: { username: string, email: string }) => {
    setParams({ ...params, username, email })
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
  // 用户权限和状态
  const setRoleStatus = (s: boolean, id: number, key: string) => {
    if(userInfo.id === id) {
      return message.warning('请勿操作本人账号')
    }
    setTableLoading(true)
    const params = {
      id: id,
      roleStatus: !s,
      key
    }
    userStatus(params).then((res: any) => {
      if (res.status === 'success') {
        message.success(res.msg)
        setInsert(insert + 1)
      } else {
        message.warning(res.msg)
      }
    }).catch(error => {
      console.log(error);
      message.error('操作失败！')
    }).finally(() => setTableLoading(false))
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
            <Form.Item label="" name="username">
              <Input placeholder="用户名" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="" name="email">
              <Input placeholder="邮箱" />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item><Button htmlType="submit">搜索</Button></Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Popconfirm
                title="Are you sure you want to delete?"
                onConfirm={usersToDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>删除</Button>
              </Popconfirm>
            </Form.Item>
          </Col>
          {/* <Col span={2}>
            <Form.Item><Button onClick={toArticleCreate} type="primary" ghost>编辑</Button></Form.Item>
          </Col> */}
        </Row>
      </Form>
      <Table
        size="small"
        columns={columns}
        dataSource={users}
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
  );
};

const mapStateToProps = produce((state: StoreState) => {
  return {
    userInfo: state.userInfo
  };
});

export default connect(mapStateToProps)(memo(UserList));
