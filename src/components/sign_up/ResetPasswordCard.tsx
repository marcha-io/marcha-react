import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../../utils/supabase';
import { Paths } from '../../views/paths';
import AuthCard from './AuthCard';
import AuthCardHeader from './AuthCardHeader';
import { ConfirmPasswordField, PasswordField } from './AuthFormFields';
import AuthSubmitButton from './AuthSubmitButton';
import useAuthAction from './hooks/useAuthAction';

type TResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordCard = () => {
  const { isLoading, contextHolder, run, notifySuccess } = useAuthAction({
    errorTitle: 'Password reset failed',
  });
  const navigate = useNavigate();

  const onFinish = async (form: TResetPasswordForm) => {
    const ok = await run(() =>
      supabase.auth.updateUser({ password: form.password })
    );
    if (ok) {
      notifySuccess(
        'Password updated successfully',
        'You can now sign in with your new password.'
      );
      setTimeout(() => navigate(Paths.SignIn), 2000);
    }
  };

  return (
    <>
      {contextHolder}
      <AuthCard>
        <AuthCardHeader
          title="Set new password"
          subtitle="Enter your new password below to complete the reset."
        />
        <Form
          size="large"
          name="reset-password"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <PasswordField label="New password" withMinLength />
          <ConfirmPasswordField label="Confirm new password" />
          <AuthSubmitButton label="Reset password" isLoading={isLoading} />
        </Form>
      </AuthCard>
    </>
  );
};

export default ResetPasswordCard;
