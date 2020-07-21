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
  const registerUserInput = registerUserDtoBuilder.buildOne();
  const authenticateUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(userHook, 'useUser')
      .mockReturnValue(({ authenticateUser } as unknown) as UserContextProps);
  });

  const populateAndSubmitForm = async (getByText, inputs) => {
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

    const { getByText } = renderWithProviders(<Register />);

    await populateAndSubmitForm(getByText, registerUserInput);

    expect(authApi.fetchRegisterUser).toBeCalledWith(registerUserInput);
    expect(authenticateUser).toBeCalledWith(authResponse);
  });

  it('should display error if registration is unsuccessful', async () => {
    jest
      .spyOn(authApi, 'fetchRegisterUser')
      .mockRejectedValueOnce({ message: 'error' });
    const authenticateUser = jest.fn();

    const { getByText, findByText } = renderWithProviders(<Register />);

    await populateAndSubmitForm(getByText, registerUserInput);

    expect(authApi.fetchRegisterUser).toBeCalledWith(registerUserInput);
    expect(authenticateUser).not.toBeCalled();
    expect(await findByText(/error/i)).toBeInTheDocument();
  });

  it('should display validation errors if input is invalid', async () => {
    jest.spyOn(authApi, 'fetchRegisterUser');
    const { getByText } = renderWithProviders(<Register />);

    await populateAndSubmitForm(getByText, {
      username: '',
      password: '',
      email: 'invalid',
    });

    expect(authApi.fetchRegisterUser).not.toBeCalled();
    expect(getByText(/email must be valid/i)).toBeInTheDocument();
    expect(getByText(/password is required/i)).toBeInTheDocument();
    expect(getByText(/username is required/i)).toBeInTheDocument();
  });
});
