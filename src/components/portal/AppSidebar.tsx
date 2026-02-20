// src/components/portal/AppSidebar.tsx
import {
  BellOutlined,
  DashboardOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  HomeOutlined,
  MessageOutlined,
  ReadOutlined,
  ShopOutlined,
  SwapOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Layout, Menu, Space, Typography } from 'antd';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useCommunity } from '../../contexts/CommunityContext';
import { Paths } from '../../views/paths';

const { Sider } = Layout;

type Props = {
  communityId: string;
};

const AppSidebar = ({ communityId }: Props): React.ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCommunityId } = useCommunity();

  const handleSwitchCommunity = () => {
    setCommunityId(null); // Clear the context
    navigate(Paths.Main); // Navigate back to the picker
  };

  // Determine the active menu key from the current path
  const pathSegments = location.pathname.split('/');
  const activeKey = pathSegments[pathSegments.length - 1] || Paths.Dashboard;

  const basePath = `${Paths.Portal}/${communityId}`;

  return (
    <Sider
      width={250}
      style={{
        background: '#fff',
        borderRight: '1px solid #f0f0f0',
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
      }}
    >
      {/* Community Header */}
      <div
        style={{
          padding: '16px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Avatar
          style={{ backgroundColor: '#F06543', flexShrink: 0 }}
          shape="square"
          size={40}
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

      {/* Main Navigation */}
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
                <Link to={`${basePath}/${Paths.Maintenance}`}>Maintenance</Link>
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
              label: <Link to={`${basePath}/${Paths.Messages}`}>Messages</Link>,
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
            {
              key: Paths.Subletting,
              icon: <HomeOutlined />,
              label: (
                <Link to={`${basePath}/${Paths.Subletting}`}>Subletting</Link>
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
    </Sider>
  );
};

export default AppSidebar;
