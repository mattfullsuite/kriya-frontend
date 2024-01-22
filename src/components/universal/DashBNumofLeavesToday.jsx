import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashBNumofLeaveToday = () => {
  const [countLeave, setLeave] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCountLeave = async () => {
      try {
        const res = await axios.get(BASE_URL + "/numofdeptleavestoday");
        setLeave(res.data.length);
        // setIsLoading(true);

      } catch (e) {
        console.log(e);
      }
    };

    fetchCountLeave();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div className="m-2 p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col items-center justify-between text-center md:w-56 h-56">
            <h1 className="text-lg font-semibold text-center w-full">
              <Skeleton height={20} width={230} />
            </h1>
            <h1 className="text-lg font-normal italic text-center w-full">
              <Skeleton height={20} width={230} />
            </h1>

            <h1 className="my-1 text-5xl font-bold">
              <Skeleton height={20} width={230} />
            </h1>

            <div className="text-right w-full">
              <span className="text-[12px] text-gray-500 italic">
                <Skeleton height={20} width={230} />
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="m-2 p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col items-center justify-between text-center md:w-56 h-56">
            <h1 className="text-lg font-semibold text-center w-full">
              Out of Office
            </h1>
            <h1 className="text-lg font-normal italic text-center w-full">
              Today
            </h1>

            <h1 className="my-1 text-5xl font-bold">{countLeave}</h1>

            <div className="text-right w-full">
              <span className="text-[12px] text-gray-500 italic">
                {moment().format("MMMM DD, YYYY")}
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashBNumofLeaveToday;
