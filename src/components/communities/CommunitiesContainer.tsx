import { Card, Empty, Flex } from 'antd';
import { Suspense } from 'react';

import CommunitiesCard from './CommunitiesCard';
import { CommunitiesContainerWrapperQuery$data } from './__generated__/CommunitiesContainerWrapperQuery.graphql';

type Props = { queryData: CommunitiesContainerWrapperQuery$data };

const CommunitiesContainer = ({ queryData }: Props) => {
  const edges = queryData.communitiesCollection?.edges;

  return (
    <Flex gap={12} wrap="wrap" justify="center">
      {edges?.length ? (
        edges.map((fragment, i) => (
          <Suspense key={i} fallback={<Card loading={true} />}>
            <CommunitiesCard fragmentRef={fragment.node} />
          </Suspense>
        ))
      ) : (
        <Empty description="No Communities in Feed" />
      )}
    </Flex>
  );
};

export default CommunitiesContainer;
