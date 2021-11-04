import React, { FC } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, LinkOutlined, MailOutlined } from '@ant-design/icons';
import { userCreate } from 'request'
import { checkLength, checkEmail, VerifyFn } from 'utils/verify'

interface RegisterProps {
  isRegister: () => void
}

const Register: FC<RegisterProps> = ({ isRegister }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    userCreate(values).then((res: any) => {
      if (res.code === 200 && res.status === 'success') {
        message.success(res.msg)
      } else {
        message.warning(res.msg)
      }
    }).catch(error => {
      console.log(error);
    })
  };

  const checkPass: VerifyFn = (_rule, value, callback) => {
    const firstPass = form.getFieldValue('password')
    if (value !== firstPass) {
      return Promise.reject("两次密码不一样！");
    }
    return Promise.resolve();
  }

  return (
    <Form
      form={form}
      name="register"
      className="register-form"
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          { required: true, message: '请输入用户名!' },
          { validator: checkLength }
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: '请输入邮箱!' },
          { validator: checkEmail }
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="邮箱" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: '请输入密码!' },
          { validator: checkLength}
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item
        name="repassword"
        rules={[
          { required: true, message: '请再次输入密码!' },
          { validator: checkPass }
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="确认密码"
        />
      </Form.Item>
      <Form.Item name="invitationCode">
        <Input
          prefix={<LinkOutlined className="site-form-item-icon" />}
          placeholder="邀请码(不填也能注册)"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="block w-full">注册</Button>
        <Button className="block w-full mt-4" onClick={isRegister}>登录</Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
