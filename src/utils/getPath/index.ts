import { DynamicRoutes, DynamicRoutesParams } from '../../types';

export const getPath = <
  T extends DynamicRoutes,
  K extends DynamicRoutesParams<T>,
  U extends Record<keyof K, string>
>(
  path: T,
  params: U
): string => {
  return (
    path.slice(0, path.indexOf(':')) +
    Object.keys(params)
      .map((param) =>
        param.replace(param, params[param as keyof typeof params])
      )
      .join('/')
  );
};
