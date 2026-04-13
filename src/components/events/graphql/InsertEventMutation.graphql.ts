import graphql from 'babel-plugin-relay/macro';

export default graphql`
  mutation InsertEventMutation($input: [EventsInsertInput!]!) {
    insertIntoEventsCollection(objects: $input) {
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
