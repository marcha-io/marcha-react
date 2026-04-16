import { Flex, Spin } from 'antd';
import React, { Suspense, useEffect, useMemo } from 'react';
import {
  EntryPointContainer,
  useEntryPointLoader,
  useRelayEnvironment,
} from 'react-relay';

import CommunitiesContainerWrapperQuery from '../../components/communities/__generated__/CommunitiesContainerWrapperQuery.graphql';
import { createEntryPoint } from '../../utils/create_entrypoint';
import JSResource from '../../utils/make_resource';

const CommunitiesFeedEntryPoint = createEntryPoint({
  root: JSResource('CommunitiesContainerWrapper', () =>
    import('../../components/communities/CommunitiesContainerWrapper').then(
      (module) => {
        return module.default;
      }
    )
  ),
  getPreloadProps() {
    return {
      queries: {
        communitiesContainerWrapperQuery: {
          parameters: CommunitiesContainerWrapperQuery,
          variables: {},
        },
      },
    } as const;
  },
});

const CommunitiesFeed = (): React.ReactElement | null => {
  const relayEnvironment = useRelayEnvironment();

  const environmentProvider = useMemo(
    () => ({ getEnvironment: () => relayEnvironment }),
    [relayEnvironment]
  );

  const [entryPointRef, loadEntryPoint] = useEntryPointLoader(
    environmentProvider,
    CommunitiesFeedEntryPoint
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
          <Spin tip="Loading Communities..." size="large" />{' '}
        </Flex>
      }
    >
      <EntryPointContainer entryPointReference={entryPointRef} props={{}} />
    </Suspense>
  );
};

export default CommunitiesFeed;
