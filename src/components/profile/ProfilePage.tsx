// src/components/profile/ProfilePage.tsx
import {
  CameraOutlined,
  CheckOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Row,
  Space,
  Spin,
  Typography,
  Upload,
  message,
} from 'antd';
import React, { useCallback, useState } from 'react';
import {
  type EntryPointComponent,
  type PreloadedQuery,
  useMutation,
  usePreloadedQuery,
} from 'react-relay';

import { supabase } from '../../lib/supabase';
import ProfileQuery from './ProfileQuery.graphql';
import UpdateProfileMutation from './UpdateProfileMutation.graphql';
import type { ProfileQueryQuery } from './__generated__/ProfileQueryQuery.graphql';
import type { UpdateProfileMutationMutation } from './__generated__/UpdateProfileMutationMutation.graphql';

// ─── Constants ───────────────────────────────────────────────────────────────
const BRAND_COLOR = '#F06543';
const BRAND_DARK = '#D94530';
const TEXT_SECONDARY = '#6B7280';
const BORDER = '#E5E7EB';

// ─── Types ───────────────────────────────────────────────────────────────────
type Props = {
  queries: {
    profileQuery: PreloadedQuery<ProfileQueryQuery>;
  };
};

// ─── Component ───────────────────────────────────────────────────────────────
const ProfilePage: EntryPointComponent<
  {
    profileQuery: ProfileQueryQuery;
  },
  Record<string, never>,
  Record<string, never>
