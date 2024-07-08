import React from "react";
import Subheadings from "../../../components/universal/Subheadings";

const PerformanceCalibration = () => {
return (
    <div className="border border-[#e4e4e4] border-solid rounded-[15px] bg-white p-5">
          <Subheadings text={"Performance Calibration"} />
          <div className="flex flex-wrap justify-between items-start mt-5">
            <div className="flex-1 md:flex-initial">
              <p className="font-bold text-[#363636] md:text-[14px]">Participants</p>
              <p className="text-[#898989] text-[15px]">86</p>
            </div>
            <div className="flex-1 md:flex-initial">
              <p className="font-bold text-[#363636] md:text-[14px]">Cycle Duration</p>
              <p className="text-[#898989] text-[15px]">January 3 - March 31</p>
            </div >
            <div className="flex flex-wrap flex-1 md:flex-initial">
              <div className="flex flex-1 md:flex-col m-1">
                <select className="flex flex-col border border-[#e4e4e4] rounded-[10px] items-center p-2">
                  <option>Monthly</option>
                  <option defa>Quarterly</option>
                  <option>Yearly</option>
                </select>
              </div>
              <div className="flex flex-1 md:flex-col m-1">
                  <select className="flex flex-col border border-[#e4e4e4] rounded-[10px] items-center p-2">
                    <option>Q1</option>
                    <option>Q2</option>
                    <option>Q3</option>
                  </select>
              </div>
            </div>
          </div>

          <div className="divider outline-[#dcdcdc] outline-0"></div>

          <div className="flex flex-wrap lg:items-center justify-between w-full p-3">

            <div className="flex-1 md:flex-col">
              <p className="text-center text-[#B2AC88]">Top Performer</p>
              <p className="font-bold text-center text-[#363636] md:text-[30px]">20</p>
            </div>
            <div className="divider divider-horizontal flex-col"></div>

            <div className="flex-1 md:flex-col">
                <p className="text-center text-[#B2AC88]">Potential Star</p>
                <p className="font-bold text-center text-[#363636] md:text-[30px]">13</p>
            </div>

            <div className="divider divider-horizontal flex-col"></div>

            <div className="flex-1 md:flex-col">
                  <p className="text-center text-[#B2AC88]">Average</p>
                  <p className="font-bold text-center text-[#363636] md:text-[30px]">45</p>
            </div>

            <div className="divider divider-horizontal flex-col"></div>

            <div className="flex-1 md:flex-col">
                  <p className="text-center text-[#B2AC88]">Watch List</p>
                  <p className="font-bold text-center text-[#363636] md:text-[30px]">8</p>  
            </div>
          </div>

          <div className="divider outline-0 mb-3"></div>

            <p className="text-[14px] font-bold text-[#363636]">Your Quarterly Performance</p>
            <div className="box-border flex items-end gap-3 mb-1 flex-1 mt-5">                        
            <div className="box box-border w-[40px] h-[40px] flex justify-center items-center rounded-full bg-[#CC5500]"> 
                        <span className="font-bold text-white">MB</span>
            </div>
                        <div className="flex flex-col items-start flex-1">
                            <p className="font-bold text-[#363636]">Marvin Bautista</p>
                            <p className="text-[13px] text-[#363636]">Software Engineer</p>
                        </div>
                        <div className="flex flex-col items-end justify-center">
                            <p className="font-bold text-[30px]">75%</p>
                        </div>

            </div> 
            <div className="bg-gray-200 rounded-full h-3 mt-3">
              <div className="bg-green-500 h-3 rounded-full" style={{ width: '75%' }}></div>
            </div>
        
        </div>

);
};
export default PerformanceCalibration;