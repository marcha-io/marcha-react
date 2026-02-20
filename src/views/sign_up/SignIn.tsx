import {
  BankOutlined,
  LockOutlined,
  MessageOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  Row,
  Space,
  Typography,
  notification,
} from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { invalidateRelayStore } from '../../lib/relay_environment';
import { supabase } from '../../lib/supabase';
import { Paths } from '../paths';

const BRAND_COLOR = '#F06543';
const BRAND_GRADIENT = 'linear-gradient(145deg, #F06543 0%, #D94530 100%)';

type TSignInForm = {
  email: string;
  password: string;
  remember?: boolean;
};

/** Feature bullet shown on the hero panel */
const FeatureBullet = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Space align="start" size={14}>
    <Flex
      align="center"
      justify="center"
      style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        background: 'rgba(255,255,255,0.18)',
        flexShrink: 0,
        fontSize: 18,
        color: '#fff',
      }}
    >
      {icon}
    </Flex>
    <Space direction="vertical" size={2}>
      <Typography.Text strong style={{ color: '#fff', fontSize: 14 }}>
        {title}
      </Typography.Text>
      <Typography.Text
        style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}
      >
        {description}
      </Typography.Text>
    </Space>
  </Space>
);

const SignIn = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
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
        title: `Sign in failed`,
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
    <>
      {contextHolder}

      {/* Full-viewport container */}
      <Row style={{ minHeight: '100vh' }}>
        {/* ── Left hero panel (hidden on small screens) ── */}
        <Col
          xs={0}
          md={12}
          lg={13}
          style={{
            background: BRAND_GRADIENT,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px 56px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative background circles */}
          <div
            style={{
              position: 'absolute',
              top: -80,
              right: -80,
              width: 320,
              height: 320,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.07)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -120,
              left: -60,
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              pointerEvents: 'none',
            }}
          />

          {/* Logo */}
          <Image
            src="/assets/marcha_logo.png"
            preview={false}
            height={48}
            style={{ filter: 'brightness(0) invert(1)', marginBottom: 48 }}
          />

          {/* Hero headline */}
          <Space direction="vertical" size={12} style={{ marginBottom: 48 }}>
            <Typography.Title
              level={2}
              style={{ color: '#fff', margin: 0, lineHeight: 1.2 }}
            >
              Your community,
              <br />
              all in one place.
            </Typography.Title>
            <Typography.Text
              style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16 }}
            >
              Manage your home, stay connected with neighbours, and handle
              everything your building needs — effortlessly.
            </Typography.Text>
          </Space>

          {/* Feature bullets */}
          <Space direction="vertical" size={24}>
            <FeatureBullet
              icon={<BankOutlined />}
              title="Service Charges & Finances"
              description="Track payments and view your account balance at a glance"
            />
            <FeatureBullet
              icon={<ToolOutlined />}
              title="Maintenance Requests"
              description="Submit and follow up on repairs without the back-and-forth"
            />
            <FeatureBullet
              icon={<MessageOutlined />}
              title="Community Messaging"
              description="Stay in the loop with announcements and neighbour updates"
            />
          </Space>
        </Col>

        {/* ── Right form panel ── */}
        <Col
          xs={24}
          md={12}
          lg={11}
          style={{
            background: '#fafafa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 24px',
          }}
        >
          <Flex vertical style={{ width: '100%', maxWidth: 420 }} gap={0}>
            {/* Mobile-only logo */}
            <Flex
              justify="center"
              style={{ marginBottom: 32, display: 'none' }}
              className="mobile-logo"
            >
              <Image
                src="/assets/marcha_logo.png"
                preview={false}
                height={40}
              />
            </Flex>

            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                boxShadow:
                  '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
                background: '#fff',
              }}
              styles={{ body: { padding: '40px 40px 32px' } }}
            >
              {/* Card header */}
              <Space direction="vertical" size={4} style={{ marginBottom: 32 }}>
                <Typography.Title
                  level={3}
                  style={{ margin: 0, color: '#1a1a1a' }}
                >
                  Sign in to Marcha
                </Typography.Title>
                <Typography.Text type="secondary">
                  Enter your credentials to access your resident portal
                </Typography.Text>
              </Space>

              {/* Sign-in form */}
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
                    prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="you@example.com"
                    style={{ borderRadius: 8 }}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label={
                    <Flex
                      justify="space-between"
                      align="center"
                      style={{ width: '100%' }}
                    >
                      <Typography.Text strong style={{ fontSize: 13 }}>
                        Password
                      </Typography.Text>
                      <Typography.Link
                        href=""
                        style={{ fontSize: 13, color: BRAND_COLOR }}
                      >
                        Forgot password?
                      </Typography.Link>
                    </Flex>
                  }
                  rules={[
                    { required: true, message: 'Please enter your password' },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="••••••••"
                    style={{ borderRadius: 8 }}
                  />
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
                      background: BRAND_COLOR,
                      borderColor: BRAND_COLOR,
                      borderRadius: 8,
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
                href=""
                style={{
                  borderRadius: 8,
                  height: 48,
                  fontWeight: 600,
                  fontSize: 15,
                  borderColor: BRAND_COLOR,
                  color: BRAND_COLOR,
                }}
              >
                Create an account
              </Button>
            </Card>

            {/* Footer note */}
            <Typography.Text
              type="secondary"
              style={{
                textAlign: 'center',
                fontSize: 12,
                marginTop: 24,
                display: 'block',
              }}
            >
              By signing in you agree to Marcha's{' '}
              <Typography.Link href="" style={{ color: BRAND_COLOR }}>
                Terms of Service
              </Typography.Link>{' '}
              and{' '}
              <Typography.Link href="" style={{ color: BRAND_COLOR }}>
                Privacy Policy
              </Typography.Link>
              .
            </Typography.Text>
          </Flex>
        </Col>
      </Row>

      {/* Responsive: show logo on mobile */}
      <style>{`
        @media (max-width: 767px) {
          .mobile-logo {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default SignIn;
