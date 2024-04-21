import { Layout, Typography, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import React from 'react';

import ProductsContainerWrapper from '../../components/Cards/Products/ProductsContainerWrapper';

const Home = (): React.ReactElement => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100%' }}>
      <Header
        style={{
          backgroundColor: colorBgContainer,
        }}
      >
        <Typography.Title>Introducing Communities</Typography.Title>
      </Header>
      <Content style={{ padding: '0 48px', margin: '16px 0' }}>
        <ProductsContainerWrapper />
      </Content>
    </Layout>
  );
};

export default Home;
