import graphql from 'babel-plugin-relay/macro';

const InsertNoticeMutation = graphql`
  mutation InsertNoticeMutation($objects: [NoticesInsertInput!]!) {
    insertIntoNoticesCollection(objects: $objects) {
      affectedCount
      records {
        id
        title
        pinned
        nodeId
      }
    }
  }
`;

export default InsertNoticeMutation;
