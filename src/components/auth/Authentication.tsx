import React, { useEffect, useMemo } from "react";
import { useAuthReducer } from "../../hook/useAuthreducer";
import Signup from "./Signup";
import Signin from "./Signin";
import ForgotPassword from "./ForgotPassword";
import type { AuthFormType, AuthMessageType } from "../../types/auth.types";
import { useMutateData } from "../../hook/useApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useUserStore } from "../../store/useUserStore";

type Props = {};

const Authentication = (props: Props) => {
  const { state, actions } = useAuthReducer();
  const {
    activeForm,
    email,
    password,
    confirmPassword,
    showPassword,
    showSignupPassword,
    showConfirmPassword,
    passwordStrength,
    message,
  } = state;
  const { mutate: registerUser, isPending: registerPending } = useMutateData({
    url: "/auth/signup",
    method: "POST",
    mutationKey: ["signup"],
  });
  const { mutate: loginUser, isPending: loginPending } = useMutateData({
    url: "/auth/signin",
    method: "POST",
    mutationKey: ["signin"],
  });
  const { mutate: forgotPassword, isPending: forgotPending } = useMutateData({
    url: "/user/forgot-password",
    method: "POST",
    mutationKey: ["forgot-password"],
  });
  const { setPasswordStrength } = actions;
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (activeForm !== "signup" || !password) {
  //     setPasswordStrength(0);
  //     return;
  //   }

  //   let strength = 0;
  //   if (password.length > 7) strength++;
  //   if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength++;
  //   if (password.match(/[0-9]/)) strength++;
  //   if (password.match(/[!,%,&,@,#,$,^,.,*,?,_,~]/)) strength++;

  //   setPasswordStrength(strength);
  // }, [password, activeForm]);

  const getPasswordStrengthClass = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthWidth = () => {
    if (passwordStrength === 0) return "w-0";
    if (passwordStrength <= 1) return "w-1/3";
    if (passwordStrength <= 3) return "w-2/3";
    return "w-full";
  };

  const showMessage = (text: string, type: AuthMessageType) => {
    actions.setMessage(text, type);
    setTimeout(() => actions.setMessage("", "" as AuthMessageType), 2000);
  };

  const handleSubmit = async (e: React.FormEvent, formType: AuthFormType) => {
    e.preventDefault();
    if (formType === "signin" && (!email || !password)) {
      showMessage("Please fill in all fields", "error");
      return;
    }
    if (formType === "signup" && (!email || !password || !confirmPassword)) {
      showMessage("Please fill in all fields", "error");
      return;
    }
    if (formType === "signup" && password !== confirmPassword) {
      showMessage("Passwords do not match", "error");
      return;
    }
    if (formType === "signup" && password.length < 8) {
      showMessage("Password must be at least 8 characters", "error");
      return;
    }

    const actionMap: Record<AuthFormType, any> = {
      signin: loginUser,
      signup: registerUser,
      forgot: forgotPassword,
    };

    const currentAction = actionMap[formType];

    currentAction(
      { email, password },
      {
        onSuccess: (data: any) => {
          toast.success(data.message, { duration: 4000 });
          showMessage(data.message, "success");

          if (formType === "signup") {
            actions.setActiveForm("signin");
          } else if (formType === "signin") {
            navigate("/onboarding");
          } else {
            actions.setActiveForm("signin");
          }
        },
        onError: (error: any) => {
          toast.error(error.response.data.message, { duration: 4000 });
          showMessage(error.response.data.message, "error");
        },
      }
    );
  };

  return (
    <main className=" min-h-screen w-screen flex items-center justify-center py-20">
      <div className="  w-[80%] lg:w-[60%] min-h-[80%] bg-white rounded-theme card-shadow p-10 gradient-border-box ">
        {activeForm === "signup" && (
          <Signup
            loading={registerPending}
            message={message}
            email={email}
            password={password}
            setEmail={actions.setEmail}
            showSignupPassword={showSignupPassword}
            showConfirmPassword={showConfirmPassword}
            setPassword={actions.setPassword}
            setShowSignupPassword={actions.toggleShowSignupPassword}
            setConfirmPassword={actions.setConfirmPassword}
            confirmPassword={confirmPassword}
            setShowConfirmPassword={actions.toggleShowConfirmPassword}
            setActiveForm={actions.setActiveForm}
            getPasswordStrengthWidth={getPasswordStrengthWidth}
            getPasswordStrengthClass={getPasswordStrengthClass}
            showMessage={showMessage}
            handleSubmit={handleSubmit}
          />
        )}
        {activeForm === "signin" && (
          <Signin
            email={email}
            loading={loginPending}
            setEmail={actions.setEmail}
            handleSubmit={handleSubmit}
            message={message}
            showPassword={showPassword}
            setShowPassword={actions.toggleShowPassword}
            password={password}
            setPassword={actions.setPassword}
            setActiveForm={actions.setActiveForm}
          />
        )}
        {activeForm === "forgot" && (
          <ForgotPassword
            loading={forgotPending}
            handleSubmit={handleSubmit}
            message={message}
            email={email}
            setEmail={actions.setEmail}
            setActiveForm={actions.setActiveForm}
          />
        )}
      </div>
    </main>
  );
};

export default Authentication;
