import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../layouts/RootLayout/RootLayout';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Quote from '../pages/Quote/Quote';
import Application from '../pages/Application/Application';

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
]);