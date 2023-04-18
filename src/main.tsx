import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { MainLayout } from './layouts/MainLayout';
import { Products } from './pages/Products';
import { SignIn } from './pages/SignIn';
import { PrivateRoute } from './components/PrivateRoute';
import { NotFound } from './pages/NotFound';
import { CurrentProduct } from './pages/CurrentProduct';
import { Profile } from './pages/Profile';
import { SignUp } from './pages/SignUp';
import { Routes } from './types';
import './index.scss';

const router = createBrowserRouter([
  {
    path: Routes.Index,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: Routes.Signup,
        element: <SignUp />,
      },
      {
        path: Routes.Product,
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },
      {
        path: Routes.ProductWithId,
        element: (
          <PrivateRoute>
            <CurrentProduct />
          </PrivateRoute>
        ),
      },
      {
        path: Routes.UserProfile,
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
