import React from "react";
import Subheadings from "../../../components/universal/Subheadings";

const MyPeers = () => {
  return (
    <div className="border border-[#e4e4e4] border-solid rounded-[15px] bg-white p-5 mb-5">
      <Subheadings text={"My Peers"} />
      <div className="flex flex-row justify-center p-5">
        <div className="flex flex-col items-center mb-4 md:mb-0 justify-center items-center">
          <div className="box box-border w-[80px] h-[80px] flex justify-center items-center rounded-full bg-[#CC5500]">
            <span className="font-bold text-white">MB</span>
          </div>
          <p className="mt-2 text-center">You</p>
        </div>

        <div className="divider divider-horizontal md:mx-5"></div>

        <div className="flex flex-col items-center">
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div className="flex flex-col items-center">
              <div className="box box-border w-[80px] h-[80px] flex justify-center items-center rounded-full bg-[#CC5500]">
                <span className="font-bold text-white">IG</span>
              </div>
              <p className="mt-2 text-center font-bold text-[#363636]">Ian Paul Garcia</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="box box-border w-[80px] h-[80px] flex justify-center items-center rounded-full bg-[#CC5500]">
                <span className="font-bold text-white">MA</span>
              </div>
              <p className="mt-2 text-center">Michael Angelo Artiaga</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="box box-border w-[80px] h-[80px] flex justify-center items-center rounded-full bg-[#CC5500]">
                <span className="font-bold text-white">MS</span>
              </div>
              <p className="mt-2 text-center">Matt Wilfred Salvador</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="box box-border w-[80px] h-[80px] flex justify-center items-center rounded-full bg-[#CC5500]">
                <span className="font-bold text-white">AS</span>
              </div>
              <p className="mt-2 text-center">Antoinette Sanchez</p>
            </div>
          </div>
          <div className="mt-4">
            <button className="mt-2 bg-none text-[#363636] px-4 py-2  flex-1 ml-10 mr-10 rounded-[15px] outline-[#E4E4E4] outline">Request Peer Feedback</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPeers;
