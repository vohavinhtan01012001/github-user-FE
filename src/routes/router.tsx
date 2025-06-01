import { createBrowserRouter, Navigate } from 'react-router';
import { SuspenseWrapper } from '../components/features/layouts/SuspenseWrapper';
import { authRoutes } from './auth.routes';
import { appRoutes } from './app.routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/auth/login" replace />,
  },
  {
    element: (
      <SuspenseWrapper />
    ),
    children: [authRoutes, appRoutes],
  },
]); 