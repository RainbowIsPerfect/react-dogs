import { Navigate } from 'react-router-dom';
import { SignInForm } from '../../components/SignInForm';
import { useAppSelector } from '../../hooks/reduxHooks';
import { Routes } from '../../types';

export const SignIn = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to={Routes.Product} />;
  }

  return <SignInForm />;
};
