// src/views/profile/Profile.entrypoint.tsx
import { Flex, Spin } from 'antd';
import React, { Suspense, useEffect, useMemo } from 'react';
import {
  EntryPointContainer,
  useEntryPointLoader,
  useRelayEnvironment,
} from 'react-relay';

import ProfilePageQuery from '../../components/profile/__generated__/ProfilePageQuery.graphql';
import { useAuth } from '../../contexts/AuthContext';
import { createEntryPoint } from '../../utils/create_entrypoint';
import JSResource from '../../utils/make_resource';

type EntryPointParams = {
  userId?: string;
};

const ProfileEntryPoint = createEntryPoint({
  root: JSResource('ProfilePage', () =>
    import('../../components/profile/ProfilePage').then(
      (module) => module.default
    )
  ),
  getPreloadProps(params: EntryPointParams) {
    return {
      queries: {
        profileQuery: {
          parameters: ProfilePageQuery,
          variables: {
            userId: { eq: params.userId ?? '' },
          },
        },
      },
    } as const;
  },
});

const Profile = (): React.ReactElement | null => {
  const { userId } = useAuth();
  const relayEnvironment = useRelayEnvironment();

  const environmentProvider = useMemo(
    () => ({ getEnvironment: () => relayEnvironment }),
    [relayEnvironment]
  );

  const [entryPointRef, loadEntryPoint] = useEntryPointLoader(
    environmentProvider,
    ProfileEntryPoint
  );

  useEffect(() => {
    if (userId && entryPointRef == null) {
      loadEntryPoint({ userId });
    }
  }, [userId]);

  if (!entryPointRef) return null;

  return (
    <Suspense
      fallback={
        <Flex justify="center" align="center" style={{ height: '60vh' }}>
          <Spin tip="Loading Profile..." size="large" />
        </Flex>
      }
    >
      <EntryPointContainer entryPointReference={entryPointRef} props={{}} />
    </Suspense>
  );
};

export default Profile;
