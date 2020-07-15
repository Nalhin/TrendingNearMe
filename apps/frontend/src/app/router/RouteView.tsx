import React from 'react';
import { Switch } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';

import CustomRoute from './CustomRoute';
import { routes } from './routes';

const RouteView: React.FC = () => {
  return (
    <React.Suspense
      fallback={<LinearProgress variant="indeterminate" color="secondary" />}
    >
      <Switch>
        {routes.map((route) => (
          <CustomRoute
            key={route.path}
            path={route.path}
            exact={route.exact}
            authValidator={route.authValidator}
            redirectTo={route.redirectTo}
            component={route.component}
          />
        ))}
      </Switch>
    </React.Suspense>
  );
};

export default RouteView;
