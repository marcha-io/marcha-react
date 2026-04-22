import { CameraOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Flex, Spin, Typography, Upload } from 'antd';
import React from 'react';

import {
  BRAND_GRADIENT_SIMPLE,
  BRAND_PRIMARY,
  RADIUS_XL,
  SHADOW_AVATAR,
  SHADOW_BUTTON,
  WHITE,
} from '../../design';

type ProfileHeaderProps = {
  displayName: string;
  username: string | null;
  avatarUrl: string;
  uploading: boolean;
  onAvatarUpload: (file: File) => void;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  displayName,
  username,
  avatarUrl,
  uploading,
  onAvatarUpload,
}) => (
  <>
    <style>{`
      @media (max-width: 767px) {
        .profile-header-card {
          border-radius: 12px !important;
          margin-bottom: 16px !important;
        }
        .profile-header-banner {
          height: 90px !important;
        }
        .profile-header-body {
          padding-bottom: 16px !important;
          margin-top: -44px !important;
        }
        .profile-header-avatar {
          width: 88px !important;
          height: 88px !important;
          line-height: 88px !important;
          font-size: 36px !important;
        }
        .profile-header-name {
          font-size: 18px !important;
          margin-top: 8px !important;
        }
      }
    `}</style>
    <Card
      className="profile-header-card"
      style={{
        borderRadius: RADIUS_XL,
        overflow: 'hidden',
        marginBottom: 24,
        border: 'none',
        width: '100%',
      }}
      styles={{ body: { padding: 0 } }}
    >
      <div
        className="profile-header-banner"
        style={{
          background: BRAND_GRADIENT_SIMPLE,
          height: 140,
        }}
      />
      <Flex
        vertical
        align="center"
        className="profile-header-body"
        style={{ marginTop: -60, paddingBottom: 24 }}
      >
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <Avatar
            size={120}
            src={avatarUrl || undefined}
            icon={!avatarUrl ? <UserOutlined /> : undefined}
            className="profile-header-avatar"
            style={{
              border: `4px solid ${WHITE}`,
              boxShadow: SHADOW_AVATAR,
              backgroundColor: avatarUrl ? undefined : BRAND_PRIMARY,
            }}
          />
          <Upload
            accept="image/jpeg"
            showUploadList={false}
            beforeUpload={(file) => {
              onAvatarUpload(file);
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
                backgroundColor: BRAND_PRIMARY,
                borderColor: BRAND_PRIMARY,
                color: WHITE,
                boxShadow: SHADOW_BUTTON,
              }}
            />
          </Upload>
        </div>
        <Typography.Title
          level={3}
          className="profile-header-name"
          style={{ margin: 0 }}
        >
          {displayName}
        </Typography.Title>
        {username && (
          <Typography.Text
            type="secondary"
            style={{ fontSize: 14, marginTop: 4 }}
          >
            @{username}
          </Typography.Text>
        )}
      </Flex>
    </Card>
  </>
);

export default ProfileHeader;
