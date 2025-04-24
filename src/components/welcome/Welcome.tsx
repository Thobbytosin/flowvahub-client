import React from "react";
import { useNavigate } from "react-router";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <main
      className="w-screen h-screen flex items-center justify-center bg-white"
      role="main"
      aria-labelledby="welcome-heading"
    >
      <div
        className="max-w-[70%] text-center px-4"
        data-testid="welcome-container"
      >
        <h1
          id="welcome-heading"
          className="text-[2rem] font-bold mb-4 text-primary"
        >
          Welcome to Flowva
        </h1>
        <p
          className="text-base text-gray-700"
          aria-describedby="welcome-description"
        >
          Your smart library for organizing tools, tracking usage, and turning
          productivity into rewards. Let's set up your account in 2 minutes.
        </p>

        <div
          className="w-full md:w-[50%] mx-auto mt-16"
          data-testid="welcome-actions"
        >
          <button
            onClick={() => navigate("/auth")}
            type="button"
            className="w-full py-3 text-2xl font-semibold text-primary bg-light rounded-theme border-b-2 border-primary transition-transform duration-300 hover:-translate-y-1"
            aria-label="Get started with Flowva"
            data-testid="get-started-button"
          >
            Get Started
          </button>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
