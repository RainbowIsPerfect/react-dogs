import { logIn, logOut } from '../store/slices/authSlice';
import {
  useSetSignInMutation,
  type UserSignInData,
} from '../store/slices/productsSlice';
import { localStorageHandler } from '../utils/localStorageHanlder';
import { useAppDispatch } from './reduxHooks';

export const useAuth = (): [
  (values: UserSignInData) => Promise<void>,
  typeof result,
  () => void
] => {
  const [setSignIn, result] = useSetSignInMutation();
  const dispatch = useAppDispatch();

  const logInUser = async (values: UserSignInData): Promise<void> => {
    const { token } = await setSignIn(values).unwrap();
    dispatch(logIn({ token }));
    localStorageHandler('set', 'user-token', token);
  };

  const logOutUser = (): void => {
    dispatch(logOut());
    localStorageHandler('remove', 'user-token');
  };

  return [logInUser, result, logOutUser];
};
