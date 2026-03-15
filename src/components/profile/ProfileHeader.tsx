import { CameraOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Flex, Spin, Typography, Upload } from 'antd';
import React from 'react';

import { BRAND_COLOR, BRAND_DARK } from '../..';

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
      }}
    />
    <Flex vertical align="center" style={{ marginTop: -60, paddingBottom: 24 }}>
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
);

export default ProfileHeader;
