import graphql from 'babel-plugin-relay/macro';

export default graphql`
  mutation InsertProductMutationMutation($objects: [ProductsInsertInput!]!) {
    insertIntoProductsCollection(objects: $objects) {
      affectedCount
      records {
        id
        name
        price
        description
        condition
        categoryId
        userId
      }
    }
  }
`;
