import React from "react";
import NoRecordSVG from "../assets/no-records.svg";

function NoRecord() {
  return (
    <div className=" flex flex-col justify-center w-full p-10">
      <img className="h-[200px]" src={NoRecordSVG} alt="No Record Uploaded" />
      <div>
        {" "}
        <h1 className="text-center pt-4 text-[#4A6E7E]"> No Record Uploaded</h1>
      </div>
    </div>
  );
}

export default NoRecord;
