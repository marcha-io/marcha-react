import { Flex, Spin } from 'antd';
import React, { Suspense, useEffect, useMemo } from 'react';
import {
  EntryPointContainer,
  useEntryPointLoader,
  useRelayEnvironment,
} from 'react-relay';
import { useParams } from 'react-router-dom';

import NoticeboardPageWrapperQuery from '../../components/noticeboard/__generated__/NoticeboardPageWrapperQuery.graphql';
import { createEntryPoint } from '../../utils/create_entrypoint';
import JSResource from '../../utils/make_resource';

type EntryPointParams = {
  communityId?: string;
};

const NoticeboardEntryPoint = createEntryPoint({
  root: JSResource('NoticeboardPageWrapper', () =>
    import('../../components/noticeboard/NoticeboardPageWrapper').then(
      (module) => module.default
    )
  ),
  getPreloadProps(params: EntryPointParams) {
    return {
      queries: {
        noticeboardQuery: {
          parameters: NoticeboardPageWrapperQuery,
          variables: {
            communityId: { eq: params.communityId ?? '' },
          },
        },
      },
    } as const;
  },
});

const Noticeboard = (): React.ReactElement | null => {
  const { communityId } = useParams<{ communityId: string }>();
  const relayEnvironment = useRelayEnvironment();
  const environmentProvider = useMemo(
    () => ({ getEnvironment: () => relayEnvironment }),
    [relayEnvironment]
  );

  const [entryPointRef, loadEntryPoint] = useEntryPointLoader(
    environmentProvider,
    NoticeboardEntryPoint
  );

  useEffect(() => {
    loadEntryPoint({ communityId });
  }, [communityId]);

  if (!entryPointRef) return null;

  return (
    <Suspense
      fallback={
        <Flex justify="center" align="center" style={{ height: '40vh' }}>
          <Spin tip="Loading Noticeboard..." size="large" />
        </Flex>
      }
    >
      <EntryPointContainer entryPointReference={entryPointRef} props={{}} />
    </Suspense>
  );
};

export default Noticeboard;
