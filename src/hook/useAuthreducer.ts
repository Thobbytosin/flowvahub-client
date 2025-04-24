// useAuthReducer.ts
import { useReducer } from "react";
import type { AuthFormType, AuthMessageType } from "../types/auth.types";
import { authReducer, initialAuthState } from "../utils/authReducer";

export function useAuthReducer() {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const setActiveForm = (formType: AuthFormType) =>
    dispatch({ type: "SET_ACTIVE_FORM", payload: formType });

  const setEmail = (email: string) =>
    dispatch({ type: "SET_EMAIL", payload: email });

  const setPassword = (password: string) =>
    dispatch({ type: "SET_PASSWORD", payload: password });

  const setConfirmPassword = (confirmPassword: string) =>
    dispatch({ type: "SET_CONFIRM_PASSWORD", payload: confirmPassword });

  const toggleShowPassword = () => dispatch({ type: "TOGGLE_SHOW_PASSWORD" });

  const toggleShowSignupPassword = () =>
    dispatch({ type: "TOGGLE_SHOW_SIGNUP_PASSWORD" });

  const toggleShowConfirmPassword = () =>
    dispatch({ type: "TOGGLE_SHOW_CONFIRM_PASSWORD" });

  const setPasswordStrength = (strength: number) =>
    dispatch({ type: "SET_PASSWORD_STRENGTH", payload: strength });

  const setMessage = (text: string, type: AuthMessageType) => {
    dispatch({ type: "SET_MESSAGE", payload: { text, type } });
  };

  const clearMessage = () => dispatch({ type: "CLEAR_MESSAGE" });

  return {
    state,
    actions: {
      setActiveForm,
      setEmail,
      setPassword,
      setConfirmPassword,
      toggleShowPassword,
      toggleShowSignupPassword,
      toggleShowConfirmPassword,
      setPasswordStrength,
      setMessage,
      clearMessage,
    },
  };
}
