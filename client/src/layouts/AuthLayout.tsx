import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full h-scree flex flex-col justify-start items-start">
      <div className="navbar flex px-5  justify-center items-center bg-base-300">
        <div className=" text-primary">
          <h1 className="btn btn-ghost normal-case text-xl">Nex GPT</h1>
        </div>
      </div>
      <div className="w-full  mt-10 grow flex justify-center items-center ">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
