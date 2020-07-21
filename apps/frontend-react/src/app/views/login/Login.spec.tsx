import React from 'react';
import { act, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { AxiosResponse } from 'axios';

import { AuthUserResponseDto } from '@trends/data';
import {
  authUserResponseDtoBuilder,
  loginUserDtoBuilder,
} from '@trends/fixtures';

import Login from './Login';
import * as authApi from '../../api/auth.api';
import { renderWithProviders } from '../../../../test/utils/render-with-providers';
import * as userHook from '../../hooks/useUser';
import { UserContextProps } from '../../hooks/useUser';

describe('Login Page', () => {
  const loginUserForm = loginUserDtoBuilder.buildOne();

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const populateAndSubmitForm = async (getByText, inputs) => {
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

    await populateAndSubmitForm(getByText, loginUserForm);

    expect(authApi.fetchLoginUser).toBeCalledWith(loginUserForm);
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

    await populateAndSubmitForm(getByText, loginUserForm);

    await waitFor(() =>
      expect(authApi.fetchLoginUser).toBeCalledWith(loginUserForm),
    );
    expect(authenticateUser).toBeCalledTimes(0);
    expect(await findByText(/error/i)).toBeInTheDocument();
  });
  it('should display validation errors if input is invalid', async () => {
    jest.spyOn(authApi, 'fetchLoginUser');
    const { getByText } = renderWithProviders(<Login />);

    await populateAndSubmitForm(getByText, { username: '', password: '' });

    expect(authApi.fetchLoginUser).not.toBeCalled();
    expect(getByText(/password is required/i)).toBeInTheDocument();
    expect(getByText(/username is required/i)).toBeInTheDocument();
  });
});
