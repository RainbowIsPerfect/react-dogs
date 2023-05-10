import { SignInForm } from '../../components/Forms/SignInForm';
import { TypedNavigate } from '../../components/TypedLinks/TypedNavigate';
import { useAppSelector } from '../../hooks/reduxHooks';

export const SignIn = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return <TypedNavigate to="/" />;
  }

  return <SignInForm />;
};
