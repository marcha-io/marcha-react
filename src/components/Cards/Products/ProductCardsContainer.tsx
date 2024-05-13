import { Card, Flex } from 'antd';
import React, { Suspense } from 'react';

import ProductCard from './ProductCard';
import type { ProductsContainerWrapperQuery$data } from './__generated__/ProductsContainerWrapperQuery.graphql';

type Props = {
  data: ProductsContainerWrapperQuery$data;
};

const ProductCardsContainer = ({ data }: Props): React.ReactElement => {
  const edges = data.productsCollection?.edges;
  return (
    <Flex gap={12} wrap="wrap" justify="center">
      {edges?.map((fragment) => (
        <Suspense fallback={<Card loading={true} />}>
          <ProductCard fragmentRef={fragment.node} hoverable={true} />
        </Suspense>
      ))}
    </Flex>
  );
};

export default ProductCardsContainer;
