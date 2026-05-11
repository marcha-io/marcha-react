import { Button, Checkbox, Divider, Flex, Form, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { BRAND_PRIMARY } from '../../design';
import { invalidateRelayStore } from '../../utils/relay_environment';
import { supabase } from '../../utils/supabase';
import { Paths } from '../paths';
import {
  AuthCard,
  AuthCardHeader,
  AuthSubmitButton,
  EmailField,
  PasswordField,
} from './components';
import useAuthAction from './hooks/useAuthAction';

type TSignInForm = {
  email: string;
  password: string;
  remember?: boolean;
};

const SignInCard = () => {
  const { isLoading, contextHolder, run, notifySuccess } = useAuthAction({
    errorTitle: 'Sign in failed',
  });
  const { setIsUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (form: TSignInForm) => {
    const ok = await run(() =>
      supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      })
    );
    if (ok) {
      notifySuccess('Welcome back!');
      setIsUserLoggedIn(true);
      invalidateRelayStore();
      navigate(Paths.Main);
    }
  };

  return (
    <>
      {contextHolder}
      <AuthCard>
        <AuthCardHeader
          title="Sign in to Marcha"
          subtitle="Enter your credentials to access your resident portal"
        />
        <Form
          size="large"
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          requiredMark={false}
        >
          <EmailField />
          <PasswordField />
          <Form.Item style={{ marginBottom: 16, marginTop: 0 }}>
            <Flex justify="flex-end">
              <Typography.Link
                onClick={() => navigate(Paths.ForgotPassword)}
                style={{ fontSize: 13, color: BRAND_PRIMARY }}
              >
                Forgot password?
              </Typography.Link>
            </Flex>
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>
              <Typography.Text style={{ fontSize: 13 }}>
                Keep me signed in
              </Typography.Text>
            </Checkbox>
          </Form.Item>
          <AuthSubmitButton label="Sign in" isLoading={isLoading} />
        </Form>

        <Divider style={{ margin: '0 0 20px' }}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            New to Marcha?
          </Typography.Text>
        </Divider>

        <Button
          block
          size="large"
          onClick={() => navigate(Paths.SignUp)}
          style={{
            borderRadius: 8,
            height: 48,
            fontWeight: 600,
            fontSize: 15,
            borderColor: BRAND_PRIMARY,
            color: BRAND_PRIMARY,
          }}
        >
          Create an account
        </Button>
      </AuthCard>
    </>
  );
};

export default SignInCard;
