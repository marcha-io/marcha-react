import { Flex, Spin, Typography } from 'antd';
import React, { useCallback } from 'react';
import { usePaginationFragment } from 'react-relay';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { NEUTRAL_500 } from '../../design';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Paths } from '../../views/paths';
import { marketplacePaginationFragment } from './MarketplacePaginationFragment';
import MarketplaceProductGrid from './MarketplaceProductGrid';
import type { MarketplacePaginationFragment$key } from './__generated__/MarketplacePaginationFragment.graphql';
import type { MarketplacePaginationQuery } from './__generated__/MarketplacePaginationQuery.graphql';
import { PAGE_SIZE } from './constants';

type Props = {
  fragmentRef: MarketplacePaginationFragment$key;
};

/**
 * Marketplace browse container.
 *
 * All filtering (search, category, condition) is performed server-side by
 * Supabase via the `ProductsFilter` variables passed to the Relay query.
 * The Market entrypoint reads filter values from the URL and passes them as
 * query variables — this component simply renders the pre-filtered results.
 *
 */
const MarketplaceContainer: React.FC<Props> = ({ fragmentRef }: Props) => {
  const navigate = useNavigate();

  const { communityId } = useParams<{ communityId: string }>();
  const [, setSearchParams] = useSearchParams();

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    MarketplacePaginationQuery,
    MarketplacePaginationFragment$key
  >(marketplacePaginationFragment, fragmentRef);

  const basePath = `/portal/${communityId}`;

  const edges = data.productsCollection?.edges ?? [];

  const handleLoadNext = useCallback(() => {
    if (!hasNext || isLoadingNext) return;

    loadNext(PAGE_SIZE, {
      onComplete: () => {
        const endCursor = data.productsCollection?.pageInfo?.endCursor;
        if (endCursor) {
          setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set('cursor', endCursor);
            return next;
          });
        }
      },
    });
  }, [
    hasNext,
    isLoadingNext,
    loadNext,
    data.productsCollection,
    setSearchParams,
  ]);

  const navigateToNewListing = useCallback(
    () => navigate(`${basePath}/${Paths.Market}/new`),
    [navigate, basePath]
  );

  const sentinelRef = useInfiniteScroll(
    handleLoadNext,
    hasNext && !isLoadingNext
  );

  return (
    <>
      <MarketplaceProductGrid
        edges={edges}
        onCreateListing={navigateToNewListing}
      />

      {hasNext && !isLoadingNext && (
        <div ref={sentinelRef} style={{ height: 1 }} />
      )}
      {isLoadingNext && (
        <Flex justify="center" align="center" style={{ marginTop: 24 }}>
          <Spin size="small" />
          <Typography.Text style={{ marginLeft: 8, color: NEUTRAL_500 }}>
            Loading more listings&hellip;
          </Typography.Text>
        </Flex>
      )}
    </>
  );
};

export default MarketplaceContainer;
