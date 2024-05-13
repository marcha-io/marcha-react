import { Layout, theme } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignUpPage from '../src/views/home/SignUp';
import Navbar from './components/navbar/Navbar';
import environment from './relay/relay_environment';
import Communities from './views/communities/Communities';
import Feed from './views/feed/Feed';
import environment from './lib/relay_environment';
import Home from './views/home/Home';

const App = (): React.ReactElement => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <RelayEnvironmentProvider environment={environment}>
      <BrowserRouter>
        <Layout style={{ minHeight: '900px' }}>
          <Navbar />
          <Content style={{ padding: '0 48px', margin: '16px 0' }}>
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: 24,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route index element={<Home />} />
                <Route path="/sign_up" element={<SignUpPage />} />
                <Route path="/communities" element={<Communities />} />
                <Route path="/feed" element={<Feed />} />
              </Routes>
            </div>
          </Content>
          <Footer>
            <Title level={1}> Footer </Title>
          </Footer>
        </Layout>
      </BrowserRouter>
    </RelayEnvironmentProvider>
  );
};

export default App;
