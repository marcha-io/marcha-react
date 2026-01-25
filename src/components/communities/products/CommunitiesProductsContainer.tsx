import { Card, Empty, Flex } from 'antd';
import { Suspense } from 'react';

import ProductCard from '../../Products/ProductCard';
import { CommunitiesProductsContainerWrapperQuery$data } from './__generated__/CommunitiesProductsContainerWrapperQuery.graphql';

type Props = { queryData: CommunitiesProductsContainerWrapperQuery$data };

const CommunitiesProductsContainer = ({ queryData }: Props) => {
  const edges = queryData.productsCommunitiesCollection?.edges;

  return (
    <Flex gap={12} wrap="wrap" justify="center">
      {edges?.length ? (
        edges.map(
          (communityProductNode, i) =>
            communityProductNode.node.product && (
              <Suspense key={i} fallback={<Card loading={true} />}>
                <ProductCard fragmentRef={communityProductNode.node.product} />
              </Suspense>
            )
        )
      ) : (
        <Empty description="No Communities in Feed" />
      )}
    </Flex>
  );
};

export default CommunitiesProductsContainer;
