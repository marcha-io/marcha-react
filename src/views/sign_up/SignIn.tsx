import { BankOutlined, MessageOutlined, ToolOutlined } from '@ant-design/icons';
import { Col, Flex, Image, Row, Space, Typography, notification } from 'antd';

import { BRAND_COLOR, BRAND_GRADIENT } from '../..';
import FeatureBullet from './FeatureBullet';
import SignInCard from './SignInCard';

const SignIn = (): React.ReactElement => {
  const [_, contextHolder] = notification.useNotification();

  return (
    <>
      {contextHolder}
      <style>{`
        html, body, #root { height: 100%; margin: 0; }
        .signin-hero { display: flex !important; }
        .signin-mobile-logo { display: none !important; }
        @media (max-width: 767px) {
          .signin-hero { display: none !important; }
          .signin-mobile-logo { display: flex !important; }
        }
      `}</style>
      <Row style={{ height: '100vh', overflow: 'hidden' }}>
        <Col
          xs={0}
          md={12}
          lg={13}
          className="signin-hero"
          style={{
            background: BRAND_GRADIENT,
            padding: '60px 56px',
            position: 'relative',
            overflow: 'hidden',
            height: '100%',
          }}
        >
          <Flex
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
          <Flex
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
          <Flex
            vertical
            justify="center"
            style={{ height: '100%', position: 'relative', zIndex: 1 }}
            gap={48}
          >
            <Image
              src="/assets/marcha_logo.png"
              preview={false}
              style={{
                height: 48,
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
                filter: 'brightness(0) invert(1)',
              }}
            />

            <Space direction="vertical" size={12}>
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

            <Space vertical size={24}>
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
          </Flex>
        </Col>

        <Col
          xs={24}
          md={12}
          lg={11}
          style={{ background: '#fafafa', height: '100%', overflow: 'auto' }}
        >
          <Flex
            align="center"
            justify="center"
            style={{ minHeight: '100%', padding: '40px 24px' }}
          >
            <Flex vertical style={{ width: '100%', maxWidth: 420 }} gap={0}>
              <Flex
                justify="center"
                className="signin-mobile-logo"
                style={{ marginBottom: 32 }}
              >
                <Image
                  src="/assets/marcha_logo.png"
                  preview={false}
                  style={{
                    height: 40,
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </Flex>

              <SignInCard />

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
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default SignIn;
