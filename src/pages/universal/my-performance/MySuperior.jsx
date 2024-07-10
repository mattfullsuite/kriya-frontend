import React from "react";
import Subheadings from "../../../components/universal/Subheadings";

const MySuperior = () => {
  return (
    <div className="border border-[#e4e4e4] border-solid rounded-[15px] bg-white p-5 mb-5">
      <Subheadings text={"My Superior"} />
      <div className="flex flex-col md:flex-row justify-center p-5 items-center">
        <div className="flex flex-col items-center mb-4 md:mb-0">
            <div className="box box-border w-[80px] h-[80px] flex justify-center items-center rounded-full bg-[#CC5500] ring ring-2 ring-[#DCDCDC]">
                <span className="font-bold text-white">DS</span>
            </div>
                <p className="mt-2 text-center font-bold">Deon Paul Sadcopen</p>
          <p className="text-center text-gray-500">Manager</p>
        </div>

        <div className="divider divider-horizontal mx-5"></div>

        <div className="flex flex-col items-center w-full md:w-auto p-2 space-y-4">
          <button className="bg-none text-[#363636] px-4 py-2 rounded-[15px] border border-[#E4E4E4] w-full md:w-64 text-center">
            Request Feedback
          </button>
          <button className="bg-none text-[#363636] px-4 py-2 rounded-[15px] border border-[#E4E4E4] w-full md:w-64 text-center">
            Request 1:1
          </button>
          <button className="bg-none text-[#363636] px-4 py-2 rounded-[15px] border border-[#E4E4E4] w-full md:w-64 text-center">
            View Feedbacks
          </button>
        </div>
      </div>
    </div>
  );
};

export default MySuperior;
