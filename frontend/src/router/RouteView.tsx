import React from 'react';
import { Switch } from 'react-router-dom';
import { routes } from '@/router/routes';
import CustomRoute from '@/router/CustomRoute';

const RouteView: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading</div>}>
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
