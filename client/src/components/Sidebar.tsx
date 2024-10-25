import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-2/12 bg-base-300 h-full">
      <div>
        <h1 className="text-sm font-bold px-5 mt-3 uppercase">Dashboard</h1>
        <div className="flex flex-col gap-2 w-full px-4 pt-2">
          <Link to="/dashboard" className="btn btn-outline py-1">
            Create a new conversation
          </Link>
        </div>
      </div>
      <span className="divider"></span>
      <div className="">
        <h1 className="text-sm font-bold px-5 mt-3 uppercase">Recent Chats</h1>
        <div className="flex flex-col gap-2 w-full px-4 pt-2 overflow-y-auto max-h-[60vh]">
          <Link
            to="/dashboard"
            className="btn capitalize btn-sm btn-outline py-1"
          >
            {" "}
            chat 1
          </Link>
          <Link
            to="/dashboard"
            className="btn capitalize btn-sm btn-outline py-1"
          >
            {" "}
            chat 1
          </Link>
          <Link
            to="/dashboard"
            className="btn capitalize btn-sm btn-outline py-1"
          >
            {" "}
            chat 1
          </Link>
          <Link
            to="/dashboard"
            className="btn capitalize btn-sm btn-outline py-1"
          >
            {" "}
            chat 1
          </Link>
        </div>
        <span className="divider"></span>
        <div>
          <h1 className="text-sm font-bold px-5 mt-3 uppercase">Settings</h1>
          <div className="flex flex-col gap-2 w-full px-4 pt-2">
            <Link
              to={"/"}
              className="btn btn-primary capitalize btn-lg btn-outline py-1"
            >
              {" "}
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
