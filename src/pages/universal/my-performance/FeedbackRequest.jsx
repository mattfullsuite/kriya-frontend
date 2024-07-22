import React from "react";
import Subheadings from "../../../components/universal/Subheadings";

const FeedbackRequest = () => {
return (
    <div className="border border-[#e4e4e4] border-solid rounded-[15px] bg-white p-5">
          <Subheadings text={"Requests"} />
          <div className="box box-border flex text-center flex-1">
              <p className="mt-20 items-center flex-1">You currently have no requests received.</p>
          </div>
          
    </div>
);

};
export default FeedbackRequest;