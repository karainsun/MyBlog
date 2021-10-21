import React, { FC, useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { setUserInfo } from 'store/actions';
import RegisterForm from 'pages/register';
import { userLogin } from 'request'
import './style.less'

const Login: FC<{ userInfoToSet: (info: any) => void }> = ({ userInfoToSet }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const history = useHistory()

  const onFinish = (values: any) => {
    userLogin(values).then((res: any) => {
      if (res.code === 200 && res.status === 'success') {
        message.success(res.msg, 1, () => history.push('/home'))
        userInfoToSet(res.data.userInfo)
      } else {
        message.warning(res.msg)
      }
    }).catch(error => {
      console.log(error);
    })
  };

  const isLoginTrue = () => setIsLogin(true)
  const isLoginFalse = () => setIsLogin(false)

  useEffect(() => {
    const token = localStorage.getItem('k_token')

    if (token) {
      history.push('/')
      return
    }
  }, [history])

  const LoginForm: FC = () => {
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="block w-full">
            登录
          </Button>
          <Button className="block w-full mt-4" onClick={isLoginFalse}>注册</Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <div className="login-bg">
      <div className="login-box fixed z-10">
        <h1 className="text-center text-xl pb-4">{isLogin ? '登录' : '注册'}</h1>
        {isLogin ? <LoginForm /> : <RegisterForm isRegister={isLoginTrue} />}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: (e: any) => void) => {
  return {
    userInfoToSet: (e: any) => dispatch(setUserInfo(e))
  };
};

export default connect(state => state, mapDispatchToProps)(React.memo(Login));
