import graphql from 'babel-plugin-relay/macro';

export default graphql`
  mutation DeleteNoticeMutation($filter: NoticesFilter!, $atMost: Int!) {
    deleteFromNoticesCollection(filter: $filter, atMost: $atMost) {
      affectedCount
    }
  }
`;
