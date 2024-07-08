import React from "react";
import Subheadings from "../../../components/universal/Subheadings";

const MySuperior = () => {
return (
    <div className="border border-[#e4e4e4] border-solid rounded-[15px] bg-white p-5 mb-5">
        <Subheadings text={"My Superior"} />
            <div className="box-border flex flex-row items-center mt-5">
                <div className="box-border flex flex-col items-center gap-3 mb-1 flex-1">                 
                    <div className="box box-border w-[80px] h-[80px] flex justify-center items-center rounded-full bg-[#CC5500] ring-4 ring-[#DCDCDC]"> 
                        <span className="font-bold text-white">MB</span>
                    </div>
    
                    <div className="flex flex-col text-center flex-1">
                        <p className="font-bold text-[#363636]">You</p>
                        <p className="font-normal text-[#363636] text-[12px]">Software Engineer</p>
                    </div>
                
                </div>

                <div className="box-border flex flex-col items-center gap-3 mb-1 flex-1">

                    <div className="box box-border w-[80px] h-[80px] flex justify-center items-center rounded-full bg-[#cc5500] ring-4 ring-[#dcdcdc]"> 
                        <span className="font-bold text-white text-center">DS</span>
                    </div>

                    <div className="flex flex-col text-center flex-1">
                        <p className="font-bold text-[#363636]">Deon Paul Sadcopen</p>
                        <p className="font-normal text-[#363636] text-[12px]">Manager</p>
                    </div>
            
                </div>
            </div>
            
            

            <div className="flex flex-col ml-0 md:ml-2 mt-2 md:mt-0 justify-center">
                <button className="mt-2 bg-none text-[#363636] px-4 py-2  flex-1 ml-20 mr-20 rounded-[15px] outline-[#E4E4E4] outline">Give Feedback</button>
                <button className="mt-2 bg-none text-[#363636] px-4 py-2  flex-1 ml-20 mr-20 rounded-[15px] outline-[#E4E4E4] outline">Request 1:1</button>
            </div>

    </div>
);
};
export default MySuperior;