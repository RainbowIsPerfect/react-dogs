import { SignUpForm } from '../../components/Forms/SignUpForm';
import { TypedNavigate } from '../../components/TypedLinks/TypedNavigate';
import { useAppSelector } from '../../hooks/reduxHooks';

export const SignUp = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return <TypedNavigate to="/" />;
  }

  return <SignUpForm />;
};
