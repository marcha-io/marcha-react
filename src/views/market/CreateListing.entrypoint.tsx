import { Flex, Spin } from 'antd';
import React, { Suspense, useEffect, useMemo } from 'react';
import {
  EntryPointContainer,
  useEntryPointLoader,
  useRelayEnvironment,
} from 'react-relay';

import CreateListingPageQuery from '../../components/marketplace/createListing/__generated__/CreateListingPageQuery.graphql';
import { createEntryPoint } from '../../utils/create_entrypoint';
import JSResource from '../../utils/make_resource';

const CreateListingEntryPoint = createEntryPoint({
  root: JSResource('CreateListingPage', () =>
    import('../../components/marketplace/createListing/CreateListingPage').then(
      (module) => module.default
    )
  ),
  getPreloadProps() {
    return {
      queries: {
        categoriesQuery: {
          parameters: CreateListingPageQuery,
          variables: {},
        },
      },
    } as const;
  },
});

const CreateListing = (): React.ReactElement | null => {
  const relayEnvironment = useRelayEnvironment();

  const environmentProvider = useMemo(
    () => ({ getEnvironment: () => relayEnvironment }),
    [relayEnvironment]
  );

  const [entryPointRef, loadEntryPoint] = useEntryPointLoader(
    environmentProvider,
    CreateListingEntryPoint
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
        <Flex justify="center" align="center" style={{ height: '40vh' }}>
          <Spin tip="Loading..." size="large" />
        </Flex>
      }
    >
      <EntryPointContainer entryPointReference={entryPointRef} props={{}} />
    </Suspense>
  );
};

export default CreateListing;
