import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import man from "../assets/man.png";
import woman from "../assets/woman.png";
import { useContext, useMemo } from "react";
import { AppContext } from "../App";
import axios from "axios";

const Navbar = () => {
  const { state, dispatch, totalItems } = useContext(AppContext)

  const handleLogout = () => {
    axios.post('http://localhost:5000/logout', { withCredentials: true })
      .then(response => {
        dispatch({ type: 'LOGOUT' })
        localStorage.removeItem('session'); // remove invalid session from storage
        localStorage.removeItem('currentUser'); // remove invalid session from storage
        // navigate('/login');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <header className="container mb-4">
      <nav className="bg-black max-w-4xl mx-auto rounded-b-full">
        <div className="flex items-center justify-evenly h-16 py-8">
          <div className="flex-shrink-0">
            <a href="" className="navbar-brand text-white font-bold text-xl">
              Budo
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/">
                <div className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-md font-medium">
                  Home
                </div>
              </Link>
              <Link to="/menu">
                <div className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-md font-medium">
                  Menu
                </div>
              </Link>
              <div className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-md font-medium">
                Vendors
              </div>
            </div>
          </div>
          <div className={`flex ${state.name === null ? 'items-center space-x-5' : 'items-baseline space-x-2'} text-white pt-1`}>
          {!(state.loggedIn) ? (
                <Link to='/login'>
                  <Icon icon="mdi:user-outline" className="text-3xl" />
                </Link>
              ) : (
                <div className="flex items-center relative group">
                  <div className="flex-shrink-0">
                    <img
                      src={state.gender === 'male' ? man : woman}
                      alt="avatar"
                      className="rounded-full h-10 w-10"
                    />
                  </div>
                  <div className="ml-4">
                    <button className="focus:outline-none group-hover:text-orange">
                      <div className="text-white text-xl">
                        {state.name}
                      </div>
                    </button>
                    <div className="absolute z-10 mt-2 py-2 bg-white rounded-md shadow-lg invisible group-hover:visible">
                      <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Profile
                      </Link>
                      <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            <Link to="/cart">
              <div className="relative inline-block">
                <Icon icon="la:shopping-bag" className="text-3xl" />
                <div className="absolute top-[-6px] right-[-5px] h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {totalItems}
                  </span>
                </div>
              </div>
            </Link>
            
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
