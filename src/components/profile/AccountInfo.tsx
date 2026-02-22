import { Card, Divider, Flex, Space, Typography } from 'antd';
import React from 'react';

const BORDER = '#E5E7EB';

type AccountInfoProps = {
  userId: string;
  onboarded: boolean | null;
};

const AccountInfo: React.FC<AccountInfoProps> = ({ userId, onboarded }) => (
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
          <Typography.Text type="secondary" copyable style={{ fontSize: 13 }}>
            {userId}
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
            {onboarded ? 'Yes' : 'Not yet'}
          </Typography.Text>
        </Space>
      </Flex>
    </Space>
  </Card>
);

export default AccountInfo;
