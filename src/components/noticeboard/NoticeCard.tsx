import {
  DeleteOutlined,
  EditOutlined,
  PushpinOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Tag,
  Typography,
  message,
} from 'antd';
import graphql from 'babel-plugin-relay/macro';
import React, { useCallback, useState } from 'react';
import { useFragment, useMutation } from 'react-relay';

import { useAuth } from '../../contexts/AuthContext';
import {
  BRAND_PRIMARY,
  NEUTRAL_500,
  NEUTRAL_700,
  RADIUS_LG,
} from '../../design';
import type { NoticeCardFragment$key } from './__generated__/NoticeCardFragment.graphql';
import DeleteNoticeMutation from './graphql/DeleteNoticeMutation.graphql';
import UpdateNoticeMutation from './graphql/UpdateNoticeMutation.graphql';
import type { DeleteNoticeMutation as DeleteNoticeMutationType } from './graphql/__generated__/DeleteNoticeMutation.graphql';
import type { UpdateNoticeMutation as UpdateNoticeMutationType } from './graphql/__generated__/UpdateNoticeMutation.graphql';

export const noticeCardFragment = graphql`
  fragment NoticeCardFragment on Notices {
    id
    title
    body
    pinned
    createdAt
    createdBy
    profiles {
      firstName
      lastName
      avatarUrl
    }
  }
`;

type Props = {
  fragmentRef: NoticeCardFragment$key;
  onDeleted?: () => void;
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const NoticeCard: React.FC<Props> = ({ fragmentRef, onDeleted }) => {
  const notice = useFragment(noticeCardFragment, fragmentRef);
  const { userId } = useAuth();
  const isOwner = userId != null && notice.createdBy === userId;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editForm] = Form.useForm();
  const authorName = notice.profiles
    ? `${notice.profiles.firstName ?? ''} ${notice.profiles.lastName ?? ''}`.trim()
    : '';

  const [commitUpdate] =
    useMutation<UpdateNoticeMutationType>(UpdateNoticeMutation);
  const [commitDelete] =
    useMutation<DeleteNoticeMutationType>(DeleteNoticeMutation);

  const handleDelete = useCallback(() => {
    commitDelete({
      variables: {
        filter: { id: { eq: notice.id } },
        atMost: 1,
      },
      onCompleted: () => {
        message.success('Notice deleted');
        onDeleted?.();
      },
      onError: (error) => {
        message.error(`Failed to delete notice: ${error.message}`);
      },
    });
  }, [notice.id, commitDelete, onDeleted]);

  const handleEditSubmit = useCallback(() => {
    editForm
      .validateFields()
      .then((values) => {
        setEditLoading(true);
        commitUpdate({
          variables: {
            set: {
              title: values.title,
              body: values.body,
            },
            filter: { id: { eq: notice.id } },
            atMost: 1,
          },
          onCompleted: () => {
            message.success('Notice updated!');
            setEditLoading(false);
            setEditModalOpen(false);
          },
          onError: (error) => {
            message.error(`Failed to update notice: ${error.message}`);
            setEditLoading(false);
          },
        });
      })
      .catch(() => {
        /* validation failed */
      });
  }, [notice.id, editForm, commitUpdate]);

  return (
    <Card
      style={{
        borderRadius: RADIUS_LG,
        borderLeft: notice.pinned ? `4px solid ${BRAND_PRIMARY}` : undefined,
      }}
    >
      <Space direction="vertical" size={8} style={{ width: '100%' }}>
        <Space size={8} align="center">
          {notice.pinned && (
            <Tag
              icon={<PushpinOutlined />}
              color="orange"
              style={{ marginRight: 0 }}
            >
              Pinned
            </Tag>
          )}
          <Typography.Text style={{ fontSize: 12, color: NEUTRAL_500 }}>
            {formatDate(notice.createdAt)}
          </Typography.Text>
          {authorName && (
            <Space size={4}>
              <Avatar
                src={notice.profiles?.avatarUrl}
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
        <Typography.Title level={5} style={{ margin: 0, color: NEUTRAL_700 }}>
          {notice.title}
        </Typography.Title>
        <Typography.Paragraph
          style={{
            color: NEUTRAL_700,
            marginBottom: 0,
            whiteSpace: 'pre-wrap',
          }}
          ellipsis={{ rows: 4, expandable: true, symbol: 'Read more' }}
        >
          {notice.body}
        </Typography.Paragraph>

        {isOwner && (
          <Space size={8} style={{ marginTop: 4 }}>
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => {
                editForm.setFieldsValue({
                  title: notice.title,
                  body: notice.body,
                });
                setEditModalOpen(true);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete this notice?"
              description="This action cannot be undone."
              onConfirm={handleDelete}
              okText="Delete"
              okButtonProps={{ danger: true }}
            >
              <Button size="small" danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        )}
      </Space>

      <Modal
        title="Edit Notice"
        open={editModalOpen}
        onOk={handleEditSubmit}
        onCancel={() => setEditModalOpen(false)}
        confirmLoading={editLoading}
        okText="Save Changes"
        destroyOnClose
      >
        <Form form={editForm} layout="vertical" preserve={false}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="body"
            label="Body"
            rules={[
              { required: true, message: 'Please enter the notice body' },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default NoticeCard;
