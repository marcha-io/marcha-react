import { Flex, Spin, message } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import React, { useCallback, useState } from 'react';
import {
  type EntryPointComponent,
  type PreloadedQuery,
  useMutation,
  usePreloadedQuery,
} from 'react-relay';

import { supabase } from '../../lib/supabase';
import AccountInfo from './AccountInfo';
import ProfileForm from './ProfileForm';
import ProfileHeader from './ProfileHeader';
import type { ProfilePageQuery } from './__generated__/ProfilePageQuery.graphql';
import type { UpdateProfileMutationMutation } from './__generated__/UpdateProfileMutationMutation.graphql';
import UpdateProfileMutation from './graphql/UpdateProfileMutation.graphql';

const PROFILE_QUERY = graphql`
  query ProfilePageQuery($userId: UUIDFilter!) {
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

type Props = {
  queries: {
    profileQuery: PreloadedQuery<ProfilePageQuery>;
  };
};

const ProfilePage: EntryPointComponent<
  { profileQuery: ProfilePageQuery },
  Record<string, never>,
  Record<string, never>
> = (props: Props): React.ReactElement => {
  const data = usePreloadedQuery<ProfilePageQuery>(
    PROFILE_QUERY,
    props.queries.profileQuery
  );

  const profile = data.profilesCollection?.edges?.[0]?.node;

  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl ?? '');
  console.log(avatarUrl);

  const [commitMutation, isMutating] =
    useMutation<UpdateProfileMutationMutation>(UpdateProfileMutation);

  const handleAvatarUpload = useCallback(
    async (file: File) => {
      if (!profile?.id) return;

      setUploading(true);

      try {
        const filePath = `${profile.username}/${profile.id}.jpg`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, file, { upsert: true, contentType: 'image/jpg' });

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from('avatars').getPublicUrl(filePath);

        setAvatarUrl(publicUrl);

        commitMutation({
          variables: {
            set: { avatarUrl: publicUrl },
            filter: { id: { eq: profile.id } },
          },
          onCompleted: () => {
            message.success('Avatar updated');
          },
          onError: (err) => {
            message.error(`Failed to update avatar: ${err.message}`);
          },
        });
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';
        message.error(`Upload failed: ${errorMessage}`);
      } finally {
        setUploading(false);
      }
    },
    [profile?.id, commitMutation]
  );

  const handleSave = useCallback(
    (values: {
      firstName: string;
      lastName: string;
      username: string;
      description: string;
    }) => {
      if (!profile?.id) return;
      commitMutation({
        variables: {
          set: {
            firstName: values.firstName || null,
            lastName: values.lastName || null,
            username: values.username || null,
            description: values.description || null,
          },
          filter: { id: { eq: profile.id } },
        },
        onCompleted: () => {
          message.success('Profile updated successfully');
        },
        onError: (err) => {
          message.error(`Failed to update profile: ${err.message}`);
        },
      });
    },
    [profile?.id, commitMutation]
  );

  if (!profile) {
    return (
      <Flex justify="center" align="center" style={{ height: '60vh' }}>
        <Spin tip="Loading profile..." size="large" />
      </Flex>
    );
  }

  const displayName =
    [profile.firstName, profile.lastName].filter(Boolean).join(' ') ||
    profile.username ||
    'Marcha User';

  return (
    <div style={{ margin: '0 auto', padding: '0 16px' }}>
      <ProfileHeader
        displayName={displayName}
        username={profile.username ?? null}
        avatarUrl={avatarUrl}
        uploading={uploading}
        onAvatarUpload={handleAvatarUpload}
      />

      <ProfileForm
        initialValues={{
          firstName: profile.firstName ?? '',
          lastName: profile.lastName ?? '',
          username: profile.username ?? '',
          description: profile.description ?? '',
        }}
        isMutating={isMutating}
        onSave={handleSave}
      />

      <AccountInfo onboarded={profile.onboarded ?? null} />

      <div style={{ height: 32 }} />
    </div>
  );
};

export default ProfilePage;
