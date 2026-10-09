import { Flex, Space, Typography } from 'antd';

import { OVERLAY_LIGHTER, OVERLAY_TEXT_MUTED, WHITE } from '../../design';

const FeatureBullet = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Space align="start" size={14}>
    <Flex
      align="center"
      justify="center"
      style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        background: OVERLAY_LIGHTER,
        flexShrink: 0,
        fontSize: 18,
        color: WHITE,
      }}
    >
      {icon}
    </Flex>
    <Space vertical size={2}>
      <Typography.Text strong style={{ color: WHITE, fontSize: 14 }}>
        {title}
      </Typography.Text>
      <Typography.Text style={{ color: OVERLAY_TEXT_MUTED, fontSize: 13 }}>
        {description}
      </Typography.Text>
    </Space>
  </Space>
);

export default FeatureBullet;
