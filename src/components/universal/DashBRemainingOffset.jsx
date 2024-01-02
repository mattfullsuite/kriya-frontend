import React, { useState, useEffect } from "react";
const DashBRemainingOffset = () => {
  return (
    <>
      {/* Remaining Offset Time */}
      <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col items-center justify-center text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="mb-2 w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <h1 className="text-lg font-semibold">Remaining Offset Time</h1>
        <h1 className="mb-3 text-3xl font-bold">5 hr/s</h1>
        <a className="link text-blue-700">&gt; Request for Reparation</a>
      </div>
    </>
  );
};

export default DashBRemainingOffset;

