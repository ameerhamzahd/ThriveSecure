import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../layouts/RootLayout/RootLayout';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';

export const router = createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      errorElement: <NotFound></NotFound>,
      children: [
        {
            index: true,
            Component: Home
        }
      ]
    },
  ]);