import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  EntryPointComponent,
  PreloadedQuery,
  usePreloadedQuery,
} from 'react-relay';

import EventsPage from './EventsPage';
import type { EventsPageWrapperQuery } from './__generated__/EventsPageWrapperQuery.graphql';

export const eventsPageWrapperQuery = graphql`
  query EventsPageWrapperQuery(
    $communityId: BigIntFilter!
    $upcomingFilter: DatetimeFilter!
  ) {
    eventsCollection(
      filter: { communityId: $communityId, eventDate: $upcomingFilter }
      orderBy: [{ eventDate: AscNullsLast }]
    ) {
      edges {
        node {
          ...EventCardFragment
        }
      }
    }
  }
`;

type Props = {
  queries: {
    eventsQuery: PreloadedQuery<EventsPageWrapperQuery>;
  };
};

const EventsPageWrapper: EntryPointComponent<
  { eventsQuery: EventsPageWrapperQuery },
  Record<string, never>,
  Record<string, never>
> = (props: Props): React.ReactElement => {
  const data = usePreloadedQuery<EventsPageWrapperQuery>(
    eventsPageWrapperQuery,
    props.queries.eventsQuery
  );

  return <EventsPage data={data} />;
};

export default EventsPageWrapper;
