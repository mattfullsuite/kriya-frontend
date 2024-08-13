import React, { useRef, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import makeAnimated from "react-select/animated";
import axios from "axios";
import moment from "moment";
import { useCookies } from "react-cookie";
import Headings from "../../../components/universal/Headings";
import Subheadings from "../../../components/universal/Subheadings";
import { Link } from "react-router-dom";

const Tile = ({ label, count }) => {
  return (
    <div className="bg-[#F4F4F5] rounded-[8px] flex flex-row justify-between items-center py-2 px-3 gap-2">
      <span className="text-[#898989] text-[12px] self-start flex-1 leading-3">
        {label}
      </span>

      <span className="text-[20px] font-bold text-[#363636]">{count}</span>
    </div>
  );
};

const ApplicantTracker = ({
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
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  
  const [applicantData, setApplicantData] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const applicant_data_res = await axios.get(
          BASE_URL + "/ats-getApplicantsFromDatabase"
        );
        // const positions_data_res = await axios.get(
        //   BASE_URL + "/ats-getPositionsFromCompany"
        // );
        // const referrers_data_res = await axios.get(
        //   BASE_URL + "/ats-getPossibleReferrers"
        // );
        setApplicantData(applicant_data_res.data);
        // setPositionOptions(positions_data_res.data);
        // setReferrers(referrers_data_res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const applicantColumn = [
    {
      name: "Applicant Number",
      selector: (row) => (
        <span className="text-[12px] font-medium text-[#363636]">
          {row.app_id}
        </span>
      ),
      sortable: true,
    },

    {
      name: "Date Applied",
      selector: (row) => (
        <span className="text-[12px] text-[#363636]">
          {moment(row.date_applied).format("MMMM DD, YYYY")}
        </span>
      ),
      sortable: true,
    },

    {
      name: "Applicant Name",
      selector: (row) => (
        <span className="text-[12px] text-[#363636]">
          {row.f_name + " " + row.s_name}
        </span>
      ),
      sortable: true,
    },

    {
      name: "Position Applied",
      selector: (row) => (
        <span className="text-[12px] text-[#363636]">
          {row.position_applied}
        </span>
      ),
    },

    {
      name: "Application Status",
      selector: (row) => (
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
      ),
    },

    {
      name: "Action",
      selector: (row) => (
        <Link
          to={
            "/hr/hr-management/employee-management/applicant-tracking-system/view-applicant/1023"
          }
        >
          <button
            className={`outline-none ${textColor} text-[12px] border ${borderColor} px-3 py-2 rounded-[8px]`}
          >
            View Details
          </button>
        </Link>
      ),
    },
  ];

  const data = [
    {
      app_id: "19-OR-9384",
      date_applied: "2023/12/23",
      f_name: "Marvin",
      s_name: "Bautista",
      position_applied: "Software Engineer",
    },
  ];

  // useRefs
  const addModalRef = useRef(null);

  return (
    <>
      <div className="m-auto max-w-[1300px] p-5">
        <Headings text={"Applicant Tracking System"} />

        <div className="mt-10 grid grid-cols-2 gap-5">
          <div className="bg-white border border-[#e4e4e4] rounded-[15px] p-5">
            <div className="flex flex-row justify-between items-center">
              <Subheadings text={"Status Counter"} />

              <select className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-[120px]">
                <option>All</option>
                <option>Software Engineer</option>
                <option>Data Operations Associate</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-10">
              <Tile label={"Sent Test"} count={5} />

              <Tile label={"First Interview Stage"} count={10} />

              <Tile label={"Second Interview Stage"} count={3} />

              <Tile label={"Third Interview Stage"} count={8} />

              <Tile label={"Fourth Interview Stage"} count={1} />

              <Tile label={"Final Interview Stage"} count={1} />

              <Tile label={"For Job Offer"} count={1} />

              <Tile label={"Job Offer Sent"} count={0} />

              <Tile label={"Job Offer Accepted"} count={2} />

              <Tile label={"Started Work"} count={1} />

              <Tile label={"Job Offer Rejected"} count={4} />

              <Tile label={"Withdrawn Application"} count={5} />

              <Tile label={"Not Fit"} count={9} />

              <Tile label={"Abandoned"} count={1} />

              <Tile label={"No Show"} count={3} />

              <Tile label={"Blacklisted"} count={2} />
            </div>
          </div>

          <div className="bg-white border border-[#e4e4e4] rounded-[15px] flex justify-center items-center p-5">
            <p className="text-center text-[12px] text-[#8b8b8b]">
              This is a pie chart
            </p>
          </div>
        </div>

        <div className="mt-5 grid bg-white border border-[#e4e4e4] rounded-[15px]">
          <div className="flex flex-row justify-between items-center px-5 py-3 border-b border-[#e4e4e4]">
            <Subheadings text={"Applicant List"} />

            <span className={`text-[12px] underline ${textColor}`}>
              Unsucessful Pool List
            </span>
          </div>

          <div className="p-5">
            <div className={`${lightColor} p-2 rounded-[15px]`}>
              <div className="flex flex-row gap-2 max-w-[800px]">
                <input
                  className="flex-1 outline-none px-3 py-2 rounded-[8px] text-[14px] text-[#363636]"
                  placeholder="Search"
                />

                <select className="outline-none text-[14px] text-[#363636] rounded-[8px] w-[100px]">
                  <option>Filter</option>
                </select>

                <button
                  className={`outline-none transition-all ease-in-out ${bgColor} ${hoverColor} rounded-[8px] text-white text-[14px] px-3 py-2`}
                >
                  Upload File
                </button>

                <button
                  onClick={() => addModalRef.current.showModal()}
                  className={`outline-none transition-all ease-in-out ${bgColor} ${hoverColor} rounded-[8px] text-white text-[14px] px-3 py-2`}
                >
                  Add New Applicant
                </button>
              </div>
            </div>

            <DataTable 
            columns={applicantColumn} 
            data={data} />
          </div>
        </div>
      </div>

      <dialog className="modal" ref={addModalRef}>
        <div className="bg-white w-[600px] rounded-[15px] p-5">
          <p className="text-[18px] font-medium text-[#363636] mb-5">
            Add New Applicant
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
              onClick={() => addModalRef.current.close()}
              className="transition-all ease-in-out outline-none text-[14px] text-[#363636] px-8 py-2 rounded-[8px] bg-[#cfcfcf] hover:bg-[#c5c5c5]"
            >
              Cancel
            </button>

            <button
              className={`transition-all ease-in-out outline-none ${bgColor} ${hoverColor} text-white text-[14px] px-8 py-2 rounded-[8px]`}
            >
              Add
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ApplicantTracker;
