import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
import MainLayout from '../layouts/MainLayout';

export const routers = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/auth',
          element: <AuthPage />,
        },
      ],
    },
  ]);
