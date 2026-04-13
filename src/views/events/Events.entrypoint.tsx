import { Flex, Spin } from 'antd';
import React, { Suspense, useEffect, useMemo } from 'react';
import {
  EntryPointContainer,
  useEntryPointLoader,
  useRelayEnvironment,
} from 'react-relay';
import { useParams } from 'react-router-dom';

import EventsPageWrapperQuery from '../../components/events/__generated__/EventsPageWrapperQuery.graphql';
import { createEntryPoint } from '../../utils/create_entrypoint';
import JSResource from '../../utils/make_resource';

type EntryPointParams = {
  communityId?: string;
};

const EventsEntryPoint = createEntryPoint({
  root: JSResource('EventsPageWrapper', () =>
    import('../../components/events/EventsPageWrapper').then(
      (module) => module.default
    )
  ),
  getPreloadProps(params: EntryPointParams) {
    return {
      queries: {
        eventsQuery: {
          parameters: EventsPageWrapperQuery,
          variables: {
            communityId: { eq: params.communityId ?? '' },
            upcomingFilter: { gte: new Date().toISOString() },
          },
        },
      },
    } as const;
  },
});

const Events = (): React.ReactElement | null => {
  const { communityId } = useParams<{ communityId: string }>();
  const relayEnvironment = useRelayEnvironment();
  const environmentProvider = useMemo(
    () => ({ getEnvironment: () => relayEnvironment }),
    [relayEnvironment]
  );

  const [entryPointRef, loadEntryPoint] = useEntryPointLoader(
    environmentProvider,
    EventsEntryPoint
  );

  useEffect(() => {
    loadEntryPoint({ communityId });
  }, [communityId]);

  if (!entryPointRef) return null;

  return (
    <Suspense
      fallback={
        <Flex justify="center" align="center" style={{ height: '40vh' }}>
          <Spin tip="Loading Events..." size="large" />
        </Flex>
      }
    >
      <EntryPointContainer entryPointReference={entryPointRef} props={{}} />
    </Suspense>
  );
};

export default Events;
