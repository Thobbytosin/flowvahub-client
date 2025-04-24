import React from "react";
import RevealWrapper, {
  springFadeInRight,
} from "../../components/animation/RevealWrapper";
import Loader from "../../components/ui/Loader";
import type { AuthFormType, AuthMessageType } from "../../types/auth.types";
import GoogleLoginButton from "../ui/GoogleLoginButton";

type Props = {
  loading: boolean;
  message: { text: string; type: AuthMessageType | "" };
  email: string;
  password: string;
  setEmail: (value: string) => void;
  showSignupPassword: boolean;
  showConfirmPassword: boolean;
  setShowSignupPassword: (v: boolean) => void;
  setShowConfirmPassword: (v: boolean) => void;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  setActiveForm: (formType: AuthFormType) => void;
  getPasswordStrengthClass: () => void;
  getPasswordStrengthWidth: () => void;
  showMessage: (text: string, type: AuthMessageType) => void;
  handleSubmit: (e: React.FormEvent, formType: AuthFormType) => void;
};

const Signup = ({
  email,
  message,
  loading,
  setEmail,
  showSignupPassword,
  setShowConfirmPassword,
  password,
  showConfirmPassword,
  setPassword,
  setShowSignupPassword,
  confirmPassword,
  setConfirmPassword,
  setActiveForm,
  getPasswordStrengthClass,
  getPasswordStrengthWidth,
  handleSubmit,
}: Props) => {
  return (
    <RevealWrapper animate variants={springFadeInRight}>
      <form
        onSubmit={(e) => handleSubmit(e, "signup")}
        className="animate-fadeInUp"
        aria-label="Signup form"
        data-testid="signup-form"
      >
        {/* Header */}
        <div
          className="flex items-center justify-center text-[#7C4DFF] text-2xl font-bold my-8"
          aria-hidden="true"
        >
          <svg
            className="w-7 h-7 mr-2"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          Flowva
        </div>

        <div
          className="text-[#616161] text-2xl font-semibold mb-8 text-center"
          id="signup-title"
        >
          Join Flowva today
        </div>

        {/* Message feedback */}
        {message.text && (
          <div
            role="alert"
            data-testid="signup-message"
            className={`p-3 rounded-lg mb-5 text-sm ${
              message.type === "error"
                ? "bg-red-50 text-red-600 border-l-4 border-red-500"
                : "bg-green-50 text-green-600 border-l-4 border-green-500"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Email Field */}
        <div className="mb-5">
          <label
            htmlFor="signup-email"
            className="block text-sm text-[#616161] font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="signup-email"
            name="email"
            autoComplete="email"
            aria-describedby="signup-title"
            data-testid="signup-email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-gray-50 text-sm transition-all 
               focus:border-[#7C4DFF] focus:outline-none focus:ring-3 focus:ring-[#7C4DFF]/20"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-5 relative">
          <label
            htmlFor="signup-password"
            className="block text-sm text-[#616161] font-medium mb-2"
          >
            Password
          </label>
          <input
            type={showSignupPassword ? "text" : "password"}
            id="signup-password"
            name="password"
            autoComplete="new-password"
            data-testid="signup-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-gray-50 text-sm transition-all 
               focus:border-[#7C4DFF] focus:outline-none focus:ring-3 focus:ring-[#7C4DFF]/20"
            required
          />
          <button
            type="button"
            aria-label={showSignupPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-11 text-sm text-[#757575]"
            onClick={() => setShowSignupPassword(!showSignupPassword)}
            data-testid="toggle-signup-password"
          >
            {showSignupPassword ? "Hide" : "Show"}
          </button>
          <div
            className="h-1 bg-gray-200 rounded-full mt-2 overflow-hidden"
            aria-hidden="true"
          >
            <div
              className={`h-full ${getPasswordStrengthClass()} ${getPasswordStrengthWidth()} transition-all duration-300`}
            ></div>
          </div>
          {password.length > 0 && (
            <div className="text-xs text-[#757575] mt-1" id="password-guidance">
              Use at least 8 characters with a mix of letters, numbers & symbols
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-5 relative">
          <label
            htmlFor="confirm-password"
            className="block text-sm text-[#616161] font-medium mb-2"
          >
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirm-password"
            name="confirmPassword"
            autoComplete="new-password"
            data-testid="signup-confirm-password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-gray-50 text-sm transition-all 
               focus:border-[#7C4DFF] focus:outline-none focus:ring-3 focus:ring-[#7C4DFF]/20"
            required
          />
          <button
            type="button"
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
            className="absolute right-3 top-11 text-sm text-[#757575]"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            data-testid="toggle-confirm-password"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          data-testid="signup-submit"
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
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              Create account
            </>
          )}
        </button>

        {/* Divider */}
        <div
          className="flex items-center my-6 text-sm text-[#757575] font-medium"
          role="separator"
          aria-label="Alternative sign in options"
        >
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-3">or continue with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Google Login */}
        <GoogleLoginButton data-testid="signup-google" />

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-[#757575]">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setActiveForm("signin")}
            className="text-[#7C4DFF] font-medium hover:underline"
            aria-label="Switch to sign in"
            data-testid="switch-to-signin"
          >
            Sign in
          </button>
        </div>
      </form>
    </RevealWrapper>
  );
};

export default Signup;
