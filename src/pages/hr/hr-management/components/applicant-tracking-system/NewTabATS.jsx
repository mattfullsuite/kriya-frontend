import { useState, useEffect, useContext, useReducer, useRef } from "react";
import axios from "axios";
import Headings from "../../../../../components/universal/Headings";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import RequisitionStats from "./RequisitionStats";

export const NewTabATS = ({
    bgColor,
    hoverColor,
    disabledColor,
    fillColor,
    textColor,
    accentColor,
    lightColor,
    focusBorder,
    borderColor,
}) => {

  return (
    <>
        <ToastContainer />
        <div className="m-auto max-w-[1300px] p-5">
            <Headings text={"Applicant Tracking System"} />
            <div className="flex flex-row my-5 justify-between w-[100%] bg-white">
                <Link
                    className={`flex-1 rounded-[8px] py-2 text-${bgColor} w-[100%]`}
                    to={`/hr/hr-management/applicant-tracking-system`}
                >
                    <button className="text-sm w-full"> Home </button>
                </Link>

                <Link
                    className={`flex-1 rounded-[8px] py-2 text-white ${bgColor} cursor-pointer w-[100%]`}
                    to={`/hr/hr-management/applicant-tracking-system/new-tab`}
                >
                    <button className="text-sm w-full"> Dashboards </button>
                </Link>
            </div>
            
            <div className="bg-white border border-[#e4e4e4] rounded-[15px] p-5">
                <RequisitionStats />
            </div>

            <div className="bg-white border border-[#e4e4e4] rounded-[15px] p-5">
                <p>Updates soon...</p>
            </div>
            
        </div>
    </>
  )
}
