import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl font-semibold mb-2 text-center">
        Page not found!
      </h1>

      <img
        className="h-44"
        src="../svgs/not_found.svg"
        alt="Reset password"
      />

      <p className="text-sm text-center">
        404: Lost in cyberspace. We're searching for your page.<br/>Meanwhile, enjoy the cosmic solitude. 🚀✨
      </p>

        <div className="flex flex-col gap-2 mt-5">
          <div className="flex flex-row justify-center gap-3 mb-5">

          </div>

          <a onClick={() => window.history.back()} className="btn normal-case">
            Go back to login
          </a>
        </div>
    </div>
  );
};

export default NotFound;
