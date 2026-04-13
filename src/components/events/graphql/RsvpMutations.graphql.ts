import graphql from 'babel-plugin-relay/macro';

export const InsertRsvpMutation = graphql`
  mutation RsvpMutationsInsertMutation($objects: [EventRsvpsInsertInput!]!) {
    insertIntoEventRsvpsCollection(objects: $objects) {
      affectedCount
      records {
        id
        eventId
        userId
        status
        nodeId
      }
    }
  }
`;

export const DeleteRsvpMutation = graphql`
  mutation RsvpMutationsDeleteMutation(
    $filter: EventRsvpsFilter!
    $atMost: Int!
  ) {
    deleteFromEventRsvpsCollection(filter: $filter, atMost: $atMost) {
      affectedCount
    }
  }
`;
