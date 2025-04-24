// types.ts
export type AuthFormType = "signin" | "signup" | "forgot";
export type AuthMessageType = "error" | "success";

export interface AuthState {
  activeForm: AuthFormType;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showSignupPassword: boolean;
  showConfirmPassword: boolean;
  passwordStrength: number;
  message: {
    text: string;
    type: AuthMessageType | "";
  };
}

export type AuthAction =
  | { type: "SET_ACTIVE_FORM"; payload: AuthFormType }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_CONFIRM_PASSWORD"; payload: string }
  | { type: "TOGGLE_SHOW_PASSWORD" }
  | { type: "TOGGLE_SHOW_SIGNUP_PASSWORD" }
  | { type: "TOGGLE_SHOW_CONFIRM_PASSWORD" }
  | { type: "SET_PASSWORD_STRENGTH"; payload: number }
  | { type: "SET_MESSAGE"; payload: { text: string; type: AuthMessageType } }
  | { type: "CLEAR_MESSAGE" };
