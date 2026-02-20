// src/components/dashboard/DashboardQuery.graphql.ts
import graphql from 'babel-plugin-relay/macro';

export default graphql`
  query DashboardQueryQuery($communityId: BigIntFilter!, $userId: UUIDFilter!) {
    profilesCollection(filter: { id: $userId }, first: 1) {
      edges {
        node {
          firstName
          lastName
          avatarUrl
        }
      }
    }
    communityUsersCollection(
      filter: {
        communityId: $communityId
        userId: $userId
        status: { eq: ACCEPTED }
      }
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
