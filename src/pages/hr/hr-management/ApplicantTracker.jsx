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

  //FETCH OPTIMIZED DATA

  const [applicantData, setApplicantData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const [defaultData, setDefaultData] = useState([])

  const fetchApplicants = async (page) => {
    setLoading(true);

    const response = await axios.get(
      BASE_URL +
        `/ats-getPaginatedApplicantsFromDatabase?page=${page}&limit=${perPage}&delay=1`
    );

    console.log(response.data.data2);

    console.log("TOTAL: ", response.data.pagination.total);

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
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isSearch, setIsSearch] = useState(false)

  const fetchSearch = async page => {
    setIsSearch(true);
		setLoading(true);

		const response = await axios.get(BASE_URL + `/ats-searchApplicantsList?searchTerm=${searchTerm}`);

    console.log("Search Data: ", response.data)

		setApplicantData(response.data);
    setSearchData(response.data);
		setLoading(false);
	};

  const handleSearch = () => {
    fetchSearch()
  }

  const handleStatusChange = (ai, s) => {
    const sendData = {app_id: ai, status: s}

    axios
      .post(BASE_URL + "/ats-changeStatusOfApplicant", sendData)
      .then((response) => {
        alert("Changed Status")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [statusStatistics, setStatusStatistics] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);
  const [referrers, setReferrers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const status_statistics_res = await axios.get(
          BASE_URL + "/ats-getApplicantStatusStatistics"
        );
        setStatusStatistics(status_statistics_res.data[0]);

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
    addModalRef.current.close()

    console.log(applicantData)
    console.log(newApplicantData)

    axios
      .post(BASE_URL + "/ats-modifiedAddNewApplicant", newApplicantData)
      .then((response) => {
        alert("Add New Employee")
        //setApplicantData(prevArray => [newApplicantData, ...prevArray])
        setApplicantData([{
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
          interviewer: newApplicantData.interviewer
          }, ...applicantData])
      })
      .catch((err) => console.log(err));
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
      width: "10%",
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
          handleStatusChange(row.app_id, e.target.value)}}
        >
          <option selected>{row.status}</option>
          <option>Select</option>
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
      ),
    },

    {
      name: "Action",
      selector: (row) => (
        <Link
          to={`/hr/hr-management/employee-management/applicant-tracking-system/view-applicant/${row.app_id}`}
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
              <Tile label={"Sent Test"} count={statusStatistics.sent_test} />

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
                label={"For Job Offer"}
                count={statusStatistics.for_job_offer}
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

              <Tile label={"Not Fit"} count={statusStatistics.not_fit} />

              <Tile label={"Abandoned"} count={statusStatistics.abandoned} />

              <Tile label={"No Show"} count={statusStatistics.no_show} />

              <Tile
                label={"Blacklisted"}
                count={statusStatistics.blacklisted}
              />
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
                  value={searchTerm}
                  className="flex-1 outline-none px-3 py-2 rounded-[8px] text-[14px] text-[#363636]"
                  placeholder="Search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* <select className="outline-none text-[14px] text-[#363636] rounded-[8px] w-[100px]">
                  <option>Filter</option>
                </select> */}

                <button 
                    className="bg-[#666A40] px-2 py-2 rounded-[8px] flex flex-row flex-nowrap justify-center items-center gap-1 h-full"
                    onClick={() => handleSearch()}
                    >
                    <span className="text-white text-[14px]">Search</span>
                </button>

                {(isSearch) &&
                  <button 
                      className="bg-[#666A40] px-2 py-2 rounded-[8px] flex flex-row flex-nowrap justify-center items-center gap-1 h-full"
                      onClick={() => {
                                      setApplicantData(defaultData)
                                      setIsSearch(false)
                                      setSearchTerm("")}}
                      >
                      <span className="text-white text-[14px]">Reset</span>
                  </button>
                }

                <button
                  className={`outline-none transition-all ease-in-out ${bgColor} ${hoverColor} rounded-[8px] text-white text-[14px] px-3 py-2`}
                >
                  <Link
                    to={`/hr/hr-management/employee-management/applicant-tracking-uploader`}
                  >
                      Upload File
                  </Link>
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
                onChange={(e) => setNewApplicantData({...newApplicantData, app_start_date: moment(e.target.value).format("YYYY-MM-DD")})}
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
                  placeholder="Surname"
                  onChange={(e) => setNewApplicantData({...newApplicantData, s_name: e.target.value})}
                />
              </div>

              <div>
                <label className="text-[12px] text-[#363636]">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px]"
                  placeholder="First Name"
                  onChange={(e) => setNewApplicantData({...newApplicantData, f_name: e.target.value})}
                />
              </div>

              <div>
                <label className="text-[12px] text-[#363636]">
                  Middle Name
                </label>
                <input
                  type="text"
                  className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px]"
                  placeholder="Middle Name"
                  onChange={(e) => setNewApplicantData({...newApplicantData, m_name: e.target.value})}
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
                  onChange={(e) => setNewApplicantData({...newApplicantData, email: e.target.value})}
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
                  onChange={(e) => setNewApplicantData({...newApplicantData, contact_no: e.target.value})}
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
                  onChange={(e) => setNewApplicantData({...newApplicantData, cv_link: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-[12px] font-medium text-[#363636]">
                Position Applied <span className="text-red-500">*</span>
              </label>

              <div className="mt-2">
                <select 
                className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                onChange={(e) => setNewApplicantData({...newApplicantData, position_applied: e.target.value})}
                >
                  <option disabled>Select Position Applied</option>
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
                className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                onChange={(e) => setNewApplicantData({...newApplicantData, source: e.target.value})}
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
                Referrer <span className="text-red-500">*</span>
              </label>

              <div className="mt-2">
                <select className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] px-3 py-2 rounded-[8px] w-full"
                onChange={(e) => setNewApplicantData({...newApplicantData, referrer_name: e.target.value})}
                >
                  <option>Referrer</option>
                    {referrers.map((r) => (
                      <option value={r.emp_id}>{r.f_name + " " + r.s_name}</option>
                    ))}
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
              onClick={() => handleAddSubmit()}
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
