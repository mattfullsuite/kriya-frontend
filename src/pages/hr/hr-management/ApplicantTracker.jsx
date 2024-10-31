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
import { Title } from "chart.js";

const Tile = ({ label, count }) => {
  const [isActive, setIsActive] = useState(false);

  const handleCheckboxChange = () => {
    setIsActive(!isActive);
    // Here you can implement the condition you want to run
    if (isActive == 0) {
      // Perform the action for when the checkbox is checked
      console.log(`Condition met for ${label}`);
      // return (
      //   <div className="bg-[#F4F4F5] rounded-[8px] flex flex-row justify-between items-center py-2 px-3 gap-2">
      //     <input type="checkbox" checked={isActive} onChange={(e) => setStatusFilter(e.target.value)} />
      //     <input
      //             type="checkbox"
      //             className="toggle m-auto"
      //             onChange={(event) => {setIsActive(event.target.checked ? 1 : 0)
      //               event.target.checked && setStatusFilter("")}}
      //           />
      //     <span className="text-[#898989] text-[12px] self-start flex-1 leading-3">
      //       {label}
      //     </span>
      //     <span className="text-[20px] font-bold text-[#363636]">{count}</span>
      //   </div>
      // );
    } else {
      // Perform the action for when the checkbox is unchecked
      console.log(`Condition unmet for ${label}`);
    }
  };

  return (
    <div className="bg-[#F4F4F5] rounded-[8px] flex flex-row justify-between items-center py-2 px-3 gap-2">
      {/* <input type="checkbox" checked={isActive} onChange={handleCheckboxChange} /> */}
      <input
        type="checkbox"
        //onChange={(event) => {setIsActive(event.target.checked ? 1 : 0)
       // event.target.checked && setStatusFilter("")}}
       // checked={isActive}
      />
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

  //FETCH OPTIMIZED DATA

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        axios.post(BASE_URL + "/ats-createDiscussionBoxAndLockedNotes");
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllData();
  }, []);

  const [applicantData, setApplicantData] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const [defaultData, setDefaultData] = useState([]);

  const [isActive, setIsActive] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
 
  const fetchApplicants = async (page) => {
    setLoading(true);

    const response = await axios.get(
      BASE_URL +
        `/ats-getPaginatedApplicantsFromDatabase?page=${page}&limit=${perPage}&active=${isActive}&filter=${statusFilter}&delay=1`
    );

    const positions_res = await axios.get(BASE_URL + `/ats-getJobPositions`);
    setJobPositions(positions_res.data);
    setDefaultData(response.data.data2);
    setApplicantData(response.data.data2);
    setTotalRows(response.data.pagination.total);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    fetchApplicants(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    const response = await axios.get(
      BASE_URL +
        `/ats-getPaginatedApplicantsFromDatabase?page=${page}&limit=${newPerPage}&delay=1`
    );

    setApplicantData(response.data.data2);
    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchApplicants(1); // fetch page 1 of users
  }, [isActive, statusFilter]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const fetchSearch = async (page) => {
    setIsSearch(true);
    setLoading(true);

    const response = await axios.get(
      BASE_URL + `/ats-searchApplicantsList?searchTerm=${searchTerm}`
    );

    console.log("Search Data: ", response.data);

    setApplicantData(response.data);
    setSearchData(response.data);
    setLoading(false);
  };

  const handleSearch = () => {
    fetchSearch();
  };

  const handleStatusChange = (ai, s) => {
    const sendData = { app_id: ai, status: s };

    axios
      .post(BASE_URL + "/ats-changeStatusOfApplicant", sendData)
      .then((response) => {
        //alert("Changed Status");
        toast.success("Successfully changed status!")
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong.")
      });
  };

  const [statusStatistics, setStatusStatistics] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);
  const [referrers, setReferrers] = useState([]);

  const [selectedPosition, setSelectedPosition] = useState("");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const positions_data_res = await axios.get(
          BASE_URL + "/ats-getPositionsFromCompany"
        );
        setPositionOptions(positions_data_res.data);
        const referrers_data_res = await axios.get(
          BASE_URL + "/ats-getPossibleReferrers"
        );
        setReferrers(referrers_data_res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const status_statistics_res = await axios.get(
          BASE_URL +
            `/ats-getApplicantStatusStatistics?position=${selectedPosition}&delay=1`
        );
        setStatusStatistics(status_statistics_res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [selectedPosition]);

  const applicantColumn = [
    {
      name: "#",
      selector: (row) => (
        <span className="text-[12px] font-medium text-[#363636]">
          {row.app_id}
        </span>
      ),
      cell: (row) => row.app_id,
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
      name: "Date Applied",
      selector: (row) => (
        <span className="text-[12px] text-[#363636]">
          {moment(row.app_start_date).format("MMMM DD, YYYY")}
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
        <select
          className="outline-none text-[12px] text-[#363636] border border-[#363636] px-3 py-2 rounded-[8px] w-[100px]"
          //onChange={(e) => setStatusChange({...statusChange, app_id: row.app_id, status: e.target.value})}
          onChange={(e) => {
            handleStatusChange(row.app_id, e.target.value);
          }}
        >
          <option selected>{row.status}</option>
          <option>Select</option>
          <option>Sent Test</option>
          <option>Sent Interview Invitation</option>
          <option>First Interview Stage</option>
          <option>Second Interview Stage</option>
          <option>Third Interview Stage</option>
          <option>Fourth Interview Stage</option>
          <option>Final Interview Stage</option>
          <option>For Hiring Decision</option>
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
          <option>AWOL</option>
        </select>
      ),
    },

    {
      name: "Action",
      selector: (row) => (
        <Link
          to={`/hr/hr-management/applicant-tracking-system/view-applicant/${row.app_id}`}
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


  return (
    <>
    <ToastContainer />
      <div className="m-auto max-w-[1300px] p-5">
        <Headings text={"Applicant Tracking System"} />

        <div className="mt-10 grid grid-cols-2 gap-5">
          <div className="bg-white border border-[#e4e4e4] rounded-[15px] p-5">
            <div className="flex flex-row justify-between items-center">
              <Subheadings text={"Status Counter"} />

              <select
                className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-[120px]"
                onChange={(e) => setSelectedPosition(e.target.value)}
              >
                <option value="">All</option>
                {jobPositions.map((j) => (
                  <option value={j.position_applied}>
                    {j.position_applied}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-10">
              <Tile 
                label={"Sent Test"} 
                count={statusStatistics.sent_test} 
              />

              <Tile
                label={"Sent Interview Invitation"}
                count={statusStatistics.sent_interview}
              />

              <Tile
                label={"First Interview Stage"}
                count={statusStatistics.first_interview_stage}
              />

              <Tile
                label={"Second Interview Stage"}
                count={statusStatistics.second_interview_stage}
              />

              <Tile
                label={"Third Interview Stage"}
                count={statusStatistics.third_interview_stage}
              />

              <Tile
                label={"Fourth Interview Stage"}
                count={statusStatistics.fourth_interview_stage}
              />

              <Tile
                label={"Final Interview Stage"}
                count={statusStatistics.final_interview_stage}
              />

              <Tile
                label={"Job Offer Sent"}
                count={statusStatistics.for_job_offer}
              />

              <Tile
                label={"Job Offer Accepted"}
                count={statusStatistics.job_offer_accepted}
              />

              <Tile
                label={"Started Work"}
                count={statusStatistics.started_work}
              />

              <Tile
                label={"Job Offer Rejected"}
                count={statusStatistics.job_offer_rejected}
              />

              <Tile
                label={"Withdrawn Application"}
                count={statusStatistics.withdrawn_application}
              />

              <Tile 
                label={"Not Fit"} 
                count={statusStatistics.not_fit} 
              />

              <Tile 
                label={"Abandoned"} 
                count={statusStatistics.abandoned} 
              />

              <Tile
                label={"No Show"} 
                count={statusStatistics.no_show} 
              />

              <Tile
                label={"Blacklisted"}
                count={statusStatistics.blacklisted}
              />

              <Tile
                label={"AWOL"}
                count={statusStatistics.awol}
              />

              <Tile
                label={"For Hiring Decision"}
                count={statusStatistics.for_hiring_decision}
              />
            </div>
          </div>

          <div className="bg-white border border-[#e4e4e4] rounded-[15px] flex justify-center items-center p-5">
            <p className="text-center text-[12px] text-[#8b8b8b]">
            <Subheadings text={"Requisition Statistics"} />
              Launching soon...
            </p>
          </div>
        </div>

        <div className="mt-5 grid bg-white border border-[#e4e4e4] rounded-[15px]">
          <div className="flex flex-row justify-between items-center px-5 py-3 border-b border-[#e4e4e4]">
            <Subheadings text={"Applicant List"} />

            <span 
            className={`text-[12px] underline ${textColor}`}
            onClick={(e) => toast.info("Launching soon...")}>
              Unsuccessful Pool List
            </span>
          </div>

          <div className="p-5">
            <div className={`${lightColor} p-2 rounded-[15px]`}>
              <div className="flex flex-row gap-5 justify-between">
                <div className="flex flex-row gap-2 w-[700px]">
                  <input
                    value={searchTerm}
                    className="flex-1 outline-none px-3 py-2 rounded-[8px] text-[14px] text-[#363636] flex-1"
                    placeholder="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <button
                    className="bg-[#666A40] px-2 py-2 rounded-[8px] flex flex-row flex-nowrap justify-center items-center gap-1 h-full"
                    onClick={() => handleSearch()}
                  >
                    <span className="text-white text-[14px]">Search</span>
                  </button>

                  {isSearch && (
                    <button
                      className="bg-[#666A40] px-2 py-2 rounded-[8px] flex flex-row flex-nowrap justify-center items-center gap-1 h-full"
                      onClick={() => {
                        setApplicantData(defaultData);
                        setIsSearch(false);
                        setSearchTerm("");
                      }}
                    >
                      <span className="text-white text-[14px]">Reset</span>
                    </button>
                  )}

                  <button
                    className={`outline-none transition-all ease-in-out ${bgColor} ${hoverColor} rounded-[8px] text-white text-[14px] px-3 py-2`}
                  >
                    <Link to={`/hr/hr-management/applicant-tracking-uploader`}>
                      Upload
                    </Link>
                  </button>

                  <Link 
                    className={`outline-none transition-all ease-in-out ${bgColor} ${hoverColor} rounded-[8px] text-white text-[14px] px-3 py-2`}
                    to={`/hr/hr-management/applicant-tracking-system/add-new-applicant`}
                  >Add New</Link>
                </div>
              </div>
            </div>

            <DataTable
              columns={applicantColumn}
              data={applicantData}
              progressPending={loading}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
              highlightOnHover
              responsive
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantTracker;
