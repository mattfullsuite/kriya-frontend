import { useState } from "react";
import Headings from "../Headings";

function ViewPayDispute(props) {
  return (
    <>
      <button
        className="text-[12px] font-semibold text-[#9E978E] bg-[#9E978E] bg-opacity-20 px-3 py-2 rounded-[8px]"
        onClick={() =>
          document
            .getElementById(`edit-form-${props.payDisputeInfo.id}`)
            .showModal()
        }
      >
        View
      </button>
      <dialog id={`edit-form-${props.payDisputeInfo.id}`} className="modal ">
        <div className="flex flex-col p-5 w-[400px] bg-white rounded-[15px] gap-5">
          <div className="flex flex-row">
            {/* Header */}
            <Headings text="View Dispute" />
            {/* Close Button */}
            <button
              className="ml-auto"
              onClick={() =>
                document
                  .getElementById(`edit-form-${props.payDisputeInfo.id}`)
                  .close()
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-row justify-between">
            {/* Date Raised */}
            <label>
              Date Raised: <br />
              {props.payDisputeInfo["Date Raised"]}
            </label>
            {/* Status */}
            <div className="w-28">
              <label>Status:</label>
              {props.payDisputeInfo["Status"] == "Submitted" ? (
                <div className="w-24 text-center rounded bg-[#FF974D]">
                  {props.payDisputeInfo["Status"]}
                </div>
              ) : props.payDisputeInfo["Status"] == "Pending" ? (
                <div className="w-24 text-center rounded bg-[#FFCD6B]">
                  {props.payDisputeInfo["Status"]}
                </div>
              ) : props.payDisputeInfo["Status"] == "Resolved" ? (
                <div className="w-24 text-center rounded bg-[#7DDA74]">
                  {props.payDisputeInfo["Status"]}
                </div>
              ) : (
                <div className="w-24 text-center rounded bg-[#008080] bg-opacity-30">
                  {props.payDisputeInfo["Status"]}
                </div>
              )}
            </div>
          </div>
          {/* Type of Complaint */}
          <label>
            Type of Complaint
            <select
              disabled
              className="w-full p-2 rounded-[15px] bg-[#F7F7F7] text-black"
              value={props.payDisputeInfo["Issue Raised"]}
            >
              <option disabled selected className="text-[#8B8B8B]">
                Select a Complaint:
              </option>
              <option>Payroll Computation</option>
              <option>Earnings Computation </option>
              <option>Deductions Computation</option>
              <option>Salary Dispute</option>
            </select>
          </label>
          {/* Reason */}
          <div>
            <label>
              Reasons:
              <textarea
                disabled
                className="p-2 w-full h-80 rounded-[15px] bg-[#F7F7F7]"
                value={props.payDisputeInfo.Reason}
              />
            </label>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default ViewPayDispute;
