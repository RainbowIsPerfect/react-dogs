import { SignUpForm } from '../../components/SignUpForm';
import { TypedLink } from '../../components/TypedLink';
import { useAppSelector } from '../../hooks/reduxHooks';

export const SignUp = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return <TypedLink component="Navigate" to="/" />;
  }

  return <SignUpForm />;
};
