import React from "react";

const PageLoader = () => {
  return (
    <div
      className="fixed inset-0 bg-white/80 flex items-center justify-center z-50"
      role="status"
      aria-live="polite"
      aria-label="Loading content, please wait"
    >
      <img
        src="/loader2.svg"
        alt="Loading animation"
        width={100}
        height={100}
        className="animate-spin"
        loading="eager"
        draggable="false"
      />
    </div>
  );
};

export default PageLoader;
