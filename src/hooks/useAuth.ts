import { logIn, logOut } from '../store/slices/authSlice';
import {
  useSetSignInMutation,
  type UserSignInData,
} from '../store/slices/productsSlice';
import { useAppDispatch } from './reduxHooks';

export const useAuth = () => {
  const [setSignIn, result] = useSetSignInMutation();
  const dispatch = useAppDispatch();

  const logInUser = async (values: UserSignInData): Promise<void> => {
    const userData = await setSignIn(values).unwrap();
    dispatch(logIn(userData));
  };

  const logOutUser = (): void => {
    dispatch(logOut());
  };

  return [logInUser, result, logOutUser] as const;
};
