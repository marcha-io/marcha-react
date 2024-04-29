import { Spin } from 'antd';
import React, { Suspense } from 'react';

import ProductsContainerWrapper from '../../components/Cards/Products/ProductsContainerWrapper';

const Feed = (): React.ReactElement => {
  return (
    <Suspense
      fallback={
        <Spin tip="Loading Products..." size="large">
          <></>
        </Spin>
      }
    >
      <ProductsContainerWrapper />{' '}
    </Suspense>
  );
};

export default Feed;
