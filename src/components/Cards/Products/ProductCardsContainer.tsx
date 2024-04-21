import { Col, Row } from 'antd';
import React from 'react';

import ProductCard from './ProductCard';
import type { ProductsContainerWrapperQuery$data } from './__generated__/ProductsContainerWrapperQuery.graphql';

type Props = {
  data: ProductsContainerWrapperQuery$data;
};

const ProductCardsContainer = ({ data }: Props): React.ReactElement => {
  const edges = data.productsCollection?.edges;
  return (
    <Row>
      {edges?.map((fragment, key) => (
        <Col span={5} key={key}>
          <ProductCard fragmentRef={fragment.node} hoverable={true} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductCardsContainer;
