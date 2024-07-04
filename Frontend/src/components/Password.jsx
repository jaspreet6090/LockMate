import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCopy, faEdit, faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Password = () => {
  const [view, setView] = useState({});
  const [edit, setEdit] = useState({});
  const [editedPassword, setEditedPassword] = useState({});
  const [passwords, setPasswords] = useState([]);
  const { user } = useContext(AuthContext);

  const toggleView = (id) => {
    setView((prevView) => ({ ...prevView, [id]: !prevView[id] }));
  };

  const toggleEdit = (id) => {
    setEdit((prevEdit) => ({ ...prevEdit, [id]: !prevEdit[id] }));
  };

  const handleEdit = async (e, passwordId) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${import.meta.env.SERVER}/${passwordId}`, editedPassword[passwordId], { withCredentials: true });
      console.log(response.data);
      toast.success('Password updated successfully!');
      fetchPasswords(); // Update passwords after editing
      toggleEdit(passwordId);
    } catch (error) {
      console.error('Error editing password:', error);
      toast.error('Failed to update password');
    }
  };

  const handleDelete = async (e, passwordId) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this password?')) {
      try {
        const response = await axios.delete(`${import.meta.env.SERVER}/passwords/${passwordId}`, { withCredentials: true });
        console.log(response.data);
        toast.success('Password deleted successfully!');
        fetchPasswords(); // Update passwords after deletion
      } catch (error) {
        console.error('Error deleting password:', error);
        toast.error('Failed to delete password');
      }
    }
  };

  const handleChange = (e, field, id) => {
    setEditedPassword((prevEditedPassword) => ({
      ...prevEditedPassword,
      [id]: { ...prevEditedPassword[id], [field]: e.target.value },
    }));
  };

  const handleCopy = (e, password) => {
    e.preventDefault();
    navigator.clipboard.writeText(password)
      .then(() => {
        toast.success('Password copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy password: ', err);
        toast.error('Failed to copy password');
      });
  };

  const fetchPasswords = async () => {
    try {
      const response = await axios.get(`${import.meta.env.SERVER}/password`, { withCredentials: true });
      if (response) {
        setPasswords(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching passwords:', error);
      toast.error('Failed to fetch passwords');
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  return (
    <section className='my-6 mx-4'>
      <ToastContainer />
      <h2 className='text-lg sm:text-xl font-bold'>Saved Passwords</h2>

      {!user && <p>Login to view Passwords</p>}
      {passwords.length === 0 && <p className='text-center mt-5'>No Passwords Saved</p>}

      {passwords.map((password) => (
        <form key={password.id} className='flex justify-center gap-2 sm:gap-7 mt-5 flex-col sm:flex-row' onSubmit={(e) => handleEdit(e, password.id)}>
          <input
            type='text'
            value={editedPassword[password.id]?.websiteUrl || password.websiteUrl}
            placeholder='Website'
            title="Click to redirect"
            className={`px-4 py-2 rounded-lg cursor-pointer text-blue ${edit[password.id] ? 'bg-black text-white' : ''}`}
            readOnly={!edit[password.id]}
            onChange={(e) => handleChange(e, 'websiteUrl', password.id)}
          />

          <input
            type='text'
            value={editedPassword[password.id]?.username || password.username}
            placeholder='Username'
            className={`px-4 py-2 rounded-lg ${edit[password.id] ? 'bg-black text-white' : ''}`}
            readOnly={!edit[password.id]}
            onChange={(e) => handleChange(e, 'username', password.id)}
          />

          <input
            type={view[password.id] ? 'text' : 'password'}
            value={editedPassword[password.id]?.password || password.password}
            placeholder='Password'
            className={`px-4 py-2 rounded-lg focus:border-1 border-black ${edit[password.id] ? 'bg-black text-white' : ''}`}
            readOnly={!edit[password.id]}
            onChange={(e) => handleChange(e, 'password', password.id)}
          />

          <div className='flex justify-center items-center gap-3'>
            {view[password.id] ? (
              <button onClick={(e) => { e.preventDefault(); toggleView(password.id); }} className='text-xl text-black sm:text-2xl' title='Hide Password'>
                <FontAwesomeIcon icon={faEyeSlash} />
              </button>
            ) : (
              <button onClick={(e) => { e.preventDefault(); toggleView(password.id); }} className='text-xl text-black sm:text-2xl' title='Show Password'>
                <FontAwesomeIcon icon={faEye} />
              </button>
            )}

            <button onClick={(e) => handleCopy(e, password.password)} className='text-xl text-black sm:text-2xl' title='Copy Password'>
              <FontAwesomeIcon icon={faCopy} />
            </button>

            {edit[password.id] ? (
              <button
                type='submit'
                className='text-md bg-primary bg-black text-white px-4 py-2 rounded-lg transition-all hover:translate-y-[-2px] sm:text-xl'
                title='Save Changes'
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            ) : (
              <button
                onClick={(e) => { e.preventDefault(); toggleEdit(password.id); }}
                className='text-md bg-primary bg-black text-white px-4 py-2 rounded-lg transition-all hover:translate-y-[-2px] sm:text-xl'
                title='Edit Password'
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            )}

            <button
              onClick={(e) => handleDelete(e, password.id)}
              className='text-md bg-red text-white px-4 py-2 rounded-lg transition-all hover:translate-y-[-2px] sm:text-xl'
              title='Delete Password'
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </form>
      ))}
    </section>
  );
};

export default Password;
