import { ReactElement } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { TypedNavigate } from '../TypedLinks/TypedNavigate';

interface PrivateRouteProps {
  children: ReactElement;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return children;
  }

  return <TypedNavigate to="/signin" />;
};
