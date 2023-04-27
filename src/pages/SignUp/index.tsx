import { Navigate } from 'react-router-dom';
import { SignUpForm } from '../../components/SignUpForm';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getPath } from '../../utils/getPath';

export const SignUp = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <SignUpForm />;
};
