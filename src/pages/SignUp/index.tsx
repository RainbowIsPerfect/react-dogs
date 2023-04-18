import { Navigate } from 'react-router-dom';
import { SignUpForm } from '../../components/SignUpForm';
import { useAppSelector } from '../../hooks/reduxHooks';
import { Routes } from '../../types';

export const SignUp = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to={Routes.Product} />;
  }

  return <SignUpForm />;
};
