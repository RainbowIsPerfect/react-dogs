import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';

interface PrivateRouteProps {
  children: ReactElement;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  if (isLoggedIn) {
    return children;
  }

  return <Navigate to="signin" />;
};
