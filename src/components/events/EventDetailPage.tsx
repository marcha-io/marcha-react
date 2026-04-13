import {
  ArrowLeftOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Button, Card, Flex, Space, Tag, Typography, message } from 'antd';
import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import {
  BRAND_PRIMARY,
  NEUTRAL_500,
  NEUTRAL_700,
  RADIUS_LG,
} from '../../design';
import { Paths } from '../../views/paths';
import type { EventDetailPageWrapperQuery$data } from './__generated__/EventDetailPageWrapperQuery.graphql';
import {
  deleteRsvpMutation,
  insertRsvpMutation,
} from './graphql/RsvpMutations.graphql';
import type { RsvpMutationsDeleteMutation } from './graphql/__generated__/RsvpMutationsDeleteMutation.graphql';
import type { RsvpMutationsInsertMutation } from './graphql/__generated__/RsvpMutationsInsertMutation.graphql';

type Props = {
  data: EventDetailPageWrapperQuery$data;
};

const formatEventDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const EventDetailPage: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const { communityId } = useParams<{ communityId: string }>();
  const { userId } = useAuth();
  const basePath = `/portal/${communityId}`;

  const event = data.eventsCollection?.edges?.[0]?.node;
  const currentRsvp = data.currentUserRsvp?.edges?.[0]?.node;
  const [isAttending, setIsAttending] = useState(currentRsvp != null);
  const [rsvpLoading, setRsvpLoading] = useState(false);

  const attendees = event?.eventRsvpsCollection?.edges ?? [];
  const attendeeCount =
    attendees.length + (isAttending && !currentRsvp ? 1 : 0);

  const [commitInsertRsvp] =
    useMutation<RsvpMutationsInsertMutation>(insertRsvpMutation);
  const [commitDeleteRsvp] =
    useMutation<RsvpMutationsDeleteMutation>(deleteRsvpMutation);

  const handleRsvp = useCallback(() => {
    if (!event || !userId) return;
    setRsvpLoading(true);

    if (isAttending) {
      commitDeleteRsvp({
        variables: {
          filter: {
            eventId: { eq: event.id },
            userId: { eq: userId },
          },
          atMost: 1,
        },
        onCompleted: () => {
          setIsAttending(false);
          setRsvpLoading(false);
          message.info('RSVP cancelled');
        },
        onError: (error) => {
          setRsvpLoading(false);
          message.error(`Failed to cancel RSVP: ${error.message}`);
        },
      });
    } else {
      commitInsertRsvp({
        variables: {
          input: [
            {
              eventId: event.id,
              userId: userId,
              status: 'attending',
            },
          ],
        },
        onCompleted: () => {
          setIsAttending(true);
          setRsvpLoading(false);
          message.success('You are attending!');
        },
        onError: (error) => {
          setRsvpLoading(false);
          message.error(`Failed to RSVP: ${error.message}`);
        },
      });
    }
  }, [event, userId, isAttending, commitInsertRsvp, commitDeleteRsvp]);

  if (!event) {
    return (
      <div style={{ textAlign: 'center', padding: 48 }}>
        <Typography.Title level={4}>Event not found</Typography.Title>
        <Button onClick={() => navigate(`${basePath}/${Paths.Events}`)}>
          Back to Events
        </Button>
      </div>
    );
  }

  const isUpcoming = new Date(event.eventDate).getTime() > Date.now();

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(`${basePath}/${Paths.Events}`)}
        style={{ marginBottom: 16 }}
      >
        Back to Events
      </Button>

      {event.imageUrl && (
        <img
          alt={event.title}
          src={event.imageUrl}
          style={{
            width: '100%',
            height: 280,
            objectFit: 'cover',
            borderRadius: RADIUS_LG,
            marginBottom: 24,
          }}
        />
      )}

      <Card style={{ borderRadius: RADIUS_LG }}>
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Flex justify="space-between" align="flex-start" wrap="wrap" gap={12}>
            <div>
              <Space size={8} style={{ marginBottom: 8 }}>
                {isUpcoming ? (
                  <Tag color="green">Upcoming</Tag>
                ) : (
                  <Tag color="default">Past</Tag>
                )}
              </Space>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {event.title}
              </Typography.Title>
            </div>
            {isUpcoming && (
              <Button
                type={isAttending ? 'default' : 'primary'}
                icon={isAttending ? <CheckCircleOutlined /> : undefined}
                loading={rsvpLoading}
                onClick={handleRsvp}
                size="large"
              >
                {isAttending ? 'Attending' : 'RSVP'}
              </Button>
            )}
          </Flex>

          <Space direction="vertical" size={8}>
            <Space size={8}>
              <CalendarOutlined
                style={{ color: BRAND_PRIMARY, fontSize: 16 }}
              />
              <Typography.Text style={{ fontSize: 15, color: NEUTRAL_700 }}>
                {formatEventDate(event.eventDate)}
              </Typography.Text>
            </Space>
            {event.location && (
              <Space size={8}>
                <EnvironmentOutlined
                  style={{ color: BRAND_PRIMARY, fontSize: 16 }}
                />
                <Typography.Text style={{ fontSize: 15, color: NEUTRAL_700 }}>
                  {event.location}
                </Typography.Text>
              </Space>
            )}
            <Space size={8}>
              <TeamOutlined style={{ color: BRAND_PRIMARY, fontSize: 16 }} />
              <Typography.Text style={{ fontSize: 15, color: NEUTRAL_500 }}>
                {attendeeCount} attending
                {event.maxAttendees != null && ` / ${event.maxAttendees} max`}
              </Typography.Text>
            </Space>
          </Space>

          {event.description && (
            <div>
              <Typography.Title level={5} style={{ marginBottom: 8 }}>
                About this event
              </Typography.Title>
              <Typography.Paragraph
                style={{ color: NEUTRAL_700, whiteSpace: 'pre-wrap' }}
              >
                {event.description}
              </Typography.Paragraph>
            </div>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default EventDetailPage;
