import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const VEHICLES = Loadable(lazy(() => import('../views/utilities/VEHICLES')))
const DETECTED= Loadable(lazy(() => import('../views/utilities/parties/DETECTED')))
const History = Loadable(lazy(() => import('../views/utilities/parties/History')))
const Graphes = Loadable(lazy(() => import('../views/utilities/parties/graphes_veh')))
const Price_total = Loadable(lazy(() => import('../views/utilities/parties/veh')))
const Add_mats = Loadable(lazy(() => import('../views/mat/Add_mats')))
const Mats = Loadable(lazy(() => import('../views/mat/Mats')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Account = Loadable(lazy(() => import('../views/authentication/Account')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const  Earnings = Loadable(lazy(() => import('../views/income/Earnings')));
const  Expenses = Loadable(lazy(() => import('src/views/income/expenses')));
const  Profit = Loadable(lazy(() => import('src/views/income/profit')));
const  Clients = Loadable(lazy(() => import('src/views/Client/Clients')));
const  Add_new_client = Loadable(lazy(() => import('src/views/Client/Add_new_client')));
const  Employees = Loadable(lazy(() => import('src/views/Employee/Employees')));
const  Add_employee = Loadable(lazy(() => import('src/views/Employee/Add_employee')));
const Facture = Loadable(lazy(() => import('../views/FACTURE/Facture')))

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: 'mat/Add_mats', exact: true, element: <Add_mats/> },
      { path: 'mat/Mats', exact: true, element: <Mats/> },
      { path: '/ui/VEHICLES', exact: true, element: <VEHICLES /> },
      { path: '/ui/DETECTED', exact: true, element: <DETECTED /> },
      { path: '/ui/parties/History', exact: true, element: <History /> },
      {path: '/ui/parties/graphes', exact: true, element: <Graphes /> },
      {path: '/ui/parties/price_total', exact: true, element: <Price_total /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      { path: '/income/Earnings', exact: true, element: <Earnings /> },
      { path: '/income/Expenses', exact: true, element: <Expenses /> },
      { path: '/income/Profit', exact: true, element: <Profit /> },
      { path: '/Client/Clients', exact: true, element: <Clients/> },
      { path: '/Client/Add_new_client', exact: true, element: <Add_new_client/> },
      { path: '/Employee/Employees', exact: true, element: <Employees/> },
      { path: '/Employee/Add_employee', exact: true, element: <Add_employee/> },        
      { path: '/auth/Account', element: <Account /> },
      { path: '/FACTURE/Facture', exact: true, element: <Facture/> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
