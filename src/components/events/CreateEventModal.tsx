import { Form, message } from 'antd';
import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-relay';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useIsAdmin } from '../../hooks/useIsAdmin';
import EventFormModal from './EventFormModal';
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

  const isAdmin = useIsAdmin(communityId);

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
                maxAttendees: values.maxAttendees,
                pinned: values.pinned ?? false,
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
    <EventFormModal
      title="Create Event"
      isModalOpen={open}
      onSubmit={handleSubmit}
      onCloseModal={onClose}
      isLoading={loading}
      submitLabel="Create Event"
      form={form}
      isPinnedToggleShowned={isAdmin}
    />
  );
};

export default CreateEventModal;
