import { Navigate } from 'react-router-dom';
import { DynamicRoutes, Routes } from '../../../types';
import { getPath } from '../../../utils/getPath';
import { TypedNavigateProps } from '../types';

export const TypedNavigate = <T extends Routes>({
  to,
  params,
  ...props
}: TypedNavigateProps<T>) => {
  return (
    <Navigate
      to={params ? getPath(to as DynamicRoutes, params) : to}
      {...props}
    />
  );
};
