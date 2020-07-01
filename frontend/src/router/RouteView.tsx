import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from '@/router/routes';

const RouteView: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} exact={route.exact}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </React.Suspense>
  );
};

export default RouteView;
