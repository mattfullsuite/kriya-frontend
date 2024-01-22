import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashBNumofLeaveWeek = () => {
  const [countLeave, setLeave] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  useEffect(() => {
    const fetchCountLeave = async () => {
      try {
        await axios.get(BASE_URL + "/numofallleavesweek").then((res) => {
          setLeave(res.data.length);
          setIsLoading(false);
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchCountLeave();
  }, []);

  return isLoading ? (
    <div className="m-2 p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col items-center justify-between text-center md:w-56 h-56">
      <h1 className="text-lg font-semibold text-center w-full">
        <Skeleton width={120} />
      </h1>

      <h1 className="text-lg font-normal italic text-center w-full">
        <Skeleton width={60} />
      </h1>

      <h1 className="my-1 text-5xl font-bold">
        <Skeleton height={40} width={50} />
      </h1>

      <div className="text-right w-full">
        <span className="text-[12px] text-gray-500 italic">
          <Skeleton height={12} width={100} />
        </span>
      </div>
    </div>
  ) : (
    <div className="m-2 p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col items-center justify-between text-center md:w-56 h-56">
      <h1 className="text-lg font-semibold text-center w-full">
        Out of Office
      </h1>
      <h1 className="text-lg font-normal italic text-center w-full">
        This Week
      </h1>

      <h1 className="my-1 text-5xl font-bold">{countLeave}</h1>

      <div className="text-right w-full">
        <span className="text-[12px] text-gray-500 italic">
          {moment().startOf("week").format("MMMM DD") +
            " - " +
            moment().endOf("week").format("MMMM DD")}
        </span>
      </div>
    </div>
  );
};

export default DashBNumofLeaveWeek;
