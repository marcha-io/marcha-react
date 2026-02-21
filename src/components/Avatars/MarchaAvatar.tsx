import { Flex } from 'antd';

import { BRAND_COLOR } from '../..';

const MarchaAvatar = () => {
  return (
    <Flex
      align="center"
      justify="center"
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: BRAND_COLOR,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
      }}
    >
      M
    </Flex>
  );
};

export default MarchaAvatar;
