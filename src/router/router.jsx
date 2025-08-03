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
import PolicyQuote from '../pages/Quote/PolicyQuote/PolicyQuote';
import AllPolicies from '../pages/AllPolicies/AllPolicies';
import PolicyDetails from '../pages/PolicyDetails/PolicyDetails';
import MyPolicies from '../pages/Dashboard/Customer/MyPolicies/MyPolicies';
import ProfileHistory from '../pages/Dashboard/Customer/PaymentHistory/PaymentHistory';
import AssignedCustomers from '../pages/Dashboard/Agent/AssignedCustomers/AssignedCustomers';
import ManageBlogs from '../pages/Dashboard/Shared/ManageBlogs/ManageBlogs';
import Articles from '../pages/Articles/Articles';
import ClaimRequest from '../pages/Dashboard/Customer/ClaimRequest/ClaimRequest';
import PolicyClearance from '../pages/Dashboard/Agent/PolicyClearance/PolicyClearance';
import FAQ from '../pages/FAQ/FAQ';
import Profile from '../pages/Dashboard/Shared/Profile/Profile';
import TermsOfServices from '../pages/TermsOfServices/TermsOfServices';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import CookiePolicy from '../pages/CookiePolicy/CookiePolicy';
import AboutUs from '../pages/AboutUs/AboutUs';
import ContactUs from '../pages/ContactUs/ContactUs';
import Forbidden from '../pages/Forbidden/Forbidden';
import PrivateRoutes from "../routes/PrivateRoutes/PrivateRoutes"

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
        element: 
        <PrivateRoutes>
          <PolicyQuote></PolicyQuote>
        </PrivateRoutes>
      },
      {
        path: "application/:id",
        element: 
        <PrivateRoutes>
          <Application></Application>
        </PrivateRoutes>
      },
      {
        path: "all-policies",
        Component: AllPolicies
      },
      {
        path: "policy/:id",
        Component: PolicyDetails
      },
      {
        path: "articles",
        Component: Articles
      },
      {
        path: "faq",
        Component: FAQ
      },
      {
        path: "terms-of-services",
        Component: TermsOfServices
      },
      {
        path: "privacy-policy",
        Component: PrivacyPolicy
      },
      {
        path: "cookie-policy",
        Component: CookiePolicy
      },
      {
        path: "about-us",
        Component: AboutUs
      },
      {
        path: "contact-us",
        Component: ContactUs
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
    ]
  },
  {
    path: "/dashboard",
    element: 
        <PrivateRoutes>
          <DashboardLayout></DashboardLayout>
        </PrivateRoutes>,
    children: [
      {
        index: true,
        element: 
        <PrivateRoutes>
          <Dashboard></Dashboard>
        </PrivateRoutes>
      },
      {
        path: "payment/:id",
        element: 
        <PrivateRoutes>
          <PaymentGateway></PaymentGateway>
        </PrivateRoutes>
      },
      {
        path: "manage-applications",
        element: 
        <PrivateRoutes>
          <ManageApplications></ManageApplications>
        </PrivateRoutes>
      },
      {
        path: "manage-users",
        element: 
        <PrivateRoutes>
          <ManageUsers></ManageUsers>
        </PrivateRoutes>
      },
      {
        path: "manage-policies",
        element: 
        <PrivateRoutes>
          <ManagePolicies></ManagePolicies>
        </PrivateRoutes>
      },
      {
        path: "manage-transactions",
        element: 
        <PrivateRoutes>
          <ManageTransactions></ManageTransactions>
        </PrivateRoutes>
      },
      {
        path: "assigned-customers",
        element: 
        <PrivateRoutes>
          <AssignedCustomers></AssignedCustomers>
        </PrivateRoutes>
      },
      {
        path: "policy-clearance",
        element: 
        <PrivateRoutes>
          <PolicyClearance></PolicyClearance>
        </PrivateRoutes>
      },
      {
        path: "manage-blogs",
        element: 
        <PrivateRoutes>
          <ManageBlogs></ManageBlogs>
        </PrivateRoutes>
      },
      {
        path: "my-policies",
        element: 
        <PrivateRoutes>
          <MyPolicies></MyPolicies>
        </PrivateRoutes>
      },
      {
        path: "payment-history",
        element: 
        <PrivateRoutes>
          <ProfileHistory></ProfileHistory>
        </PrivateRoutes>
      },
      {
        path: "claim-request",
        element: 
        <PrivateRoutes>
          <ClaimRequest></ClaimRequest>
        </PrivateRoutes>
      },
      {
        path: "profile",
        element: 
        <PrivateRoutes>
          <Profile></Profile>
        </PrivateRoutes>
      },
    ]
  }
]);