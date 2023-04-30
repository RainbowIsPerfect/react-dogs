import { SignInForm } from '../../components/SignInForm';
import { TypedLink } from '../../components/TypedLink';
import { useAppSelector } from '../../hooks/reduxHooks';

export const SignIn = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return <TypedLink component="Navigate" to="/" />;
  }

  return <SignInForm />;
};
