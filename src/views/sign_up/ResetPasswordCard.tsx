import { LockOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
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

type TResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const onFinish = async (form: TResetPasswordForm) => {
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: form.password,
    });
    setIsLoading(false);

    if (error != null) {
      api.error({
        title: 'Password reset failed',
        description: error.message,
        duration: 5,
        pauseOnHover: true,
      });
      return;
    }

    api.success({
      title: 'Password updated successfully',
      description: 'You can now sign in with your new password.',
      duration: 3,
    });

    setTimeout(() => {
      navigate(Paths.SignIn);
    }, 2000);
  };

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
            Set new password
          </Typography.Title>
          <Typography.Text type="secondary">
            Enter your new password below to complete the reset.
          </Typography.Text>
        </Space>
        <Form
          size="large"
          name="reset-password"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="password"
            label={
              <Typography.Text strong style={{ fontSize: 13 }}>
                New password
              </Typography.Text>
            }
            rules={[
              { required: true, message: 'Please enter a new password' },
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
                Confirm new password
              </Typography.Text>
            }
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your new password' },
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
              Reset password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default ResetPasswordCard;
