import { Flex, Form, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BRAND_PRIMARY } from '../../design';
import { supabase } from '../../utils/supabase';
import { Paths } from '../paths';
import {
  AuthCard,
  AuthCardHeader,
  AuthSubmitButton,
  AuthSuccessMessage,
  EmailField,
} from './components';
import useAuthAction from './hooks/useAuthAction';

type TForgotPasswordForm = {
  email: string;
};

const ForgotPasswordCard = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { isLoading, contextHolder, run } = useAuthAction({
    errorTitle: 'Request failed',
  });
  const navigate = useNavigate();

  const onFinish = async (form: TForgotPasswordForm) => {
    const ok = await run(() =>
      supabase.auth.resetPasswordForEmail(form.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
    );
    if (ok) setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <>
        {contextHolder}
        <AuthSuccessMessage
          title="Check your email"
          message="If an account exists with that email, we've sent a password reset link. Please check your inbox."
        />
      </>
    );
  }

  return (
    <>
      {contextHolder}
      <AuthCard>
        <AuthCardHeader
          title="Forgot your password?"
          subtitle="Enter your email address and we'll send you a link to reset your password."
        />
        <Form
          size="large"
          name="forgot-password"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <EmailField />
          <AuthSubmitButton label="Send reset link" isLoading={isLoading} />
        </Form>

        <Flex justify="center">
          <Typography.Link
            onClick={() => navigate(Paths.SignIn)}
            style={{ color: BRAND_PRIMARY, fontWeight: 600, fontSize: 15 }}
          >
            Back to Sign In
          </Typography.Link>
        </Flex>
      </AuthCard>
    </>
  );
};

export default ForgotPasswordCard;
