import { Checkbox, Form, Input, Modal, message } from 'antd';
import React, { useCallback } from 'react';
import { useMutation } from 'react-relay';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { RADIUS_LG } from '../../design';
import InsertNoticeMutation from './graphql/InsertNoticeMutation.graphql';
import type { InsertNoticeMutation as InsertNoticeMutationType } from './graphql/__generated__/InsertNoticeMutation.graphql';

type FormValues = {
  title: string;
  body: string;
  pinned?: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

const CreateNoticeModal: React.FC<Props> = ({ open, onClose }) => {
  const [form] = Form.useForm<FormValues>();
  const { userId } = useAuth();
  const { communityId } = useParams<{ communityId: string }>();
  const [commitMutation, isMutating] =
    useMutation<InsertNoticeMutationType>(InsertNoticeMutation);

  const handleSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      if (!userId || !communityId) {
        message.error('You must be logged in to post a notice.');
        return;
      }

      commitMutation({
        variables: {
          objects: [
            {
              title: values.title,
              body: values.body,
              pinned: values.pinned ?? false,
              createdBy: userId,
              communityId,
            },
          ],
        },
        onCompleted: () => {
          message.success('Notice posted successfully!');
          form.resetFields();
          onClose();
        },
        onError: (err) => {
          message.error(`Failed to post notice: ${err.message}`);
        },
      });
    } catch {
      // form validation error — handled by antd
    }
  }, [form, userId, communityId, commitMutation, onClose]);

  return (
    <Modal
      title="Post a Notice"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Post"
      confirmLoading={isMutating}
      destroyOnClose
      styles={{ body: { borderRadius: RADIUS_LG } }}
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="e.g. Fire Alarm Test on Friday" />
        </Form.Item>

        <Form.Item
          name="body"
          label="Body"
          rules={[{ required: true, message: 'Please enter the notice body' }]}
        >
          <Input.TextArea
            rows={5}
            placeholder="Write your announcement here..."
            maxLength={2000}
            showCount
          />
        </Form.Item>

        <Form.Item name="pinned" valuePropName="checked">
          <Checkbox>Pin this notice to the top</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateNoticeModal;