> = (props: Props): React.ReactElement => {
  const data = usePreloadedQuery<ProfileQueryQuery>(
    ProfileQuery,
    props.queries.profileQuery
  );

  const profile = data.profilesCollection?.edges?.[0]?.node;

  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl ?? '');
  const [form] = Form.useForm();

  const [commitMutation, isMutating] =
    useMutation<UpdateProfileMutationMutation>(UpdateProfileMutation);

  // ─── Avatar Upload Handler ───────────────────────────────────────────────
  const handleAvatarUpload = useCallback(
    async (file: File) => {
      if (!profile?.id) return;
      setUploading(true);
      try {
        const fileExt = file.name.split('.').pop();
        const filePath = `avatars/${profile.id}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('community-images')
          .upload(filePath, file, { upsert: true });

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from('community-images').getPublicUrl(filePath);

        setAvatarUrl(publicUrl);

        commitMutation({
          variables: {
            set: { avatarUrl: publicUrl },
            filter: { id: { eq: profile.id } },
          },
          onCompleted: () => {
            message.success('Avatar updated');
          },
          onError: (err) => {
            message.error(`Failed to update avatar: ${err.message}`);
          },
        });
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';
        message.error(`Upload failed: ${errorMessage}`);
      } finally {
        setUploading(false);
      }
    },
    [profile?.id, commitMutation]
  );

  // ─── Save Profile Handler ─────────────────────────────────────────────────
  const handleSave = useCallback(
    (values: {
      firstName: string;
      lastName: string;
      username: string;
      description: string;
    }) => {
      if (!profile?.id) return;

      commitMutation({
        variables: {
          set: {
            firstName: values.firstName || null,
            lastName: values.lastName || null,
            username: values.username || null,
            description: values.description || null,
          },
          filter: { id: { eq: profile.id } },
        },
        onCompleted: () => {
          message.success('Profile updated successfully');
          setIsEditing(false);
        },
        onError: (err) => {
          message.error(`Failed to update profile: ${err.message}`);
        },
      });
    },
    [profile?.id, commitMutation]
  );

  // ─── Loading state ─────────────────────────────────────────────────────────
  if (!profile) {
    return (
      <Flex justify="center" align="center" style={{ height: '60vh' }}>
        <Spin tip="Loading profile..." size="large" />
      </Flex>
    );
  }

  const displayName =
    [profile.firstName, profile.lastName].filter(Boolean).join(' ') ||
    profile.username ||
    'Marcha User';

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px' }}>
      {/* ─── Header Banner ─────────────────────────────────────────────── */}
      <Card
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: 24,
          border: 'none',
        }}
        styles={{ body: { padding: 0 } }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${BRAND_COLOR} 0%, ${BRAND_DARK} 100%)`,
            height: 140,
            position: 'relative',
          }}
        />
        <Flex
          vertical
          align="center"
          style={{ marginTop: -60, paddingBottom: 24 }}
        >
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <Avatar
              size={120}
              src={avatarUrl || undefined}
              icon={!avatarUrl ? <UserOutlined /> : undefined}
              style={{
                border: '4px solid #fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                backgroundColor: avatarUrl ? undefined : BRAND_COLOR,
              }}
            />
            <Upload
              accept="image/*"
              showUploadList={false}
              beforeUpload={(file) => {
                handleAvatarUpload(file);
                return false;
              }}
            >
              <Button
                shape="circle"
                icon={uploading ? <Spin size="small" /> : <CameraOutlined />}
                size="small"
                style={{
                  position: 'absolute',
                  bottom: 4,
                  right: 4,
                  backgroundColor: BRAND_COLOR,
                  borderColor: BRAND_COLOR,
                  color: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              />
            </Upload>
          </div>
          <Typography.Title level={3} style={{ margin: 0 }}>
            {displayName}
          </Typography.Title>
          {profile.username && (
            <Typography.Text
              type="secondary"
              style={{ fontSize: 14, marginTop: 4 }}
            >
              @{profile.username}
            </Typography.Text>
          )}
          {profile.description && (
            <Typography.Text
              style={{
                fontSize: 14,
                color: TEXT_SECONDARY,
                marginTop: 8,
                maxWidth: 400,
                textAlign: 'center',
              }}
            >
              {profile.description}
            </Typography.Text>
          )}
        </Flex>
      </Card>

      {/* ─── Profile Details Card ──────────────────────────────────────── */}
      <Card
        style={{ borderRadius: 16, border: `1px solid ${BORDER}` }}
        title={
          <Flex justify="space-between" align="center">
            <Typography.Title level={5} style={{ margin: 0 }}>
              Profile Details
            </Typography.Title>
            <Button
              type={isEditing ? 'primary' : 'default'}
              icon={isEditing ? <CheckOutlined /> : <EditOutlined />}
              onClick={() => {
                if (isEditing) {
                  form.submit();
                } else {
                  setIsEditing(true);
                }
              }}
              loading={isMutating}
              style={
                isEditing
                  ? { backgroundColor: BRAND_COLOR, borderColor: BRAND_COLOR }
                  : {}
              }
            >
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </Flex>
        }
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            firstName: profile.firstName ?? '',
            lastName: profile.lastName ?? '',
            username: profile.username ?? '',
            description: profile.description ?? '',
          }}
          onFinish={handleSave}
          disabled={!isEditing}
        >
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="firstName"
                label={
                  <Typography.Text strong style={{ fontSize: 13 }}>
                    First Name
                  </Typography.Text>
                }
              >
                <Input
                  placeholder="Enter your first name"
                  size="large"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="lastName"
                label={
                  <Typography.Text strong style={{ fontSize: 13 }}>
                    Last Name
                  </Typography.Text>
                }
              >
                <Input
                  placeholder="Enter your last name"
                  size="large"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="username"
            label={
              <Typography.Text strong style={{ fontSize: 13 }}>
                Username
              </Typography.Text>
            }
          >
            <Input
              prefix={<Typography.Text type="secondary">@</Typography.Text>}
              placeholder="Choose a username"
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={
              <Typography.Text strong style={{ fontSize: 13 }}>
                Bio
              </Typography.Text>
            }
          >
            <Input.TextArea
              placeholder="Tell us a bit about yourself..."
              rows={4}
              maxLength={300}
              showCount
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          {isEditing && (
            <Flex justify="flex-end" gap={12} style={{ marginTop: 8 }}>
              <Button
                onClick={() => {
                  setIsEditing(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isMutating}
                style={{
                  backgroundColor: BRAND_COLOR,
                  borderColor: BRAND_COLOR,
                }}
              >
                Save Changes
              </Button>
            </Flex>
          )}
        </Form>
      </Card>

      {/* ─── Account Info Card ─────────────────────────────────────────── */}
      <Card
        style={{
          borderRadius: 16,
          border: `1px solid ${BORDER}`,
          marginTop: 24,
        }}
        title={
          <Typography.Title level={5} style={{ margin: 0 }}>
            Account Information
          </Typography.Title>
        }
      >
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Flex justify="space-between" align="center">
            <Space direction="vertical" size={0}>
              <Typography.Text strong style={{ fontSize: 13 }}>
                User ID
              </Typography.Text>
              <Typography.Text
                type="secondary"
                copyable
                style={{ fontSize: 13 }}
              >
                {profile.id}
              </Typography.Text>
            </Space>
          </Flex>
          <Divider style={{ margin: 0 }} />
          <Flex justify="space-between" align="center">
            <Space direction="vertical" size={0}>
              <Typography.Text strong style={{ fontSize: 13 }}>
                Onboarded
              </Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                {profile.onboarded ? 'Yes' : 'Not yet'}
              </Typography.Text>
            </Space>
          </Flex>
        </Space>
      </Card>

      {/* Bottom spacer for mobile scroll */}
      <div style={{ height: 32 }} />
    </div>
  );
};

export default ProfilePage;
