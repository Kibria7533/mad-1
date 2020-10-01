import React from 'react';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));


const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));


const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const routes = [

  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
];

export default routes;
