import { PushpinOutlined } from '@ant-design/icons';
import { Card, Flex, Tag, Typography } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay';

import {
  BRAND_PRIMARY,
  NEUTRAL_500,
  NEUTRAL_900,
  RADIUS_LG,
} from '../../design';
import type { NoticeCardFragment$key } from './__generated__/NoticeCardFragment.graphql';

const noticeCardFragment = graphql`
  fragment NoticeCardFragment on Notices {
    id
    title
    body
    pinned
    createdAt
  }
`;

type Props = {
  fragmentRef: NoticeCardFragment$key;
};

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const NoticeCard: React.FC<Props> = ({ fragmentRef }) => {
  const notice = useFragment(noticeCardFragment, fragmentRef);

  return (
    <Card
      style={{
        borderRadius: RADIUS_LG,
        borderLeft: notice.pinned ? `4px solid ${BRAND_PRIMARY}` : undefined,
      }}
    >
      <Flex vertical gap={8}>
        <Flex justify="space-between" align="flex-start">
          <Typography.Title level={5} style={{ margin: 0, color: NEUTRAL_900 }}>
            {notice.pinned && (
              <PushpinOutlined
                style={{ color: BRAND_PRIMARY, marginRight: 8 }}
              />
            )}
            {notice.title}
          </Typography.Title>
          <Flex gap={6}>
            {notice.pinned && <Tag color="orange">Pinned</Tag>}
          </Flex>
        </Flex>

        <Typography.Paragraph
          style={{ margin: 0, fontSize: 14, whiteSpace: 'pre-wrap' }}
          ellipsis={{ rows: 4, expandable: true, symbol: 'Read more' }}
        >
          {notice.body}
        </Typography.Paragraph>

        <Typography.Text style={{ fontSize: 12, color: NEUTRAL_500 }}>
          Posted {formatDate(notice.createdAt)}
        </Typography.Text>
      </Flex>
    </Card>
  );
};

export default NoticeCard;
