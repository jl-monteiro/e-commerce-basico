import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-primary rounded-full animate-spin border-t-transparent" />
    </div>
  );
};

export default Loading;
