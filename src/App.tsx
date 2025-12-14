import { Layout, theme } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import environment from './lib/relay_environment';
import Communities from './views/communities/Communities';
import Feed from './views/feed/Feed.entrypoint';
import Product from './views/feed/Product.entrypoint';
import Home from './views/home/Home';
import SignIn from './views/sign_up/SignIn';

const App = (): React.ReactElement => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <Navbar
            isUserLoggedIn={isUserLoggedIn}
            setIsUserLoggedIn={setIsUserLoggedIn}
          />
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
                <Route path="/communities" element={<Communities />} />
                <Route path="/feed">
                  <Route index element={<Feed />} />
                  <Route path=":product_id" element={<Product />} />
                </Route>
                <Route
                  path="/sign_in"
                  element={<SignIn setIsUserLoggedIn={setIsUserLoggedIn} />}
                />
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
