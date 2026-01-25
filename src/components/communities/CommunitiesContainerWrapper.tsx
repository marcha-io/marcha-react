import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  EntryPointComponent,
  PreloadedQuery,
  usePreloadedQuery,
} from 'react-relay';

import CommunitiesContainer from './CommunitiesContainer';
import { CommunitiesContainerWrapperQuery } from './__generated__/CommunitiesContainerWrapperQuery.graphql';

export const communitiesContainerWrapperQuery = graphql`
  query CommunitiesContainerWrapperQuery {
    communitiesCollection {
      edges {
        node {
          ...CommunitiesCardFragmentQuery
        }
      }
    }
  }
`;

type Props = {
  queries: {
    communitiesContainerWrapperQuery: PreloadedQuery<CommunitiesContainerWrapperQuery>;
  };
};

const CommunitiesContainerWrapper: EntryPointComponent<
  {
    communitiesContainerWrapperQuery: CommunitiesContainerWrapperQuery;
  },
  Record<string, never>,
  Record<string, never>
> = (props: Props): React.ReactElement => {
  const data = usePreloadedQuery<CommunitiesContainerWrapperQuery>(
    communitiesContainerWrapperQuery,
    props.queries.communitiesContainerWrapperQuery
  );

  return <CommunitiesContainer queryData={data} />;
};

export default CommunitiesContainerWrapper;
