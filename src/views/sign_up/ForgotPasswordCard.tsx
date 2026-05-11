import { UserOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
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

type TForgotPasswordForm = {
  email: string;
};

const ForgotPasswordCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const onFinish = async (form: TForgotPasswordForm) => {
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(form.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setIsLoading(false);

    if (error != null) {
      api.error({
        title: 'Request failed',
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
              If an account exists with that email, we've sent a password reset
              link. Please check your inbox.
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
          <Typography.Title level={3} style={{ margin: 0, color: NEUTRAL_900 }}>
            Forgot your password?
          </Typography.Title>
          <Typography.Text type="secondary">
            Enter your email address and we'll send you a link to reset your
            password.
          </Typography.Text>
        </Space>
        <Form
          size="large"
          name="forgot-password"
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
              Send reset link
            </Button>
          </Form.Item>
        </Form>

        <Flex justify="center">
          <Typography.Link
            onClick={() => navigate(Paths.SignIn)}
            style={{ color: BRAND_PRIMARY, fontWeight: 600, fontSize: 15 }}
          >
            Back to Sign In
          </Typography.Link>
        </Flex>
      </Card>
    </>
  );
};

export default ForgotPasswordCard;
