import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../../layouts/MainLayout';
import { Cart } from '../../pages/Cart';
import { CreateNewProduct } from '../../pages/CreateNewProduct';
import { CurrentProduct } from '../../pages/CurrentProduct';
import { EditProduct } from '../../pages/EditProduct';
import { EditProfile } from '../../pages/EditProfile';
import { Favorites } from '../../pages/Favorites';
import { NotFound } from '../../pages/NotFound';
import { Products } from '../../pages/Products';
import { Profile } from '../../pages/Profile';
import { SignIn } from '../../pages/SignIn';
import { SignUp } from '../../pages/SignUp';
import { PrivateRoute } from '../PrivateRoute';
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
        path: 'products/edit/:productId',
        element: (
          <PrivateRoute>
            <EditProduct />
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
        path: 'favorite',
        element: (
          <PrivateRoute>
            <Favorites />
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

export const App = () => {
  return <RouterProvider router={router} />;
};
