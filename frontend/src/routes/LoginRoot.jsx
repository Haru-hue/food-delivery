import { Link, Outlet } from "react-router-dom";
import { login } from "../assets";

const LoginRoot = () => {
  return (
    <main>
      <div className="absolute">
        
      </div>
      <div className="flex max-md:flex-col">
        <div
          className="flex w-full md:w-1/2 2xl:h-screen bg-cover max-md:justify-center"
          style={{ backgroundImage: `url(${login})` }}
        >
         <a
          href="/"
          className="flex navbar-brand font-bold text-5xl title-font relative text-white p-2 md:p-6 md:h-24"
        >
          Budo
          <span className="w-3 h-3 rounded-full self-end bg-orange mb-2"></span>
        </a>
        </div>
        <div className="flex md:w-1/2 2xl:h-screen items-center">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default LoginRoot;
