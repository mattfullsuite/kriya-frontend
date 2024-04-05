import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashBAnniversaries = () => {
  const [upcomingAnniv, setUpcomingAnniv] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  useEffect(() => {
    const fetchAllAnnivs = async () => {
      try {
        const res = await Axios.get(BASE_URL + "/getupcominganniversaries");
        setUpcomingAnniv(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllAnnivs();
  }, []);

  return (
    <>
      {/* Anniversary Table */}
      {isLoading ? (
        <div className="p-3 border border-[#e4e4e4] border-solid rounded-[15px] bg-white flex flex-1 flex-col items-center justify-start">
          <h1 className="text-lg font-semibold">
            <Skeleton height={25} width={80} />
          </h1>
          <div className="overflow-x-auto max-w-full">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <Skeleton height={15} />
                  </th>
                  <th>
                    <Skeleton height={15} />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Skeleton height={15} width={100} count={10} />
                  </td>
                  <td>
                    <Skeleton height={15} width={70} count={10} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-3 border border-[#e4e4e4] border-solid rounded-[15px] bg-white flex flex-1 flex-col items-center justify-start">
          <h1 className="text-lg font-semibold">FS Anniversary</h1>
          <div className="overflow-x-auto max-w-full">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                {upcomingAnniv.map((anniv) => (
                  <tr>
                    <td>{anniv.f_name + " " + anniv.s_name}</td>
                    <td>{moment(anniv.date_hired).format("MMM DD")} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default DashBAnniversaries;
