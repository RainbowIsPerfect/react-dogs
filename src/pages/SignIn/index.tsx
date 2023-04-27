import { Navigate } from 'react-router-dom';
import { SignInForm } from '../../components/SignInForm';
import { useAppSelector } from '../../hooks/reduxHooks';

export const SignIn = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  // if (isLoggedIn) {
  //   return <p>Youre already logged in</p>;
  // }

  return <SignInForm />;
};

/* <Navigate to="/" /> */
