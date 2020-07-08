import React from 'react';
import { useUser } from '@/hooks/useUser';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AuthValidator } from '@/router/routes';

interface CustomRouteProps extends RouteProps {
  redirectTo?: string;
  authValidator?: AuthValidator;
}

const CustomRoute: React.FC<CustomRouteProps> = ({
  component: Component,
  authValidator,
  redirectTo = '/',
  ...rest
}) => {
  const { user } = useUser();
  if (!Component) {
    return null;
  }

  if (!authValidator) {
    return <Route {...rest} component={Component} />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        authValidator(user) ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectTo} />
        )
      }
    />
  );
};

export default CustomRoute;
