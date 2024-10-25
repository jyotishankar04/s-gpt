import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { BsSend } from "react-icons/bs";

const DashBoardLayout = () => {
  const { isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/auth/sign-in");
    }
  });

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="loading loading-lg loading-bars scale-125"></div>
        <Outlet />
      </div>
    );
  }
  return (
    <div className="w-full h-full  bg-base-100 text-white flex flex-row justify-start items-start">
      <Sidebar />
      <div className="w-full flex-col h-full  grow flex justify-center items-center ">
        <div className="w-full grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
