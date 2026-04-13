import graphql from 'babel-plugin-relay/macro';

const InsertEventMutation = graphql`
  mutation InsertEventMutation($objects: [EventsInsertInput!]!) {
    insertIntoEventsCollection(objects: $objects) {
      affectedCount
      records {
        id
        title
        eventDate
        nodeId
      }
    }
  }
`;

export default InsertEventMutation;
