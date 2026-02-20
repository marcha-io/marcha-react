// src/components/community_picker/CommunityPicker.tsx
import { PlusOutlined } from '@ant-design/icons';
import { Card, Col, Row, Typography } from 'antd';
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
  query CommunityPickerComponentQuery {
    ...CommunityCard_query
    profilesCollection(first: 1) {
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
    <div
      style={{
        maxWidth: 900,
        margin: 'auto',
        padding: '40px 20px',
      }}
    >
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#52c41a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            M
          </div>
          <div>
            <Typography.Text strong style={{ fontSize: 16 }}>
              Marcha
            </Typography.Text>
            <br />
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Resident Portal
            </Typography.Text>
          </div>
        </div>
        <Typography.Title level={2} style={{ marginBottom: 4 }}>
          Welcome back, {firstName}
        </Typography.Title>
        <Typography.Text type="secondary">
          Select a community to continue
        </Typography.Text>
      </div>
      <Row gutter={[24, 24]}>
        <CommunityCard fragmentRef={query} />
        <Col xs={24} md={12}>
          <Card
            style={{
              borderRadius: 12,
              border: '2px dashed #d9d9d9',
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            hoverable
          >
            <PlusOutlined
              style={{ fontSize: 32, color: '#bfbfbf', marginBottom: 12 }}
            />
            <Typography.Title level={5} style={{ color: '#595959' }}>
              Join a Community
            </Typography.Title>
            <Typography.Text type="secondary">
              Enter an invite code or request access to another property
            </Typography.Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CommunityPicker;
