import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router";
import AuthProvider from "./contexts/AuthProvider/AuthProvider"
import { ToastContainer, Bounce } from 'react-toastify';
import { router } from './router/router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
