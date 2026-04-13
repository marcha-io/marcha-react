import { DatePicker, Form, Input, InputNumber, Modal, message } from 'antd';
import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-relay';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import InsertEventMutation from './graphql/InsertEventMutation.graphql';
import type { InsertEventMutation as InsertEventMutationType } from './graphql/__generated__/InsertEventMutation.graphql';

type Props = {
  open: boolean;
  onClose: () => void;
};

const CreateEventModal: React.FC<Props> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const { communityId } = useParams<{ communityId: string }>();
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);

  const [commitInsert] =
    useMutation<InsertEventMutationType>(InsertEventMutation);

  const handleSubmit = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        setLoading(true);
        commitInsert({
          variables: {
            input: [
              {
                title: values.title,
                description: values.description ?? null,
                eventDate: values.eventDate.toISOString(),
                location: values.location ?? null,
                imageUrl: values.imageUrl ?? null,
                maxAttendees: values.maxAttendees ?? null,
                createdBy: userId,
                communityId: communityId,
              },
            ],
          },
          onCompleted: () => {
            message.success('Event created successfully!');
            form.resetFields();
            setLoading(false);
            onClose();
          },
          onError: (error) => {
            message.error(`Failed to create event: ${error.message}`);
            setLoading(false);
          },
        });
      })
      .catch(() => {
        /* validation failed */
      });
  }, [form, commitInsert, userId, communityId, onClose]);

  return (
    <Modal
      title="Create Event"
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={loading}
      okText="Create Event"
      destroyOnClose
    >
      <Form form={form} layout="vertical" preserve={false}>
        <Form.Item
          name="title"
          label="Event Title"
          rules={[{ required: true, message: 'Please enter an event title' }]}
        >
          <Input placeholder="e.g. Community BBQ" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} placeholder="Describe the event..." />
        </Form.Item>
        <Form.Item
          name="eventDate"
          label="Date & Time"
          rules={[{ required: true, message: 'Please select a date and time' }]}
        >
          <DatePicker
            showTime
            format="DD/MM/YYYY HH:mm"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item name="location" label="Location">
          <Input placeholder="e.g. Building courtyard" />
        </Form.Item>
        <Form.Item name="imageUrl" label="Image URL">
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>
        <Form.Item name="maxAttendees" label="Max Attendees">
          <InputNumber
            min={1}
            placeholder="Leave empty for unlimited"
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateEventModal;
