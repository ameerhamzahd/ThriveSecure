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
        path: "policy-quote",
        Component: PolicyQuote
      },
      {
        path: "application",
        Component: Application
      },
      {
        path: "all-policies",
        Component: AllPolicies
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
        path: "payment",
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
        Component: PaymentGateway
      },
      {
        path: "manage-blogs",
        Component: PaymentGateway
      },
      {
        path: "blog-posts",
        Component: PaymentGateway
      },
      {
        path: "my-policies",
        Component: PaymentGateway
      },
      {
        path: "payment-status",
        Component: PaymentGateway
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