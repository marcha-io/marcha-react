import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  EntryPointComponent,
  PreloadedQuery,
  usePreloadedQuery,
} from 'react-relay';

import CommunitiesProductsContainer from './CommunitiesProductsContainer';
import { CommunitiesProductsContainerWrapperQuery } from './__generated__/CommunitiesProductsContainerWrapperQuery.graphql';

export const communitiesProductsContainerWrapperQuery = graphql`
  query CommunitiesProductsContainerWrapperQuery($id: BigInt) {
    productsCommunitiesCollection(filter: { communityId: { eq: $id } }) {
      __typename
      edges {
        node {
          product {
            ...ProductCardFragmentQuery
          }
        }
      }
    }
  }
`;

type Props = {
  queries: {
    communitiesProductsContainerWrapperQuery: PreloadedQuery<CommunitiesProductsContainerWrapperQuery>;
  };
};

const CommunitiesProductsContainerWrapper: EntryPointComponent<
  {
    communitiesProductsContainerWrapperQuery: CommunitiesProductsContainerWrapperQuery;
  },
  Record<string, never>,
  Record<string, never>
> = (props: Props): React.ReactElement => {
  const data = usePreloadedQuery<CommunitiesProductsContainerWrapperQuery>(
    communitiesProductsContainerWrapperQuery,
    props.queries.communitiesProductsContainerWrapperQuery
  );

  return <CommunitiesProductsContainer queryData={data} />;
};

export default CommunitiesProductsContainerWrapper;
