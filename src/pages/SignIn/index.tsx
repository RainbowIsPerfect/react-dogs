import { Navigate } from 'react-router-dom';
import { SignInForm } from '../../components/SignInForm';
import { useAppSelector } from '../../hooks/reduxHooks';
import { localStorageHandler } from '../../utils/localStorageHanlder';

export const SignIn = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  console.log(isLoggedIn);
  console.log(localStorageHandler.get('token'));

  if (isLoggedIn) {
    return <Navigate to="/products" />;
  }

  return <SignInForm />;
};
