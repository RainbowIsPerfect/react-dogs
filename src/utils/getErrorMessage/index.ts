import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

const isObject = (obj: unknown): obj is object => {
  return typeof obj === 'object' && obj !== null;
};

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return isObject(error) && 'status' in error;
}

export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    isObject(error) &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
}

export const getErrorMessage = (error: unknown) => {
  if (isFetchBaseQueryError(error)) {
    if (isErrorWithMessage(error?.data)) {
      return error.data.message;
    }
  } else if (isErrorWithMessage(error)) {
    return error.message;
  }
  return undefined;
};
