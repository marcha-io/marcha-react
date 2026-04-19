import { NotificationOutlined, PushpinOutlined } from '@ant-design/icons';
import { Avatar, Card, List, Space, Tag, Typography } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay';

import {
  BRAND_PRIMARY,
  NEUTRAL_100,
  NEUTRAL_500,
  NEUTRAL_900,
  RADIUS_LG,
  RADIUS_SM,
} from '../../design';
import type { DashboardNotificationsFragment$key } from './__generated__/DashboardNotificationsFragment.graphql';

export const dashboardNotificationsFragment = graphql`
  fragment DashboardNotificationsFragment on Query
  @argumentDefinitions(communityId: { type: "BigIntFilter" }) {
    pinnedNotices: noticesCollection(
      first: 1
      orderBy: [{ createdAt: DescNullsLast }]
      filter: { communityId: $communityId, pinned: { eq: true } }
    ) {
      edges {
        node {
          id
          title
          body
          pinned
          createdAt
          profiles {
            firstName
            lastName
            avatarUrl
          }
        }
      }
    }
    latestNotices: noticesCollection(
      first: 2
      orderBy: [{ createdAt: DescNullsLast }]
      filter: { communityId: $communityId, pinned: { eq: false } }
    ) {
      edges {
        node {
          id
          title
          body
          pinned
          createdAt
          profiles {
            firstName
            lastName
            avatarUrl
          }
        }
      }
    }
  }
`;

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
  });
};

type NoticeItem = {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly pinned: boolean;
  readonly createdAt: string;
  readonly profiles: {
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly avatarUrl: string | null;
  } | null;
};

type NoticeRowProps = {
  notice: NoticeItem;
  onNavigate: () => void;
};

const NoticeRow: React.FC<NoticeRowProps> = ({ notice, onNavigate }) => {
  const authorName = notice.profiles
    ? `${notice.profiles.firstName ?? ''} ${notice.profiles.lastName ?? ''}`.trim()
    : 'Unknown';

  return (
    <List.Item
      style={{
        padding: '10px 0',
        cursor: 'pointer',
        borderBottom: `1px solid ${NEUTRAL_100}`,
      }}
      onClick={onNavigate}
    >
      <List.Item.Meta
        avatar={
          <Avatar
            src={notice.profiles?.avatarUrl}
            size={36}
            style={{
              backgroundColor: NEUTRAL_100,
              color: BRAND_PRIMARY,
              flexShrink: 0,
            }}
          >
            {authorName.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={
          <Space size={6}>
            <Typography.Text
              strong
              style={{
                fontSize: 13,
                color: NEUTRAL_900,
                lineHeight: '1.3',
              }}
              ellipsis
            >
              {notice.title}
            </Typography.Text>
            {notice.pinned && (
              <Tag
                icon={<PushpinOutlined />}
                color="orange"
                style={{
                  fontSize: 10,
                  padding: '0 4px',
                  lineHeight: '16px',
                  borderRadius: RADIUS_SM,
                  marginLeft: 0,
                }}
              >
                Pinned
              </Tag>
            )}
          </Space>
        }
        description={
          <Space size={4}>
            <Typography.Text
              style={{ fontSize: 12, color: NEUTRAL_500 }}
              ellipsis
            >
              {notice.body.length > 60
                ? `${notice.body.slice(0, 60)}...`
                : notice.body}
            </Typography.Text>
            <Typography.Text style={{ fontSize: 11, color: NEUTRAL_500 }}>
              &middot; {formatDate(notice.createdAt)}
            </Typography.Text>
          </Space>
        }
      />
    </List.Item>
  );
};

type Props = {
  fragmentRef: DashboardNotificationsFragment$key;
  onBrowse: () => void;
};

const DashboardNotifications: React.FC<Props> = ({ fragmentRef, onBrowse }) => {
  const data = useFragment(dashboardNotificationsFragment, fragmentRef);

  const pinnedEdges = data.pinnedNotices?.edges ?? [];
  const latestEdges = data.latestNotices?.edges ?? [];

  const allNotices: NoticeItem[] = [
    ...pinnedEdges.map((e) => e.node as unknown as NoticeItem),
    ...latestEdges.map((e) => e.node as unknown as NoticeItem),
  ];

  return (
    <Card
      title={
        <Typography.Text
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: NEUTRAL_500,
          }}
        >
          <NotificationOutlined style={{ marginRight: 6 }} />
          Notices
        </Typography.Text>
      }
      extra={
        <Typography.Link
          onClick={onBrowse}
          style={{ fontSize: 13, color: BRAND_PRIMARY }}
        >
          View all
        </Typography.Link>
      }
      style={{ borderRadius: RADIUS_LG, marginBottom: 24 }}
      styles={{ body: { padding: '0 16px' } }}
    >
      {allNotices.length === 0 ? (
        <Typography.Text
          type="secondary"
          style={{
            display: 'block',
            padding: '16px 0',
            fontSize: 13,
            textAlign: 'center',
          }}
        >
          No notices yet
        </Typography.Text>
      ) : (
        <List
          dataSource={allNotices}
          renderItem={(notice) => (
            <NoticeRow key={notice.id} notice={notice} onNavigate={onBrowse} />
          )}
        />
      )}
    </Card>
  );
};

export default DashboardNotifications;
