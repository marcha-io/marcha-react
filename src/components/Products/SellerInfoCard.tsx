import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Space, Typography } from 'antd';
import React from 'react';

import { AVATAR_DEFAULT } from '../marketplace/constants';

type SellerInfoCardProps = {
  username: string | null;
  avatarBlob: Blob | null;
};

/**
 * Seller information card with avatar and profile link.
 */
const SellerInfoCard: React.FC<SellerInfoCardProps> = ({
  username,
  avatarBlob,
}) => (
  <Card title="Seller Information" style={{ marginTop: 16 }}>
    <Space size="middle">
      <Avatar
        size={64}
        src={avatarBlob ? URL.createObjectURL(avatarBlob) : AVATAR_DEFAULT}
        icon={<UserOutlined />}
      />
      <div>
        <Typography.Title level={5} style={{ marginBottom: '4px' }}>
          {username || 'Anonymous'}
        </Typography.Title>
        <br />
        <Button type="link" style={{ paddingLeft: 0 }}>
          View Seller Profile
        </Button>
      </div>
    </Space>
  </Card>
);

export default SellerInfoCard;
