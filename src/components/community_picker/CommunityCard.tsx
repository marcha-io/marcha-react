// src/components/community_picker/CommunityCard.tsx
import { HomeOutlined, MessageOutlined, ToolOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Tag, Typography } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay';
import { useNavigate } from 'react-router-dom';

import { useCommunity } from '../../contexts/CommunityContext';
import { Paths } from '../../views/paths';
import { CommunityCard_query$key } from './__generated__/CommunityCard_query.graphql';

const CommunityCardFragment = graphql`
  fragment CommunityCard_query on Query {
    communityUsersCollection(filter: { status: { eq: ACCEPTED } }) {
      edges {
        node {
          communityId
          status
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
  fragmentRef: CommunityCard_query$key;
};

const CommunityCard = ({ fragmentRef }: Props): React.ReactElement => {
  const data = useFragment(CommunityCardFragment, fragmentRef);
  const { setCommunityId } = useCommunity();
  const navigate = useNavigate();

  const handleSelectCommunity = (id: string) => {
    setCommunityId(id);
    navigate(`${Paths.Portal}/${id}/${Paths.Dashboard}`);
  };

  return (
    <>
      {data.communityUsersCollection?.edges.map(({ node }) => {
        // Parse address if it's a JSON string
        let addressDisplay = '';
        try {
          const addr =
            typeof node.community?.address === 'string'
              ? JSON.parse(node.community.address)
              : node.community?.address;
          addressDisplay =
            addr?.street || addr?.city
              ? `${addr.street || ''}${addr.city ? ', ' + addr.city : ''}`
              : String(node.community?.address ?? '');
        } catch {
          addressDisplay = String(node.community?.address ?? '');
        }

        return (
          <Col xs={24} md={12} key={node.communityId}>
            <Card
              hoverable
              onClick={() => handleSelectCommunity(node.communityId)}
              style={{ borderRadius: 12 }}
            >
              <Card.Meta
                avatar={
                  node.community?.image ? (
                    <img
                      src={node.community.image}
                      alt="community logo"
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: '#F06543',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <HomeOutlined style={{ fontSize: 24, color: '#fff' }} />
                    </div>
                  )
                }
                title={node.community?.name}
                description={addressDisplay}
              />
              <div style={{ marginTop: 16 }}>
                <Tag color="blue">{node.status}</Tag>
              </div>
              <Row gutter={16} style={{ marginTop: 24, textAlign: 'center' }}>
                <Col span={8}>
                  <Statistic
                    title="Open Requests"
                    value={0}
                    prefix={<ToolOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Messages"
                    value={0}
                    prefix={<MessageOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Balance"
                    value={0}
                    precision={2}
                    prefix="£"
                    valueStyle={{ color: '#F06543' }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        );
      })}
    </>
  );
};

export default CommunityCard;
