import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  EntryPointComponent,
  PreloadedQuery,
  useLazyLoadQuery,
  usePreloadedQuery,
} from 'react-relay';

import ProductCardsContainer from './ProductCardsContainer';
import type { ProductsContainerWrapperQuery } from './__generated__/ProductsContainerWrapperQuery.graphql';

export const productsContainerWrapperQuery = graphql`
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

type Props = {
  queries: {
    productsContainerWrapperQuery: PreloadedQuery<ProductsContainerWrapperQuery>;
  };
};

const ProductsContainerWrapper: EntryPointComponent<
  {
    productsContainerWrapperQuery: ProductsContainerWrapperQuery;
  },
  Record<string, never>,
  Record<string, never>
> = (props: Props): React.ReactElement => {
  const data = usePreloadedQuery<ProductsContainerWrapperQuery>(
    productsContainerWrapperQuery,
    props.queries.productsContainerWrapperQuery
  );

  return <ProductCardsContainer data={data} />;
};

export default ProductsContainerWrapper;
