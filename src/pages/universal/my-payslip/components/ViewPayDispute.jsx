import { useState } from "react";
import Headings from "../../../../components/universal/Headings";
import moment from "moment";

function ViewPayDispute(props) {
  return (
    <>
      <button
        className="text-[12px] font-semibold text-white bg-[#CC5500] px-3 py-2 rounded-[8px]"
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
              {moment(props.payDisputeInfo.raised_at).format("MMM DD, YYYY")}
            </label>
            {/* Status */}
            <div className="w-28">
              <label>Status:</label>
              {props.payDisputeInfo.dispute_status == 0 ? (
                <div className="w-24 text-center rounded bg-[#FF974D]">
                  Pending
                </div>
              ) : props.payDisputeInfo.dispute_status == 1 ? (
                <div className="w-24 text-center rounded bg-[#FFCD6B]">
                  Declined
                </div>
              ) : (
                <div className="w-24 text-center rounded bg-[#7DDA74]">
                  Accepted
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
              value={props.payDisputeInfo.dispute_title}
            >
              <option defaultValue className="text-[#8B8B8B]" value="">
                Select a Complaint
              </option>
              <option value="Payroll Computation">Payroll Computation</option>
              <option value="Earnings Computation">
                Earnings Computation{" "}
              </option>
              <option value="Deductions Computatio">
                Deductions Computation
              </option>
              <option value="Salary Dispute">Salary Dispute</option>
            </select>
          </label>
          {/* Reason */}
          <div>
            <label>
              Reasons:
              <textarea
                disabled
                className="p-2 w-full h-80 rounded-[15px] bg-[#F7F7F7]"
                value={props.payDisputeInfo.dispute_body}
              />
            </label>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default ViewPayDispute;
