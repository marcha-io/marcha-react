import { Button, Form } from 'antd';

import { BRAND_PRIMARY, RADIUS_MD } from '../../design';

interface AuthSubmitButtonProps {
  label: string;
  isLoading: boolean;
}

/**
 * Full-width primary submit button used in every auth form.
 * Wrapped in a `Form.Item` so it participates in the form layout naturally.
 */
const AuthSubmitButton = ({ label, isLoading }: AuthSubmitButtonProps) => (
  <Form.Item style={{ marginBottom: 16 }}>
    <Button
      block
      type="primary"
      htmlType="submit"
      loading={isLoading}
      size="large"
      style={{
        background: BRAND_PRIMARY,
        borderColor: BRAND_PRIMARY,
        borderRadius: RADIUS_MD,
        height: 48,
        fontWeight: 600,
        fontSize: 15,
      }}
    >
      {label}
    </Button>
  </Form.Item>
);

export default AuthSubmitButton;
