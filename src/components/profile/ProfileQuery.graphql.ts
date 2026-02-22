// src/components/profile/ProfileQuery.graphql.ts
import graphql from 'babel-plugin-relay/macro';

export default graphql`
  query ProfileQueryQuery($userId: UUIDFilter!) {
    profilesCollection(filter: { id: $userId }, first: 1) {
      edges {
        node {
          id
          nodeId
          firstName
          lastName
          username
          avatarUrl
          description
          onboarded
        }
      }
    }
  }
`;
