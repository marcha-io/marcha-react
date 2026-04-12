import { PlusOutlined } from '@ant-design/icons';
import { Card, Col, Flex, Row, Typography } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  EntryPointComponent,
  PreloadedQuery,
  usePreloadedQuery,
} from 'react-relay';

import { NEUTRAL_200, NEUTRAL_400, NEUTRAL_700, RADIUS_LG } from '../../design';
import MarchaAvatar from '../Avatars/MarchaAvatar';
import CommunityCardContainer from './CommunityCardContainer';
import { CommunityPickerComponentQuery } from './__generated__/CommunityPickerComponentQuery.graphql';

const communityPickerComponentQuery = graphql`
  query CommunityPickerComponentQuery {
    ...CommunityCardContainer_query
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
    <>
      <style>{`
        .community-picker-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          box-sizing: border-box;
        }
        @media (max-width: 767px) {
          .community-picker-page {
            min-height: unset;
            display: block;
            padding: 24px 20px 40px;
          }
        }
      `}</style>
      <div className="community-picker-page">
        <Flex
          vertical
          gap={32}
          style={{
            width: '100%',
            maxWidth: '900px',
          }}
        >
          <Flex vertical gap={0}>
            <Flex gap="small">
              <MarchaAvatar />{' '}
              <div>
                <Typography.Text strong style={{ fontSize: 16 }}>
                  Marcha
                </Typography.Text>
                <br />
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  Resident Portal
                </Typography.Text>
              </div>
            </Flex>
            <Typography.Title level={2} style={{ marginBottom: 4 }}>
              Welcome back, {firstName}
            </Typography.Title>
            <Typography.Text type="secondary">
              Select a community to continue
            </Typography.Text>
          </Flex>
          <Row gutter={[24, 24]}>
            <CommunityCardContainer fragmentRef={query} />
            <Col xs={24} md={12}>
              <Card
                style={{
                  borderRadius: RADIUS_LG,
                  border: `2px dashed ${NEUTRAL_200}`,
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
                  style={{ fontSize: 32, color: NEUTRAL_400, marginBottom: 12 }}
                />
                <Typography.Title level={5} style={{ color: NEUTRAL_700 }}>
                  Join a Community
                </Typography.Title>
                <Typography.Text type="secondary">
                  Enter an invite code or request access to another property
                </Typography.Text>
              </Card>
            </Col>
          </Row>
        </Flex>
      </div>
    </>
  );
};

export default CommunityPicker;
