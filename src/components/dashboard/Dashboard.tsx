// src/components/dashboard/Dashboard.tsx
import {
  DollarCircleOutlined,
  FileTextOutlined,
  HomeOutlined,
  MessageOutlined,
  PlusOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  List,
  Row,
  Space,
  Statistic,
  Tag,
  Typography,
} from 'antd';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  EntryPointComponent,
  PreloadedQuery,
  usePreloadedQuery,
} from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';

import { getParseJsonAddress } from '../../utils/get_address';
import { Paths } from '../../views/paths';
import { DashboardComponentQuery } from './__generated__/DashboardComponentQuery.graphql';

const dashboardComponentQuery = graphql`
  query DashboardComponentQuery($communityId: BigIntFilter!) {
    profilesCollection(first: 1) {
      edges {
        node {
          firstName
          lastName
          avatarUrl
        }
      }
    }
    communityUsersCollection(
      filter: { communityId: $communityId, status: { eq: ACCEPTED } }
      first: 1
    ) {
      edges {
        node {
          communityId
          community {
            id
            name
            description
            address
            image
          }
        }
      }
    }
  }
`;

type Props = {
  queries: {
    dashboardQuery: PreloadedQuery<DashboardComponentQuery>;
  };
};

const Dashboard: EntryPointComponent<
  {
    dashboardQuery: DashboardComponentQuery;
  },
  Record<string, never>,
  Record<string, never>
> = (props: Props): React.ReactElement => {
  const navigate = useNavigate();
  const { communityId } = useParams<{ communityId: string }>();

  const data = usePreloadedQuery<DashboardComponentQuery>(
    dashboardComponentQuery,
    props.queries.dashboardQuery
  );

  const profile = data.profilesCollection?.edges[0]?.node;
  const firstName = profile?.firstName ?? 'User';
  const lastName = profile?.lastName ?? '';
  const fullName = `${firstName} ${lastName}`.trim();

  const communityUser = data.communityUsersCollection?.edges[0]?.node;
  const communityName = communityUser?.community?.name ?? 'Your Community';

  const addressDisplay = getParseJsonAddress(
    data?.communityUsersCollection?.edges[0]?.node?.community?.address
  );

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const basePath = `${Paths.Portal}/${communityId}`;

  return (
    <div>
      <Card
        style={{
          background:
            'linear-gradient(135deg, #F06543 0%, #E8553D 50%, #D94530 100%)',
          borderRadius: 16,
          border: 'none',
          marginBottom: 24,
        }}
        styles={{ body: { padding: '32px' } }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Typography.Text
              style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}
            >
              {greeting}
            </Typography.Text>
            <Typography.Title
              level={2}
              style={{ color: '#fff', margin: '4px 0 12px' }}
            >
              {fullName}
            </Typography.Title>
            <Tag
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#fff',
                borderRadius: 6,
                padding: '4px 12px',
              }}
            >
              <HomeOutlined style={{ marginRight: 6 }} />
              {communityName}
              {addressDisplay ? ` — ${addressDisplay}` : ''}
            </Tag>
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 8,
              }}
              onClick={() => navigate(`${basePath}/${Paths.Maintenance}`)}
            >
              New Request
            </Button>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            style={{ borderRadius: 12 }}
            onClick={() => navigate(`${basePath}/${Paths.ServiceCharges}`)}
          >
            <Space vertical size={4}>
              <Space>
                <DollarCircleOutlined
                  style={{ fontSize: 20, color: '#1890ff' }}
                />
                <Tag color="green">Paid</Tag>
              </Space>
              <Statistic
                value={0}
                precision={2}
                prefix="£"
                style={{ fontSize: 28, fontWeight: 600 }}
              />
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                Next payment: TBD
              </Typography.Text>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            style={{ borderRadius: 12 }}
            onClick={() => navigate(`${basePath}/${Paths.Maintenance}`)}
          >
            <Space vertical size={4}>
              <Space>
                <ToolOutlined style={{ fontSize: 20, color: '#F06543' }} />
                <Tag color="orange">Active</Tag>
              </Space>
              <Statistic value={0} style={{ fontSize: 28, fontWeight: 600 }} />
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                Open maintenance requests
              </Typography.Text>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            style={{ borderRadius: 12 }}
            onClick={() => navigate(`${basePath}/${Paths.Messages}`)}
          >
            <Space vertical size={4}>
              <Space>
                <MessageOutlined style={{ fontSize: 20, color: '#722ed1' }} />
              </Space>
              <Statistic value={0} style={{ fontSize: 28, fontWeight: 600 }} />
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                Unread messages
              </Typography.Text>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            style={{ borderRadius: 12 }}
            onClick={() => navigate(`${basePath}/${Paths.Documents}`)}
          >
            <Space vertical size={4}>
              <Space>
                <FileTextOutlined style={{ fontSize: 20, color: '#52c41a' }} />
                <Tag color="green">1 New</Tag>
              </Space>
              <Statistic value={0} style={{ fontSize: 28, fontWeight: 600 }} />
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                Documents available
              </Typography.Text>
            </Space>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card
            title="Active Requests"
            extra={
              <Typography.Link
                onClick={() => navigate(`${basePath}/${Paths.Maintenance}`)}
              >
                See all &gt;
              </Typography.Link>
            }
            style={{ borderRadius: 12, marginBottom: 24 }}
          >
            <List
              dataSource={[]}
              locale={{ emptyText: 'No active maintenance requests' }}
              renderItem={() => null}
            />
          </Card>

          <Card
            title="Community Updates"
            extra={
              <Typography.Link
                onClick={() => navigate(`${basePath}/${Paths.Community}`)}
              >
                See all &gt;
              </Typography.Link>
            }
            style={{ borderRadius: 12 }}
          >
            <List
              dataSource={[]}
              locale={{ emptyText: 'No community updates yet' }}
              renderItem={() => null}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title="Recent Messages"
            extra={
              <Typography.Link
                onClick={() => navigate(`${basePath}/${Paths.Messages}`)}
              >
                View all
              </Typography.Link>
            }
            style={{ borderRadius: 12, marginBottom: 24 }}
          >
            <List
              dataSource={[]}
              locale={{ emptyText: 'No messages yet' }}
              renderItem={() => null}
            />
          </Card>

          <Card
            title="Marketplace"
            extra={
              <Typography.Link
                onClick={() => navigate(`${basePath}/${Paths.Market}`)}
              >
                Browse
              </Typography.Link>
            }
            style={{ borderRadius: 12, marginBottom: 24 }}
          >
            <List
              dataSource={[]}
              locale={{ emptyText: 'No marketplace items yet' }}
              renderItem={() => null}
            />
          </Card>

          <Card title="Upcoming Events" style={{ borderRadius: 12 }}>
            <List
              dataSource={[]}
              locale={{ emptyText: 'No upcoming events' }}
              renderItem={() => null}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
