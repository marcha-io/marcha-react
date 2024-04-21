import { Spin } from 'antd';
import { graphql } from 'babel-plugin-relay/macro';
import React, { Suspense } from 'react';
import { useLazyLoadQuery } from 'react-relay';

import ProductCardsContainer from './ProductCardsContainer';
import type { ProductsContainerWrapperQuery } from './__generated__/ProductsContainerWrapperQuery.graphql';

const query = graphql`
  query ProductsContainerWrapperQuery {
    productsCollection {
      edges {
        node {
          ...ProductCardFragmentQuery
        }
      }
    }
  }
`;

const ProductsContainerWrapper = (): React.ReactElement => {
  const data = useLazyLoadQuery<ProductsContainerWrapperQuery>(query, {});

  return (
    <Suspense fallback={<Spin />}>
      <ProductCardsContainer data={data} />
    </Suspense>
  );
};

export default ProductsContainerWrapper;
