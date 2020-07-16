import React from 'react';

import { UserModel } from '@trends/data';

export type AuthValidator = (user: UserModel) => boolean;

const authValidator = (user: UserModel) => user.isAuthenticated;
const noAuthValidator = (user: UserModel) => !user.isAuthenticated;

interface Route {
  path: string;
  exact?: boolean;
  component:
    | React.ComponentType<any>
    | React.LazyExoticComponent<React.ComponentType<any>>;
  authValidator?: AuthValidator;
  redirectTo?: string;
}

export const routes: Route[] = [
  {
    path: '/login',
    component: React.lazy(() => import('../views/login/Login')),
    authValidator: noAuthValidator,
  },
  {
    path: '/register',
    component: React.lazy(() => import('../views/register/Register')),
    authValidator: noAuthValidator,
  },
  {
    path: '/personal-history',
    component: React.lazy(() =>
      import('../views/personal-history/PersonalHistory'),
    ),
    authValidator: authValidator,
  },
  {
    path: '/logout',
    component: React.lazy(() => import('../views/logout/Logout')),
  },
  {
    path: '',
    exact: true,
    component: React.lazy(() => import('../views/home/Home')),
  },
];
