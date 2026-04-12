import graphql from 'babel-plugin-relay/macro';

/**
 * Query for the current user's own listings.
 * Fetches all products (public and unlisted) owned by the given userId.
 */
export default graphql`
  query MyListingsQueryQuery($userId: UUIDFilter!) {
    productsCollection(
      filter: { userId: $userId }
      orderBy: [{ createdAt: DescNullsLast }]
    ) {
      edges {
        node {
          id
          name
          description
          price
          condition
          categoryId
          createdAt
          productImagesCollection(
            first: 1
            orderBy: [{ displayOrder: AscNullsLast }]
          ) {
            edges {
              node {
                imageUrl
              }
            }
          }
        }
      }
    }
  }
`;
