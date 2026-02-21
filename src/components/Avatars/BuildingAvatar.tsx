import { HomeOutlined } from '@ant-design/icons';
import { Flex } from 'antd';

import { BRAND_COLOR } from '../..';

type Props = {
  communityImg?: string | null;
};

const BuildingAvatar = ({ communityImg = null }: Props) => {
  return (
    <>
      {communityImg != null ? (
        <img
          src={communityImg}
          alt="community logo"
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            objectFit: 'cover',
          }}
        />
      ) : (
        <Flex
          align="center"
          justify="center"
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: BRAND_COLOR,
          }}
        >
          <HomeOutlined style={{ fontSize: 24, color: '#fff' }} />
        </Flex>
      )}
    </>
  );
};

export default BuildingAvatar;
