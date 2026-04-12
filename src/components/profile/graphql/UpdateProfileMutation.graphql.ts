import graphql from 'babel-plugin-relay/macro';

export default graphql`
  mutation UpdateProfileMutationMutation(
    $set: ProfilesUpdateInput!
    $filter: ProfilesFilter!
    $atMost: Int!
  ) {
    updateProfilesCollection(set: $set, filter: $filter, atMost: $atMost) {
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
