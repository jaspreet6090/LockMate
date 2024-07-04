import React from 'react';
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';




export const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext); // Access the login function from context
  const {
    register,
    handleSubmit,
    watch,
    reset, // Destructure reset function from useForm
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange' // Validate the form on change to enable/disable the button appropriately
  });

  const onSubmit = async (data) => {
    const response = await signup(data);

    console.log("signup response" , response);

    if (response == false) {
      toast.error('Signup Failed! User Exist ');
    }else {
      console.log(response);
      toast.success('Signup Successful!', {
        onClose: () => {
          navigate("/"); // Redirect to home page
        },
        autoClose: 2000,
      }); 
    }
    
  };


  const password = watch('password');

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
      <h1 className="text-3xl font-bold mb-8">Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
            autoComplete="name"
          />
          {errors.name && <span className="text-red">This field is required</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
            autoComplete="email"
          />
          {errors.email && <span className="text-red">This field is required</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
            autoComplete="new-password"
          />
          {errors.password && <span className="text-red">This field is required</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: value =>
                value === password || "Passwords do not match"
            })}
            className="mt-1 p-2 w-full border rounded-md"
            autoComplete="new-password"
          />
          {errors.confirmPassword && <span className="text-red">{errors.confirmPassword.message}</span>}
        </div>
        <NavLink
          to="/login"
          className="text-center mt-4"
        >
          <p className="text-link">Already have an account? Login</p>
        </NavLink>
        <input
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`bg-black text-white border-2 border-black px-4 py-2 rounded-md w-full mt-4 cursor-pointer
            ${!isValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        />
      </form>
    </section>
  );
};
