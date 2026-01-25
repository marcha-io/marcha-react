import { Flex, Spin } from 'antd';
import React, { Suspense, useEffect, useMemo } from 'react';
import {
  EntryPointContainer,
  useEntryPointLoader,
  useRelayEnvironment,
} from 'react-relay';

import ProductsContainerWrapperQuery from '../../components/Cards/Products/__generated__/ProductsContainerWrapperQuery.graphql';
import { createEntryPoint } from '../../utils/create_entrypoint';
import JSResource from '../../utils/make_resource';

const FeedEntryPoint = createEntryPoint({
  root: JSResource('ProductCardsContainerWrapper', () =>
    import('../../components/Cards/Products/ProductsContainerWrapper').then(
      (module) => {
        return module.default;
      }
    )
  ),
  getPreloadProps() {
    return {
      queries: {
        productsContainerWrapperQuery: {
          parameters: ProductsContainerWrapperQuery,
          variables: {},
        },
      },
    } as const;
  },
});

const Feed = (): React.ReactElement | null => {
  const relayEnvironment = useRelayEnvironment();

  const environmentProvider = useMemo(
    () => ({ getEnvironment: () => relayEnvironment }),
    [relayEnvironment]
  );

  const [entryPointRef, loadEntryPoint] = useEntryPointLoader(
    environmentProvider,
    FeedEntryPoint
  );

  useEffect(() => {
    if (entryPointRef == null) {
      loadEntryPoint({});
    }
  }, []);

  if (!entryPointRef) return null;

  return (
    <Suspense
      fallback={
        <Flex gap={12} wrap="wrap" justify="center">
          <Spin tip="Loading Products..." size="large" />{' '}
        </Flex>
      }
    >
      <EntryPointContainer entryPointReference={entryPointRef} props={{}} />
    </Suspense>
  );
};

export default Feed;
