import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import { AxiosResponse } from 'axios';

import { AuthUserResponseDto } from '@trends/data';
import {
  authUserResponseDtoBuilder,
  registerUserDtoBuilder,
} from '@trends/fixtures';

import { renderWithProviders } from '../../../../test/utils/render-with-providers';
import * as authApi from '../../api/auth.api';
import * as userHook from '../../hooks/useUser';
import { UserContextProps } from '../../hooks/useUser';
import Register from './Register';

describe('Login Page', () => {
  const inputs = registerUserDtoBuilder.buildOne();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const register = async (getByText) => {
    for (const [key, value] of Object.entries(inputs)) {
      const input = getByText(new RegExp(`${key}`, 'i')).nextSibling.firstChild;
      fireEvent.change(input, { target: { value } });
    }
    await act(async () => {
      fireEvent.submit(getByText(/sign in/i));
    });
  };

  it('should send form data and authenticate user', async () => {
    const authResponse = authUserResponseDtoBuilder.buildOne();
    jest
      .spyOn(authApi, 'fetchRegisterUser')
      .mockResolvedValueOnce({ data: authResponse } as AxiosResponse<
        AuthUserResponseDto
      >);
    const authenticateUser = jest.fn();
    jest
      .spyOn(userHook, 'useUser')
      .mockReturnValue(({ authenticateUser } as unknown) as UserContextProps);
    const { getByText } = renderWithProviders(<Register />);

    await register(getByText);

    expect(authApi.fetchRegisterUser).toBeCalledWith(inputs);
    expect(authenticateUser).toBeCalledWith(authResponse);
  });

  it('should display error if registration is unsuccessful', async () => {
    jest
      .spyOn(authApi, 'fetchRegisterUser')
      .mockRejectedValueOnce({ message: 'error' });
    const authenticateUser = jest.fn();
    jest
      .spyOn(userHook, 'useUser')
      .mockReturnValue(({ authenticateUser } as unknown) as UserContextProps);

    const { getByText, findByText } = renderWithProviders(<Register />);

    await register(getByText);

    expect(authApi.fetchRegisterUser).toBeCalledWith(inputs);
    expect(authenticateUser).toBeCalledTimes(0);
    expect(await findByText(/error/i)).toBeInTheDocument();
  });
});
