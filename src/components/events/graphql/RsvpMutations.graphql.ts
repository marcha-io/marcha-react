import graphql from 'babel-plugin-relay/macro';

export const insertRsvpMutation = graphql`
  mutation RsvpMutationsInsertMutation($input: [EventRsvpsInsertInput!]!) {
    insertIntoEventRsvpsCollection(objects: $input) {
      affectedCount
      records {
        id
        status
        nodeId
      }
    }
  }
`;

export const deleteRsvpMutation = graphql`
  mutation RsvpMutationsDeleteMutation(
    $filter: EventRsvpsFilter!
    $atMost: Int!
  ) {
    deleteFromEventRsvpsCollection(filter: $filter, atMost: $atMost) {
      affectedCount
    }
  }
`;
