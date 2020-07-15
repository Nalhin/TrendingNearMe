import { createMemoryHistory, History } from 'history';
import { UserProvider } from '../../src/app/hooks/useUser';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import React from 'react';
import {
  AnonymousUser,
  AuthenticatedUser,
} from 'libs/data/src/lib/models/user.model';

export const renderWithProviders = (
  ui: JSX.Element,
  {
    path = '/',
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    defaultUser = new AnonymousUser(),
  }: {
    path?: string;
    route?: string;
    history?: History;
    defaultUser?: AnonymousUser | AuthenticatedUser;
  } = {},
) => {
  return {
    ...render(
      <UserProvider defaultUser={defaultUser}>
        <Router history={history}>
          <Route path={path}>{ui}</Route>
        </Router>
      </UserProvider>,
    ),
    history,
  };
};
