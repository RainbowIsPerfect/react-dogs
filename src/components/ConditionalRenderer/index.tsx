import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ReactNode } from 'react';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { Loader } from '../UI/Loaders/Spinner';
import s from './renderer.module.scss';

interface ConditionalRendererProps {
  isLoading: boolean;
  isSuccess: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  children: ReactNode;
  isFetching?: boolean;
  loader?: ReactNode;
  className?: string;
}

export const ConditionalRenderer = ({
  isLoading,
  isSuccess,
  error,
  children,
  loader = <Loader />,
  isFetching = false,
  className = '',
}: ConditionalRendererProps) => {
  const condition = isLoading || isFetching || !!error;

  return (
    <div className={condition ? '' : className}>
      {(isLoading || isFetching) && loader}
      {error && <p className={s.error}>{getErrorMessage(error)}</p>}
      {isSuccess && !isFetching && children}
    </div>
  );
};
