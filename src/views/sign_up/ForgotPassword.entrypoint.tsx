import AuthPageLayout from '../../components/sign_up/AuthPageLayout';
import ForgotPasswordCard from '../../components/sign_up/ForgotPasswordCard';

const ForgotPassword = (): React.ReactElement => {
  return (
    <AuthPageLayout>
      <ForgotPasswordCard />
    </AuthPageLayout>
  );
};

export default ForgotPassword;
