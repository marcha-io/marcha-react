import { Card } from 'antd';

import { RADIUS_XL, SHADOW_CARD } from '../../design';

interface AuthCardProps {
  children: React.ReactNode;
}

/**
 * Consistent card shell used by every auth form (sign-in, sign-up,
 * forgot-password, reset-password).  Keeps the border-radius, shadow, and
 * body padding in one place.
 */
const AuthCard = ({ children }: AuthCardProps) => (
  <Card
    style={{ borderRadius: RADIUS_XL, boxShadow: SHADOW_CARD }}
    styles={{ body: { padding: '40px 40px 32px' } }}
  >
    {children}
  </Card>
);

export default AuthCard;
