import React from "react";
import ClientSideBar from "../../components/client/ClientSideBar";
import Headings from "../../components/universal/Headings";
import RequestComplaints from "../../components/universal/RequestComplaints";

const ClientRequestHR = () => {
  return (
    <>
        <Headings text={"Request HR"} />

        <div className="flex flex-col md:flex-row overflow-x-auto mx-4 mt-10">
          <div>
            <RequestComplaints />
          </div>

          <div>
            <div
              className="relative overflow-hidden m-2 p-4 border border-[#e4e4e4] rounded-[15px] bg-white flex flex-1 flex-col items-center justify-between text-center md:w-56 h-56 cursor-pointer"
              onClick={() => alert("In Development")}
            >
              <h1 className="absolute bg-yellow-500 text-white text-[9px] py-[2px] px-[20px] top-[25px] right-[-25px] rotate-45">IN DEVELOPMENT</h1>

              <div className="flex flex-col justify-center items-center h-full gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-14 h-14"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                  />
                </svg>

                <span>Certificate of Employment</span>
              </div>
            </div>
          </div>

          <div>
            <div
              className="relative overflow-hidden m-2 p-4 border border-[#e4e4e4] rounded-[15px] bg-white flex flex-1 flex-col items-center justify-between text-center md:w-56 h-56 cursor-pointer"
              onClick={() => alert("In Development")}
            >
              <h1 className="absolute bg-yellow-500 text-white text-[9px] py-[2px] px-[20px] top-[25px] right-[-25px] rotate-45">IN DEVELOPMENT</h1>

              <div className="flex flex-col justify-center items-center h-full gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-14 h-14"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <span>Overtime</span>
              </div>
            </div>
          </div>

          <div>
            <div
              className="relative overflow-hidden m-2 p-4 border border-[#e4e4e4] rounded-[15px] bg-white flex flex-1 flex-col items-center justify-between text-center md:w-56 h-56 cursor-pointer"
              onClick={() => alert("In Development")}
            >
              <h1 className="absolute bg-yellow-500 text-white text-[9px] py-[2px] px-[20px] top-[25px] right-[-25px] rotate-45">IN DEVELOPMENT</h1>

              <div className="flex flex-col justify-center items-center h-full gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-14 h-14"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <span>Company Loan</span>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default ClientRequestHR;
