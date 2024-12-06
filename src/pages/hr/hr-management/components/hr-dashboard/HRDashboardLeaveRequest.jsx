import  Axios from 'axios';
import React, { useEffect, useState } from 'react'

export const HRDashboardLeaveRequest = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [countPendingLeaves, setCountPendingLeaves] = useState([]);
    const [countApprovedLeaves, setCountApprovedLeaves] = useState([]);
    const [countDeclinedLeaves, setCountDeclinedLeaves] = useState([]);


    useEffect(() => {
        const fetchMyTimeAndAttendanceDetails = async () => {
            try {
                const count_pending_leaves_res = await Axios.get(BASE_URL + "/mtaa-mypendingleaves");
                const count_approved_leaves_res = await Axios.get(BASE_URL + "/mtaa-myapprovedleaves");
                const count_declined_leaves_res = await Axios.get(BASE_URL + "/mtaa-mydeclinedleaves");
                setCountPendingLeaves(count_pending_leaves_res.data);
                setCountApprovedLeaves(count_approved_leaves_res.data);
                setCountDeclinedLeaves(count_declined_leaves_res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMyTimeAndAttendanceDetails();
    }, []);

  return (
    <>
        <div className="bg-white w-4/5 lg:flex-1 border border-[#E4E4E4] box-border p-5 rounded-[15px] flex flex-col justify-between">
            <div className="box-border">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="fill-[#90946f]  w-6 h-6"
                >
                    <path d="M21 20V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM9 18H7v-2h2v2zm0-4H7v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm2-5H5V7h14v2z"></path>
                </svg>

                <span className="font-medium text-[14px] text-[#8B8B8B]">
                    My Leave Request (YTD)
                </span>
            </div>

            <div className="box-border flex flex-row justify-between items-center mt-1">
                <div className="box-border flex-1">
                    <p className="text-[10px] text-[#8B8B8B] text-center">
                        Approved
                    </p>

                    <p className="text-[#363636] text-center text-2xl font-bold">
                        {countApprovedLeaves.length}
                    </p>
                </div>

                <div className="divider divider-horizontal mt-5 mx-5" />

                <div className="box-border flex-1">
                    <p className="text-[10px] text-[#8B8B8B] text-center">
                        Pending
                    </p>
                    <p className="text-[#363636] text-center text-2xl font-bold">
                        {countPendingLeaves.length}
                    </p>
                </div>

                <div className="divider divider-horizontal mt-5 mx-5" />

                <div className="box-border flex-1">
                    <p className="text-[10px] text-[#8B8B8B] text-center">
                        Declined
                    </p>
                    <p className="text-[#363636] text-center text-2xl font-bold">
                        {countDeclinedLeaves.length}
                    </p>
                </div>
            </div>
        </div>
    </>
  )
}
