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
          <CustomRoute key={route.path} {...route} />
        ))}
      </Switch>
    </React.Suspense>
  );
};

export default RouteView;
