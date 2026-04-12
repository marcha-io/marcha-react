import graphql from 'babel-plugin-relay/macro';

export default graphql`
  mutation InsertProductImagesMutationMutation(
    $objects: [ProductImagesInsertInput!]!
  ) {
    insertIntoProductImagesCollection(objects: $objects) {
      affectedCount
      records {
        id
        productId
        imageUrl
        displayOrder
      }
    }
  }
`;
