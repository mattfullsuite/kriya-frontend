import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const DashBNumofLeaveToday = () => {
  const [countLeave, setLeave] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  useEffect(() => {
    const fetchCountLeave = async () => {
      try {
        const res = await axios.get(BASE_URL + "/numofdeptleavestoday");

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
        <h1 className="text-xl font-semibold text-left w-full">
          Out of office
        </h1>

        <h1 className="my-1 text-7xl font-bold">{countLeave}</h1>

        <div className="text-right w-full">
          <span className="text-[12px] text-gray-500 italic">
            Today {moment().format("MMMM DD, YYYY")}
          </span>
        </div>
      </div>
    </>
  );
};

export default DashBNumofLeaveToday;
