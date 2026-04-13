import { Flex, Spin } from 'antd';
import React, { Suspense, useEffect, useMemo } from 'react';
import {
  EntryPointContainer,
  useEntryPointLoader,
  useRelayEnvironment,
} from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';

import EventDetailPageWrapperQuery from '../../components/events/__generated__/EventDetailPageWrapperQuery.graphql';
import { createEntryPoint } from '../../utils/create_entrypoint';
import JSResource from '../../utils/make_resource';
import { Paths } from '../paths';

type Params = {
  eventId: string;
  userId: string | null;
};

const EventDetailEntryPoint = createEntryPoint({
  root: JSResource('EventDetailPageWrapper', () =>
    import('../../components/events/EventDetailPageWrapper').then(
      (module) => module.default
    )
  ),
  getPreloadProps(params: Params) {
    return {
      queries: {
        eventDetailQuery: {
          parameters: EventDetailPageWrapperQuery,
          variables: {
            eventFilter: { id: { eq: params.eventId } },
            rsvpFilter: {
              eventId: { eq: params.eventId },
              userId: { eq: params.userId ?? '' },
            },
          },
        },
      },
    } as const;
  },
});

const EventDetail = (): React.ReactElement | null => {
  const relayEnvironment = useRelayEnvironment();
  const navigate = useNavigate();
  const { communityId, eventId } = useParams<{
    communityId: string;
    eventId: string;
  }>();

  const environmentProvider = useMemo(
    () => ({ getEnvironment: () => relayEnvironment }),
    [relayEnvironment]
  );

  const [entryPointRef, loadEntryPoint] = useEntryPointLoader(
    environmentProvider,
    EventDetailEntryPoint
  );

  // We need the userId from auth context, but since this is a view component
  // we'll get it from the auth context. For the entrypoint pattern, we pass
  // it as a param.
  const userIdFromStorage =
    typeof window !== 'undefined'
      ? localStorage.getItem('sb-tyrkgslxcedwwvxhtzpn-auth-token')
      : null;
  let userId: string | null = null;
  try {
    if (userIdFromStorage) {
      const parsed = JSON.parse(userIdFromStorage);
      userId = parsed?.user?.id ?? null;
    }
  } catch {
    // ignore
  }

  if (eventId == null) {
    navigate(`/portal/${communityId}/${Paths.Events}`);
    return <></>;
  }

  useEffect(() => {
    if (entryPointRef == null) {
      loadEntryPoint({ eventId, userId });
    }
  }, [eventId, userId]);

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
