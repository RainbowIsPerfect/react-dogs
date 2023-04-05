import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { MainLayout } from './layouts/MainLayout';
import './index.scss';
import { Products } from './pages/Products';
import { SignIn } from './pages/SignIn';
import { PrivateRoute } from './components/PrivateRoute';
import { NotFound } from './pages/NotFound';
import { CurrentProduct } from './pages/CurrentProduct';
import { Profile } from './pages/Profile';
import { SignUp } from './pages/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'products',
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },
      {
        path: '/products/:productId',
        element: (
          <PrivateRoute>
            <CurrentProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'me',
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
