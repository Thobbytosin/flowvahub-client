import Authentication from "../components/auth/Authentication";
import React from "react";

type Props = {};

const Auth = (props: Props) => {
  return (
    <main role="main" aria-labelledby="auth-heading" className="w-full h-full">
      <Authentication />
    </main>
  );
};

export default Auth;
