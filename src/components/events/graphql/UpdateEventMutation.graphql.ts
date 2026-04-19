import graphql from 'babel-plugin-relay/macro';

export default graphql`
  mutation UpdateEventMutation(
    $set: EventsUpdateInput!
    $filter: EventsFilter!
    $atMost: Int!
  ) {
    updateEventsCollection(set: $set, filter: $filter, atMost: $atMost) {
      affectedCount
      records {
        id
        title
        description
        eventDate
        location
        imageUrl
        maxAttendees
        pinned
        nodeId
      }
    }
  }
`;
