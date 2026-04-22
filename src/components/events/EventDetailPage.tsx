import {
  ArrowLeftOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Flex,
  Form,
  Popconfirm,
  Space,
  Tag,
  Typography,
  message,
} from 'antd';
import dayjs from 'dayjs';
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
import { useUserAvatarUrl } from '../../hooks/useUserAvatarUrl';
import formatEventDate from '../../utils/format_event_date';
import { Paths } from '../../views/paths';
import EventFormModal from './EventFormModal';
import type { EventDetailPageWrapperQuery$data } from './__generated__/EventDetailPageWrapperQuery.graphql';
import DeleteEventMutation from './graphql/DeleteEventMutation.graphql';
import {
  deleteRsvpMutation,
  insertRsvpMutation,
} from './graphql/RsvpMutations.graphql';
import UpdateEventMutation from './graphql/UpdateEventMutation.graphql';
import type { DeleteEventMutation as DeleteEventMutationType } from './graphql/__generated__/DeleteEventMutation.graphql';
import type { RsvpMutationsDeleteMutation } from './graphql/__generated__/RsvpMutationsDeleteMutation.graphql';
import type { RsvpMutationsInsertMutation } from './graphql/__generated__/RsvpMutationsInsertMutation.graphql';
import type { UpdateEventMutation as UpdateEventMutationType } from './graphql/__generated__/UpdateEventMutation.graphql';

type Props = {
  data: EventDetailPageWrapperQuery$data;
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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [editForm] = Form.useForm();

  const avatarUrl = useUserAvatarUrl(event?.profiles?.avatarUrl);

  const isOwner = userId != null && event?.createdBy === userId;

  const authorProfile = event?.profiles;
  const authorName =
    `${authorProfile?.firstName ?? ''} ${authorProfile?.lastName ?? ''}`.trim();

  const attendees = event?.eventRsvpsCollection?.edges ?? [];
  const attendeeCount =
    attendees.length + (isAttending && !currentRsvp ? 1 : 0);

  const [commitInsertRsvp] =
    useMutation<RsvpMutationsInsertMutation>(insertRsvpMutation);
  const [commitDeleteRsvp] =
    useMutation<RsvpMutationsDeleteMutation>(deleteRsvpMutation);

  const [commitUpdateEvent] =
    useMutation<UpdateEventMutationType>(UpdateEventMutation);
  const [commitDeleteEvent] =
    useMutation<DeleteEventMutationType>(DeleteEventMutation);

  const handleDelete = useCallback(() => {
    if (!event) return;
    commitDeleteEvent({
      variables: {
        filter: { id: { eq: event.id } },
        atMost: 1,
      },
      onCompleted: () => {
        message.success('Event deleted');
        navigate(`${basePath}/${Paths.Events}`);
      },
      onError: (error) => {
        message.error(`Failed to delete event: ${error.message}`);
      },
    });
  }, [event, commitDeleteEvent, navigate, basePath]);

  const handleEditSubmit = useCallback(() => {
    if (!event) return;
    editForm
      .validateFields()
      .then((values) => {
        setEditLoading(true);
        commitUpdateEvent({
          variables: {
            set: {
              title: values.title,
              description: values.description ?? null,
              eventDate: values.eventDate.toISOString(),
              location: values.location ?? null,
              imageUrl: values.imageUrl ?? null,
              maxAttendees: values.maxAttendees ?? null,
            },
            filter: { id: { eq: event.id } },
            atMost: 1,
          },
          onCompleted: () => {
            message.success('Event updated!');
            setEditLoading(false);
            setEditModalOpen(false);
          },
          onError: (error) => {
            message.error(`Failed to update event: ${error.message}`);
            setEditLoading(false);
          },
        });
      })
      .catch(() => {
        /* validation failed */
      });
  }, [event, editForm, commitUpdateEvent]);

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
    <div>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(`${basePath}/${Paths.Events}`)}
        style={{ marginBottom: 16 }}
      >
        Back to Events
      </Button>

      <div style={{ maxWidth: 720, margin: '0 auto' }}>
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

        <Card style={{ maxWidth: 720, borderRadius: RADIUS_LG }}>
          <Space vertical size={16} style={{ width: '100%' }}>
            <Flex
              justify="space-between"
              align="flex-start"
              wrap="wrap"
              gap={12}
            >
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
                {authorName && (
                  <Space size={6} style={{ marginTop: 4 }}>
                    <Avatar src={avatarUrl} icon={<UserOutlined />} size={20} />
                    <Typography.Text
                      style={{ fontSize: 13, color: NEUTRAL_500 }}
                    >
                      {authorName}
                    </Typography.Text>
                  </Space>
                )}
              </div>
              {isUpcoming && !isOwner && (
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

            <Space vertical size={8}>
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

            {isOwner && (
              <Flex gap={8} style={{ marginTop: 8 }}>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => {
                    editForm.setFieldsValue({
                      title: event.title,
                      description: event.description,
                      eventDate: dayjs(event.eventDate),
                      location: event.location,
                      imageUrl: event.imageUrl,
                      maxAttendees: event.maxAttendees,
                    });
                    setEditModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Delete this event?"
                  description="This action cannot be undone."
                  onConfirm={handleDelete}
                  okText="Delete"
                  okButtonProps={{ danger: true }}
                >
                  <Button danger icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>
              </Flex>
            )}
          </Space>
        </Card>

        <EventFormModal
          title="Edit Event"
          form={editForm}
          isModalOpen={editModalOpen}
          onSubmit={handleEditSubmit}
          onCloseModal={() => setEditModalOpen(false)}
          isLoading={editLoading}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
};

export default EventDetailPage;
