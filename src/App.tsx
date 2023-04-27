import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { MainLayout } from './layouts/MainLayout';
import { Products } from './pages/Products';
import { SignIn } from './pages/SignIn';
import { PrivateRoute } from './components/PrivateRoute';
import { NotFound } from './pages/NotFound';
import { CurrentProduct } from './pages/CurrentProduct';
import { Profile } from './pages/Profile';
import { SignUp } from './pages/SignUp';
import { Cart } from './pages/Cart';
import { EditProfile } from './pages/EditProfile';
import { CreateNewProduct } from './pages/CreateNewProduct';
import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        index: true,
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },
      {
        path: 'cart',
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: 'products/:productId',
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
        path: 'create_product',
        element: (
          <PrivateRoute>
            <CreateNewProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'edit',
        element: (
          <PrivateRoute>
            <EditProfile />
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
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
