import { Outlet } from 'react-router-dom';
import HomePage from 'src/pages/auth/jwt/login';
// import HomePage from 'src/pages/auth-demo/login/modern';
import Error401Page from 'src/pages/401';
import Error404Page from 'src/pages/404';
import Error500Page from 'src/pages/500';
import ContactPage from 'src/pages/contact';
import CheckoutPage from 'src/pages/checkout';
import { authRoutes } from './auth';
import { authDemoRoutes } from './auth-demo';
import { dashboardRoutes } from './dashboard';
import { Layout as AuthModernLayout } from 'src/layouts/auth/modern-layout';

export const routes = [
  {
    element: (
      <AuthModernLayout>
                <Outlet />
              </AuthModernLayout>
    ),
    children: [
      {
        index: true,
        element: <HomePage />
      },
      // {
      //   path: 'pricing',
      //   element: <PricingPage />
      // },
      // ...componentsRoutes
    ]
  },
  ...authRoutes,
  ...authDemoRoutes,
  ...dashboardRoutes,
  {
    path: 'checkout',
    element: <CheckoutPage />
  },
  {
    path: 'contact',
    element: <ContactPage />
  },
  {
    path: '401',
    element: <Error401Page />
  },
  {
    path: '404',
    element: <Error404Page />
  },
  {
    path: '500',
    element: <Error500Page />
  },
  {
    path: '*',
    element: <Error404Page />
  }
];
