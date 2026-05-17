import AuthPageLayout from '../../components/sign_up/AuthPageLayout';
import ResetPasswordCard from '../../components/sign_up/ResetPasswordCard';

const ResetPassword = (): React.ReactElement => {
  return (
    <AuthPageLayout>
      <ResetPasswordCard />
    </AuthPageLayout>
  );
};

export default ResetPassword;
