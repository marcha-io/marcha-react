import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  EntryPointComponent,
  PreloadedQuery,
  usePreloadedQuery,
} from 'react-relay';

import NoticeboardPage from './NoticeboardPage';
import type { NoticeboardPageWrapperQuery } from './__generated__/NoticeboardPageWrapperQuery.graphql';

export const noticeboardPageWrapperQuery = graphql`
  query NoticeboardPageWrapperQuery(
    $filter: NoticesFilter
    $orderBy: [NoticesOrderBy!]
    $first: Int
  ) {
    noticesCollection(filter: $filter, orderBy: $orderBy, first: $first) {
      edges {
        node {
          id
          ...NoticeCardFragment
        }
      }
    }
  }
`;

type Props = {
  queries: {
    noticeboardQuery: PreloadedQuery<NoticeboardPageWrapperQuery>;
  };
};

const NoticeboardPageWrapper: EntryPointComponent<
  { noticeboardQuery: NoticeboardPageWrapperQuery },
  Record<string, never>,
  Record<string, never>
> = (props: Props): React.ReactElement => {
  const data = usePreloadedQuery<NoticeboardPageWrapperQuery>(
    noticeboardPageWrapperQuery,
    props.queries.noticeboardQuery
  );

  return <NoticeboardPage data={data} />;
};

export default NoticeboardPageWrapper;
