import Axios from 'axios';
import React, { useEffect, useState } from 'react';

export const HRDashboardLeaveTaken = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [countPaidLeaves, setCountPaidLeaves] = useState([]);
    const [countUnpaidLeaves, setCountUnpaidLeaves] = useState([]);

    useEffect(() => {
        const fetchMyTimeAndAttendanceDetails = async () => {
          try {
            const count_paid_leaves_res = await Axios.get(BASE_URL + "/mtaa-countmypaidleaves");
            const count_unpaid_leaves_res = await Axios.get(BASE_URL + "/mtaa-countmyunpaidleaves");
            setCountPaidLeaves(count_paid_leaves_res.data[0].count);
            setCountUnpaidLeaves(count_unpaid_leaves_res.data[0].count);
          } catch (err) {
            console.log(err);
          }
        };
        fetchMyTimeAndAttendanceDetails();
      }, []);

  return (
    <>
        <div className="bg-white w-4/5 lg:flex-1 border border-[#E4E4E4] box-border p-5 rounded-[15px] flex basis-4/12 flex-col justify-between">
            <div className="box-border">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="fill-[#90946f] w-6 h-6"
                >
                    <path d="M21 20V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM9 18H7v-2h2v2zm0-4H7v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm2-5H5V7h14v2z"></path>
                </svg>

                <span className="font-medium text-[14px] text-[#90946f]">
                    My Leave Taken
                </span>
            </div>

            <div className="box-border flex flex-row justify-between items-center">
                <div className="box-border flex-1">
                    <p className="text-[#363636] text-center text-3xl font-bold">
                        {countPaidLeaves}
                    </p>

                    <p className="text-[10px] text-[#8B8B8B] text-center">
                        Paid
                    </p>
                </div>

            <div className="divider divider-horizontal mt-5 mx-5" />
                <div className="box-border flex-1">
                    <p className="text-[#363636] text-center text-3xl font-bold">
                        {countUnpaidLeaves}
                    </p>
                    <p className="text-[10px] text-[#8B8B8B] text-center">
                        Unpaid
                    </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default HRDashboardLeaveTaken;