import { Button, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { BRAND_PRIMARY, NEUTRAL_900 } from '../../../design';
import { Paths } from '../../paths';
import AuthCard from './AuthCard';

interface AuthSuccessMessageProps {
  title: string;
  message: string;
}

/**
 * Inline success state shown after a form submission completes.
 * Replaces the form card content in SignUpCard and ForgotPasswordCard.
 */
const AuthSuccessMessage = ({ title, message }: AuthSuccessMessageProps) => {
  const navigate = useNavigate();

  return (
    <AuthCard>
      <Space
        direction="vertical"
        size={16}
        style={{ width: '100%', textAlign: 'center' }}
      >
        <Typography.Title level={3} style={{ margin: 0, color: NEUTRAL_900 }}>
          {title}
        </Typography.Title>
        <Typography.Text type="secondary">{message}</Typography.Text>
        <Button
          type="link"
          onClick={() => navigate(Paths.SignIn)}
          style={{ color: BRAND_PRIMARY, fontWeight: 600 }}
        >
          Back to Sign In
        </Button>
      </Space>
    </AuthCard>
  );
};

export default AuthSuccessMessage;
