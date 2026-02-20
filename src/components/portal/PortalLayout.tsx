// src/components/portal/PortalLayout.tsx
import { Layout } from 'antd';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Dashboard from '../../views/dashboard/Dashboard.entrypoint';
import { Paths } from '../../views/paths';
import AppSidebar from './AppSidebar';

const { Content } = Layout;

type Props = {
  communityId: string;
};

const PortalLayout = ({ communityId }: Props): React.ReactElement => {
  return (
    <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
      <AppSidebar communityId={communityId} />
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
            {/* Placeholder routes for future features */}
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
            <Route
              path={Paths.Profile}
              element={<div>Profile - Coming Soon</div>}
            />
            <Route
              path={Paths.Notifications}
              element={<div>Notifications - Coming Soon</div>}
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PortalLayout;
