import { Flex, Spin } from 'antd';
import React, { Suspense, useEffect, useMemo } from 'react';
import {
  EntryPointContainer,
  useEntryPointLoader,
  useRelayEnvironment,
} from 'react-relay';

import MyListingsPageQuery from '../../components/marketplace/myListings/__generated__/MyListingsPageQuery.graphql';
import { useAuth } from '../../contexts/AuthContext';
import { createEntryPoint } from '../../utils/create_entrypoint';
import JSResource from '../../utils/make_resource';

type EntryPointParams = {
  userId?: string;
};

const MyListingsEntryPoint = createEntryPoint({
  root: JSResource('MyListingsPage', () =>
    import('../../components/marketplace/myListings/MyListingsPage').then(
      (module) => module.default
    )
  ),
  getPreloadProps(params: EntryPointParams) {
    return {
      queries: {
        myListingsQuery: {
          parameters: MyListingsPageQuery,
          variables: {
            userId: { eq: params.userId ?? '' },
          },
        },
      },
    } as const;
  },
});

const MyListings = (): React.ReactElement | null => {
  const relayEnvironment = useRelayEnvironment();
  const { userId } = useAuth();

  const environmentProvider = useMemo(
    () => ({ getEnvironment: () => relayEnvironment }),
    [relayEnvironment]
  );

  const [entryPointRef, loadEntryPoint] = useEntryPointLoader(
    environmentProvider,
    MyListingsEntryPoint
  );

  useEffect(() => {
    if (entryPointRef == null && userId) {
      loadEntryPoint({ userId });
    }
  }, [userId]);

  if (!entryPointRef) return null;

  return (
    <Suspense
      fallback={
        <Flex justify="center" align="center" style={{ height: '40vh' }}>
          <Spin tip="Loading your listings..." size="large" />
        </Flex>
      }
    >
      <EntryPointContainer entryPointReference={entryPointRef} props={{}} />
    </Suspense>
  );
};

export default MyListings;
