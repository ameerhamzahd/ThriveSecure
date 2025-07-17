import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../layouts/RootLayout/RootLayout';
import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Quote from '../pages/Quote/Quote';
import Application from '../pages/Application/Application';
import Dashboard from '../pages/Dashboard/Dashboard';
import PaymentGateway from '../pages/Dashboard/Customer/PaymentGateway/PaymentGateway';
import ManageApplications from '../pages/Dashboard/Admin/ManageApplications/ManageApplications';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers/ManageUsers';
import ManagePolicies from '../pages/Dashboard/Admin/ManagePolicies/ManagePolicies';
import ManageTransactions from '../pages/Dashboard/Admin/ManageTransactions/ManageTransactions';
import ManageAgents from '../pages/Dashboard/Admin/ManageAgents/ManageAgents';
import PolicyQuote from '../pages/Quote/PolicyQuote/PolicyQuote';
import AllPolicies from '../pages/AllPolicies/AllPolicies';
import PolicyDetails from '../pages/PolicyDetails/PolicyDetails';
import MyPolicies from '../pages/Dashboard/Customer/MyPolicies/MyPolicies';
import ProfileHistory from '../pages/Dashboard/Customer/PaymentHistory/PaymentHistory';
import AssignedCustomers from '../pages/Dashboard/Agent/AssignedCustomers/AssignedCustomers';
import ManageBlogs from '../pages/Dashboard/Agent/ManageBlogs/ManageBlogs';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      },
      {
        path: "quote",
        Component: Quote
      },
      {
        path: "policy-quote/:id",
        Component: PolicyQuote
      },
      {
        path: "application/:id",
        Component: Application
      },
      {
        path: "all-policies",
        Component: AllPolicies
      },
      {
        path: "policy/:id",
        Component: PolicyDetails
      },
    ]
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: Dashboard
      },
      {
        path: "payment/:id",
        Component: PaymentGateway
      },
      {
        path: "manage-applications",
        Component: ManageApplications
      },
      {
        path: "manage-users",
        Component: ManageUsers
      },
      {
        path: "manage-policies",
        Component: ManagePolicies
      },
      {
        path: "manage-transactions",
        Component: ManageTransactions
      },
      {
        path: "manage-agents",
        Component: ManageAgents
      },
      {
        path: "assigned-customers",
        Component: AssignedCustomers
      },
      {
        path: "manage-blogs",
        Component: ManageBlogs
      },
      {
        path: "my-policies",
        Component: MyPolicies
      },
      {
        path: "payment-history",
        Component: ProfileHistory
      },
      {
        path: "claim-request",
        Component: PaymentGateway
      },
      {
        path: "profile",
        Component: PaymentGateway
      },
    ]
  }
]);