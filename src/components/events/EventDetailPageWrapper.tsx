import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  EntryPointComponent,
  PreloadedQuery,
  usePreloadedQuery,
} from 'react-relay';

import EventDetailPage from './EventDetailPage';
import type { EventDetailPageWrapperQuery } from './__generated__/EventDetailPageWrapperQuery.graphql';

export const eventDetailPageWrapperQuery = graphql`
  query EventDetailPageWrapperQuery($eventId: UUIDFilter!) {
    eventsCollection(filter: { id: $eventId }, first: 1) {
      edges {
        node {
          id
          title
          description
          eventDate
          location
          maxAttendees
          createdBy
          createdAt
          eventRsvpsCollection {
            edges {
              node {
                id
                userId
                status
              }
            }
          }
        }
      }
    }
  }
`;

type Props = {
  queries: {
    eventDetailQuery: PreloadedQuery<EventDetailPageWrapperQuery>;
  };
};

const EventDetailPageWrapper: EntryPointComponent<
  { eventDetailQuery: EventDetailPageWrapperQuery },
  Record<string, never>,
  Record<string, never>
> = (props: Props): React.ReactElement => {
  const data = usePreloadedQuery<EventDetailPageWrapperQuery>(
    eventDetailPageWrapperQuery,
    props.queries.eventDetailQuery
  );

  return <EventDetailPage data={data} />;
};

export default EventDetailPageWrapper;
