import { Flex, Spin } from 'antd';
import React, { Suspense, useEffect, useMemo } from 'react';
import {
  EntryPointContainer,
  useEntryPointLoader,
  useRelayEnvironment,
} from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';

import ProductDetailPageQuery from '../../components/Cards/Products/__generated__/ProductDetailPageQuery.graphql';
import { createEntryPoint } from '../../utils/create_entrypoint';
import JSResource from '../../utils/make_resource';

type Params = {
  product_id: string;
};

const ProductEntryPoint = createEntryPoint({
  root: JSResource('ProductDetailPage', () =>
    import('../../components/Cards/Products/ProductDetailPage').then(
      (module) => {
        return module.default;
      }
    )
  ),
  getPreloadProps(params: Params) {
    return {
      queries: {
        productDetailPageQuery: {
          parameters: ProductDetailPageQuery,
          variables: { id: params.product_id },
        },
      },
    } as const;
  },
});

const ProductDetailPage = (): React.ReactElement | null => {
  const relayEnvironment = useRelayEnvironment();
  const navigation = useNavigate();

  const environmentProvider = useMemo(
    () => ({ getEnvironment: () => relayEnvironment }),
    [relayEnvironment]
  );

  const [entryPointRef, loadEntryPoint] = useEntryPointLoader(
    environmentProvider,
    ProductEntryPoint
  );

  const { product_id } = useParams();
  if (product_id == null) {
    navigation('/feed');
    return <></>;
  }

  useEffect(() => {
    if (entryPointRef == null) {
      loadEntryPoint({ product_id });
    }
  }, [product_id]);

  if (!entryPointRef) return null;

  return (
    <Suspense
      fallback={
        <Flex gap={12} wrap="wrap" justify="center">
          <Spin tip="Loading Products..." size="large" />{' '}
        </Flex>
      }
    >
      <EntryPointContainer entryPointReference={entryPointRef} props={{}} />
    </Suspense>
  );
};

export default ProductDetailPage;
