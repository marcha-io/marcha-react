import graphql from 'babel-plugin-relay/macro';

export default graphql`
  mutation InsertNoticeMutation($input: [NoticesInsertInput!]!) {
    insertIntoNoticesCollection(objects: $input) {
      affectedCount
      records {
        id
        title
        nodeId
      }
    }
  }
`;
