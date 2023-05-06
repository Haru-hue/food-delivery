import { useState } from "react";
import { Login, Register } from "../components/LoginRegisterModule";

export default function LoginRegister({ setName, setLoggedIn, setGender }) {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  return (
    <main>
        <div className="container items-center">
            <div className="flex justify-center">
                <div className="flex-item">
                    <button className="button" onClick={handleLoginClick}>Login</button>
                </div>
                <div className="flex-item">
                    <button className="button" onClick={handleRegisterClick}>Register</button>
                </div>
            </div>
            {showLogin && (<Login/>)}
            {showRegister && (<Register/>)}
        </div>
    </main>
  );
}