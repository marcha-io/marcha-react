import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  EntryPointComponent,
  PreloadedQuery,
  usePreloadedQuery,
} from 'react-relay';

import { CommunitiesContainerWrapperQuery } from './__generated__/CommunitiesContainerWrapperQuery.graphql';

export const communitiesContainerWrapperQuery = graphql`
  query CommunitiesContainerWrapperQuery {
    communitiesCollection {
      edges {
        node {
          name
          description
          image
          id
          nodeId
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

  console.log(data);

  return <></>;
};

export default CommunitiesContainerWrapper;
