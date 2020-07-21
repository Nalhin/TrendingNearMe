import { act, renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import React from 'react';
import { AxiosResponse } from 'axios';
import { useUserProviderState, UserProvider } from './useUser';
import * as userApi from '../api/user.api';
import { cookies } from '../config/cookies.config';

import { userResponseDtoBuilder } from '@trends/fixtures';
import { AuthenticatedUser, UserResponseDto } from '@trends/data';

describe('useUser', () => {
  const user = userResponseDtoBuilder.buildOne();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useUserProviderState hook', () => {
    it('should fetch user and set user as response, if token is present', async () => {
      jest
        .spyOn(userApi, 'fetchMe')
        .mockResolvedValueOnce({ data: user } as AxiosResponse<
          UserResponseDto
        >);
      jest.spyOn(cookies, 'getAuthCookie').mockReturnValueOnce('token');
      const { result, waitForNextUpdate } = renderHook(() =>
        useUserProviderState(),
      );

      await waitForNextUpdate();

      expect(cookies.getAuthCookie).toBeCalledTimes(1);
      expect(userApi.fetchMe).toBeCalledTimes(1);
      expect(result.current.user.isAuthenticated).toBeTruthy();
      expect(result.current.isLoading).toBeFalsy();
    });

    it('should remove token, if request is not successful', async () => {
      jest.spyOn(cookies, 'getAuthCookie').mockReturnValueOnce('token');
      jest.spyOn(userApi, 'fetchMe').mockRejectedValueOnce('');

      const { result, waitForNextUpdate } = renderHook(() =>
        useUserProviderState(),
      );

      await waitForNextUpdate();

      expect(cookies.getAuthCookie).toBeCalledTimes(1);
      expect(userApi.fetchMe).toBeCalledTimes(1);
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.user.isAuthenticated).toBeFalsy();
    });

    it('should set loading to false, if token is falsy', () => {
      jest.spyOn(cookies, 'getAuthCookie').mockReturnValueOnce('');

      const { result } = renderHook(() => useUserProviderState());

      expect(cookies.getAuthCookie).toBeCalledTimes(1);
      expect(result.current.isLoading).toBeFalsy();
    });

    it('should logout current user and remove auth cookie', () => {
      jest.spyOn(cookies, 'removeAuthCookie');
      const { result } = renderHook(() =>
        useUserProviderState(new AuthenticatedUser(user)),
      );

      act(() => {
        result.current.logoutUser();
      });

      expect(cookies.removeAuthCookie).toBeCalledTimes(1);
      expect(result.current.user.isAuthenticated).toBeFalsy();
    });

    describe('should authenticate current user', () => {
      jest.spyOn(cookies, 'setAuthCookie');

      const { result } = renderHook(() =>
        useUserProviderState(new AuthenticatedUser(user)),
      );

      act(() => {
        result.current.authenticateUser({ user, token: 'dd' });
      });

      expect(cookies.setAuthCookie).toBeCalledTimes(1);
      expect(result.current.user.isAuthenticated).toBeTruthy();
    });
  });

  describe('UserProvider', () => {
    it('should hide further content until user is resolved', async () => {
      jest.spyOn(cookies, 'getAuthCookie').mockReturnValueOnce('token');
      jest
        .spyOn(userApi, 'fetchMe')
        .mockResolvedValueOnce({ data: user } as AxiosResponse<
          UserResponseDto
        >);

      const { queryByText, findByText } = render(
        <UserProvider>
          <div>test</div>
        </UserProvider>,
      );

      expect(queryByText(/test/)).not.toBeInTheDocument();
      expect(await findByText(/test/)).toBeInTheDocument();
      expect(cookies.getAuthCookie).toBeCalledTimes(1);
      expect(userApi.fetchMe).toBeCalledTimes(1);
    });
  });
});
