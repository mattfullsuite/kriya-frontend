import React from "react";
import Subheadings from "../../../components/universal/Subheadings";

const MyPeers = () => {
  return (
    <div className="border border-[#e4e4e4] border-solid rounded-[15px] bg-white p-5 mb-5">
      <div className="flex flex-row justify-between">
         <Subheadings text={"My Peer's Feedback"} />
         <button className="flex-row justify-start text-[14px] text-[#cc5500] underline">Request Feedback</button>

      </div>
      <div className="carousel w-full pl-5 pr-5">

        <div id="slide1" className="carousel-item relative w-full p-5">
          <div className="box-border bg-[#f4f4f4] flex flex-col gap-3 p-5 rounded-[15px]">                        
            <div className="flex items-center gap-3 w-full">
              <div className="box box-border w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#CC5500]"> 
                <span className="font-bold text-white">MB</span>
              </div>
              <div className="flex flex-col items-start justify-center flex-1">
                <p className="font-bold text-[#363636]">Marvin Bautista</p>
              </div>
              <div className="flex flex-col items-start justify-start">
                <p className="font-light text-[16px] text-[#A9A9A9]">10 mins ago</p>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start">
              <p>Strengths: Excellent attention to detail and strong teamwork skills. Areas for Improvement: Improve time management and communication for timely updates. Overall: Great contributions; a bit more proactive communication will boost effectiveness.</p>
            </div>
          </div> 
        </div>

        <div id="slide2" className="carousel-item relative w-full p-5">
          <div className="box-border bg-[#f4f4f4] flex flex-col gap-3 p-5 rounded-[15px]">                        
            <div className="flex items-center gap-3 w-full">
              <div className="box box-border w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#CC5500]"> 
                <span className="font-bold text-white">AS</span>
              </div>
              <div className="flex flex-col items-start justify-center flex-1">
                <p className="font-bold text-[#363636]">Antoinette Sanchez</p>
              </div>
              <div className="flex flex-col items-end justify-start">
                <p className="font-light text-[16px] text-[#A9A9A9]">30 mins ago</p>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start">
              <p>I appreciate how you always bring a positive attitude to our team meetings. Your willingness to collaborate and share ideas makes a significant difference in our team's dynamics and productivity. Thanks for being such a great team player!</p>
            </div>
          </div> 
        </div>
        
      </div>
      
        <div className="flex w-full justify-center gap-2">
            <a href="#slide1" className="btn btn-xs">1</a>
            <a href="#slide2" className="btn btn-xs">2</a>
            <a href="#slide3" className="btn btn-xs">3</a>
            <a href="#item4" className="btn btn-xs">4</a>
        </div>
    </div>
  );
};

export default MyPeers;
