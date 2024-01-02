import React from "react";

const EmployeeDirectoryCard = ({
  image,
  firstName,
  lastName,
  department,
  position,
  workEmail,
}) => {
  return (
    <>
      <div className="border border-gray-200 flex flex-col justify-between items-center p-5 w-64 h-[330px] rounded-xl cursor-default hover:shadow-lg hover:transition-shadow">
        <div className="flex flex-col justify-center items-center gap-5">
          {image == "" || image == null ? (
            <div className="h-28 w-28 bg-gray-500 rounded-full flex justify-center items-center text-5xl text-white font-medium">
              {firstName?.charAt(0) + lastName?.charAt(0)}
            </div>
          ) : (
            <img src={"../uploads/" + image} className="h-28 w-28 rounded-full object-cover" />
          )}

          <div className="flex flex-col gap-0">
            <span className="text-center text-[14px] text-ellipsis font-semibold">
              {firstName + " " + lastName}
            </span>
            <span className="text-center text-[12px]">{position}</span>
            <span className="text-center text-[11.5px] text-gray-500">{department}</span>
          </div>
        </div>

        <a className="btn normal-case w-full font-regular" href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${workEmail}`} target="_blank">
          <div className="flex flex-row flex-nowrap gap-1 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>

            <span className="text-[13px]">{workEmail}</span>
          </div>
        </a>
      </div>
    </>
  );
};

export default EmployeeDirectoryCard;
