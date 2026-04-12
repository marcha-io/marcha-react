import { Flex, Spin } from 'antd';
import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import {
  EntryPointContainer,
  useEntryPointLoader,
  useRelayEnvironment,
} from 'react-relay';
import { useParams, useSearchParams } from 'react-router-dom';

import MarketplaceWrapperQueryQuery, {
  ProductCondition,
} from '../../components/marketplace/__generated__/MarketplaceWrapperQueryQuery.graphql';
import type { ProductsFilter } from '../../components/marketplace/__generated__/MarketplaceWrapperQueryQuery.graphql';
import { PAGE_SIZE } from '../../components/marketplace/constants';
import { createEntryPoint } from '../../utils/create_entrypoint';
import JSResource from '../../utils/make_resource';

type EntryPointParams = {
  communityId?: string;
  q?: string;
  categories?: string;
  conditions?: string;
  cursor?: string;
};

const MarketplaceEntryPoint = createEntryPoint({
  root: JSResource('MarketplaceWrapper', () =>
    import('../../components/marketplace/MarketplaceWrapper').then(
      (module) => module.default
    )
  ),
  getPreloadProps(params: EntryPointParams) {
    let filter: ProductsFilter = {
      isPublic: { eq: true },
    };

    if (params.q) {
      filter = { ...filter, name: { ilike: `%${params.q}%` } };
    }

    if (params.categories) {
      filter = {
        ...filter,
        categoryId: {
          in: params.categories.split(','),
        },
      };
    }

    if (params.conditions) {
      filter = {
        ...filter,
        condition: { in: params.conditions.split(',') as ProductCondition[] },
      };
    }

    return {
      queries: {
        marketplaceQuery: {
          parameters: MarketplaceWrapperQueryQuery,
          variables: {
            count: PAGE_SIZE,
            cursor: params.cursor ?? null,
            filter,
            orderBy: [{ createdAt: 'DescNullsLast' }],
          },
        },
      },
    } as const;
  },
});

const Market = (): React.ReactElement | null => {
  const relayEnvironment = useRelayEnvironment();
  const { communityId } = useParams<{ communityId: string }>();
  const [searchParams] = useSearchParams();

  const environmentProvider = useMemo(
    () => ({ getEnvironment: () => relayEnvironment }),
    [relayEnvironment]
  );

  const [entryPointRef, loadEntryPoint] = useEntryPointLoader(
    environmentProvider,
    MarketplaceEntryPoint
  );

  const q = searchParams.get('q') ?? undefined;
  const categories = searchParams.get('categories') ?? undefined;
  const conditions = searchParams.get('conditions') ?? undefined;
  const cursor = searchParams.get('cursor') ?? undefined;

  const prevFiltersRef = useRef<string | null>(null);

  useEffect(() => {
    const currentFilters = JSON.stringify({
      communityId,
      q,
      categories,
      conditions,
      cursor,
    });

    if (entryPointRef == null || prevFiltersRef.current !== currentFilters) {
      prevFiltersRef.current = currentFilters;
      loadEntryPoint({
        communityId,
        q,
        categories,
        conditions,
        cursor,
      });
    }
  }, [communityId, q, categories, conditions, cursor]);

  if (!entryPointRef) return null;

  return (
    <Suspense
      fallback={
        <Flex justify="center" align="center" style={{ height: '40vh' }}>
          <Spin tip="Loading Marketplace..." size="large" />
        </Flex>
      }
    >
      <EntryPointContainer entryPointReference={entryPointRef} props={{}} />
    </Suspense>
  );
};

export default Market;
