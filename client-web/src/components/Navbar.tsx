import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AppContext';

const Navbar: React.FC = () => {
  const { logout, authCheck } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!authCheck()) {
    return null;
  }

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div>
          <Link to="/" className="text-2xl font-bold hover:text-blue-400">
            MyApp
          </Link>
        </div>

        {/* Links Section */}
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>
          </li>
            <>
              <li>
                <Link to="/profile" className="hover:text-blue-400">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                >
                  Logout
                </button>
              </li>
            </>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
