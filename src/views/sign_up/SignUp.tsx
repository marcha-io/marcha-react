import AuthPageLayout from './AuthPageLayout';
import SignUpCard from './SignUpCard';

const SignUp = (): React.ReactElement => {
  return (
    <AuthPageLayout>
      <SignUpCard />
    </AuthPageLayout>
  );
};

export default SignUp;
