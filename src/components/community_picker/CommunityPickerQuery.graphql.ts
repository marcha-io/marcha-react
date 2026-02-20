// src/components/community_picker/CommunityPickerQuery.graphql.ts
import graphql from 'babel-plugin-relay/macro';

export default graphql`
  query CommunityPickerQueryQuery {
    profilesCollection(first: 1) {
      edges {
        node {
          firstName
        }
      }
    }
    communityUsersCollection(filter: { status: { eq: ACCEPTED } }) {
      edges {
        node {
          communityId
          status
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
