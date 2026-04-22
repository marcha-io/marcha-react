import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Space, Typography } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay';

import {
  BRAND_PRIMARY,
  NEUTRAL_100,
  NEUTRAL_500,
  NEUTRAL_700,
  NEUTRAL_900,
  RADIUS_LG,
} from '../../design';
import timeFromDate from '../../utils/time_from_date_';
import type { DashboardCommunityUpdatesFragment$key } from './__generated__/DashboardCommunityUpdatesFragment.graphql';

export const dashboardCommunityUpdatesFragment = graphql`
  fragment DashboardCommunityUpdatesFragment on Communities {
    communityUsersCollection(first: 20, filter: { role: { eq: admin } }) {
      edges {
        node {
          user {
            noticesCollection(
              first: 1
              orderBy: [{ createdAt: DescNullsLast }]
            ) {
              edges {
                node {
                  id
                  title
                  body
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
        }
      }
    }
  }
`;

type CommunityUpdate = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  profiles:
    | {
        firstName: string | null | undefined;
        lastName: string | null | undefined;
        avatarUrl: string | null | undefined;
      }
    | null
    | undefined;
};

type Props = {
  fragmentRef: DashboardCommunityUpdatesFragment$key | null | undefined;
  onBrowse: () => void;
};

const DashboardCommunityUpdates: React.FC<Props> = ({
  fragmentRef,
  onBrowse,
}) => {
  const data = useFragment(dashboardCommunityUpdatesFragment, fragmentRef);

  const adminEdges = data?.communityUsersCollection?.edges ?? [];
  let notice: CommunityUpdate | null = null;

  for (const edge of adminEdges) {
    const candidate =
      edge.node.user?.noticesCollection?.edges?.[0]?.node ?? null;
    if (
      candidate != null &&
      (notice == null ||
        new Date(candidate.createdAt) > new Date(notice.createdAt))
    ) {
      notice = candidate;
    }
  }

  const authorName =
    `${notice?.profiles?.firstName ?? ''} ${notice?.profiles?.lastName ?? ''}`.trim();

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
          Community Updates
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
      styles={{ body: { padding: '16px' } }}
    >
      {notice == null ? (
        <Typography.Text
          type="secondary"
          style={{ fontSize: 13, display: 'block', textAlign: 'center' }}
        >
          No community updates yet
        </Typography.Text>
      ) : (
        <Space
          vertical
          size={8}
          style={{
            width: '100%',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: 8,
            background: NEUTRAL_100,
          }}
          onClick={onBrowse}
        >
          <Typography.Text
            strong
            style={{ fontSize: 14, color: NEUTRAL_900, lineHeight: '1.4' }}
          >
            {notice.title}
          </Typography.Text>
          <Typography.Text
            style={{ fontSize: 13, color: NEUTRAL_700, display: 'block' }}
          >
            {notice.body.length > 120
              ? `${notice.body.slice(0, 120)}\u2026`
              : notice.body}
          </Typography.Text>
          <Space size={6}>
            <Avatar
              src={notice.profiles?.avatarUrl}
              icon={<UserOutlined />}
              size={18}
              style={{ flexShrink: 0 }}
            />
            <Typography.Text style={{ fontSize: 12, color: NEUTRAL_500 }}>
              {authorName || 'Community Admin'}
            </Typography.Text>
            <Typography.Text style={{ fontSize: 12, color: NEUTRAL_500 }}>
              &middot;
            </Typography.Text>
            <Typography.Text style={{ fontSize: 12, color: NEUTRAL_500 }}>
              {timeFromDate(notice.createdAt)}
            </Typography.Text>
          </Space>
        </Space>
      )}
    </Card>
  );
};

export default DashboardCommunityUpdates;
