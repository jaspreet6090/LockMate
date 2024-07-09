import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

axios.defaults.withCredentials = true;

const Form = ({ onAddPassword }) => {
  const [data, setData] = useState({
    websiteUrl: '',
    username: '',
    password: ''
  });

  const [show, setShow] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Login to Save Password');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/passwords/password`, data, {
        withCredentials: true
      });

      console.log("Response", response);

      setData({
        websiteUrl: '',
        username: '',
        password: ''
      });

      toast.success('Password Saved Successfully');
      onAddPassword(); // Trigger the callback to update passwords in Password component
    } catch (error) {
      console.error('Error', error);
      toast.error('Failed to Save Password');
    }
  };

  return (
    <main className='text-center my-6'>
      <h2 className='text-lg sm:text-2xl font-bold'>Save Password! So you don't have to Remember</h2>
      <p className="text-gray">Don't worry your passwords are Secured!!</p>
      <form 
        className='flex justify-center gap-2 sm:gap-7 mt-5 flex-col sm:flex-row mx-3' 
        onSubmit={handleSubmit}
      >
        <input 
          type="text"
          placeholder='Website Url'
          name='websiteUrl'
          className='w-full sm:w-1/3 lg:w-1/4 px-4 py-2 rounded-lg focus:border border-black'
          value={data.websiteUrl}
          onChange={(e) => setData({ ...data, websiteUrl: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder='Username'
          name='username'
          className='w-full sm:w-1/4 px-4 py-2 rounded-lg focus:border border-black'
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          required
        />
        <div className='relative'>
          <input 
            type={show ? "text" : "password"} 
            placeholder='Password' 
            name='password' 
            className='w-full px-4 py-2 rounded-lg focus:border border-black' 
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}  
            required
          />
          <button 
            type="button" 
            onClick={() => setShow(!show)} 
            className="absolute right-2 bottom-1/2 transform translate-y-1/2 text-xl text-black sm:text-2xl "
          >
            {show ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
          </button>
        </div>
        <button 
          type="submit"
          className="text-md bg-primary bg-black text-white px-4 py-2 rounded-lg transition-all hover:translate-y-[-2px] sm:text-xl"
        >
          Save
        </button>
      </form>
    </main>
  );
};

export default Form;
