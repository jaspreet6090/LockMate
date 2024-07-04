import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {

    const response = await login(data);

    console.log("login response" , response);

    if (response == false) {
      toast.error('Login Failed! Email or Password is incorrect!');   
    }else {
      console.log(response);
      toast.success('Login Successful!', {
        onClose: () => {
          navigate("/"); // Redirect to home page
        },
        autoClose: 2000,
      });
    }
   
  };

  return (
    <section className="px-3 mt-16 min-h-screen flex flex-col items-center bg-gray-100">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Entered value does not match email format',
              },
            })}
            className="mt-1 p-2 w-full border rounded-md"
            autoComplete="email"
          />
          {errors.email && <span className="text-red">{errors.email.message}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required',
            })}
            className="mt-1 p-2 w-full border rounded-md"
            autoComplete="current-password"
          />
          {errors.password && <span className="text-red">{errors.password.message}</span>}
        </div>

        <NavLink to="/signup" className="text-center mt-4">
          <p className="text-link">Don't have an account? Signup</p>
        </NavLink>
        <input
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`bg-black text-white border-2 border-black px-4 py-2 rounded-md w-full mt-4 cursor-pointer ${!isValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
        />
      </form>
    </section>
  );
};
