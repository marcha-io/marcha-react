import AuthPageLayout from '../../components/sign_up/AuthPageLayout';
import SignUpCard from '../../components/sign_up/SignUpCard';

const SignUp = (): React.ReactElement => {
  return (
    <AuthPageLayout>
      <SignUpCard />
    </AuthPageLayout>
  );
};

export default SignUp;
