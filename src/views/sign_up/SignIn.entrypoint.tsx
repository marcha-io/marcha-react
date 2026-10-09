import { notification } from 'antd';

import AuthPageLayout from '../../components/sign_up/AuthPageLayout';
import SignInCard from '../../components/sign_up/SignInCard';

const SignIn = (): React.ReactElement => {
  const [_, contextHolder] = notification.useNotification();

  return (
    <AuthPageLayout>
      {contextHolder}
      <SignInCard />
    </AuthPageLayout>
  );
};

export default SignIn;
