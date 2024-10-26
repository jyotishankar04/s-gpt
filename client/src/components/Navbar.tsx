import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar flex px-5  border-b border-gray-300/50 justify-between items-center bg-base-300">
      <div className=" text-white">
        <h1 className="btn btn-ghost normal-case text-xl">Nex GPT</h1>
      </div>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link
            to="/auth/sign-in"
            className="btn btn-primary btn-sm rounded-sm  capitalize  text-lg"
          >
            Sign in
          </Link>
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
