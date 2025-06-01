import { lazy } from 'react';
import { RouteObject } from 'react-router';
import { GuestLayout } from '../layouts/GuestLayout';

const Login = lazy(() => import('../pages/Login'));

export const authRoutes: RouteObject = {
  path: 'auth',
  element: <GuestLayout />,
  children: [
    {
      path: 'login',
      element: <Login />,
    },
  ],
}; 