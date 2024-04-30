import graphql from 'babel-plugin-relay/macro';
import React from 'react';
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

  return <ProductCardsContainer data={data} />;
};

export default ProductsContainerWrapper;
