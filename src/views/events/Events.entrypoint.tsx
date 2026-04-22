import { Flex, Spin } from 'antd';
import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import {
  EntryPointContainer,
  useEntryPointLoader,
  useRelayEnvironment,
} from 'react-relay';
import { useParams, useSearchParams } from 'react-router-dom';

import EventsPageWrapperQuery from '../../components/events/__generated__/EventsPageWrapperQuery.graphql';
import type { EventsFilter } from '../../components/events/__generated__/EventsPageWrapperQuery.graphql';
import { createEntryPoint } from '../../utils/create_entrypoint';
import JSResource from '../../utils/make_resource';

type EntryPointParams = {
  communityId?: string;
  q?: string;
};

const EventsEntryPoint = createEntryPoint({
  root: JSResource('EventsPageWrapper', () =>
    import('../../components/events/EventsPageWrapper').then(
      (module) => module.default
    )
  ),
  getPreloadProps(params: EntryPointParams) {
    const filter: EventsFilter = {
      communityId: { eq: params.communityId ?? '' },
    };

    if (params.q) {
      filter.title = { ilike: `%${params.q}%` };
    }

    return {
      queries: {
        eventsQuery: {
          parameters: EventsPageWrapperQuery,
          variables: {
            filter,
            orderBy: [{ eventDate: 'AscNullsLast' }],
            first: 50,
          },
        },
      },
    } as const;
  },
});

const Events = (): React.ReactElement | null => {
  const relayEnvironment = useRelayEnvironment();
  const { communityId } = useParams<{ communityId: string }>();
  const [searchParams] = useSearchParams();

  const environmentProvider = useMemo(
    () => ({ getEnvironment: () => relayEnvironment }),
    [relayEnvironment]
  );

  const [entryPointRef, loadEntryPoint] = useEntryPointLoader(
    environmentProvider,
    EventsEntryPoint
  );

  const q = searchParams.get('q') ?? undefined;

  const prevFiltersRef = useRef<string | null>(null);

  useEffect(() => {
    const currentFilters = JSON.stringify({ communityId, q });

    if (entryPointRef == null || prevFiltersRef.current !== currentFilters) {
      prevFiltersRef.current = currentFilters;
      loadEntryPoint({ communityId, q });
    }
  }, [communityId, q]);

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
