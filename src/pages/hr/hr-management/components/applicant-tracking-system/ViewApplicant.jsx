import { useRef, useState, useEffect } from "react";
import Headings from "../../../../../components/universal/Headings";
import InterviewComponent from "./InterviewComponent";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import SendEmailTemplate from "./SendEmailTemplate";

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const BackButton = ({ navigate }) => {
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex flex-row justify-start items-center font-medium"
    >
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
  const { app_id } = useParams();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [optionState, setOptionState] = useState(1);

  const [interviewCount, setInterviewCount] = useState(1);
  const [applicantInterviewId, setApplicantInterviewId] = useState(1);

  const addButtonRef = useRef()
  const editModalRef = useRef(null);
  const addInterviewModalRef = useRef(null);
  const navigate = useNavigate();

  const [applicantData, setApplicantData] = useState([]);
  const [newInterviewData, setNewInterviewData] = useState({});

  const [positionOptions, setPositionOptions] = useState([]);
  const [referrers, setReferrers] = useState([]);

  const [interviews, setInterviews] = useState([]);
  const [interviewers, setInterviewers] = useState([])

  const handleStatusChange = (ai, s) => {
    const sendData = {app_id: app_id, status: s}

    Axios
      .post(BASE_URL + "/ats-changeStatusOfApplicant", sendData)
      .then((response) => {
        //alert("Changed Status")
        toast.success("Successfully changed status!")
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong.")
      });
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const selected_applicant_res = await Axios.get(
          BASE_URL + `/ats-viewApplicantData/${app_id}`
        );
        setApplicantData(selected_applicant_res.data[0]);

        const positions_data_res = await Axios.get(
          BASE_URL + "/ats-getPositionsFromCompany"
        );
        setPositionOptions(positions_data_res.data);
        const referrers_data_res = await Axios.get(
          BASE_URL + "/ats-getPossibleReferrers"
        );
        setReferrers(referrers_data_res.data);

        const interviewers_res = await Axios.get(
          BASE_URL + "/ats-getIntervieweesForApplicants"
        )
        setInterviewers(interviewers_res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const interviews_data_res = await Axios.get(
          BASE_URL + `/ats-getInterviews/${app_id}`
        );
        setInterviews(interviews_data_res.data);

        console.log("INTERVIEWS: ", interviews_data_res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchInterviews();
  }, [addInterviewModalRef]);

  //Edit

  const handleEditSubmit = async () => {
    editModalRef.current.close()

    setApplicantData({
      ...applicantData,
      app_id: app_id,
    });

    console.log(applicantData)

    Axios.post(BASE_URL + `/ats-editApplicantData`, applicantData)
      .then((res) => {
        if (res.data === "success") {
          toast.success("Successfully changed status!")
        } else if (res.data === "error") {
          toast.error("Something went wrong.")
        }
      })
      .catch((err) => console.log(err));
  };


  //Edit

  const handleAddInterviewSubmit = () => {
    addInterviewModalRef.current.close()

    setNewInterviewData({
      ...newInterviewData,
      app_id: app_id,
    });

    console.log(newInterviewData)

    Axios.post(BASE_URL + `/ats-addNewInterview/${app_id}`, newInterviewData)
      .then((res) => {
        if (res.data) {
          alert("Done")

          let copyState = [...interviewers];

          let finder = copyState.find((item) => item.emp_id == newInterviewData.interviewer_id);

          setInterviews([...interviews, {
            applicant_interview_id: res.data.insertId,
            applicant_id: app_id,
            interviewer_id: newInterviewData.interviewer_id,
            interview_status: newInterviewData.interview_status,
            date_of_interview: newInterviewData.date_of_interview,
            date_uploaded: new Date(),
            f_name: finder?.f_name,
            s_name: finder?.s_name,
            }])

          setInterviewCount(interviews.length + 1)

          setNewInterviewData([])

        } else if (res.data === "error") {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    <ToastContainer />
      <div className="max-w-[1300px] m-auto p-5">
        <Headings text={"Applicant Tracking System"} />

        <div className="mt-10">
          <BackButton navigate={navigate} />
        </div>

        <div className="mt-5 bg-white border border-[#e4e4e4] rounded-[15px] flex">
          <div className="border-r border-[#e4e4e4] w-[40%] p-5">
            <p className="text-[20px] font-medium text-[#363636]">
              {applicantData.f_name + " " + applicantData.s_name}
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
                  {applicantData.email}
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
                  {applicantData.contact_no}
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

                <Link 
                to={applicantData.cv_link} 
                target="_blank"
                className={`text-[14px] text-[#363636] underline`}>
                  CV Link
                </Link>
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
                <select
                  className="outline-none text-[12px] text-[#363636] border border-[#363636] px-3 py-2 rounded-[8px] w-[150px]"
                  onChange={(e) => handleStatusChange(app_id, e.target.value)}
                >
                  <option selected>{applicantData.status}</option>
                  <option>Sent Test</option>
                  <option>First Interview Stage</option>
                  <option>Second Interview Stage</option>
                  <option>Third Interview Stage</option>
                  <option>Fourth Interview Stage</option>
                  <option>Final Interview Stage</option>
                  <option>For Job Offer</option>
                  <option>Job Offer Sent</option>
                  <option>Job Offer Accepted</option>
                  <option>Started Work</option>
                  <option>Job Offer Rejected</option>
                  <option>Withdrawn Application</option>
                  <option>Not Fit</option>
                  <option>Abandoned</option>
                  <option>No Show</option>
                  <option>Blacklisted</option>
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
                <span className="text-[#363636] italic">
                  {applicantData.position_applied}
                </span>
              </p>

              <p className="text-[14px] text-[#8b8b8b]">
                Applied on{" "}
                <span className="text-[#363636] italic">
                  {moment(applicantData.app_start_date).format("MMMM D, YYYY")}
                </span>
              </p>

              <p className="text-[14px] text-[#8b8b8b]">
                Applied from{" "}
                <span className="text-[#363636] italic">
                  {applicantData.source}
                </span>
              </p>

              {(applicantData.referrer_name) &&
                <p className="text-[14px] text-[#8b8b8b]">
                  Referred by{" "}
                  <span className="text-[#363636] italic">
                    {applicantData.referrer_name}
                  </span>
                </p>
              }

          <div className="flex flex-row justify-end items-center gap-3">
            {(optionState == 1) &&
            <button
              className={`position-right w-[200px] outline-none ${bgColor} text-[14px] text-white rounded-[8px] px-5 py-2 ${disabledColor}`}
              onClick={() => setOptionState(2)}
            >
              Email Applicant
            </button>
            }

            {(optionState == 2) &&
            <button
              className={`position-right w-[200px] outline-none ${bgColor} text-[14px] text-white rounded-[8px] px-5 py-2 ${disabledColor}`}
              onClick={() => setOptionState(1)}
            >
              Back to Interviews
            </button>
            }

          </div>

            </div>
          </div>
        </div>

        {(optionState == 1) &&
        <div
          className={`mt-5 ${lightColor} p-2 rounded-[15px] flex flex-row gap-1`}
        >

          {interviews.map((interview, i) => (
            <button
              onClick={() => {
                setInterviewCount(i+1);
              }}
              className={`outline-none ${disabledColor} flex-1 transition-all ease-in-out ${
                interviewCount === i+1 ? `${bgColor} text-white` : `${textColor}`
              } text-[14px] rounded-[8px] py-2`}
            >
              {(i == 0) ? "Discussion Box" :  "Interview " + (i) }
            </button>
          ))}

          <button
            onClick={() => addInterviewModalRef.current.showModal()}
            className={`outline-none ${disabledColor} flex-1 transition-all ease-in-out ${
              interviewCount === (interviews.length + 1) ? `${bgColor} text-white` : `${textColor}`
            } text-[14px] rounded-[8px] py-2`}
          >
            +
          </button>
        </div>
        }

        {(optionState == 1) &&
        <div className="mt-5">
          <InterviewComponent
            stage={interviewCount}
            interviewId={
              interviews[interviewCount - 1]?.applicant_interview_id
                ? interviews[interviewCount - 1]?.applicant_interview_id
                : 1
            }
            bgColor={bgColor}
            hoverColor={hoverColor}
            disabledColor={disabledColor}
            focusBorder={focusBorder}
            status={interviews[interviewCount - 1]?.interview_status}
            interviewDate={interviews[interviewCount - 1]?.date_of_interview}
            interviewer={
              interviews[interviewCount - 1]?.f_name +
              " " +
              interviews[interviewCount - 1]?.s_name
            }
          />
        </div>
        }

      {(optionState == 2) &&
        <div className="mt-5">
          <SendEmailTemplate
            interviewId={
              interviews[interviewCount - 1]?.applicant_interview_id
                ? interviews[interviewCount - 1]?.applicant_interview_id
                : 1
            }
            bgColor={bgColor}
            hoverColor={hoverColor}
            disabledColor={disabledColor}
            focusBorder={focusBorder}
            applicant={applicantData?.f_name + " " + applicantData?.s_name}
            position={applicantData?.position_applied}
          />
        </div>
      }

      </div>

      {/* Modal for editing applicant details */}
      <dialog className="modal" ref={addInterviewModalRef}>
        <div className="bg-white w-[600px] rounded-[15px] p-5">
          <p className="text-[18px] font-medium text-[#363636] mb-5">
            Add New Interview
          </p>

          <div className="mt-10">
              <label className="text-[12px] font-medium text-[#363636]">
                <span>Interviewer</span>
              </label>

              <div className="mt-2">
                <select
                  className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                  onChange={(e) =>
                    setNewInterviewData({
                      ...newInterviewData,
                      interviewer_id: e.target.value,
                    })
                  }
                >
                  <option selected disabled>Select Interviewer's Name</option>
                  {interviewers.map((interviewer) => (
                    <option value={interviewer.emp_id}>
                      {interviewer.f_name + " " + interviewer.s_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          

          <div className="mt-5">
            <label className="text-[12px] font-medium text-[#363636]">
              Date of Interview <span className="text-red-500">*</span>
            </label>

            <div className="mt-2">
              <input
                type="date"
                value={moment(newInterviewData.date_of_interview).format(
                  "YYYY-MM-DD"
                )}
                className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px]"
                onChange={(e) =>
                  setNewInterviewData({
                    ...newInterviewData,
                    date_of_interview: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="mt-10 flex flex-row gap-2 justify-end">
            <button
              onClick={() => addInterviewModalRef.current.close()}
              className="transition-all ease-in-out outline-none text-[14px] text-[#363636] px-8 py-2 rounded-[8px] bg-[#cfcfcf] hover:bg-[#c5c5c5]"
            >
              Cancel
            </button>

            <button
              className={`transition-all ease-in-out outline-none ${disabledColor} ${bgColor} ${hoverColor} text-white text-[14px] px-8 py-2 rounded-[8px]`}
              onClick={() => handleAddInterviewSubmit()}
              ref={addButtonRef}
              disabled={newInterviewData.date_of_interview == "" || newInterviewData.interviewer_id == "" || newInterviewData.date_of_interview == null || newInterviewData.interviewer_id == null}
            >
              Add Interview
            </button>
          </div>
        </div>
      </dialog>

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
                value={moment(applicantData.app_start_date).format(
                  "YYYY-MM-DD"
                )}
                className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px]"
                onChange={(date) =>
                  setApplicantData({
                    ...applicantData,
                    app_start_date: date,
                  })
                }
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
                  value={applicantData.s_name}
                  className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px]"
                  placeholder="Surname"
                  onChange={(e) =>
                    setApplicantData({
                      ...applicantData,
                      s_name: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-[12px] text-[#363636]">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={applicantData.f_name}
                  className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px]"
                  placeholder="First Name"
                  onChange={(e) =>
                    setApplicantData({
                      ...applicantData,
                      f_name: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-[12px] text-[#363636]">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={applicantData.m_name}
                  className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px]"
                  placeholder="Middle Name"
                  onChange={(e) =>
                    setApplicantData({
                      ...applicantData,
                      m_name: e.target.value,
                    })
                  }
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
                  value={applicantData.email}
                  className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                  placeholder="applicant@email.com"
                  onChange={(e) =>
                    setApplicantData({
                      ...applicantData,
                      email: e.target.value,
                    })
                  }
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
                  value={applicantData.contact_no}
                  className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                  placeholder="09XXXXXXXXX"
                  onChange={(e) =>
                    setApplicantData({
                      ...applicantData,
                      contact_no: e.target.value,
                    })
                  }
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
                  value={applicantData.cv_link}
                  className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                  placeholder="applicant@email.com"
                  onChange={(e) =>
                    setApplicantData({
                      ...applicantData,
                      cv_link: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-[12px] font-medium text-[#363636]">
                Position Applied <span className="text-red-500">*</span>
              </label>

              <div className="mt-2">
                <select
                  value={applicantData.position_applied}
                  className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                  onChange={(e) =>
                    setApplicantData({
                      ...applicantData,
                      position_applied: e.target.value,
                    })
                  }
                >
                  {positionOptions.map((po) => (
                    <option value={po.position_id}>{po.position_name}</option>
                  ))}
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
                <select
                  value={applicantData.source}
                  className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                  onChange={(e) =>
                    setApplicantData({
                      ...applicantData,
                      source: e.target.value,
                    })
                  }
                >
                  <option disabled>Select Source</option>
                  <option>Facebook</option>
                  <option>LinkedIn</option>
                  <option>Instagram</option>
                  <option>Career Fair</option>
                  <option>Indeed</option>
                  <option>Suitelifer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[12px] font-medium text-[#363636]">
                <span>Referrer</span>
              </label>

              <div className="mt-2">
                <select
                  className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                  onChange={(e) =>
                    setApplicantData({
                      ...applicantData,
                      referrer_name: e.target.value,
                    })
                  }
                >
                  <option disabled>Select Referrer's Name</option>
                  {referrers.map((r) => (
                    <option value={r.emp_id}>
                      {r.f_name + " " + r.s_name}
                    </option>
                  ))}
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
              onClick={() => handleEditSubmit()}
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
