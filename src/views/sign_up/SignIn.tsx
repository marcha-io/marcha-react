import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  Typography,
  notification,
} from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../../lib/supabase';

type TSignInForm = {
  email: string;
  password: string;
  remember?: boolean;
};

const SignIn = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();

  const onFinish = async (form: TSignInForm) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    setIsLoading(false);

    if (error != null) {
      api.error({
        title: `(${error.name}) Failed to sign in`,
        description: error.message,
        duration: 5,
        pauseOnHover: true,
      });
      return;
    }

    api.success({ title: 'Sign in successful!' });
    navigate('/');
  };

  return (
    <>
      {contextHolder}
      <Flex gap={24} wrap="wrap" align="center" justify="center" vertical>
        <Header>
          <Typography.Title>Sign In</Typography.Title>{' '}
        </Header>
        <Form
          size="large"
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password' },
              ]}
              style={{ marginBottom: 0 }}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <a href="">Forgot password</a>
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" disabled={isLoading}>
              Log in
            </Button>
            or <a href="">Register now!</a>
          </Form.Item>
        </Form>{' '}
      </Flex>
    </>
  );
};

export default SignIn;
