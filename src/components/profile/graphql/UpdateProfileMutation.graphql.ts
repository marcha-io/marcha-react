// src/components/profile/UpdateProfileMutation.graphql.ts
import graphql from 'babel-plugin-relay/macro';

export default graphql`
  mutation UpdateProfileMutationMutation(
    $set: ProfilesUpdateInput!
    $filter: ProfilesFilter!
  ) {
    updateProfilesCollection(set: $set, filter: $filter) {
      affectedCount
      records {
        id
        firstName
        lastName
        username
        avatarUrl
        description
        onboarded
      }
    }
  }
`;
