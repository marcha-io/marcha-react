import { CalendarOutlined } from '@ant-design/icons';
import { Card, List, Space, Tag, Typography } from 'antd';
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
import type { DashboardUpcomingEventsFragment$key } from './__generated__/DashboardUpcomingEventsFragment.graphql';

export const dashboardUpcomingEventsFragment = graphql`
  fragment DashboardUpcomingEventsFragment on Query
  @argumentDefinitions(communityId: { type: "BigIntFilter" }) {
    eventsCollection(
      first: 5
      orderBy: [{ eventDate: AscNullsLast }]
      filter: { communityId: $communityId }
    ) {
      edges {
        node {
          id
          title
          eventDate
          location
        }
      }
    }
  }
`;

const formatEventDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const isUpcoming = (dateStr: string): boolean =>
  new Date(dateStr).getTime() > Date.now();

type EventRowProps = {
  id: string;
  title: string;
  eventDate: string;
  location: string | null;
  onNavigate: (id: string) => void;
};

const EventRow: React.FC<EventRowProps> = ({
  id,
  title,
  eventDate,
  location,
  onNavigate,
}) => (
  <List.Item
    style={{
      padding: '8px 0',
      cursor: 'pointer',
      borderBottom: `1px solid ${NEUTRAL_100}`,
    }}
    onClick={() => onNavigate(id)}
  >
    <List.Item.Meta
      avatar={
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: RADIUS_SM,
            backgroundColor: NEUTRAL_100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <CalendarOutlined style={{ fontSize: 18, color: BRAND_PRIMARY }} />
        </div>
      }
      title={
        <Typography.Text
          strong
          style={{
            fontSize: 13,
            color: NEUTRAL_900,
            display: 'block',
            lineHeight: '1.3',
            marginBottom: 2,
          }}
          ellipsis
        >
          {title}
        </Typography.Text>
      }
      description={
        <Space size={4}>
          <Typography.Text style={{ fontSize: 12, color: NEUTRAL_500 }}>
            {formatEventDate(eventDate)}
          </Typography.Text>
          {location && (
            <Typography.Text style={{ fontSize: 12, color: NEUTRAL_500 }}>
              &middot; {location}
            </Typography.Text>
          )}
        </Space>
      }
    />
    {isUpcoming(eventDate) && (
      <Tag
        color="green"
        style={{
          fontSize: 11,
          padding: '0 6px',
          lineHeight: '18px',
          borderRadius: RADIUS_SM,
          marginLeft: 8,
          flexShrink: 0,
        }}
      >
        Soon
      </Tag>
    )}
  </List.Item>
);

type Props = {
  fragmentRef: DashboardUpcomingEventsFragment$key;
  onBrowse: () => void;
  onNavigateToEvent: (id: string) => void;
};

const DashboardUpcomingEvents: React.FC<Props> = ({
  fragmentRef,
  onBrowse,
  onNavigateToEvent,
}) => {
  const data = useFragment(dashboardUpcomingEventsFragment, fragmentRef);
  const events = data.eventsCollection?.edges ?? [];

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
          Upcoming Events
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
      style={{ borderRadius: RADIUS_LG }}
      styles={{ body: { padding: '0 16px' } }}
    >
      {events.length === 0 ? (
        <Typography.Text
          type="secondary"
          style={{
            display: 'block',
            padding: '16px 0',
            fontSize: 13,
            textAlign: 'center',
          }}
        >
          No upcoming events
        </Typography.Text>
      ) : (
        <List
          dataSource={[...events]}
          renderItem={(edge) => {
            const event = edge.node;
            return (
              <EventRow
                key={event.id}
                id={event.id}
                title={event.title}
                eventDate={event.eventDate}
                location={event.location ?? null}
                onNavigate={onNavigateToEvent}
              />
            );
          }}
        />
      )}
    </Card>
  );
};

export default DashboardUpcomingEvents;
