import { SignIn } from "@clerk/clerk-react";

const LoginPage = () => {
  return (
    <div>
      <SignIn
        signUpUrl="/auth/sign-up"
        forceRedirectUrl={"/dashboard"}
        path="/auth/sign-in"
      />
    </div>
  );
};

export default LoginPage;
