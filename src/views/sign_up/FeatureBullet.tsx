import { Flex, Space, Typography } from 'antd';

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
        background: 'rgba(255,255,255,0.18)',
        flexShrink: 0,
        fontSize: 18,
        color: '#fff',
      }}
    >
      {icon}
    </Flex>
    <Space vertical size={2}>
      <Typography.Text strong style={{ color: '#fff', fontSize: 14 }}>
        {title}
      </Typography.Text>
      <Typography.Text
        style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}
      >
        {description}
      </Typography.Text>
    </Space>
  </Space>
);

export default FeatureBullet;
