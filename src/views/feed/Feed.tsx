import { Flex, Spin } from 'antd';
import React, { Suspense } from 'react';

import ProductsContainerWrapper from '../../components/Cards/Products/ProductsContainerWrapper';

const Feed = (): React.ReactElement => {
  return (
    <Suspense
      fallback={
        <Flex gap={12} wrap="wrap" justify="center">
          <Spin tip="Loading Products..." size="large" />{' '}
        </Flex>
      }
    >
      <ProductsContainerWrapper />{' '}
    </Suspense>
  );
};

export default Feed;
