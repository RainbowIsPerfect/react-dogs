import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ReactElement } from 'react';
import { DefaultPropsWithChildren } from '../../types/prop-types';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { Loader } from '../UI/Loaders/Spinner';
import s from './renderer.module.scss';

interface ConditionalRendererProps extends DefaultPropsWithChildren {
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  isFetching?: boolean;
  loader?: ReactElement;
}

export const ConditionalRenderer = ({
  isLoading,
  error,
  children,
  loader = <Loader />,
  isFetching = false,
  className = '',
}: ConditionalRendererProps) => {
  if (isFetching || isLoading) {
    return loader;
  }

  if (error) {
    return <p className={s.error}>{getErrorMessage(error)}</p>;
  }

  return <div className={className}>{children}</div>;
};
