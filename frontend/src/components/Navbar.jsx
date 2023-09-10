import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import man from "../assets/man.png";
import woman from "../assets/woman.png";
import { useContext, useState } from "react";
import { AppContext, url } from "../utils/Context";
import axios from "axios";

const Navbar = () => {
  const { state, dispatch, totalItems } = useContext(AppContext);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleLogout = () => {
    axios
      .post(`${url}/logout`, { withCredentials: true })
      .then(() => {
        dispatch({ type: "LOGOUT" });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <header className="container mb-4 px-2">
      <nav className="bg-black max-w-4xl mx-auto py-2 rounded-b-3xl">
        <div className="flex items-center justify-evenly h-16 py-8">
          <div className="flex-shrink-0">
            <a
              href="/"
              className="flex navbar-brand text-white font-bold text-3xl title-font relative"
            >
              Budo
              <span className="w-3 h-3 rounded-full bg-orange self-end mb-0.5"></span>
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
            </div>
          </div>
          <div
            className={`flex ${
              state.user === null
                ? "items-center space-x-5"
                : "items-baseline space-x-2"
            } text-white pt-1`}
          >
            {!state.user?.firstName ? (
              <Link to="/user/login">
                <Icon icon="mdi:user-outline" className="text-3xl" />
              </Link>
            ) : (
              <div className="flex items-center relative group">
                <div className="flex-shrink-0">
                  <img
                    src={state.user?.gender === "male" ? man : woman}
                    alt="avatar"
                    className="rounded-full h-10 w-10"
                    onClick={() => setIsMenuVisible((prev) => !prev)}
                  />
                </div>
                {isMenuVisible && (
                  <div className="absolute z-10 mt-40 py-2 bg-white rounded-md shadow-lg">
                    <Link to={`/menu`}>
                      <div className="block px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none">
                        Menu
                      </div>
                    </Link>
                    <button
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
                <div className="max-md:hidden ml-4">
                  <button className="focus:outline-none md:group-hover">
                    <div className="text-white text-xl">
                      {state.user?.firstName}
                    </div>
                  </button>
                  <div className="absolute z-10 mt-2 py-2 bg-white rounded-md shadow-lg invisible group-hover:visible">
                    <button
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
            <Link to="/cart">
              <div className="relative inline-block">
                <Icon icon="la:shopping-bag" className="text-3xl hover:text-orange-lighter" />
                {totalItems > 0 && (
                  <div className="absolute top-[-6px] right-[-5px] h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {totalItems}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
