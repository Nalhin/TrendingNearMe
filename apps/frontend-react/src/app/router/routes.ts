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
  authGuard?: AuthValidator;
  redirectTo?: string;
}

export const routes: Route[] = [
  {
    path: '/login',
    component: React.lazy(() => import('../views/login/Login')),
    authGuard: noAuthValidator,
  },
  {
    path: '/register',
    component: React.lazy(() => import('../views/register/Register')),
    authGuard: noAuthValidator,
  },
  {
    path: '/personal-history/:detailsId?',
    component: React.lazy(() =>
      import('../views/personal-history/PersonalHistory'),
    ),
    authGuard: authValidator,
  },
  {
    path: '/logout',
    component: React.lazy(() => import('../views/logout/Logout')),
  },
  {
    path: '/',
    exact: true,
    component: React.lazy(() => import('../views/home/Home')),
  },
  {
    path: '*',
    component: React.lazy(() => import('../views/not-found/NotFound')),
  },
];
