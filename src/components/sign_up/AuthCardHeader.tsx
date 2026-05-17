import { Space, Typography } from 'antd';

import { NEUTRAL_900 } from '../../design';

interface AuthCardHeaderProps {
  title: string;
  subtitle: string;
}

/**
 * Title + subtitle block that appears at the top of every auth card.
 */
const AuthCardHeader = ({ title, subtitle }: AuthCardHeaderProps) => (
  <Space direction="vertical" size={4} style={{ marginBottom: 32 }}>
    <Typography.Title level={3} style={{ margin: 0, color: NEUTRAL_900 }}>
      {title}
    </Typography.Title>
    <Typography.Text type="secondary">{subtitle}</Typography.Text>
  </Space>
);

export default AuthCardHeader;
