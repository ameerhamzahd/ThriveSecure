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
import ManageApplications from '../pages/ManageApplications/ManageApplications';

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
        path: "application",
        Component: Application
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
        path: "manage-blogs",
        Component: PaymentGateway
      },
      {
        path: "manage-users",
        Component: PaymentGateway
      },
      {
        path: "manage-policies",
        Component: PaymentGateway
      },
      {
        path: "manage-transactions",
        Component: PaymentGateway
      },
      {
        path: "manage-agents",
        Component: PaymentGateway
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