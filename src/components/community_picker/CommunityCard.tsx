import { MessageOutlined, ToolOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Tag } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import { useEffect, useState } from 'react';
import { useFragment } from 'react-relay';

import { BRAND_COLOR } from '../..';
import fetchFromStorage from '../../utils/fetch_from_storage';
import { getParseJsonAddress } from '../../utils/get_address';
import BuildingAvatar from '../Avatars/BuildingAvatar';
import { CommunityCard_fragment$key } from './__generated__/CommunityCard_fragment.graphql';

const CommunityCardFragment = graphql`
  fragment CommunityCard_fragment on CommunityUsers {
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
`;

type Props = {
  fragmentRef: CommunityCard_fragment$key;
  handleSelectCommunity: (id: string, imageBlob: Blob | null) => void;
};

const CommunityCard = ({
  fragmentRef,
  handleSelectCommunity,
}: Props): React.ReactElement => {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  const communityFragment = useFragment(CommunityCardFragment, fragmentRef);

  useEffect(() => {
    if (communityFragment?.community?.image) {
      fetchFromStorage(
        communityFragment?.community?.image,
        'communities-images'
      ).then((blob) => setImageBlob(blob));
    }
  }, [communityFragment]);

  const addressDisplay = getParseJsonAddress(
    communityFragment?.community?.address
  );

  return (
    <Col xs={24} md={12} key={communityFragment?.communityId}>
      <Card
        hoverable
        onClick={() =>
          handleSelectCommunity(communityFragment?.communityId, imageBlob)
        }
        style={{ borderRadius: 12 }}
      >
        <Card.Meta
          avatar={
            <BuildingAvatar
              communityImg={
                imageBlob != null ? URL.createObjectURL(imageBlob) : null
              }
            />
          }
          title={communityFragment?.community?.name}
          description={addressDisplay}
        />
        <div style={{ marginTop: 16 }}>
          <Tag color="blue">{communityFragment?.status}</Tag>
        </div>
        <Row gutter={8} style={{ marginTop: 24, textAlign: 'center' }}>
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
              styles={{ content: { color: BRAND_COLOR } }}
            />
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default CommunityCard;
