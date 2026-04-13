import {
  CalendarOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from '@ant-design/icons';
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
import type { EventCardFragment$key } from './__generated__/EventCardFragment.graphql';

export const eventCardFragment = graphql`
  fragment EventCardFragment on Events {
    id
    title
    description
    eventDate
    location
    imageUrl
    maxAttendees
    eventRsvpsCollection(filter: { status: { eq: attending } }) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

type Props = {
  fragmentRef: EventCardFragment$key;
  onClick: (id: string) => void;
};

const formatEventDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const isUpcoming = (dateStr: string): boolean =>
  new Date(dateStr).getTime() > Date.now();

const EventCard: React.FC<Props> = ({ fragmentRef, onClick }) => {
  const event = useFragment(eventCardFragment, fragmentRef);
  const attendeeCount = event.eventRsvpsCollection?.edges?.length ?? 0;
  const upcoming = isUpcoming(event.eventDate);

  return (
    <Card
      hoverable
      onClick={() => onClick(event.id)}
      style={{ borderRadius: RADIUS_LG, height: '100%' }}
      cover={
        event.imageUrl ? (
          <img
            alt={event.title}
            src={event.imageUrl}
            style={{
              height: 160,
              objectFit: 'cover',
              borderTopLeftRadius: RADIUS_LG,
              borderTopRightRadius: RADIUS_LG,
            }}
          />
        ) : (
          <div
            style={{
              height: 160,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #F06543 0%, #D94530 100%)',
              borderTopLeftRadius: RADIUS_LG,
              borderTopRightRadius: RADIUS_LG,
            }}
          >
            <CalendarOutlined
              style={{ fontSize: 48, color: 'rgba(255,255,255,0.6)' }}
            />
          </div>
        )
      }
    >
      <Space direction="vertical" size={8} style={{ width: '100%' }}>
        <Space size={4}>
          {upcoming ? (
            <Tag color="green">Upcoming</Tag>
          ) : (
            <Tag color="default">Past</Tag>
          )}
        </Space>
        <Typography.Title
          level={5}
          style={{ margin: 0, color: NEUTRAL_700 }}
          ellipsis={{ rows: 2 }}
        >
          {event.title}
        </Typography.Title>
        <Space size={6}>
          <CalendarOutlined style={{ color: BRAND_PRIMARY, fontSize: 13 }} />
          <Typography.Text style={{ fontSize: 13, color: NEUTRAL_500 }}>
            {formatEventDate(event.eventDate)}
          </Typography.Text>
        </Space>
        {event.location && (
          <Space size={6}>
            <EnvironmentOutlined
              style={{ color: BRAND_PRIMARY, fontSize: 13 }}
            />
            <Typography.Text
              style={{ fontSize: 13, color: NEUTRAL_500 }}
              ellipsis
            >
              {event.location}
            </Typography.Text>
          </Space>
        )}
        <Space size={6}>
          <TeamOutlined style={{ color: BRAND_PRIMARY, fontSize: 13 }} />
          <Typography.Text style={{ fontSize: 13, color: NEUTRAL_500 }}>
            {attendeeCount} attending
            {event.maxAttendees != null && ` / ${event.maxAttendees} max`}
          </Typography.Text>
        </Space>
      </Space>
    </Card>
  );
};

export default EventCard;
