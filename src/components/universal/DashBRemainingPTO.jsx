import React, { useState, useEffect } from "react";
import Axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashBremainingPTO = () => {
  const [ptos, setPtos] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserPTO = async () => {
      try {
        await Axios.get(BASE_URL + "/getUserPTO").then((res) => {
          setPtos(res.data);
          setIsLoading(false);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserPTO();
  }, []);

  return (
    <>
      {/* Number of PTOs */}

      {isLoading ? (
        <div className="m-2 p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col items-center justify-between text-center md:w-56 h-56">
          <h1 className="text-xl font-semibold text-left w-full"><Skeleton width={60} /></h1>

          <h1 className="text-xl font-semibold center w-full">
            <Skeleton height={60} width={60} />
          </h1>

          <div className="flex flex-col justify-end items-end w-full">
            <Skeleton height={12} width={60} />
            <Skeleton height={12} width={80} />
          </div>
        </div>
      ) : (
        ptos.map((pto) => (
          <div className="m-2 p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col items-center justify-between text-center md:w-56 h-56">
            <h1 className="text-xl font-semibold text-left w-full">
              PTO points
            </h1>

            <h1 className="my-1 text-7xl font-bold">{pto.leave_balance}</h1>

            <div className="flex flex-col justify-end items-end w-full">
              <span className="text-[11px] text-gray-500 italic">
                Available until
              </span>
              <span className="text-[12px] text-gray-500 italic">
                March 25, 2023
              </span>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default DashBremainingPTO;
