import {
  BellOutlined,
  DashboardOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  MessageOutlined,
  ReadOutlined,
  ShopOutlined,
  SwapOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Flex,
  Layout,
  Menu,
  Space,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useCommunity } from '../../contexts/CommunityContext';
import { supabase } from '../../lib/supabase';
import Dashboard from '../../views/dashboard/Dashboard.entrypoint';
import { Paths } from '../../views/paths';
import Profile from '../../views/profile/Profile.entrypoint';
import AppSidebar from './AppSidebar';

const { Content, Header } = Layout;

type Props = {
  communityId: string;
};

const PortalLayout = ({ communityId }: Props): React.ReactElement => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setCommunityId } = useCommunity();
  const { setIsUserLoggedIn } = useAuth();

  const basePath = `${Paths.Portal}/${communityId}`;
  const pathSegments = location.pathname.split('/');
  const activeKey = pathSegments[pathSegments.length - 1] || Paths.Dashboard;

  const handleSwitchCommunity = () => {
    setCommunityId(null);
    navigate(Paths.Main);
    setDrawerOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsUserLoggedIn(false);
    navigate(Paths.SignIn);
  };

  const handleMenuClick = () => {
    setDrawerOpen(false);
  };

  // TODO: Make the phone sidebar the same as the desktop
  //
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          borderBottom: '1px solid #f0f0f0',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          // Hide on desktop (≥ 768 px) using inline style trick:
        }}
        className="mobile-header"
      >
        <Flex align="center" gap={10}>
          <Avatar
            shape="circle"
            size={32}
            style={{ backgroundColor: '#F06543', fontWeight: 700 }}
          >
            M
          </Avatar>
          <Typography.Text strong style={{ fontSize: 16 }}>
            Marcha
          </Typography.Text>
        </Flex>
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: 20 }} />}
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
        />
      </Header>

      <style>{`
        @media (min-width: 768px) {
          .mobile-header {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-sidebar {
            display: none !important;
          }
        }
      `}</style>

      <Drawer
        title={
          <Flex align="center" gap={10}>
            <Avatar
              shape="circle"
              size={32}
              style={{ backgroundColor: '#F06543', fontWeight: 700 }}
            >
              M
            </Avatar>
            <Typography.Text strong>Marcha</Typography.Text>
          </Flex>
        }
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={280}
        styles={{
          body: { padding: 0, display: 'flex', flexDirection: 'column' },
        }}
      >
        <div
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Avatar
            style={{ backgroundColor: '#F06543', flexShrink: 0 }}
            shape="square"
            size={36}
            icon={<HomeOutlined />}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <Typography.Text strong style={{ display: 'block' }}>
              Community
            </Typography.Text>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Resident
            </Typography.Text>
          </div>
          <SwapOutlined
            onClick={handleSwitchCommunity}
            style={{ cursor: 'pointer', fontSize: 16, color: '#8c8c8c' }}
            title="Switch Community"
          />
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '8px 0' }}>
          <Typography.Text
            type="secondary"
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '8px 24px',
              display: 'block',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Main
          </Typography.Text>
          <Menu
            mode="inline"
            selectedKeys={[activeKey]}
            style={{ borderRight: 0 }}
            onClick={handleMenuClick}
            items={[
              {
                key: Paths.Dashboard,
                icon: <DashboardOutlined />,
                label: (
                  <Link to={`${basePath}/${Paths.Dashboard}`}>Dashboard</Link>
                ),
              },
              {
                key: Paths.Maintenance,
                icon: <ToolOutlined />,
                label: (
                  <Link to={`${basePath}/${Paths.Maintenance}`}>
                    Maintenance
                  </Link>
                ),
              },
              {
                key: Paths.ServiceCharges,
                icon: <DollarCircleOutlined />,
                label: (
                  <Link to={`${basePath}/${Paths.ServiceCharges}`}>
                    Service Charges
                  </Link>
                ),
              },
              {
                key: Paths.Documents,
                icon: <FileTextOutlined />,
                label: (
                  <Link to={`${basePath}/${Paths.Documents}`}>Documents</Link>
                ),
              },
            ]}
          />

          <Typography.Text
            type="secondary"
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '16px 24px 8px',
              display: 'block',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Community
          </Typography.Text>
          <Menu
            mode="inline"
            selectedKeys={[activeKey]}
            style={{ borderRight: 0 }}
            onClick={handleMenuClick}
            items={[
              {
                key: Paths.Messages,
                icon: <MessageOutlined />,
                label: (
                  <Link to={`${basePath}/${Paths.Messages}`}>Messages</Link>
                ),
              },
              {
                key: Paths.Community,
                icon: <ReadOutlined />,
                label: (
                  <Link to={`${basePath}/${Paths.Community}`}>Noticeboard</Link>
                ),
              },
              {
                key: Paths.Market,
                icon: <ShopOutlined />,
                label: (
                  <Link to={`${basePath}/${Paths.Market}`}>Marketplace</Link>
                ),
              },
            ]}
          />

          <Typography.Text
            type="secondary"
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '16px 24px 8px',
              display: 'block',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Account
          </Typography.Text>
          <Menu
            mode="inline"
            selectedKeys={[activeKey]}
            style={{ borderRight: 0 }}
            onClick={handleMenuClick}
            items={[
              {
                key: Paths.Profile,
                icon: <UserOutlined />,
                label: <Link to={`${basePath}/${Paths.Profile}`}>Profile</Link>,
              },
              {
                key: Paths.Notifications,
                icon: <BellOutlined />,
                label: (
                  <Link to={`${basePath}/${Paths.Notifications}`}>
                    Notifications
                  </Link>
                ),
              },
            ]}
          />
        </div>

        <div
          style={{
            borderTop: '1px solid #f0f0f0',
            padding: '12px 16px',
          }}
        >
          <Space vertical style={{ width: '100%' }} size={0}>
            <Divider style={{ margin: '0 0 12px' }} />
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              danger
              style={{
                width: '100%',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                height: 40,
                paddingLeft: 12,
              }}
            >
              Sign Out
            </Button>
          </Space>
        </div>
      </Drawer>

      <Layout>
        <div className="desktop-sidebar">
          <AppSidebar communityId={communityId} />
        </div>

        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
              borderRadius: 8,
            }}
          >
            <Routes>
              <Route path={Paths.Dashboard} element={<Dashboard />} />
              <Route
                path={Paths.Documents}
                element={<div>Documents - Coming Soon</div>}
              />
              <Route
                path={Paths.Maintenance}
                element={<div>Maintenance - Coming Soon</div>}
              />
              <Route
                path={Paths.ServiceCharges}
                element={<div>Service Charges - Coming Soon</div>}
              />
              <Route
                path={Paths.Messages}
                element={<div>Messages - Coming Soon</div>}
              />
              <Route
                path={Paths.Community}
                element={<div>Noticeboard - Coming Soon</div>}
              />
              <Route
                path={Paths.Market}
                element={<div>Marketplace - Coming Soon</div>}
              />
              <Route
                path={Paths.Subletting}
                element={<div>Subletting - Coming Soon</div>}
              />
              <Route path={Paths.Profile} element={<Profile />} />
              <Route
                path={Paths.Notifications}
                element={<div>Notifications - Coming Soon</div>}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PortalLayout;
