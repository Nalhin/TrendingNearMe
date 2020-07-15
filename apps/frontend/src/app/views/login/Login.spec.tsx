import React from 'react';
import { act, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { AxiosResponse } from 'axios';

import { AuthUserResponseDto } from '@trends/data';
import { authUserResponseDtoBuilder, loginUserDtoBuilder } from '@trends/data';

import Login from './Login';
import * as authApi from '../../api/auth.api';
import { renderWithProviders } from '../../../../test/utils/render-with-providers';
import * as userHook from '../../hooks/useUser';
import { UserContextProps } from '../../hooks/useUser';

describe('Login Page', () => {
  const inputs = loginUserDtoBuilder.buildOne();

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const login = async (getByText) => {
    for (const [key, value] of Object.entries(inputs)) {
      const input = getByText(new RegExp(`${key}`, 'i')).nextSibling.firstChild;
      fireEvent.change(input, { target: { value } });
    }
    await act(async () => {
      fireEvent.submit(getByText(/login/i));
    });
  };

  it('should send form data and authenticate user', async () => {
    const authResponse = authUserResponseDtoBuilder.buildOne();
    jest
      .spyOn(authApi, 'fetchLoginUser')
      .mockResolvedValueOnce({ data: authResponse } as AxiosResponse<
        AuthUserResponseDto
      >);
    const authenticateUser = jest.fn();
    jest
      .spyOn(userHook, 'useUser')
      .mockReturnValue(({ authenticateUser } as unknown) as UserContextProps);
    const { getByText } = renderWithProviders(<Login />);

    await login(getByText);

    expect(authApi.fetchLoginUser).toBeCalledWith(inputs);
    expect(authenticateUser).toBeCalledWith(authResponse);
  });

  it('should display error if login is unsuccessful', async () => {
    jest
      .spyOn(authApi, 'fetchLoginUser')
      .mockRejectedValueOnce({ message: 'error' });
    const authenticateUser = jest.fn();
    jest
      .spyOn(userHook, 'useUser')
      .mockReturnValue(({ authenticateUser } as unknown) as UserContextProps);

    const { getByText, findByText } = renderWithProviders(<Login />);

    await login(getByText);

    await waitFor(() => expect(authApi.fetchLoginUser).toBeCalledWith(inputs));
    expect(authenticateUser).toBeCalledTimes(0);
    expect(await findByText(/error/i)).toBeInTheDocument();
  });
});
