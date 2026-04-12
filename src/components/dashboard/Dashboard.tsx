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

import {
  BRAND_GRADIENT,
  BRAND_PRIMARY,
  COLOR_INFO,
  COLOR_SUCCESS,
  OVERLAY_BORDER,
  OVERLAY_LIGHT,
  OVERLAY_TEXT,
  RADIUS_LG,
  RADIUS_MD,
  RADIUS_SM,
  RADIUS_XL,
  STAT_MESSAGES,
  WHITE,
} from '../../design';
import { getParseJsonAddress } from '../../utils/get_address';
import { Paths } from '../../views/paths';
import DashboardMarketplacePreview from './DashboardMarketplacePreview';
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

    ...DashboardMarketplacePreviewFragment
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
      <style>{`
        @media (max-width: 767px) {
          .dashboard-hero .ant-card-body {
            padding: 16px !important;
          }
          .dashboard-hero-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0 !important;
          }
          .dashboard-hero-name {
            font-size: 20px !important;
            word-break: break-word;
            overflow-wrap: break-word;
            margin: 2px 0 8px !important;
          }
          .dashboard-hero-btn {
            margin-top: 10px !important;
          }
          .dashboard-hero-btn .ant-btn {
            height: 36px !important;
            font-size: 14px !important;
          }
        }
      `}</style>
      <Card
        className="dashboard-hero"
        style={{
          background: BRAND_GRADIENT,
          borderRadius: RADIUS_XL,
          border: 'none',
          marginBottom: 24,
        }}
        styles={{ body: { padding: '32px' } }}
      >
        <Row
          className="dashboard-hero-row"
          justify="space-between"
          align="middle"
        >
          <Col>
            <Typography.Text style={{ color: OVERLAY_TEXT, fontSize: 14 }}>
              {greeting}
            </Typography.Text>
            <Typography.Title
              level={2}
              className="dashboard-hero-name"
              style={{
                color: WHITE,
                margin: '4px 0 12px',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {fullName}
            </Typography.Title>
            <Tag
              style={{
                background: OVERLAY_LIGHT,
                border: 'none',
                color: WHITE,
                borderRadius: RADIUS_SM,
                padding: '4px 12px',
              }}
            >
              <HomeOutlined style={{ marginRight: 6 }} />
              {communityName}
              {addressDisplay ? ` — ${addressDisplay}` : ''}
            </Tag>
          </Col>
          <Col className="dashboard-hero-btn">
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              style={{
                background: OVERLAY_LIGHT,
                border: `1px solid ${OVERLAY_BORDER}`,
                borderRadius: RADIUS_MD,
                marginTop: 16,
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
            style={{ borderRadius: RADIUS_LG }}
            onClick={() => navigate(`${basePath}/${Paths.ServiceCharges}`)}
          >
            <Space vertical size={4}>
              <Space>
                <DollarCircleOutlined
                  style={{ fontSize: 20, color: COLOR_INFO }}
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
            style={{ borderRadius: RADIUS_LG }}
            onClick={() => navigate(`${basePath}/${Paths.Maintenance}`)}
          >
            <Space vertical size={4}>
              <Space>
                <ToolOutlined style={{ fontSize: 20, color: BRAND_PRIMARY }} />
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
            style={{ borderRadius: RADIUS_LG }}
            onClick={() => navigate(`${basePath}/${Paths.Messages}`)}
          >
            <Space vertical size={4}>
              <Space>
                <MessageOutlined
                  style={{ fontSize: 20, color: STAT_MESSAGES }}
                />
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
            style={{ borderRadius: RADIUS_LG }}
            onClick={() => navigate(`${basePath}/${Paths.Documents}`)}
          >
            <Space vertical size={4}>
              <Space>
                <FileTextOutlined
                  style={{ fontSize: 20, color: COLOR_SUCCESS }}
                />
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
        {/* ── Left column: Active Requests + Community Updates ─────────── */}
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
            style={{ borderRadius: RADIUS_LG, marginBottom: 24 }}
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
            style={{ borderRadius: RADIUS_LG }}
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
            style={{ borderRadius: RADIUS_LG, marginBottom: 24 }}
          >
            <List
              dataSource={[]}
              locale={{ emptyText: 'No messages yet' }}
              renderItem={() => null}
            />
          </Card>

          <DashboardMarketplacePreview
            fragmentRef={data}
            onBrowse={() => navigate(`${basePath}/${Paths.Market}`)}
            onNavigateToListing={(id) =>
              navigate(`${basePath}/${Paths.Market}/${id}`)
            }
          />

          <Card title="Upcoming Events" style={{ borderRadius: RADIUS_LG }}>
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
