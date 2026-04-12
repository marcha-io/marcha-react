import graphql from 'babel-plugin-relay/macro';

export default graphql`
  mutation DeleteProductMutationMutation(
    $filter: ProductsFilter!
    $atMost: Int!
  ) {
    deleteFromProductsCollection(filter: $filter, atMost: $atMost) {
      affectedCount
    }
  }
`;
