import graphql from 'babel-plugin-relay/macro';

export default graphql`
  mutation InsertProductCommunityMutationMutation(
    $objects: [ProductsCommunitiesInsertInput!]!
  ) {
    insertIntoProductsCommunitiesCollection(objects: $objects) {
      affectedCount
      records {
        id
        productId
        communityId
      }
    }
  }
`;
