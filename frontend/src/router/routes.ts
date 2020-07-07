import React from 'react';

interface Route {
  path: string;
  exact?: boolean;
  component:
    | React.ComponentType<any>
    | React.LazyExoticComponent<React.ComponentType<any>>;
}

export const routes: Route[] = [
  {
    path: '',
    component: React.lazy(() => import('@/views/Home')),
  },
];
