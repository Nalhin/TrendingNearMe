import { renderWithProviders } from '../../../test/utils/render-with-providers';
import React from 'react';
import CustomRoute from './CustomRoute';
import { AnonymousUser, UserModel } from '@trends/data';
import * as userHook from '../hooks/useUser';
import { UserContextProps } from '../hooks/useUser';

const TestComponent = () => {
  return <div>test</div>;
};

describe('CustomRoute component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(userHook, 'useUser')
      .mockReturnValue({ user: new AnonymousUser() } as UserContextProps);
  });

  it('should return null if component is not present', () => {
    const { queryByText } = renderWithProviders(<CustomRoute />);

    expect(queryByText(/test/)).not.toBeInTheDocument();
  });

  it('should validate user with authGuard and redirect if validation is invalid', () => {
    const redirectPath = '/redirect';
    const { queryByText, history } = renderWithProviders(
      <CustomRoute
        component={TestComponent}
        redirectTo={redirectPath}
        authGuard={(user: UserModel) => user.isAuthenticated}
      />,
    );

    expect(history.location.pathname).toBe(redirectPath);
    expect(queryByText(/test/)).not.toBeInTheDocument();
  });

  it('should validate user with authGuard and display component', () => {
    const redirectPath = '/redirect';

    const { history, getByText } = renderWithProviders(
      <CustomRoute
        component={TestComponent}
        redirectTo={redirectPath}
        authGuard={(user: UserModel) => !user.isAuthenticated}
      />,
    );

    expect(history.location.pathname).not.toBe(redirectPath);
    expect(getByText(/test/)).toBeInTheDocument();
  });

  it('should display component, if authGuard is not present', () => {
    const { getByText } = renderWithProviders(
      <CustomRoute component={TestComponent} />,
    );

    expect(getByText(/test/)).toBeInTheDocument();
  });
});
