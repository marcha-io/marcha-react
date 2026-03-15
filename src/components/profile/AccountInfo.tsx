import { Card, Flex, Space, Typography } from 'antd';
import React from 'react';

import { BORDER } from '../..';

type AccountInfoProps = {
  onboarded: boolean;
};

const AccountInfo: React.FC<AccountInfoProps> = ({ onboarded = false }) => {
  return (
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
      <Space vertical size={16} style={{ width: '100%' }}>
        <Flex justify="space-between" align="center">
          <Space vertical size={0}>
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
};

export default AccountInfo;
