import { useRef, useState } from "react";
import Headings from "../../../../../components/universal/Headings";
import InterviewComponent from "./InterviewComponent";
import { useNavigate } from "react-router-dom";

const BackButton = ({navigate}) => {
  return (
    <button onClick={() => navigate(-1)} className="flex flex-row justify-start items-center font-medium">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6 fill-[#90946F]"
      >
        <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
      </svg>

      <span className="text-[#90946F] text-[14px]">BACK</span>
    </button>
  );
};

const ViewApplicant = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  accentColor,
  lightColor,
  focusBorder,
  borderColor,
}) => {
  const [interviewCount, setInterviewCount] = useState(1);
  const editModalRef = useRef(null);
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-[1300px] m-auto p-5">
        <Headings text={"Applicant Tracking System"} />

        <div className="mt-10">
          <BackButton navigate={navigate} />
        </div>

        <div className="mt-5 bg-white border border-[#e4e4e4] rounded-[15px] flex">
          <div className="border-r border-[#e4e4e4] w-[40%] p-5">
            <p className="text-[20px] font-medium text-[#363636]">
              Marvin Bautista
            </p>

            <div className="flex flex-col gap-3 justify-start mt-5 ml-5">
              <div className="flex flex-row justify-start items-center gap-2">
                <svg
                  viewBox="0 0 13 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                >
                  <path
                    d="M11.7 0H1.3C0.955218 0 0.624558 0.131696 0.380761 0.366116C0.136964 0.600537 0 0.918479 0 1.25V8.75C0 9.08152 0.136964 9.39946 0.380761 9.63388C0.624558 9.8683 0.955218 10 1.3 10H11.7C12.0448 10 12.3754 9.8683 12.6192 9.63388C12.863 9.39946 13 9.08152 13 8.75V1.25C13 0.918479 12.863 0.600537 12.6192 0.366116C12.3754 0.131696 12.0448 0 11.7 0ZM11.7 2.9375L6.5 6.27125L1.3 2.9375V1.43562L6.5 4.76875L11.7 1.43562V2.9375Z"
                    fill="#36454F"
                  />
                </svg>

                <span className="text-[14px] text-[#8b8b8b]">
                  marvin@gmail.com
                </span>
              </div>

              <div className="flex flex-row justify-start items-center gap-2">
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                >
                  <path
                    d="M11.7796 9.3999L9.04134 6.91027C8.91191 6.79263 8.74182 6.72988 8.56699 6.73529C8.39216 6.74069 8.22628 6.81382 8.10435 6.93923L6.49241 8.59697C6.10441 8.52287 5.32438 8.2797 4.52144 7.47879C3.7185 6.67518 3.47533 5.89313 3.40325 5.50783L5.05965 3.89523C5.18522 3.77339 5.25846 3.60748 5.26386 3.4326C5.26927 3.25773 5.20642 3.08761 5.08862 2.95825L2.59964 0.220734C2.48179 0.0909691 2.31799 0.0122571 2.14304 0.00131473C1.96808 -0.00962763 1.79575 0.0480617 1.66265 0.162131L0.200925 1.4157C0.0844657 1.53258 0.0149551 1.68814 0.00557878 1.85287C-0.00452532 2.02127 -0.197177 6.01034 2.89603 9.10486C5.59449 11.8026 8.97465 12 9.90558 12C10.0416 12 10.1252 11.996 10.1474 11.9946C10.3121 11.9854 10.4676 11.9156 10.5839 11.7986L11.8368 10.3362C11.9513 10.2035 12.0094 10.0313 11.9987 9.8564C11.988 9.68146 11.9094 9.51763 11.7796 9.3999Z"
                    fill="#36454F"
                  />
                </svg>

                <span className="text-[14px] text-[#8b8b8b]">
                  (+63)966-876-9834
                </span>
              </div>

              <div className="flex flex-row justify-start items-center gap-2">
                <svg
                  viewBox="0 0 14 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                >
                  <path
                    d="M12.6 0H1.4C0.6279 0 0 0.616687 0 1.375V9.625C0 10.3833 0.6279 11 1.4 11H12.6C13.3721 11 14 10.3833 14 9.625V1.375C14 0.616687 13.3721 0 12.6 0ZM4.7005 2.75C5.5062 2.75 6.1005 3.33369 6.1005 4.125C6.1005 4.91631 5.5062 5.5 4.7005 5.5C3.8948 5.5 3.3005 4.91631 3.3005 4.125C3.3005 3.33369 3.8941 2.75 4.7005 2.75ZM7.301 8.25H2.1V7.93031C2.1 6.98637 3.2732 6.01562 4.7005 6.01562C6.1278 6.01562 7.301 6.98637 7.301 7.93031V8.25ZM11.9 7.5625H9.1V6.1875H11.9V7.5625ZM11.9 4.8125H8.4V3.4375H11.9V4.8125Z"
                    fill="#36454F"
                  />
                </svg>

                <span className="text-[14px] text-[#363636] underline">
                  Applicant's Resume
                </span>
              </div>

              <div className="flex flex-row justify-start items-center gap-2">
                <svg
                  viewBox="0 0 12 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                >
                  <path
                    d="M10.5 15C10.8978 15 11.2794 14.842 11.5607 14.5607C11.842 14.2794 12 13.8978 12 13.5V4.5L7.5 0H1.5C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5V13.5C0 13.8978 0.158035 14.2794 0.43934 14.5607C0.720644 14.842 1.10218 15 1.5 15H10.5ZM6.75 1.5L10.5 5.25H6.75V1.5ZM2.25 4.5H4.5V6H2.25V4.5ZM2.25 7.5H9.75V9H2.25V7.5ZM2.25 10.5H9.75V12H2.25V10.5Z"
                    fill="#36454F"
                  />
                </svg>

                <span className="text-[14px] text-[#363636] underline">
                  Test Result
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 p-5">
            <div className="flex flex-row justify-between items-center">
              <p className="text-[20px] font-medium text-[#363636]">
                Applicant Information
              </p>

              <div className="flex flex-row justify-end items-center gap-3">
                <select className="outline-none text-[12px] text-[#363636] border border-[#363636] px-3 py-2 rounded-[8px] w-[100px]">
                  <option>Select</option>
                  <option>Sent Test</option>
                  <option>First Interview Stage</option>
                  <option value="">Second Interview Stage</option>
                  <option value="">Third Interview Stage</option>
                  <option value="">Fourth Interview Stage</option>
                  <option value="">Final Interview Stage</option>
                  <option value="">For Job Offer</option>
                  <option value="">Job Offer Sent</option>
                  <option value="">Job Offer Accepted</option>
                  <option value="">Started Work</option>
                  <option value="">Job Offer Rejected</option>
                  <option value="">Withdrawn Application</option>
                  <option value="">Not Fit</option>
                  <option value="">Abandoned</option>
                  <option value="">No Show</option>
                  <option value="">Blacklisted</option>
                </select>
                <button
                  onClick={() => editModalRef.current.showModal()}
                  className={`transition-all ease-in-out duration-300 h-12 min-w-12 rounded-full ${bgColor} ${hoverColor} flex justify-center items-center px-3 group/save shadow-xl`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-white"
                  >
                    <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
                    <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
                  </svg>

                  <span className="transition-all ease-in-out duration-300 text-[14px] text-white overflow-hidden w-0 group-hover/save:w-10">
                    Edit
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <p className="text-[14px] text-[#8b8b8b]">
                Applied for{" "}
                <span className="text-[#363636] italic">Software Engineer</span>
              </p>

              <p className="text-[14px] text-[#8b8b8b]">
                Applied on{" "}
                <span className="text-[#363636] italic">January 17, 2024</span>
              </p>

              <p className="text-[14px] text-[#8b8b8b]">
                Applied from{" "}
                <span className="text-[#363636] italic">LinkedIn</span>
              </p>
            </div>
          </div>
        </div>

        <div
          className={`mt-5 ${lightColor} p-2 rounded-[15px] flex flex-row gap-1`}
        >
          <button
            onClick={() => setInterviewCount(1)}
            className={`outline-none flex-1 transition-all ease-in-out ${
              interviewCount === 1 ? `${bgColor} text-white` : `${textColor}`
            } text-[14px] rounded-[8px] py-2`}
          >
            Interview 1
          </button>

          <button
            onClick={() => setInterviewCount(2)}
            className={`outline-none flex-1 transition-all ease-in-out ${
              interviewCount === 2 ? `${bgColor} text-white` : `${textColor}`
            } text-[14px] rounded-[8px] py-2`}
          >
            Interview 2
          </button>

          <button
            onClick={() => setInterviewCount(3)}
            className={`outline-none flex-1 transition-all ease-in-out ${
              interviewCount === 3 ? `${bgColor} text-white` : `${textColor}`
            } text-[14px] rounded-[8px] py-2`}
          >
            Interview 3
          </button>

          <button
            onClick={() => setInterviewCount(4)}
            className={`outline-none flex-1 transition-all ease-in-out ${
              interviewCount === 4 ? `${bgColor} text-white` : `${textColor}`
            } text-[14px] rounded-[8px] py-2`}
          >
            Interview 4
          </button>

          <button
            onClick={() => setInterviewCount(5)}
            className={`outline-none flex-1 transition-all ease-in-out ${
              interviewCount === 5 ? `${bgColor} text-white` : `${textColor}`
            } text-[14px] rounded-[8px] py-2`}
          >
            Interview 5
          </button>
        </div>

        <div className="mt-5">
          <InterviewComponent
            stage={interviewCount}
            bgColor={bgColor}
            hoverColor={hoverColor}
            focusBorder={focusBorder}
          />
        </div>
      </div>

      {/* Modal for editing applicant details */}
      <dialog className="modal" ref={editModalRef}>
        <div className="bg-white w-[600px] rounded-[15px] p-5">
          <p className="text-[18px] font-medium text-[#363636] mb-5">
            Edit Applicant Details
          </p>

          <div className="mt-10">
            <label className="text-[12px] font-medium text-[#363636]">
              Date Applied <span className="text-red-500">*</span>
            </label>

            <div className="mt-2">
              <input
                type="date"
                className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px]"
              />
            </div>
          </div>

          <div className="mt-8">
            <label className="text-[12px] font-medium text-[#363636]">
              Applicant Name <span className="text-red-500">*</span>
            </label>

            <div className="mt-2 grid grid-cols-3 gap-3">
              <div>
                <label className="text-[12px] text-[#363636]">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px]"
                  placeholder="Dela Cruz"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#363636]">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px]"
                  placeholder="Juan"
                />
              </div>

              <div>
                <label className="text-[12px] text-[#363636]">
                  Middle Name
                </label>
                <input
                  type="text"
                  className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px]"
                  placeholder="Gonzaga"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div>
              <label className="text-[12px] font-medium text-[#363636]">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                  placeholder="applicant@email.com"
                />
              </div>
            </div>

            <div>
              <label className="text-[12px] font-medium text-[#363636]">
                Phone Number <span className="text-red-500">*</span>
              </label>

              <div className="mt-2">
                <input
                  type="text"
                  className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                  placeholder="09XXXXXXXXX"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div>
              <label className="text-[12px] font-medium text-[#363636]">
                CV Link <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                  placeholder="applicant@email.com"
                />
              </div>
            </div>

            <div>
              <label className="text-[12px] font-medium text-[#363636]">
                Position Applied <span className="text-red-500">*</span>
              </label>

              <div className="mt-2">
                <select className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full">
                  <option>Select position applied</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div>
              <label className="text-[12px] font-medium text-[#363636]">
                Source <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <select className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full">
                  <option>Referrer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[12px] font-medium text-[#363636]">
                Referrer <span className="text-red-500">*</span>
              </label>

              <div className="mt-2">
                <select className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full">
                  <option>Referrer</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-row gap-2 justify-end">
            <button
              onClick={() => editModalRef.current.close()}
              className="transition-all ease-in-out outline-none text-[14px] text-[#363636] px-8 py-2 rounded-[8px] bg-[#cfcfcf] hover:bg-[#c5c5c5]"
            >
              Cancel
            </button>

            <button
              className={`transition-all ease-in-out outline-none ${bgColor} ${hoverColor} text-white text-[14px] px-8 py-2 rounded-[8px]`}
            >
              Update
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ViewApplicant;
