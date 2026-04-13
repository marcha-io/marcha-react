import {
  CalendarOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Card, Flex, Space, Tag, Typography } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';

import {
  BRAND_PRIMARY,
  NEUTRAL_500,
  NEUTRAL_900,
  RADIUS_LG,
} from '../../design';
import { Paths } from '../../views/paths';
import type { EventCardFragment$key } from './__generated__/EventCardFragment.graphql';

const eventCardFragment = graphql`
  fragment EventCardFragment on Events {
    id
    title
    description
    eventDate
    location
    maxAttendees
    eventRsvpsCollection {
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
};

const formatEventDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const isUpcoming = (iso: string): boolean => new Date(iso) > new Date();

const EventCard: React.FC<Props> = ({ fragmentRef }) => {
  const event = useFragment(eventCardFragment, fragmentRef);
  const navigate = useNavigate();
  const { communityId } = useParams<{ communityId: string }>();
  const basePath = `/portal/${communityId}`;
  const rsvpCount = event.eventRsvpsCollection?.edges?.length ?? 0;

  return (
    <Card
      hoverable
      style={{ borderRadius: RADIUS_LG, height: '100%' }}
      onClick={() => navigate(`${basePath}/${Paths.Events}/${event.id}`)}
    >
      <Flex vertical gap={8}>
        <Flex justify="space-between" align="flex-start">
          <Typography.Title
            level={5}
            style={{ margin: 0, color: NEUTRAL_900 }}
            ellipsis={{ rows: 2 }}
          >
            {event.title}
          </Typography.Title>
          {isUpcoming(event.eventDate) && <Tag color="green">Upcoming</Tag>}
        </Flex>

        {event.description && (
          <Typography.Paragraph
            type="secondary"
            ellipsis={{ rows: 2 }}
            style={{ margin: 0, fontSize: 13 }}
          >
            {event.description}
          </Typography.Paragraph>
        )}

        <Space direction="vertical" size={4} style={{ marginTop: 4 }}>
          <Flex align="center" gap={6}>
            <CalendarOutlined style={{ color: BRAND_PRIMARY, fontSize: 14 }} />
            <Typography.Text style={{ fontSize: 13, color: NEUTRAL_500 }}>
              {formatEventDate(event.eventDate)}
            </Typography.Text>
          </Flex>

          {event.location && (
            <Flex align="center" gap={6}>
              <EnvironmentOutlined
                style={{ color: BRAND_PRIMARY, fontSize: 14 }}
              />
              <Typography.Text
                style={{ fontSize: 13, color: NEUTRAL_500 }}
                ellipsis
              >
                {event.location}
              </Typography.Text>
            </Flex>
          )}

          <Flex align="center" gap={6}>
            <TeamOutlined style={{ color: BRAND_PRIMARY, fontSize: 14 }} />
            <Typography.Text style={{ fontSize: 13, color: NEUTRAL_500 }}>
              {rsvpCount} attending
              {event.maxAttendees ? ` / ${event.maxAttendees} max` : ''}
            </Typography.Text>
          </Flex>
        </Space>
      </Flex>
    </Card>
  );
};

export default EventCard;
