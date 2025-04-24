import React from "react";
import RevealWrapper, {
  fadeInLeft,
} from "../../components/animation/RevealWrapper";
import Loader from "../../components/ui/Loader";
import type { AuthFormType, AuthMessageType } from "../../types/auth.types";

type Props = {
  message: { text: string; type: AuthMessageType | "" };
  email: string;
  loading: boolean;
  setEmail: (value: string) => void;
  setActiveForm: (formType: AuthFormType) => void;
  handleSubmit: (e: React.FormEvent, formType: AuthFormType) => void;
};

const ForgotPassword = ({
  handleSubmit,
  message,
  email,
  setEmail,
  loading,
  setActiveForm,
}: Props) => {
  return (
    <RevealWrapper animate variants={fadeInLeft}>
      <form
        onSubmit={(e) => handleSubmit(e, "forgot")}
        className="animate-fadeInUp"
        role="form"
        aria-labelledby="form-title"
      >
        {/* Brand Header */}
        <div
          className="flex items-center justify-center text-[#7C4DFF] text-2xl font-bold my-8"
          role="banner"
        >
          <svg
            className="w-7 h-7 mr-2"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          <span id="form-brand">Flowva</span>
        </div>

        {/* Title */}
        <div
          id="form-title"
          className="text-[#616161] text-2xl font-semibold mb-8 text-center"
        >
          Reset your password
        </div>

        {/* Message Feedback */}
        {message.text && (
          <div
            role="alert"
            aria-live="assertive"
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
            htmlFor="forgot-email"
            className="block text-sm text-[#616161] font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="forgot-email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-gray-50 text-sm transition-all 
          focus:border-[#7C4DFF] focus:outline-none focus:ring-3 focus:ring-[#7C4DFF]/20"
            required
            aria-required="true"
            autoComplete="email"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          aria-disabled={loading}
          aria-busy={loading}
          className="w-full py-3.5 px-4 rounded-xl bg-[#7C4DFF] text-white font-medium
        flex items-center justify-center gap-2 hover:bg-[#651FFF] transition-all
        hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
        >
          {loading ? (
            <Loader aria-label="Sending reset link..." />
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
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>Send reset link</span>
            </>
          )}
        </button>

        {/* Redirect to Sign In */}
        <div className="text-center mt-6 text-sm text-[#757575]">
          <span>Remember your password? </span>
          <button
            type="button"
            onClick={() => setActiveForm("signin")}
            className="text-[#7C4DFF] font-medium hover:underline"
            aria-label="Go to sign in form"
          >
            Sign in
          </button>
        </div>
      </form>
    </RevealWrapper>
  );
};

export default ForgotPassword;
