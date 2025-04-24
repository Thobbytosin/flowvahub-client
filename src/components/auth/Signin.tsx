import React from "react";
import RevealWrapper, {
  scaleIn,
} from "../../components/animation/RevealWrapper";
import GoogleLoginButton from "../../components/ui/GoogleLoginButton";
import Loader from "../../components/ui/Loader";
import type { AuthFormType, AuthMessageType } from "../../types/auth.types";

type Props = {
  message: { text: string; type: AuthMessageType | "" };
  email: string;
  loading: boolean;
  setEmail: (value: string) => void;
  showPassword: boolean;
  password: string;
  setShowPassword: (v: boolean) => void;
  setPassword: (value: string) => void;
  setActiveForm: (formType: AuthFormType) => void;
  handleSubmit: (e: React.FormEvent, formType: AuthFormType) => void;
};

const Signin = ({
  handleSubmit,
  message,
  email,
  setEmail,
  showPassword,
  password,
  loading,
  setShowPassword,
  setPassword,
  setActiveForm,
}: Props) => {
  return (
    <RevealWrapper animate variants={scaleIn}>
      <form
        onSubmit={(e) => handleSubmit(e, "signin")}
        className="animate-fadeInUp"
        aria-label="Sign in form"
        data-form="signin"
      >
        {/* Logo and welcome message */}
        <div
          className="flex items-center justify-center text-[#7C4DFF] text-2xl font-bold my-8"
          aria-hidden="true"
        >
          <svg
            className="w-7 h-7 mr-2"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          Flowva
        </div>

        <h2 className="text-[#616161] text-2xl font-semibold mb-8 text-center">
          Welcome back
        </h2>

        {message.text && (
          <div
            role="alert"
            aria-live="polite"
            data-message-type={message.type}
            className={`p-3 rounded-lg mb-5 text-sm ${
              message.type === "error"
                ? "bg-red-50 text-red-600 border-l-4 border-red-500"
                : "bg-green-50 text-green-600 border-l-4 border-green-500"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Email input */}
        <div className="mb-5 relative" data-group="email">
          <label
            htmlFor="email"
            className="block text-sm text-[#616161] font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            aria-required="true"
            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-gray-50 text-sm transition-all 
                 focus:border-[#7C4DFF] focus:outline-none focus:ring-3 focus:ring-[#7C4DFF]/20"
          />
        </div>

        {/* Password input */}
        <div className="mb-5 relative" data-group="password">
          <label
            htmlFor="password"
            className="block text-sm text-[#616161] font-medium mb-2"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            aria-required="true"
            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-gray-50 text-sm transition-all 
                 focus:border-[#7C4DFF] focus:outline-none focus:ring-3 focus:ring-[#7C4DFF]/20"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-11 text-sm text-[#757575]"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Forgot password */}
        <div className="text-right mb-5">
          <button
            type="button"
            className="text-sm text-[#757575] hover:text-[#7C4DFF] transition-colors"
            onClick={() => setActiveForm("forgot")}
            aria-label="Forgot password"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          aria-disabled={loading}
          data-button="submit-signin"
          className="w-full py-3.5 px-4 rounded-xl bg-[#7C4DFF] text-white font-medium
               flex items-center justify-center gap-2 hover:bg-[#651FFF] transition-all
               hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              Sign in
            </>
          )}
        </button>

        {/* Divider */}
        <div
          className="flex items-center my-6 text-sm text-[#757575] font-medium"
          role="separator"
          aria-orientation="horizontal"
        >
          <div
            className="flex-grow border-t border-gray-200"
            aria-hidden="true"
          ></div>
          <span className="mx-3">or continue with</span>
          <div
            className="flex-grow border-t border-gray-200"
            aria-hidden="true"
          ></div>
        </div>

        {/* Google button */}
        <GoogleLoginButton data-button="google-signin" />

        {/* Sign up redirect */}
        <div className="text-center mt-6 text-sm text-[#757575]">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => setActiveForm("signup")}
            className="text-[#7C4DFF] font-medium hover:underline"
            aria-label="Switch to sign up"
          >
            Sign up
          </button>
        </div>
      </form>
    </RevealWrapper>
  );
};

export default Signin;
