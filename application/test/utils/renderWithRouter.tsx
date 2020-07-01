import { Route, Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { render } from '@testing-library/react';
import React from 'react';

export const renderWithRouter = (
  ui: JSX.Element,
  {
    path = '/',
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: { path?: string; route?: string; history?: History } = {},
) => {
  return {
    ...render(
      <Router history={history}>
        <Route path={path}>{ui}</Route>
      </Router>,
    ),
    history,
  };
};
