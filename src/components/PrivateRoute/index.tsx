import { ReactElement } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { TypedLink } from '../TypedLink';

interface PrivateRouteProps {
  children: ReactElement;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return children;
  }

  return <TypedLink component="Navigate" to="/signin" />;
};
