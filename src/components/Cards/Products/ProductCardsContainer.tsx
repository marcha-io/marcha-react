import { Card, Row } from 'antd';
import React, { Suspense } from 'react';

import Col from '../../Col';
import ProductCard from './ProductCard';
import type { ProductsContainerWrapperQuery$data } from './__generated__/ProductsContainerWrapperQuery.graphql';

type Props = {
  data: ProductsContainerWrapperQuery$data;
};

const ProductCardsContainer = ({ data }: Props): React.ReactElement => {
  const edges = data.productsCollection?.edges;
  return (
    <Row
      gutter={[
        { xs: 0, sm: 8, md: 24, lg: 32 },
        { xs: 12, sm: 16, md: 24, lg: 32 },
      ]}
      align="middle"
      justify="center"
    >
      {edges?.map((fragment) => (
        <Col>
          <Suspense fallback={<Card loading={true} />}>
            <ProductCard fragmentRef={fragment.node} hoverable={true} />
          </Suspense>
        </Col>
      ))}
    </Row>
  );
};

export default ProductCardsContainer;
