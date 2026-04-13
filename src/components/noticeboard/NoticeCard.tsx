import { PushpinOutlined } from '@ant-design/icons';
import { Card, Space, Tag, Typography } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay';

import {
  BRAND_PRIMARY,
  NEUTRAL_500,
  NEUTRAL_700,
  RADIUS_LG,
} from '../../design';
import type { NoticeCardFragment$key } from './__generated__/NoticeCardFragment.graphql';

export const noticeCardFragment = graphql`
  fragment NoticeCardFragment on Notices {
    id
    title
    body
    pinned
    createdAt
    createdBy
  }
`;

type Props = {
  fragmentRef: NoticeCardFragment$key;
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const NoticeCard: React.FC<Props> = ({ fragmentRef }) => {
  const notice = useFragment(noticeCardFragment, fragmentRef);

  return (
    <Card
      style={{
        borderRadius: RADIUS_LG,
        borderLeft: notice.pinned ? `4px solid ${BRAND_PRIMARY}` : undefined,
      }}
    >
      <Space direction="vertical" size={8} style={{ width: '100%' }}>
        <Space size={8} align="center">
          {notice.pinned && (
            <Tag
              icon={<PushpinOutlined />}
              color="orange"
              style={{ marginRight: 0 }}
            >
              Pinned
            </Tag>
          )}
          <Typography.Text style={{ fontSize: 12, color: NEUTRAL_500 }}>
            {formatDate(notice.createdAt)}
          </Typography.Text>
        </Space>
        <Typography.Title level={5} style={{ margin: 0, color: NEUTRAL_700 }}>
          {notice.title}
        </Typography.Title>
        <Typography.Paragraph
          style={{
            color: NEUTRAL_700,
            marginBottom: 0,
            whiteSpace: 'pre-wrap',
          }}
          ellipsis={{ rows: 4, expandable: true, symbol: 'Read more' }}
        >
          {notice.body}
        </Typography.Paragraph>
      </Space>
    </Card>
  );
};

export default NoticeCard;
