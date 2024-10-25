import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div className="w-full h-screen  bg-base-100 text-white flex flex-col justify-start items-start">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
