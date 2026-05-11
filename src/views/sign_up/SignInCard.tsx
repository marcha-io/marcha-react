import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Form,
  Input,
  Space,
  Typography,
  notification,
} from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import {
  BRAND_PRIMARY,
  NEUTRAL_400,
  NEUTRAL_900,
  RADIUS_MD,
  RADIUS_XL,
  SHADOW_CARD,
} from '../../design';
import { invalidateRelayStore } from '../../utils/relay_environment';
import { supabase } from '../../utils/supabase';
import { Paths } from '../paths';

type TSignInForm = {
  email: string;
  password: string;
  remember?: boolean;
};

const SignInCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [api] = notification.useNotification();
  const { setIsUserLoggedIn } = useAuth();
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
        title: 'Sign in failed',
        description: error.message,
        duration: 5,
        pauseOnHover: true,
      });
      return;
    }

    api.success({ title: 'Welcome back!' });
    setIsUserLoggedIn(true);
    invalidateRelayStore();
    navigate(Paths.Main);
  };

  return (
    <Card
      style={{
        borderRadius: RADIUS_XL,
        boxShadow: SHADOW_CARD,
      }}
      styles={{ body: { padding: '40px 40px 32px' } }}
    >
      <Space direction="vertical" size={4} style={{ marginBottom: 32 }}>
        <Typography.Title level={3} style={{ margin: 0, color: NEUTRAL_900 }}>
          Sign in to Marcha
        </Typography.Title>
        <Typography.Text type="secondary">
          Enter your credentials to access your resident portal
        </Typography.Text>
      </Space>
      <Form
        size="large"
        name="login"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          name="email"
          label={
            <Typography.Text strong style={{ fontSize: 13 }}>
              Email address
            </Typography.Text>
          }
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input
            prefix={<UserOutlined style={{ color: NEUTRAL_400 }} />}
            placeholder="you@example.com"
            style={{ borderRadius: RADIUS_MD }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={
            <Typography.Text strong style={{ fontSize: 13 }}>
              Password
            </Typography.Text>
          }
          rules={[{ required: true, message: 'Please enter your password' }]}
          style={{ marginBottom: 4 }}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: NEUTRAL_400 }} />}
            placeholder="••••••••"
            style={{ borderRadius: RADIUS_MD }}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 16, marginTop: 0 }}>
          <Flex justify="flex-end">
            <Typography.Link
              onClick={() => navigate(Paths.ForgotPassword)}
              style={{ fontSize: 13, color: BRAND_PRIMARY }}
            >
              Forgot password?
            </Typography.Link>
          </Flex>
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>
            <Typography.Text style={{ fontSize: 13 }}>
              Keep me signed in
            </Typography.Text>
          </Checkbox>
        </Form.Item>
        <Form.Item style={{ marginBottom: 16 }}>
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={isLoading}
            size="large"
            style={{
              background: BRAND_PRIMARY,
              borderColor: BRAND_PRIMARY,
              borderRadius: RADIUS_MD,
              height: 48,
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>

      <Divider style={{ margin: '0 0 20px' }}>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          New to Marcha?
        </Typography.Text>
      </Divider>

      <Button
        block
        size="large"
        onClick={() => navigate(Paths.SignUp)}
        style={{
          borderRadius: RADIUS_MD,
          height: 48,
          fontWeight: 600,
          fontSize: 15,
          borderColor: BRAND_PRIMARY,
          color: BRAND_PRIMARY,
        }}
      >
        Create an account
      </Button>
    </Card>
  );
};

export default SignInCard;
