import { DatePicker, Form, Input, InputNumber, Modal, message } from 'antd';
import React, { useCallback } from 'react';
import { useMutation } from 'react-relay';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { RADIUS_LG } from '../../design';
import InsertEventMutation from './graphql/InsertEventMutation.graphql';
import type { InsertEventMutation as InsertEventMutationType } from './graphql/__generated__/InsertEventMutation.graphql';

type FormValues = {
  title: string;
  description?: string;
  eventDate: { toISOString: () => string };
  location?: string;
  maxAttendees?: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

const CreateEventModal: React.FC<Props> = ({ open, onClose }) => {
  const [form] = Form.useForm<FormValues>();
  const { userId } = useAuth();
  const { communityId } = useParams<{ communityId: string }>();
  const [commitMutation, isMutating] =
    useMutation<InsertEventMutationType>(InsertEventMutation);

  const handleSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      if (!userId || !communityId) {
        message.error('You must be logged in to create an event.');
        return;
      }

      commitMutation({
        variables: {
          objects: [
            {
              title: values.title,
              description: values.description || null,
              eventDate: values.eventDate.toISOString(),
              location: values.location || null,
              maxAttendees: values.maxAttendees || null,
              createdBy: userId,
              communityId,
            },
          ],
        },
        onCompleted: () => {
          message.success('Event created successfully!');
          form.resetFields();
          onClose();
        },
        onError: (err) => {
          message.error(`Failed to create event: ${err.message}`);
        },
      });
    } catch {
      // form validation error — handled by antd
    }
  }, [form, userId, communityId, commitMutation, onClose]);

  return (
    <Modal
      title="Create Event"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Create"
      confirmLoading={isMutating}
      destroyOnClose
      styles={{ body: { borderRadius: RADIUS_LG } }}
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          name="title"
          label="Event Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="e.g. Summer BBQ" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea
            rows={3}
            placeholder="Tell people what the event is about..."
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Form.Item
          name="eventDate"
          label="Date & Time"
          rules={[{ required: true, message: 'Please select a date and time' }]}
        >
          <DatePicker
            showTime
            style={{ width: '100%' }}
            format="DD/MM/YYYY HH:mm"
          />
        </Form.Item>

        <Form.Item name="location" label="Location">
          <Input placeholder="e.g. Rooftop Terrace" />
        </Form.Item>

        <Form.Item name="maxAttendees" label="Max Attendees (optional)">
          <InputNumber
            min={1}
            style={{ width: '100%' }}
            placeholder="Leave blank for unlimited"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateEventModal;
