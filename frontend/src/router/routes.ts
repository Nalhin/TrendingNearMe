import React from 'react';
import { User } from '@/models/user.model';

export type AuthValidator = (user: User) => boolean;

const authValidator = (user: User) => user.isAuthenticated;
const noAuthValidator = (user: User) => !user.isAuthenticated;

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
    component: React.lazy(() => import('@/views/Login')),
    authValidator: noAuthValidator,
  },
  {
    path: '/sign-up',
    component: React.lazy(() => import('@/views/Register')),
    authValidator: noAuthValidator,
  },
  {
    path: '/personal-history',
    component: React.lazy(() => import('@/views/PersonalHistory')),
    authValidator: authValidator,
  },
  {
    path: '/personal-history/:id',
    component: React.lazy(() => import('@/views/PersonalHistoryDetails')),
    authValidator: authValidator,
  },
  {
    path: '',
    exact: true,
    component: React.lazy(() => import('@/views/Home')),
  },
];
