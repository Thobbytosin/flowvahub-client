import type { AuthAction, AuthState } from "../types/auth.types";

export const initialAuthState: AuthState = {
  activeForm: "signup",
  email: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
  showSignupPassword: false,
  showConfirmPassword: false,
  passwordStrength: 0,
  message: { text: "", type: "" },
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_ACTIVE_FORM":
      return { ...state, activeForm: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    case "TOGGLE_SHOW_PASSWORD":
      return { ...state, showPassword: !state.showPassword };
    case "TOGGLE_SHOW_SIGNUP_PASSWORD":
      return { ...state, showSignupPassword: !state.showSignupPassword };
    case "TOGGLE_SHOW_CONFIRM_PASSWORD":
      return { ...state, showConfirmPassword: !state.showConfirmPassword };
    case "SET_PASSWORD_STRENGTH":
      return { ...state, passwordStrength: action.payload };
    case "SET_MESSAGE":
      return { ...state, message: action.payload };
    case "CLEAR_MESSAGE":
      return { ...state, message: { text: "", type: "" } };
    default:
      return state;
  }
}
