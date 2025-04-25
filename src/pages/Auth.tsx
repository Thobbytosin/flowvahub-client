import Authentication from "../components/auth/Authentication";
import React from "react";

type Props = {};

const Auth = (props: Props) => {
  return (
    <>
      <title>Flowva Hub - Sign Up</title>
      <meta
        name="description"
        content="Sign up to Flowva and get started with your smart library for organizing tools, tracking usage, and boosting productivity."
      />

      <main
        role="main"
        aria-labelledby="auth-heading"
        className="w-full h-full"
      >
        <Authentication />
      </main>
    </>
  );
};

export default Auth;
