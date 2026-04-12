import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  EntryPointComponent,
  PreloadedQuery,
  usePreloadedQuery,
} from 'react-relay';

import MarketplaceContainer from './MarketplaceContainer';
import type { MarketplaceWrapperQueryQuery } from './__generated__/MarketplaceWrapperQueryQuery.graphql';

export const marketplaceWrapperQuery = graphql`
  query MarketplaceWrapperQueryQuery(
    $count: Int
    $cursor: Cursor
    $filter: ProductsFilter
    $orderBy: [ProductsOrderBy!]
  ) {
    ...MarketplacePaginationFragment
      @arguments(
        count: $count
        cursor: $cursor
        filter: $filter
        orderBy: $orderBy
      )
  }
`;

type Props = {
  queries: {
    marketplaceQuery: PreloadedQuery<MarketplaceWrapperQueryQuery>;
  };
};

const MarketplaceWrapper: EntryPointComponent<
  {
    marketplaceQuery: MarketplaceWrapperQueryQuery;
  },
  Record<string, never>,
  Record<string, never>
> = (props: Props): React.ReactElement => {
  const data = usePreloadedQuery<MarketplaceWrapperQueryQuery>(
    marketplaceWrapperQuery,
    props.queries.marketplaceQuery
  );

  return <MarketplaceContainer fragmentRef={data} />;
};

export default MarketplaceWrapper;
