import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from "react";
import { FadeIn } from "../utils";

const Root = () => {
  const location = useLocation();

  return (
    <FadeIn key={location.pathname}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </FadeIn>
  );
};

export default Root;
