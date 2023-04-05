import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  if (isLoggedIn) {
    return children;
  }

  return <Navigate to="/" />;
};
