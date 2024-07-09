import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCopy, faEdit, faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ConfirmationModal} from './ConfirmationModal';


const Password = () => {
  const [view, setView] = useState({});
  const [edit, setEdit] = useState({});
  const [editedPassword, setEditedPassword] = useState({});
  const [passwords, setPasswords] = useState([]);
  const { user } = useContext(AuthContext);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const toggleView = (id) => {
    setView((prevView) => ({ ...prevView, [id]: !prevView[id] }));
  };

  const toggleEdit = (id) => {
    setEdit((prevEdit) => ({ ...prevEdit, [id]: !prevEdit[id] }));
  };

  const handleEdit = async (e, passwordId) => {
    e.preventDefault();

    try {
      toast.loading("Saving!");
      const response = await axios.patch(`${import.meta.env.VITE_SERVER}/passwords/${passwordId}`, editedPassword[passwordId], { withCredentials: true });
      console.log(response.data);
      toast.dismiss();
      toast.success('Password updated successfully!');
      fetchPasswords(); // Update passwords after editing
      toggleEdit(passwordId);
    } catch (error) {
      console.error('Error editing password:', error);
      toast.error('Failed to update password');
    }
  };

  const handleDelete = async (passwordId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_SERVER}/passwords/${passwordId}`, { withCredentials: true });
      console.log(response.data);
      toast.success('Password deleted successfully!');
      setPasswords((prevPasswords) => prevPasswords.filter((password) => password.id !== passwordId));
    } catch (error) {
      console.error('Error deleting password:', error);
      toast.error('Failed to delete password');
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
    if (user) {
      try {
        toast.loading('Loading Saved Passwords');
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/passwords/password`, { withCredentials: true });
        if (response) {
          toast.dismiss();
          setPasswords(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching passwords:', error);
        toast.error('Failed to fetch passwords');
      }
    } else {
      setPasswords([]);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, [user]);

  // Function to handle password addition trigger from Form component
  const handleAddPassword = () => {
    fetchPasswords(); // Update passwords after adding a new password
  };

  const openDeleteConfirmation = (passwordId) => {
    setConfirmDeleteId(passwordId);
  };

  const closeDeleteConfirmation = (confirmed) => {
    if (!confirmed) {
      setConfirmDeleteId(null);
    } else {
      handleDelete(confirmDeleteId);
      setConfirmDeleteId(null);
    }
  };

  return (
    <section className='my-6 mx-4 '>
      <h2 className='text-lg sm:text-2xl font-bold py-5'>Saved Passwords</h2>
      {!user && <p className='text-white text-xl p-2 text-center  bg-red w-auto rounded-xl'>Login to view Passwords</p>}
      {user && passwords?.length === 0 && <p className='text-center mt-5  text-xl text-white bg-black p-2 rounded-xl'>No Passwords Saved</p>}
      {passwords?.map((password) => (
        <div key={password.id} className='flex justify-center gap-2 sm:gap-7 mt-5 flex-col sm:flex-row'>
          <input
            type='text'
            value={editedPassword[password.id]?.websiteUrl || password.websiteUrl}
            placeholder='Website'
             title='Click to Visit'
            className={`px-4 py-2 rounded-lg cursor-pointer text-blue ${edit[password.id] ? 'bg-black text-white' : ''}`}
            readOnly={!edit[password.id]}
            onChange={(e) => handleChange(e, 'websiteUrl', password.id)}
            onClick={() => {
              if(!edit[password.id]){
              window.open(password.websiteUrl, '_blank')}
              }
              }
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
              <button onClick={() => toggleView(password.id)} className='text-xl text-black sm:text-2xl' title='Hide Password'>
                <FontAwesomeIcon icon={faEyeSlash} />
              </button>
            ) : (
              <button onClick={() => toggleView(password.id)} className='text-xl text-black sm:text-2xl' title='Show Password'>
                <FontAwesomeIcon icon={faEye} />
              </button>
            )}
            {edit[password.id] ? (
              <button
                onClick={(e) => handleEdit(e, password.id)}
                className='text-md bg-primary bg-black text-white px-4 py-2 rounded-lg transition-all hover:translate-y-[-2px] sm:text-xl'
                title='Save Changes'
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            ) : (
              <button
                onClick={() => toggleEdit(password.id)}
                className='text-md bg-primary bg-black text-white px-4 py-2 rounded-lg transition-all hover:translate-y-[-2px] sm:text-xl'
                title='Edit Password'
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            )}
            <button
              onClick={(e) => handleCopy(e, password.password)}
              className='text-xl text-black sm:text-2xl'
              title='Copy Password'
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
            <button
              onClick={() => openDeleteConfirmation(password.id)}
              className='text-md bg-red text-white px-4 py-2 rounded-lg transition-all hover:translate-y-[-2px] sm:text-xl'
              title='Delete Password'
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
      ))}
      <ConfirmationModal isOpen={confirmDeleteId !== null} onClose={closeDeleteConfirmation} onDelete={() => handleDelete(confirmDeleteId)} />
    </section>
  );
};

export default Password;
