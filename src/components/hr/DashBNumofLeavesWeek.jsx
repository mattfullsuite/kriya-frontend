import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const DashBNumofLeaveWeek = () => {
  const [countLeave, setLeave] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  useEffect(() => {
    const fetchCountLeave = async () => {
      try {
        const res = await axios.get(BASE_URL + "/numofallleavesweek");

        setLeave(res.data.length);
      } catch (e) {
        console.log(e);
      }
    };

    fetchCountLeave();
  }, []);

  return (
    <>
      <div className="m-2 p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col items-center justify-between text-center md:w-56 h-56">
      <h1 className="text-lg font-semibold text-center w-full">
          Out of office
        </h1>
        <h1 className="text-lg font-normal italic text-center w-full">
          This Week
        </h1>


        <h1 className="my-1 text-5xl font-bold">{countLeave}</h1>

        <div className="text-right w-full">
          <span className="text-[12px] text-gray-500 italic">
          {moment().startOf('week').format("MMMM DD") + " - " + moment().endOf('week').format("MMMM DD")} 
          </span>
        </div>
      </div>
    </>
  );
};

export default DashBNumofLeaveWeek;
