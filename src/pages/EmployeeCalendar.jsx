import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const EmployeeCalendar = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(BASE_URL + "/login")
      .then((response) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        navigate("/serverDown");
      });
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
          {" "}
          <h1 className="text-5xl text-center font-extrabold">SERVER DOWN</h1>
          
          <h1 className="text-2xl text-center italic mt-2">
            It's not you, it's us. :(
          </h1>

          <h1 className="text-2xl text-center italic mt-2">
            Kindly wait while we rebuild the website.
          </h1>
          
          <h1 className="text-sm text-center italic mt-2">
            - FS Engineering Department
          </h1>
          <img className="h-80 mt-10" src="/svgs/server_down.svg" alt="" />
          
      </div>
    </>
  );
};

export default EmployeeCalendar;
