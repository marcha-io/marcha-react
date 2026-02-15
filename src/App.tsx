import { Layout, theme } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, { createContext, useState } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import environment from './lib/relay_environment';
import CommunitiesFeed from './views/communities/CommunitiesFeed.entrypoint';
import CommunitiesProductsFeed from './views/communities/CommunitiesProductsFeed.entrypoint';
import Market from './views/market/Market.entrypoint';
import Product from './views/market/Product.entrypoint';
import { Paths } from './views/paths';
import SignIn from './views/sign_up/SignIn';

type TCommunityContext = {
  communitySelected: string | null;
  setCommunitySelected: React.Dispatch<React.SetStateAction<string | null>>;
};

export const CommunityContext = createContext<TCommunityContext | null>(null);

const App = (): React.ReactElement => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [communitySelected, setCommunitySelected] = useState<null | string>(
    null
  );

  return (
    <RelayEnvironmentProvider environment={environment}>
      <BrowserRouter>
        <CommunityContext.Provider
          value={{
            communitySelected: communitySelected,
            setCommunitySelected: setCommunitySelected,
          }}
        >
          <Layout style={{ minHeight: '100vh' }}>
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
                  <Route>
                    <Route index element={<CommunitiesFeed />} />
                    <Route path=":community_id">
                      <Route index element={<CommunitiesProductsFeed />} />
                      <Route path={Paths.Market}>
                        <Route index element={<Market />} />
                        <Route path=":product_id" element={<Product />} />
                      </Route>
                    </Route>
                  </Route>

                  <Route path={Paths.SignIn} element={<SignIn />} />
                </Routes>
              </div>
            </Content>
            <Footer>
              <Title level={1}> Footer </Title>
            </Footer>
          </Layout>
        </CommunityContext.Provider>
      </BrowserRouter>
    </RelayEnvironmentProvider>
  );
};

export default App;
