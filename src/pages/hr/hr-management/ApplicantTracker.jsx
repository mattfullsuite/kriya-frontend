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

import RequisitionStats from "./components/applicant-tracking-system/RequisitionStats";

const Tile = ({ label, count, selectedCheckboxes, setSelectedCheckboxes, clearSelection }) => {
  const [isActive, setIsActive] = useState(false);
  
  
  //if button is clicked, clear all data
  useEffect(() => { if (clearSelection) { 
    setIsActive(false)
   } }, [clearSelection]);

  //This is to filter statuses according to the box that was checked
  const handleCheckboxChange = () => {
   setIsActive(!isActive);
    if (isActive == 0) {
      // Perform the action for when the checkbox is checked
      if(!selectedCheckboxes.includes(label)){
        setSelectedCheckboxes([...selectedCheckboxes, label]);
        //console.log("CHECK: ", isActive)
      }
    } else {
      // Perform the action for when the checkbox is unchecked
      const selected = selectedCheckboxes.filter((data)=>data!=label);
      
      setSelectedCheckboxes(selected);

    }
  };

  


  return (
    <div className="bg-[#F4F4F5] rounded-[8px] flex flex-row justify-between items-center py-2 px-3 gap-2">
      <input 
      type="checkbox" 
      checked={selectedCheckboxes.includes(label)}
      onChange={e=>handleCheckboxChange(e.target.checked)} />
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

  //const and useStates of the ATS multiple checker - Anthony
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [clearSelection, setClearSelection] = useState(false);
  const handleClearSelection = () => { 
    setSelectedCheckboxes([]); 
    setClearSelection(true);
    
    // sentTestRef.current.checked = false
    
    setTimeout(()=> setClearSelection(false), 0);
  };


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

  //This useEffect was use to monitor the checkbox clicked by the user to filter the statuses
  useEffect(()=> {
    fetchApplicants(1);
    console.log("CHECKBOX: ", selectedCheckboxes)
  }, [selectedCheckboxes]);

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
      BASE_URL +//statusFilter nakalagay dito &filter=${statusFilter} - Anthony
        `/ats-getPaginatedApplicantsFromDatabase?page=${page}&limit=${perPage}&active=${isActive}&filter=${selectedCheckboxes}&delay=1`
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
        toast.success("Successfully changed status!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong.");
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

  //Add Applicant Data

  const [newApplicantData, setNewApplicantData] = useState({
    app_start_date: new Date(),
    position_applied: "",
    status: "",
    s_name: "",
    f_name: "",
    m_name: "",
    email: "",
    source: "",
    contact_no: "",
    cv_link: "",
    source: "",
    referrer: "",
    next_interview_date: "",
    interviewer: "",
  });

  const handleAddSubmit = () => {
    addModalRef.current.close();

    console.log(applicantData);
    console.log(newApplicantData);

    axios
      .post(BASE_URL + "/ats-modifiedAddNewApplicant", newApplicantData)
      .then((response) => {
        //alert("Add New Employee");
        //setApplicantData(prevArray => [newApplicantData, ...prevArray])
        toast.success("Successfully added new applicant");
        setApplicantData([
          {
            app_id: response.data.insertId,
            app_start_date: newApplicantData.app_start_date,
            position_applied: newApplicantData.position_applied,
            status: newApplicantData.status,
            s_name: newApplicantData.s_name,
            f_name: newApplicantData.f_name,
            m_name: newApplicantData.m_name,
            email: newApplicantData.email,
            source: newApplicantData.source,
            contact_no: newApplicantData.contact_no,
            cv_link: newApplicantData.cv_link,
            source: newApplicantData.source,
            referrer: newApplicantData.referrer,
            next_interview_date: newApplicantData.next_interview_date,
            interviewer: newApplicantData.interviewer,
          },
          ...applicantData,
        ]);
      })
      .catch((err) => {
        toast.error("Something went wrong.");
        console.log(err);
      });
  };

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
            
             {/* Button to clear the selection when a user checked out a certain status - Anthony */}
             {selectedCheckboxes.length > 0 && (
              <button className={`outline-none transition-all ease-in-out ${bgColor} ${hoverColor} rounded-[8px] text-white text-[14px] px-3 py-2 mt-4`} onClick={handleClearSelection} >
                Clear Selection 
              </button> )}

            <div className="grid grid-cols-3 gap-2 mt-10">
              <Tile 
                label={"Sent Test"} 
                count={statusStatistics.sent_test} 
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              />

              <Tile
                label={"Sent Interview Invitation"}
                count={statusStatistics.sent_interview}
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              />

              <Tile
                label={"First Interview Stage"}
                count={statusStatistics.first_interview_stage}
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              />

              <Tile
                label={"Second Interview Stage"}
                count={statusStatistics.second_interview_stage}
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              />

              <Tile
                label={"Third Interview Stage"}
                count={statusStatistics.third_interview_stage}
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              />

              <Tile
                label={"Fourth Interview Stage"}
                count={statusStatistics.fourth_interview_stage}
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              />

              <Tile
                label={"Final Interview Stage"}
                count={statusStatistics.final_interview_stage}
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              />

              <Tile
                label={"Job Offer Sent"}
                count={statusStatistics.for_job_offer}
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              />

              <Tile
                label={"Job Offer Accepted"}
                count={statusStatistics.job_offer_accepted}
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              />

              <Tile
                label={"Started Work"}
                count={statusStatistics.started_work}
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              />

              <Tile
                label={"Job Offer Rejected"}
                count={statusStatistics.job_offer_rejected}
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              />

              <Tile
                label={"Withdrawn Application"}
                count={statusStatistics.withdrawn_application} 
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              />

              <Tile 
                label={"Not Fit"} 
                count={statusStatistics.not_fit}
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              />

              <Tile 
                label={"Abandoned"} 
                count={statusStatistics.abandoned}
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              />

              <Tile
                label={"No Show"} 
                count={statusStatistics.no_show}
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              />

              <Tile
                label={"Blacklisted"}
                count={statusStatistics.blacklisted}
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              />

              <Tile
                label={"AWOL"}
                count={statusStatistics.awol}
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              />

              <Tile
                label={"For Hiring Decision"}
                count={statusStatistics.for_hiring_decision}
                setSelectedCheckboxes={setSelectedCheckboxes}
                selectedCheckboxes={selectedCheckboxes}
              />
            </div>
          </div>

          <div className="bg-white border border-[#e4e4e4] rounded-[15px] flex flex-col p-5">
            {/* <Subheadings text={"Requisition Statistics"} /> */}

            <div className="flex-1">
              <RequisitionStats />
            </div>
          </div>
        </div>

        <div className="mt-5 grid bg-white border border-[#e4e4e4] rounded-[15px]">
          <div className="flex flex-row justify-between items-center px-5 py-3 border-b border-[#e4e4e4]">
            <Subheadings text={"Applicant List"} />

            <span
              className={`text-[12px] underline ${textColor}`}
              onClick={(e) => toast.info("Launching soon...")}
            >
              Unsuccessful Pool List
            </span>
          </div>

          <div className="p-5">
            <div className={`${lightColor} p-2 rounded-[15px]`}>
              <div className="flex flex-row gap-5 justify-between">
                <div className="flex flex-row gap-2 w-[700px]">
                  <input
                    value={searchTerm}
                    className="flex-1 outline-none px-3 py-2 rounded-[8px] text-[14px] text-[#363636]"
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
