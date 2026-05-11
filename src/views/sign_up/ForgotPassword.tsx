import AuthPageLayout from './AuthPageLayout';
import ForgotPasswordCard from './ForgotPasswordCard';

const ForgotPassword = (): React.ReactElement => {
  return (
    <AuthPageLayout>
      <ForgotPasswordCard />
    </AuthPageLayout>
  );
};

export default ForgotPassword;
