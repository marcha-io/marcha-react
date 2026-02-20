// src/components/dashboard/DashboardQuery.graphql.ts
import graphql from 'babel-plugin-relay/macro';

export default graphql`
  query DashboardQueryQuery($communityId: BigIntFilter!) {
    profilesCollection(first: 1) {
      edges {
        node {
          firstName
          lastName
          avatarUrl
        }
      }
    }
    communityUsersCollection(
      filter: { communityId: $communityId, status: { eq: ACCEPTED } }
      first: 1
    ) {
      edges {
        node {
          communityId
          community {
            id
            name
            description
            address
            image
          }
        }
      }
    }
  }
`;
