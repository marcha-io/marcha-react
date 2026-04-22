import graphql from 'babel-plugin-relay/macro';

export default graphql`
  mutation UpdateNoticeMutation(
    $set: NoticesUpdateInput!
    $filter: NoticesFilter!
    $atMost: Int!
  ) {
    updateNoticesCollection(set: $set, filter: $filter, atMost: $atMost) {
      affectedCount
      records {
        id
        title
        body
        pinned
        nodeId
      }
    }
  }
`;
