import { Divider, Flex, Form, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BRAND_PRIMARY } from '../../design';
import { supabase } from '../../utils/supabase';
import { Paths } from '../../views/paths';
import AuthCard from './AuthCard';
import AuthCardHeader from './AuthCardHeader';
import {
  ConfirmPasswordField,
  EmailField,
  PasswordField,
} from './AuthFormFields';
import AuthSubmitButton from './AuthSubmitButton';
import AuthSuccessMessage from './AuthSuccessMessage';
import useAuthAction from './hooks/useAuthAction';

type TSignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpCard = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { isLoading, contextHolder, run } = useAuthAction({
    errorTitle: 'Registration failed',
  });
  const navigate = useNavigate();

  const onFinish = async (form: TSignUpForm) => {
    const ok = await run(() =>
      supabase.auth.signUp({ email: form.email, password: form.password })
    );
    if (ok) setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <>
        {contextHolder}
        <AuthSuccessMessage
          title="Check your email"
          message="We've sent a confirmation link to your email address. Please check your inbox and click the link to activate your account."
        />
      </>
    );
  }

  return (
    <>
      {contextHolder}
      <AuthCard>
        <AuthCardHeader
          title="Create your account"
          subtitle="Sign up to join your resident community"
        />
        <Form
          size="large"
          name="register"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <EmailField />
          <PasswordField withMinLength />
          <ConfirmPasswordField />
          <AuthSubmitButton label="Create account" isLoading={isLoading} />
        </Form>

        <Divider style={{ margin: '0 0 20px' }}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Already have an account?
          </Typography.Text>
        </Divider>

        <Flex justify="center">
          <Typography.Link
            onClick={() => navigate(Paths.SignIn)}
            style={{ color: BRAND_PRIMARY, fontWeight: 600, fontSize: 15 }}
          >
            Sign in instead
          </Typography.Link>
        </Flex>
      </AuthCard>
    </>
  );
};

export default SignUpCard;
