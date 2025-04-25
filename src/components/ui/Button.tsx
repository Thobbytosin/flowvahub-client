import React, { type FormEvent } from "react";
import Loader from "./Loader";

type Props = {
  handleClick?: () => void;
  handleClickForm?: (e: FormEvent) => void;
  title: string;
  type: "submit" | "button";
  addMargin?: boolean;
  landingPage?: boolean;
  finalPage?: boolean;
  loading?: boolean;
};

const Button = ({
  handleClick,
  title,
  type,
  handleClickForm,
  addMargin = true,
  landingPage = false,
  finalPage = false,
  loading,
}: Props) => {
  return (
    <button
      onClick={type == "button" ? handleClick : handleClickForm}
      type={type}
      className={`w-full rounded-theme  text-center py-3 font-semibold cursor-pointer  transition-all duration-500 bg-light hover:-translate-y-[2px] ${
        addMargin ? "mt-16 md:mt-20" : ""
      } ${
        landingPage
          ? " text-primary bg-white card-shadow"
          : "text-white bg-primary"
      }`}
    >
      {loading ? <Loader /> : title}
    </button>
  );
};

export default Button;
