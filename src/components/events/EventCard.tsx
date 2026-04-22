import {
  CalendarOutlined,
  EnvironmentOutlined,
  PushpinOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Space, Tag, Typography } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import React, { useEffect, useMemo, useState } from 'react';
import { useFragment } from 'react-relay';

import {
  BRAND_PRIMARY,
  NEUTRAL_500,
  NEUTRAL_700,
  RADIUS_LG,
} from '../../design';
import fetchFromStorage from '../../utils/fetch_from_storage';
import formatEventDate from '../../utils/format_event_date';
import { AVATAR_DEFAULT } from '../marketplace/constants';
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
    pinned
    createdBy
    profiles {
      firstName
      lastName
      avatarUrl
      username
    }
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

const isUpcoming = (dateStr: string): boolean =>
  new Date(dateStr).getTime() > Date.now();

const EventCard: React.FC<Props> = ({ fragmentRef, onClick }) => {
  const [avatarBlob, setAvatarBlob] = useState<Blob | null>(null);
  const event = useFragment(eventCardFragment, fragmentRef);

  useEffect(() => {
    if (event.profiles?.avatarUrl) {
      fetchFromStorage(
        event.profiles.avatarUrl,
        `avatars/${event.profiles.username}`
      ).then((blob) => {
        if (blob) setAvatarBlob(blob);
      });
    }
  }, [event.profiles?.avatarUrl]);

  const avatarUrl = useMemo(
    () => (avatarBlob ? URL.createObjectURL(avatarBlob) : AVATAR_DEFAULT),
    [avatarBlob]
  );

  const attendeeCount = event.eventRsvpsCollection?.edges?.length ?? 0;
  const upcoming = isUpcoming(event.eventDate);
  const authorName =
    `${event?.profiles?.firstName ?? ''} ${event?.profiles?.lastName ?? ''}`.trim();

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
      <Space vertical size={8} style={{ width: '100%' }}>
        <Space size={4} wrap>
          {upcoming ? (
            <Tag color="green">Upcoming</Tag>
          ) : (
            <Tag color="default">Past</Tag>
          )}
          {event.pinned && (
            <Tag icon={<PushpinOutlined />} color="orange">
              Pinned
            </Tag>
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
        {authorName && (
          <Space size={6}>
            <Avatar
              src={avatarUrl}
              icon={<UserOutlined />}
              size={18}
              style={{ flexShrink: 0 }}
            />
            <Typography.Text style={{ fontSize: 12, color: NEUTRAL_500 }}>
              {authorName}
            </Typography.Text>
          </Space>
        )}
      </Space>
    </Card>
  );
};

export default EventCard;
