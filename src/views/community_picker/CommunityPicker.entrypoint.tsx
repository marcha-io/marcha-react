// src/views/community_picker/CommunityPicker.entrypoint.tsx
import { Flex, Spin } from 'antd';
import React, { Suspense, useEffect, useMemo } from 'react';
import {
  EntryPointContainer,
  useEntryPointLoader,
  useRelayEnvironment,
} from 'react-relay';

import CommunityPickerComponentQuery from '../../components/community_picker/__generated__/CommunityPickerComponentQuery.graphql';
import { createEntryPoint } from '../../utils/create_entrypoint';
import JSResource from '../../utils/make_resource';

const CommunityPickerEntryPoint = createEntryPoint({
  root: JSResource('CommunityPicker', () =>
    import('../../components/community_picker/CommunityPicker').then(
      (module) => module.default
    )
  ),
  getPreloadProps() {
    return {
      queries: {
        communityPickerQuery: {
          parameters: CommunityPickerComponentQuery,
          variables: {},
        },
      },
    } as const;
  },
});

const CommunityPicker = (): React.ReactElement | null => {
  const relayEnvironment = useRelayEnvironment();
  const environmentProvider = useMemo(
    () => ({ getEnvironment: () => relayEnvironment }),
    [relayEnvironment]
  );
  const [entryPointRef, loadEntryPoint] = useEntryPointLoader(
    environmentProvider,
    CommunityPickerEntryPoint
  );

  useEffect(() => {
    if (entryPointRef == null) {
      loadEntryPoint({});
    }
  }, []);

  if (!entryPointRef) return null;

  return (
    <Suspense
      fallback={
        <Flex justify="center" align="center" style={{ height: '100vh' }}>
          <Spin tip="Loading Communities..." size="large" />
        </Flex>
      }
    >
      <EntryPointContainer entryPointReference={entryPointRef} props={{}} />
    </Suspense>
  );
};

export default CommunityPicker;
