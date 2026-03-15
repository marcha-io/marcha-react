import { MenuOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, Flex, Layout, Typography } from 'antd';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

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
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={280}
        closable={false}
        styles={{
          body: { padding: 0 },
        }}
      >
        <AppSidebar
          communityId={communityId}
          onNavigate={() => setDrawerOpen(false)}
        />
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
