import { Flex, Spin } from 'antd';
import React, { Suspense, useEffect, useMemo } from 'react';
import {
  EntryPointContainer,
  useEntryPointLoader,
  useRelayEnvironment,
} from 'react-relay';
import { useNavigate, useNavigation, useParams } from 'react-router-dom';

import CommunitiesProductsContainerWrapperQuery from '../../components/communities/products/__generated__/CommunitiesProductsContainerWrapperQuery.graphql';
import { createEntryPoint } from '../../utils/create_entrypoint';
import JSResource from '../../utils/make_resource';
import { Paths } from '../paths';

type Params = { community_id: string };

const CommunitiesProductsFeedEntryPoint = createEntryPoint({
  root: JSResource('CommunitiesProductsContainerWrapper', () =>
    import(
      '../../components/communities/products/CommunitiesProductsContainerWrapper'
    ).then((module) => {
      return module.default;
    })
  ),
  getPreloadProps(params: Params) {
    return {
      queries: {
        communitiesProductsContainerWrapperQuery: {
          parameters: CommunitiesProductsContainerWrapperQuery,
          variables: { id: params.community_id },
        },
      },
    } as const;
  },
});

const CommunitiesProductsFeed = (): React.ReactElement | null => {
  const relayEnvironment = useRelayEnvironment();
  const navigation = useNavigate();

  const environmentProvider = useMemo(
    () => ({ getEnvironment: () => relayEnvironment }),
    [relayEnvironment]
  );

  const [entryPointRef, loadEntryPoint] = useEntryPointLoader(
    environmentProvider,
    CommunitiesProductsFeedEntryPoint
  );

  const { community_id } = useParams();
  if (community_id == null) {
    navigation(Paths.Communities);
    return <></>;
  }

  useEffect(() => {
    if (entryPointRef == null) {
      loadEntryPoint({ community_id });
    }
  }, []);

  if (!entryPointRef) return null;

  return (
    <Suspense
      fallback={
        <Flex gap={12} wrap="wrap" justify="center">
          <Spin tip="Loading Products in Community..." size="large" />{' '}
        </Flex>
      }
    >
      <EntryPointContainer entryPointReference={entryPointRef} props={{}} />
    </Suspense>
  );
};

export default CommunitiesProductsFeed;
