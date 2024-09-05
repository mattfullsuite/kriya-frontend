import React, { useState, useEffect } from "react";
//import BuildingComponent from "../../components/universal/BuildingComponent";
import HRSideBar from "../../components/hr/HRSideBar";
import Headings from "../../components/universal/Headings";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import ReportLeaves from "./hr-management/components/hr-reports/ReportLeaves";
import ReportPTO from "./hr-management/components/hr-reports/ReportPTO";
import ReportOvertime from "./hr-management/components/hr-reports/ReportOvertime";
import ReportMasterlist from "./hr-management/components/hr-reports/ReportMasterlist";
import ReportCheers from "./hr-management/components/hr-reports/ReportCheers";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-data-table-component-extensions/dist/index.css";

const HRReports = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  accentColor,
  lightColor,
  focusBorder,
  borderColor,}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [reportType, setReportType] = useState(1)

  const [leaveFrom, setLeaveFrom] = useState(new Date());
  const [leaveTo, setLeaveTo] = useState(new Date());

  const [leaves, setLeaves] = useState([]);
  const [paidleaves, setPaidLeaves] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [paidDateRange, setPaidDateRange] = useState([]);

  const [base, setBase] = useState(false);
  const [checked, setChecked] = useState(false);

  const [reportInfo, setReportInfo] = useState({
    leave_from: moment().format("YYYY-MM-DD"),
    leave_to: moment().format("YYYY-MM-DD"),
  });

  const [overtimes, setOvertimes] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(BASE_URL + "/retrieveAllLeaves");
        const res2 = await axios.get(BASE_URL + "/retrieveAllPaidLeaves");
        const overtime_res = await axios.get(BASE_URL + "/retrieveAllOvertimes");
        setLeaves(res.data);
        setPaidLeaves(res2.data);
        setOvertimes(overtime_res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, []);

  const handleSubmit = (event) => {
    setBase((prevState) => !prevState);

    setReportInfo({
      ...reportInfo,
      leave_from: moment(leaveFrom).format("YYYY-MM-DD"),
      leave_to: moment(leaveTo).format("YYYY-MM-DD"),
    });

    event.preventDefault();

    axios
      .post(BASE_URL + "/retrieveAllBetweenLeaves", reportInfo)
      .then((res) => {
        setDateRange(res.data);
        console.log(dateRange);
      });

    axios
      .post(BASE_URL + "/retrieveAllPaidBetweenLeaves", reportInfo)
      .then((res) => {
        setPaidDateRange(res.data);
        console.log(paidDateRange);
      });
  };

  const columns = [
    {
      id: "date_filed",
      name: "Date Filed",
      selector: (row) => moment(row.date_filed).format("MMM DD, YYYY"),
      cellExport: (row) => moment(row.date_filed).format("MMM DD, YYYY"),
      sortable: true,
    },

    {
      name: "Employee Number",
      selector: (row) => row.emp_num,
      cellExport: (row) => row.emp_num,
    },

    {
      name: "Employee Name",
      selector: (row) => row.s_name + ", " + row.f_name + " " + row.m_name,
      cellExport: (row) => row.s_name + ", " + row.f_name + " " + row.m_name,
    },

    {
      name: "PTO Type",
      selector: (row) => row.leave_type,
      cellExport: (row) => row.leave_type,
    },
    {
      name: "Date(s)",
      selector: (row) =>
        row.leave_from === row.leave_to
          ? moment(row.leave_from).format("MMM DD, YYYY")
          : moment(row.leave_from).format("MMM DD, YYYY") +
            "  to  " +
            moment(row.leave_to).format("MMM DD, YYYY"),
      sortable: true,

      cellExport: (row) =>
        row.leave_from === row.leave_to
          ? moment(row.leave_from).format("MMM DD, YYYY")
          : moment(row.leave_from).format("MMM DD, YYYY") +
            "  to  " +
            moment(row.leave_to).format("MMM DD, YYYY"),
    },
    {
      name: "PTO Points Used",
      selector: (row) =>
        row.use_pto_points != 0 ? (
          <span className="text-green-600 font-bold">{row.use_pto_points}</span>
        ) : (
          <span className="text-red-500">{row.use_pto_points}</span>
        ),
      cellExport: (row) => row.use_pto_points,
    },
  ];

  function checkOvertimeStatus(num){
    if (num === 0){
      return "Pending"
    } else if (num === 1){
      return "Approved"
    } else if (num === 2){
      return "Rejected"
    } 
  }

  const overtimeColumns = [
    {
      id: "date_filed",
      name: "Date Filed",
      selector: (row) => moment(row.requested).format("MMM DD, YYYY"),
      cellExport: (row) => moment(row.requested).format("MMM DD, YYYY"),
      sortable: true,
    },

    {
      name: "Employee Number",
      selector: (row) => row.emp_num,
      cellExport: (row) => row.emp_num,
    },

    {
      name: "Employee Name",
      selector: (row) => row.s_name + ", " + row.f_name + " " + row.m_name,
      cellExport: (row) => row.s_name + ", " + row.f_name + " " + row.m_name,
    },

    // {
    //   name: "Overtime Type",
    //   selector: (row) => row.overtime_type,
    // },
    {
      name: "Date of Overtime",
      selector: (row) => moment(row.overtime_date).format("MMM DD, YYYY"),
      cellExport: (row) => moment(row.overtime_date).format("MMM DD, YYYY"),
      sortable: true,
    },
    {
      name: "Hours Requested",
      selector: (row) =>
          row.hours_requested + " hours",
      cellExport: (row) => row.hours_requested + " hr(/s)"
    },
    {
      name: "Overtime Status",
      selector: (row) =>
        <span className="text-600 font-bold">{checkOvertimeStatus(row.overtime_status)}</span>,
      cellExport: (row) => checkOvertimeStatus(row.overtime_status)
    }
  ];

  return (
    <>
      <div>
        <div className="m-6">
          <Headings text={"Workforce Analytics"} />

          <div
          className={`mt-20 ${lightColor} p-2 rounded-[15px] flex flex-row gap-1`}
        >
            <button
              onClick={() => {
                setReportType(1);
              }}
              className={`outline-none ${disabledColor} flex-1 transition-all ease-in-out ${
                reportType === 1 ? `${bgColor} text-white` : `${textColor}`
              } text-[14px] rounded-[8px] py-2`}
            >
              Masterlist
            </button>

            <button
              onClick={() => {
                setReportType(2);
              }}
              className={`outline-none ${disabledColor} flex-1 transition-all ease-in-out ${
                reportType === 2 ? `${bgColor} text-white` : `${textColor}`
              } text-[14px] rounded-[8px] py-2`}
            >
              Leave
            </button>

            <button
              onClick={() => {
                setReportType(3);
              }}
              className={`outline-none ${disabledColor} flex-1 transition-all ease-in-out ${
                reportType === 3 ? `${bgColor} text-white` : `${textColor}`
              } text-[14px] rounded-[8px] py-2`}
            >
              PTOs
            </button>

            <button
              onClick={() => {
                setReportType(4);
              }}
              className={`outline-none ${disabledColor} flex-1 transition-all ease-in-out ${
                reportType === 4 ? `${bgColor} text-white` : `${textColor}`
              } text-[14px] rounded-[8px] py-2`}
            >
              Overtimes
            </button>

            <button
              onClick={() => {
                setReportType(5);
              }}
              className={`outline-none ${disabledColor} flex-1 transition-all ease-in-out ${
                reportType === 5 ? `${bgColor} text-white` : `${textColor}`
              } text-[14px] rounded-[8px] py-2`}
            >
              Cheer a Peer
            </button>

            <button
              onClick={() => {
                setReportType(6);
              }}
              className={`outline-none ${disabledColor} flex-1 transition-all ease-in-out ${
                reportType === 6 ? `${bgColor} text-white` : `${textColor}`
              } text-[14px] rounded-[8px] py-2`}
            >
              Attendance
            </button>

        </div>
        

          {/* <div className="m-4 p-6">
            <div className="flex">
          
              <div className="flex-1 mx-1">
                <label>
                  <div className="label">
                    <h1 className="label-text">Date From</h1>
                  </div>
                  <DatePicker
                    selected={leaveFrom}
                    className="input input-bordered w-full max-w-xs mb-2"
                    onChange={(date) =>
                      setLeaveFrom(date) &&
                      setReportInfo({
                        ...reportInfo,
                        leave_from: moment(leaveFrom).format("YYYY-MM-DD"),
                      })
                    }
                    required
                  />
                </label>
              </div>

              <div className="flex-1 mx-1">
              

                <label className="form-control">
                  <div className="label">
                    <h1 className="label-text">
                      Date To <span className="text-red-500"> *</span>
                    </h1>
                  </div>

                  <DatePicker
                    selected={leaveTo}
                    className="input input-bordered w-full max-w-xs mb-2"
                    onChange={(date) =>
                      setLeaveTo(date) &&
                      setReportInfo({
                        ...reportInfo,
                        leave_to: moment(leaveTo).format("YYYY-MM-DD"),
                      })
                    }
                    required
                  />
                </label>
              </div>

              <div className="flex-1 mx-1">
                <button className="btn btn-blue mt-9" onClick={handleSubmit}>
                  Check
                </button>
              </div>

              <div className="form-control flex-1 mx-1">
                <label className="label cursor-pointer">
                  <span className="label-text">
                    Only Show Paid Leaves{" "}
                    <input
                      type="checkbox"
                      className="toggle mt-12"
                      onChange={(event) => setChecked(event.target.checked)}
                    />
                  </span>
                </label>
              </div>
            </div>
          </div> */}

          {reportType === 1 ? (
              <ReportMasterlist />
            ) : reportType === 2 ? (
              <ReportLeaves />
            ) : reportType === 3 ? (
              <ReportPTO />
            ) : reportType === 4 ? (
              <ReportOvertime />
            ) : reportType === 5 ? (
              <ReportCheers />
            ) : null}

        </div>
      </div>
    </>
  );
};

export default HRReports;
