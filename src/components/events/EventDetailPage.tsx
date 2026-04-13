import {
  ArrowLeftOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Flex,
  Row,
  Space,
  Tag,
  Typography,
  message,
} from 'antd';
import React, { useCallback, useMemo } from 'react';
import { useMutation } from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import {
  BRAND_PRIMARY,
  COLOR_SUCCESS,
  NEUTRAL_500,
  RADIUS_LG,
} from '../../design';
import { Paths } from '../../views/paths';
import type { EventDetailPageWrapperQuery$data } from './__generated__/EventDetailPageWrapperQuery.graphql';
import {
  DeleteRsvpMutation,
  InsertRsvpMutation,
} from './graphql/RsvpMutations.graphql';
import type { RsvpMutationsDeleteMutation } from './graphql/__generated__/RsvpMutationsDeleteMutation.graphql';
import type { RsvpMutationsInsertMutation } from './graphql/__generated__/RsvpMutationsInsertMutation.graphql';

type Props = {
  data: EventDetailPageWrapperQuery$data;
};

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const formatTime = (iso: string): string =>
  new Date(iso).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

const EventDetailPage: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const { communityId } = useParams<{ communityId: string }>();
  const basePath = `/portal/${communityId}`;
  const { userId } = useAuth();

  const event = data.eventsCollection?.edges?.[0]?.node;

  const [commitInsertRsvp, isInserting] =
    useMutation<RsvpMutationsInsertMutation>(InsertRsvpMutation);
  const [commitDeleteRsvp, isDeleting] =
    useMutation<RsvpMutationsDeleteMutation>(DeleteRsvpMutation);

  const rsvps = useMemo(
    () => event?.eventRsvpsCollection?.edges ?? [],
    [event]
  );
  const rsvpCount = rsvps.length;
  const currentUserRsvp = useMemo(
    () => rsvps.find((r) => r.node.userId === userId),
    [rsvps, userId]
  );
  const hasRsvped = !!currentUserRsvp;
  const isFull = event?.maxAttendees != null && rsvpCount >= event.maxAttendees;

  const handleRsvp = useCallback(() => {
    if (!userId || !event) return;

    if (hasRsvped) {
      commitDeleteRsvp({
        variables: {
          filter: {
            eventId: { eq: event.id },
            userId: { eq: userId },
          },
          atMost: 1,
        },
        onCompleted: () => {
          message.success('RSVP cancelled.');
        },
        onError: (err) => {
          message.error(`Failed: ${err.message}`);
        },
      });
    } else {
      commitInsertRsvp({
        variables: {
          objects: [
            {
              eventId: event.id,
              userId,
              status: 'attending' as const,
            },
          ],
        },
        onCompleted: () => {
          message.success("You're attending!");
        },
        onError: (err) => {
          message.error(`Failed: ${err.message}`);
        },
      });
    }
  }, [userId, event, hasRsvped, commitInsertRsvp, commitDeleteRsvp]);

  if (!event) {
    return (
      <Flex vertical align="center" gap={16} style={{ padding: '48px 0' }}>
        <Typography.Title level={4}>Event not found</Typography.Title>
        <Button onClick={() => navigate(`${basePath}/${Paths.Events}`)}>
          Back to Events
        </Button>
      </Flex>
    );
  }

  const isUpcoming = new Date(event.eventDate) > new Date();

  return (
    <div>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(`${basePath}/${Paths.Events}`)}
        style={{ paddingLeft: 0, marginBottom: 16, color: BRAND_PRIMARY }}
      >
        Back to Events
      </Button>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <Card style={{ borderRadius: RADIUS_LG }}>
            <Flex vertical gap={16}>
              <Flex justify="space-between" align="flex-start">
                <Typography.Title level={2} style={{ margin: 0 }}>
                  {event.title}
                </Typography.Title>
                {isUpcoming ? (
                  <Tag color="green">Upcoming</Tag>
                ) : (
                  <Tag color="default">Past</Tag>
                )}
              </Flex>

              {event.description && (
                <Typography.Paragraph
                  style={{ fontSize: 15, whiteSpace: 'pre-wrap' }}
                >
                  {event.description}
                </Typography.Paragraph>
              )}

              <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
                <Descriptions.Item
                  label={
                    <Space>
                      <CalendarOutlined /> Date
                    </Space>
                  }
                >
                  {formatDate(event.eventDate)}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Space>
                      <ClockCircleOutlined /> Time
                    </Space>
                  }
                >
                  {formatTime(event.eventDate)}
                </Descriptions.Item>
                {event.location && (
                  <Descriptions.Item
                    label={
                      <Space>
                        <EnvironmentOutlined /> Location
                      </Space>
                    }
                    span={2}
                  >
                    {event.location}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Flex>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card style={{ borderRadius: RADIUS_LG, marginBottom: 16 }}>
            <Flex vertical gap={16} align="center">
              <TeamOutlined style={{ fontSize: 32, color: BRAND_PRIMARY }} />
              <Typography.Title level={4} style={{ margin: 0 }}>
                {rsvpCount} Attending
              </Typography.Title>
              {event.maxAttendees && (
                <Typography.Text style={{ color: NEUTRAL_500, fontSize: 13 }}>
                  {event.maxAttendees - rsvpCount} spots remaining
                </Typography.Text>
              )}

              {isUpcoming && (
                <Button
                  type={hasRsvped ? 'default' : 'primary'}
                  icon={hasRsvped ? <CheckCircleOutlined /> : undefined}
                  size="large"
                  block
                  loading={isInserting || isDeleting}
                  disabled={!hasRsvped && isFull}
                  onClick={handleRsvp}
                  style={
                    hasRsvped
                      ? { borderColor: COLOR_SUCCESS, color: COLOR_SUCCESS }
                      : {}
                  }
                >
                  {hasRsvped
                    ? 'Cancel RSVP'
                    : isFull
                      ? 'Event Full'
                      : 'RSVP — Attending'}
                </Button>
              )}
            </Flex>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EventDetailPage;
