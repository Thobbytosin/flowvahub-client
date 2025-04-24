import React from "react";

const Loader = () => {
  return (
    <span className=" flex items-center justify-center ">
      <img
        src="/loader.svg"
        alt="Loading..."
        aria-label="loading_icon"
        width={30}
        height={30}
      />
    </span>
  );
};

export default Loader;
