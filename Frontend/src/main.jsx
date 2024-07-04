import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import Navbar from './components/Navbar.jsx';
import { Footer } from './components/Footer.jsx';
import { AuthProvider } from './context/AuthContext';

const Layout = () => (
  <>
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider> {/* Wrap the app with AuthProvider */}
    <RouterProvider router={router} />
  </AuthProvider>
</React.StrictMode>
);
