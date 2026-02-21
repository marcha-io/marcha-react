import { HomeOutlined } from '@ant-design/icons';
import { Flex } from 'antd';

import { BRAND_COLOR } from '../..';

const BuildingAvatar = () => {
  return (
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
  );
};

export default BuildingAvatar;
