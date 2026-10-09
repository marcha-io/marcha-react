import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Typography } from 'antd';

import { NEUTRAL_400, RADIUS_MD } from '../../design';

/** Shared label style used across all auth form fields. */
const FieldLabel = ({ text }: { text: string }) => (
  <Typography.Text strong style={{ fontSize: 13 }}>
    {text}
  </Typography.Text>
);

/**
 * Email address field — used in SignInCard, SignUpCard, and ForgotPasswordCard.
 */
export const EmailField = () => (
  <Form.Item
    name="email"
    label={<FieldLabel text="Email address" />}
    rules={[
      { required: true, message: 'Please enter your email' },
      { type: 'email', message: 'Please enter a valid email' },
    ]}
  >
    <Input
      prefix={<UserOutlined style={{ color: NEUTRAL_400 }} />}
      placeholder="you@example.com"
      style={{ borderRadius: RADIUS_MD }}
    />
  </Form.Item>
);

interface PasswordFieldProps {
  /** Form field name — defaults to "password". */
  name?: string;
  /** Label text — defaults to "Password". */
  label?: string;
  /** Whether to enforce a minimum length of 6 characters. */
  withMinLength?: boolean;
}

/**
 * Password field — used in SignInCard, SignUpCard, and ResetPasswordCard.
 */
export const PasswordField = ({
  name = 'password',
  label = 'Password',
  withMinLength = false,
}: PasswordFieldProps) => (
  <Form.Item
    name={name}
    label={<FieldLabel text={label} />}
    rules={[
      { required: true, message: `Please enter your ${label.toLowerCase()}` },
      ...(withMinLength
        ? [{ min: 6, message: 'Password must be at least 6 characters' }]
        : []),
    ]}
  >
    <Input.Password
      prefix={<LockOutlined style={{ color: NEUTRAL_400 }} />}
      placeholder="••••••••"
      style={{ borderRadius: RADIUS_MD }}
    />
  </Form.Item>
);

interface ConfirmPasswordFieldProps {
  /** The name of the field to match against — defaults to "password". */
  passwordFieldName?: string;
  /** Label text — defaults to "Confirm password". */
  label?: string;
}

/**
 * Confirm-password field with cross-field validation.
 * Used in SignUpCard and ResetPasswordCard.
 */
export const ConfirmPasswordField = ({
  passwordFieldName = 'password',
  label = 'Confirm password',
}: ConfirmPasswordFieldProps) => (
  <Form.Item
    name="confirmPassword"
    label={<FieldLabel text={label} />}
    dependencies={[passwordFieldName]}
    rules={[
      { required: true, message: 'Please confirm your password' },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue(passwordFieldName) === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Passwords do not match'));
        },
      }),
    ]}
  >
    <Input.Password
      prefix={<LockOutlined style={{ color: NEUTRAL_400 }} />}
      placeholder="••••••••"
      style={{ borderRadius: RADIUS_MD }}
    />
  </Form.Item>
);
