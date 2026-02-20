// src/views/dashboard/Dashboard.entrypoint.tsx
import { Flex, Spin } from 'antd';
import React, { Suspense, useEffect, useMemo } from 'react';
import {
  EntryPointContainer,
  useEntryPointLoader,
  useRelayEnvironment,
} from 'react-relay';
import { useParams } from 'react-router-dom';

import DashboardComponentQuery from '../../components/dashboard/__generated__/DashboardComponentQuery.graphql';
import { createEntryPoint } from '../../utils/create_entrypoint';
import JSResource from '../../utils/make_resource';

type EntryPointParams = {
  communityId?: string;
};

const DashboardEntryPoint = createEntryPoint({
  root: JSResource('Dashboard', () =>
    import('../../components/dashboard/Dashboard').then(
      (module) => module.default
    )
  ),
  getPreloadProps(params: EntryPointParams) {
    return {
      queries: {
        dashboardQuery: {
          parameters: DashboardComponentQuery,
          variables: {
            communityId: { eq: params.communityId ?? '' },
          },
        },
      },
    } as const;
  },
});

const Dashboard = (): React.ReactElement | null => {
  const { communityId } = useParams<{ communityId: string }>();
  const relayEnvironment = useRelayEnvironment();
  const environmentProvider = useMemo(
    () => ({ getEnvironment: () => relayEnvironment }),
    [relayEnvironment]
  );
  const [entryPointRef, loadEntryPoint] = useEntryPointLoader(
    environmentProvider,
    DashboardEntryPoint
  );

  useEffect(() => {
    if (entryPointRef == null) {
      loadEntryPoint({ communityId });
    }
  }, [communityId]);

  if (!entryPointRef) return null;

  return (
    <Suspense
      fallback={
        <Flex justify="center" align="center" style={{ height: '60vh' }}>
          <Spin tip="Loading Dashboard..." size="large" />
        </Flex>
      }
    >
      <EntryPointContainer entryPointReference={entryPointRef} props={{}} />
    </Suspense>
  );
};

export default Dashboard;
