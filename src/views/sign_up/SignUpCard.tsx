import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
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

import {
  BRAND_PRIMARY,
  NEUTRAL_400,
  NEUTRAL_900,
  RADIUS_MD,
  RADIUS_XL,
  SHADOW_CARD,
} from '../../design';
import { supabase } from '../../utils/supabase';
import { Paths } from '../paths';

type TSignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const onFinish = async (form: TSignUpForm) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });
    setIsLoading(false);

    if (error != null) {
      api.error({
        title: 'Registration failed',
        description: error.message,
        duration: 5,
        pauseOnHover: true,
      });
      return;
    }

    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <>
        {contextHolder}
        <Card
          style={{
            borderRadius: RADIUS_XL,
            boxShadow: SHADOW_CARD,
          }}
          styles={{ body: { padding: '40px 40px 32px' } }}
        >
          <Space
            direction="vertical"
            size={16}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <Typography.Title
              level={3}
              style={{ margin: 0, color: NEUTRAL_900 }}
            >
              Check your email
            </Typography.Title>
            <Typography.Text type="secondary">
              We've sent a confirmation link to your email address. Please check
              your inbox and click the link to activate your account.
            </Typography.Text>
            <Button
              type="link"
              onClick={() => navigate(Paths.SignIn)}
              style={{ color: BRAND_PRIMARY, fontWeight: 600 }}
            >
              Back to Sign In
            </Button>
          </Space>
        </Card>
      </>
    );
  }

  return (
    <>
      {contextHolder}
      <Card
        style={{
          borderRadius: RADIUS_XL,
          boxShadow: SHADOW_CARD,
        }}
        styles={{ body: { padding: '40px 40px 32px' } }}
      >
        <Space direction="vertical" size={4} style={{ marginBottom: 32 }}>
          <Typography.Title
            level={3}
            style={{ margin: 0, color: NEUTRAL_900 }}
          >
            Create your account
          </Typography.Title>
          <Typography.Text type="secondary">
            Sign up to join your resident community
          </Typography.Text>
        </Space>
        <Form
          size="large"
          name="register"
          layout="vertical"
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
            rules={[
              { required: true, message: 'Please enter a password' },
              {
                min: 6,
                message: 'Password must be at least 6 characters',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: NEUTRAL_400 }} />}
              placeholder="••••••••"
              style={{ borderRadius: RADIUS_MD }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={
              <Typography.Text strong style={{ fontSize: 13 }}>
                Confirm password
              </Typography.Text>
            }
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Passwords do not match')
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: NEUTRAL_400 }} />}
              placeholder="••••••••"
              style={{ borderRadius: RADIUS_MD }}
            />
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
              Create account
            </Button>
          </Form.Item>
        </Form>

        <Divider style={{ margin: '0 0 20px' }}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Already have an account?
          </Typography.Text>
        </Divider>

        <Flex justify="center">
          <Typography.Link
            onClick={() => navigate(Paths.SignIn)}
            style={{ color: BRAND_PRIMARY, fontWeight: 600, fontSize: 15 }}
          >
            Sign in instead
          </Typography.Link>
        </Flex>
      </Card>
    </>
  );
};

export default SignUpCard;
