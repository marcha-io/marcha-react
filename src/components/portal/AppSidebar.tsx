import {
  BellOutlined,
  DashboardOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  LogoutOutlined,
  MessageOutlined,
  ReadOutlined,
  ShopOutlined,
  SwapOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Divider, Flex, Layout, Menu, Space, Typography } from 'antd';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useCommunity } from '../../contexts/CommunityContext';
import { supabase } from '../../lib/supabase';
import { Paths } from '../../views/paths';
import BuildingAvatar from '../Avatars/BuildingAvatar';

const { Sider } = Layout;

type Props = {
  communityId: string;
  onNavigate?: () => void;
};

const AppSidebar = ({ communityId, onNavigate }: Props): React.ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

  const { communityImg, setCommunityId } = useCommunity();
  const { setIsUserLoggedIn } = useAuth();

  const handleSwitchCommunity = () => {
    setCommunityId(null);
    navigate(Paths.Main);
    onNavigate?.();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsUserLoggedIn(false);
    navigate(Paths.SignIn);
    onNavigate?.();
  };

  const handleMenuClick = () => {
    onNavigate?.();
  };

  const pathSegments = location.pathname.split('/');
  const activeKey = pathSegments[pathSegments.length - 1] || Paths.Dashboard;

  const basePath = `${Paths.Portal}/${communityId}`;

  return (
    <Sider
      width={250}
      style={{
        background: '#fff',
        borderRight: '1px solid #f0f0f0',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Flex vertical style={{ overflow: 'auto' }}>
        <Flex
          align="center"
          style={{
            padding: '16px',
            borderBottom: '1px solid #f0f0f0',
            gap: 12,
          }}
        >
          <BuildingAvatar communityImg={communityImg} />

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
        </Flex>

        <div style={{ padding: '8px 0' }}>
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
      </Flex>

      <div
        style={{
          borderTop: '1px solid #f0f0f0',
          padding: '12px 16px',
          background: '#fff',
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
    </Sider>
  );
};

export default AppSidebar;
