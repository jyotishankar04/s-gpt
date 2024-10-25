import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div>
      <SignUp
        signInUrl="/auth/sign-in"
        forceRedirectUrl={"/dashboard"}
        path="/auth/sign-up"
      />
    </div>
  );
};

export default SignUpPage;
