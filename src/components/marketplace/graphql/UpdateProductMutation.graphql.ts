import graphql from 'babel-plugin-relay/macro';

export default graphql`
  mutation UpdateProductMutationMutation(
    $set: ProductsUpdateInput!
    $filter: ProductsFilter!
    $atMost: Int!
  ) {
    updateProductsCollection(set: $set, filter: $filter, atMost: $atMost) {
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
