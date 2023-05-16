import { useNavigate } from 'react-router-dom';
import {
  RoutesWithoutParams,
  DynamicRoutes,
  DynamicRoutesParams,
} from '../types';
import { getPath } from '../utils/getPath';

export const useAppNavigate = () => {
  const navigate = useNavigate();

  function appNavigate<T extends RoutesWithoutParams>(path: T): void;
  function appNavigate<T extends DynamicRoutes>(
    path: T,
    params: DynamicRoutesParams<T>
  ): void;
  function appNavigate(path: any, params?: any) {
    if (params) {
      return navigate(getPath(path, params));
    }
    return navigate(path);
  }

  return appNavigate;
};
