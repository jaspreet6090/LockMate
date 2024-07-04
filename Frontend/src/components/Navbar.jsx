import React, { useContext } from 'react';
import { NavLink ,Link} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className='py-4 px-2 sm:px-4 shadow-md sticky top-0 bg-background z-100 flex items-center justify-between'>
      <Link 
      to= "/"
      className="text-lg font-bold sm:text-2xl">LockMate</Link>

      <div className="flex  items-center sm:gap-2">
        {isAuthenticated ? (
          <>
            <div className="text-sm sm:text-xl mr-1 sm:mr-4 italic">
              Welcome, {user?.name || 'User'}
            </div>
            <button
              onClick={handleLogout}
              className="text-md bg-primary bg-black text-white px-4 py-2 rounded-lg transition-all hover:translate-y-[-2px] sm:text-xl"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/signup">
              <button className="text-md bg-primary bg-black text-white px-4 py-2 rounded-lg transition-all hover:translate-y-[-2px] sm:text-xl">
                SignUp
              </button>
            </NavLink>

            <NavLink to="/login">
              <button className="text-md bg-primary border-black border-2 text-black px-4 py-2 rounded-lg transition-all hover:translate-y-[-2px] sm:text-xl">
                Login
              </button>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
