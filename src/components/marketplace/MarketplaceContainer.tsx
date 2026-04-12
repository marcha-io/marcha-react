import { Flex, Spin, Typography } from 'antd';
import React, { useCallback } from 'react';
import { usePaginationFragment } from 'react-relay';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { NEUTRAL_500 } from '../../design';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Paths } from '../../views/paths';
import MarketplaceFilters from './MarketplaceFilters';
import MarketplaceHero from './MarketplaceHero';
import { marketplacePaginationFragment } from './MarketplacePaginationFragment';
import MarketplaceProductGrid from './MarketplaceProductGrid';
import type { MarketplacePaginationFragment$key } from './__generated__/MarketplacePaginationFragment.graphql';
import type { MarketplacePaginationQuery } from './__generated__/MarketplacePaginationQuery.graphql';
import { PAGE_SIZE } from './constants';

type Category = {
  id: string;
  name: string;
};

type Props = {
  fragmentRef: MarketplacePaginationFragment$key;
  categories: Category[];
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
const MarketplaceContainer: React.FC<Props> = ({ fragmentRef, categories }) => {
  const { communityId } = useParams<{ communityId: string }>();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const basePath = `/portal/${communityId}`;

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    MarketplacePaginationQuery,
    MarketplacePaginationFragment$key
  >(marketplacePaginationFragment, fragmentRef);

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

  const sentinelRef = useInfiniteScroll(
    handleLoadNext,
    hasNext && !isLoadingNext
  );

  const navigateToNewListing = useCallback(
    () => navigate(`${basePath}/${Paths.Market}/new`),
    [navigate, basePath]
  );

  const navigateToMyListings = useCallback(
    () => navigate(`${basePath}/${Paths.Market}/my-listings`),
    [navigate, basePath]
  );

  return (
    <Flex vertical>
      <MarketplaceHero
        onPostListing={navigateToNewListing}
        onMyListings={navigateToMyListings}
      />
      <MarketplaceFilters categories={categories} />
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
    </Flex>
  );
};

export default MarketplaceContainer;
