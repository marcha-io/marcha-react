import { Form, Input, Modal, Switch, message } from 'antd';
import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-relay';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import InsertNoticeMutation from './graphql/InsertNoticeMutation.graphql';
import type { InsertNoticeMutation as InsertNoticeMutationType } from './graphql/__generated__/InsertNoticeMutation.graphql';

type Props = {
  open: boolean;
  onClose: () => void;
};

const CreateNoticeModal: React.FC<Props> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const { communityId } = useParams<{ communityId: string }>();
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);

  const [commitInsert] =
    useMutation<InsertNoticeMutationType>(InsertNoticeMutation);

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
                body: values.body,
                pinned: values.pinned ?? false,
                createdBy: userId,
                communityId: communityId,
              },
            ],
          },
          onCompleted: () => {
            message.success('Notice posted successfully!');
            form.resetFields();
            setLoading(false);
            onClose();
          },
          onError: (error) => {
            message.error(`Failed to post notice: ${error.message}`);
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
      title="Post a Notice"
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={loading}
      okText="Post Notice"
      destroyOnClose
    >
      <Form form={form} layout="vertical" preserve={false}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="e.g. Water maintenance scheduled" />
        </Form.Item>
        <Form.Item
          name="body"
          label="Body"
          rules={[{ required: true, message: 'Please enter the notice body' }]}
        >
          <Input.TextArea rows={5} placeholder="Write your notice here..." />
        </Form.Item>
        <Form.Item
          name="pinned"
          label="Pin this notice"
          valuePropName="checked"
          initialValue={false}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateNoticeModal;
