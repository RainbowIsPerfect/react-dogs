import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { RootState } from '..';
import {
  ExtendedUserSignUpData,
  User,
  UserData,
  UserInfo,
  UserRegisterData,
  UserSignInData,
} from '../../types';
import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      queryFn: async (userData, { getState }, _, baseQuery) => {
        const userGroup = (getState() as RootState).user.userData.group;
        const response = await baseQuery(`users/me`);

        if (response.error) {
          return { error: response.error as FetchBaseQueryError };
        }

        return { data: response.data as User };
      },
      providesTags: ['User'],
    }),
    setSignIn: builder.mutation<UserData, UserSignInData>({
      queryFn: async (userData, { dispatch }, _, baseQuery) => {
        const response = await baseQuery({
          url: `users/signin`,
          method: 'POST',
          body: userData,
        });

        if (response.error) {
          return { error: response.error as FetchBaseQueryError };
        }

        return { data: response.data as UserData };
      },
      invalidatesTags: ['User'],
    }),
    registUser: builder.mutation<UserRegisterData, ExtendedUserSignUpData>({
      queryFn: async (extendedSignUpData, { dispatch }, _, baseQuery) => {
        const { confirmPassword, ...signUpData } = extendedSignUpData;
        const response = await baseQuery({
          url: `users/signup`,
          method: 'POST',
          body: signUpData,
        });

        if (response.error) {
          return { error: response.error as FetchBaseQueryError };
        }

        return { data: response.data as UserRegisterData };
      },
      invalidatesTags: ['User'],
    }),
    changeUserInfo: builder.mutation<User, UserInfo>({
      queryFn: async (userInfo, { getState }, _, baseQuery) => {
        const userGroup = (getState() as RootState).user.userData.group;
        const response = await baseQuery({
          url: `v2/${userGroup}/users/me`,
          method: 'PATCH',
          body: userInfo,
        });

        if (response.error) {
          return { error: response.error as FetchBaseQueryError };
        }

        return { data: response.data as User };
      },
      invalidatesTags: ['User'],
    }),
    editUser: builder.mutation<User, UserInfo>({
      queryFn: async (userInfo, { getState, dispatch }, _, baseQuery) => {
        const stateUser = (getState() as RootState).user.userData;
        const userInfoResponse = await baseQuery({
          url: `users/me`,
          method: 'PATCH',
          body: userInfo,
        });

        if (userInfoResponse.error) {
          return { error: userInfoResponse.error as FetchBaseQueryError };
        }

        return { data: userInfoResponse.data as User };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useSetSignInMutation,
  useGetCurrentUserQuery,
  useRegistUserMutation,
  useEditUserMutation,
} = userApiSlice;
