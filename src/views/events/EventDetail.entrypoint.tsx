import { Flex, Spin } from 'antd';
import React, { Suspense, useEffect, useMemo } from 'react';
import {
  EntryPointContainer,
  useEntryPointLoader,
  useRelayEnvironment,
} from 'react-relay';
import { useParams } from 'react-router-dom';

import EventDetailPageWrapperQuery from '../../components/events/__generated__/EventDetailPageWrapperQuery.graphql';
import { createEntryPoint } from '../../utils/create_entrypoint';
import JSResource from '../../utils/make_resource';

type EntryPointParams = {
  eventId?: string;
};

const EventDetailEntryPoint = createEntryPoint({
  root: JSResource('EventDetailPageWrapper', () =>
    import('../../components/events/EventDetailPageWrapper').then(
      (module) => module.default
    )
  ),
  getPreloadProps(params: EntryPointParams) {
    return {
      queries: {
        eventDetailQuery: {
          parameters: EventDetailPageWrapperQuery,
          variables: {
            eventId: { eq: params.eventId ?? '' },
          },
        },
      },
    } as const;
  },
});

const EventDetail = (): React.ReactElement | null => {
  const { eventId } = useParams<{ eventId: string }>();
  const relayEnvironment = useRelayEnvironment();
  const environmentProvider = useMemo(
    () => ({ getEnvironment: () => relayEnvironment }),
    [relayEnvironment]
  );

  const [entryPointRef, loadEntryPoint] = useEntryPointLoader(
    environmentProvider,
    EventDetailEntryPoint
  );

  useEffect(() => {
    loadEntryPoint({ eventId });
  }, [eventId]);

  if (!entryPointRef) return null;

  return (
    <Suspense
      fallback={
        <Flex justify="center" align="center" style={{ height: '40vh' }}>
          <Spin tip="Loading Event..." size="large" />
        </Flex>
      }
    >
      <EntryPointContainer entryPointReference={entryPointRef} props={{}} />
    </Suspense>
  );
};

export default EventDetail;
