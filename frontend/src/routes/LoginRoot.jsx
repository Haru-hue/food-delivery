import { Link, Outlet } from "react-router-dom";
import { login } from "../assets";

const LoginRoot = () => {
  return (
    <main className="min-h-screen min-w-screen overflow-hidden">
      <div className="absolute">
        <a
          href="/"
          className="flex navbar-brand font-bold text-5xl title-font relative text-white p-6"
        >
          Budo
          <span className="w-3 h-3 rounded-full self-end bg-orange mb-2"></span>
        </a>
      </div>
      <div className="flex">
        <div
          className="flex w-1/2 h-screen bg-cover"
          style={{ backgroundImage: `url(${login})` }}
        ></div>
        <div className="flex w-1/2 h-screen items-center">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default LoginRoot;
