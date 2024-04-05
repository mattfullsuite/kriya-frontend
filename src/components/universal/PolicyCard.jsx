import React from "react";
import { Link } from "react-router-dom";

const PolicyCard = ({ image, title, content, address }) => {
  return (
    <>
      <div className="w-full relative bg-white border border-[#e4e4e4] rounded-[15px] p-10">
        <h2 className="font-semibold text-[#363636] text-[18px]">{title}</h2>

        <p className="line-clamp-[10] mt-8 text-[14px] text-[#363636] text-justify">
          {content}
        </p>

        <div className="box-border mt-10 mb-20 flex justify-end">
          <Link to="" className="">
            <div className="box-border flex flex-row justify-center items-center gap-[1px]">
              <span className="text-[13px] text-[#90946f] font-semibold">Read more</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-[#90946f] w-6 h-6"
              >
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
              </svg>
            </div>
          </Link>
        </div>

        <img src={image} className="absolute h-36 left-[-20px] bottom-[-15px]" />
      </div>
    </>
  );
};

export default PolicyCard;
