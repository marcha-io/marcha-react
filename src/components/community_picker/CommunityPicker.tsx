// src/components/community_picker/CommunityPicker.tsx
import { PlusOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Flex, Row, Space, Typography } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  EntryPointComponent,
  PreloadedQuery,
  usePreloadedQuery,
} from 'react-relay';

import CommunityCard from './CommunityCard';
import { CommunityPickerComponentQuery } from './__generated__/CommunityPickerComponentQuery.graphql';

const communityPickerComponentQuery = graphql`
  query CommunityPickerComponentQuery($userId: UUIDFilter!) {
    ...CommunityCard_query @arguments(userId: $userId)
    profilesCollection(filter: { id: $userId }, first: 1) {
      edges {
        node {
          firstName
        }
      }
    }
  }
`;

type Props = {
  queries: {
    communityPickerQuery: PreloadedQuery<CommunityPickerComponentQuery>;
  };
};

const CommunityPicker: EntryPointComponent<
  {
    communityPickerQuery: CommunityPickerComponentQuery;
  },
  Record<string, never>,
  Record<string, never>
> = (props: Props): React.ReactElement => {
  const query = usePreloadedQuery<CommunityPickerComponentQuery>(
    communityPickerComponentQuery,
    props.queries.communityPickerQuery
  );

  const firstName =
    query.profilesCollection?.edges[0]?.node.firstName ?? 'User';

  return (
    <Flex
      vertical
      style={{
        maxWidth: 900,
        margin: 'auto',
        padding: '40px 20px',
      }}
    >
      {/* Page header */}
      <Space direction="vertical" size={8} style={{ marginBottom: 32 }}>
        {/* Branding row */}
        <Space align="center" size={12}>
          <Avatar
            shape="circle"
            size={40}
            style={{
              backgroundColor: '#F06543',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            M
          </Avatar>
          <Space direction="vertical" size={0}>
            <Typography.Text strong style={{ fontSize: 16 }}>
              Marcha
            </Typography.Text>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Resident Portal
            </Typography.Text>
          </Space>
        </Space>

        {/* Welcome heading */}
        <Space direction="vertical" size={4}>
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            Welcome back, {firstName}
          </Typography.Title>
          <Typography.Text type="secondary">
            Select a community to continue
          </Typography.Text>
        </Space>
      </Space>

      {/* Community cards grid */}
      <Row gutter={[24, 24]}>
        <CommunityCard fragmentRef={query} />
        <Col xs={24} md={12}>
          <Card
            style={{
              borderRadius: 12,
              border: '2px dashed #d9d9d9',
              cursor: 'pointer',
              height: '100%',
            }}
            hoverable
          >
            <Flex
              vertical
              align="center"
              justify="center"
              style={{ minHeight: 160 }}
              gap={8}
            >
              <PlusOutlined style={{ fontSize: 32, color: '#bfbfbf' }} />
              <Typography.Title
                level={5}
                style={{ color: '#595959', marginBottom: 0 }}
              >
                Join a Community
              </Typography.Title>
              <Typography.Text type="secondary" style={{ textAlign: 'center' }}>
                Enter an invite code or request access to another property
              </Typography.Text>
            </Flex>
          </Card>
        </Col>
      </Row>
    </Flex>
  );
};

export default CommunityPicker;
