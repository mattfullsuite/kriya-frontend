import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import axios from "axios";
import DatePicker from "react-datepicker";

const ReportAttendance = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [leaves, setLeaves] = useState([]);

  const [isPaid, setIsPaid] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [leaveFrom, setLeaveFrom] = useState(
    new Date(moment().startOf("year").format("MM/DD/YYYY"))
  );
  const [startDate, setStartDate] = useState("1990-01-01");

  const [leaveTo, setLeaveTo] = useState(
    new Date(moment().endOf("year").format("MM/DD/YYYY"))
  );
  const [lastDate, setLastDate] = useState("2100-12-30");

  useEffect(() => {
    setLastDate(moment(leaveTo).format("YYYY-MM-DD"));
    setStartDate(moment(leaveFrom).format("YYYY-MM-DD"));
  }, [leaveTo, leaveFrom]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const all_company_leaves_res = await axios.get(
          BASE_URL +
            `/r-retrieveAllCompanyAttendance?searchterm=${searchTerm}&startdate=${startDate}&lastdate=${lastDate}&delay=1`
        );
        setLeaves(all_company_leaves_res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, [leaveTo, leaveFrom, searchTerm]);

  function checkStatus(status) {
    if (status == 0) {
      return "Pending";
    }
    if (status == 1) {
      return "Approved";
    }
    if (status == 2) {
      return "Declined";
    }
  }

  function checkNightDifferential(tin, tout, start) {
    const ti = (moment(tin, "HH:mm:ss a") < moment(start, "HH:mm:ss a")) ? moment(tin, "HH:mm:ss a") : moment(start, "HH:mm:ss a");

    const to = (moment(tout, "HH:mm:ss a") < ti) ? moment(tout, "HH:mm:ss a").add(1, "days") : moment(tout, "HH:mm:ss a")

    const nightDiffStart = moment("22:00", "HH:mm:ss a")
    const nightDiffEnd = moment("06:00", "HH:mm:ss a").add(1, "days")

    var duration = parseInt(moment.duration(to.diff(ti)).asHours())

    let nightDiffHours = 0

    for (let i = 0; i < duration; i++) {
      let increment = moment(ti).add(i, 'hours')
      //let increment2 = moment(ti, "HH:mm:ss a").add(1, 'days')
      // console.log(moment(increment2).isBetween(nightDiffStart, nightDiffEnd))
      
      if (moment(increment).isBetween(nightDiffStart, nightDiffEnd)){
        nightDiffHours += 1
      } 
    }

    return moment(tin, "HH:mm:ss a", false).isValid() ? nightDiffHours + " hours" : null;
  }

  const columns = [
    {
      id: "date",
      name: "Date",
      cell: (row) => moment(row.date).format("MMM DD, YYYY"),
      selector: (row) => row.date,
      cellExport: (row) => moment(row.date).format("MMM DD, YYYY"),
      sortable: true,
    },

    {
      id: "emp_num",
      name: "Employee Number",
      selector: (row) => row.emp_num,
      cellExport: (row) => row.emp_num,
      sortable: true,
    },

    {
      name: "Employee Name",
      selector: (row) => row.s_name + ", " + row.f_name + " " + row.m_name,
      cellExport: (row) => row.s_name + ", " + row.f_name + " " + row.m_name,
      sortable: true,
    },

    {
      name: "Check In",
      selector: (row) =>
        row.time_in && row.time_in !== "Invalid date"
          ? moment(row.time_in, "HH:mm:ss a").format("hh:mm a")
          : null,
      cellExport: (row) =>
        row.time_in && row.time_in !== "Invalid date"
          ? moment(row.time_in, "HH:mm:ss a").format("hh:mm a")
          : null,
      sortable: true,
    },

    {
      name: "Check Out",
      selector: (row) =>
        row.time_out && row.time_out !== "Invalid date"
          ? moment(row.time_out, "HH:mm:ss a").format("hh:mm a")
          : null,
      cellExport: (row) =>
        row.time_out && row.time_out !== "Invalid date"
          ? moment(row.time_out, "HH:mm:ss a").format("hh:mm a")
          : null,
      sortable: true,
    },
    {
      name: "Night Differential",
      selector: (row) => checkNightDifferential(row.time_in, row.time_out, row.start),
      cellExport: (row) => checkNightDifferential(row.time_in, row.time_out, row.start),
      sortable: true,
    },
    // {
    //   name: "Shift",
    //   selector: (row) => row.start + " - " + row.end,
    //   cellExport: (row) => row.start + " - " + row.end,
    //   sortable: true,
    // },
    {
      name: "Total Hours Worked",
      selector: (row) => row.hours_worked,
      cellExport: (row) => row.hours_worked,
      sortable: true,
    },
    {
      name: "Undertime",
      selector: (row) =>
        !row.time_in || !row.time_out
          ? null
          : row.undertime == "Undertime" && row.undertime,
      //(row.undertime == "Undertime") && row.undertime
      // (moment(row.time_in, "HH:mm:ss a") < moment(row.time_out, "HH:mm:ss a")) ?
      //(parseInt(moment.duration(moment(row.time_out, "HH:mm:ss a").format("HH:mm:ss").diff(moment(row.time_in, "HH:mm:ss a"))).asHours()) >= 8)
      // : (parseInt(moment.duration(moment(row.time_out, "HH:mm:ss a").add(1, "days").diff(moment(row.time_in, "HH:mm:ss a"))).asHours()) >= 8)
      cellExport: (row) =>
        !row.time_in || !row.time_out
          ? null
          : row.undertime == "Undertime" && row.undertime,
      sortable: true,
    },
    {
      name: "Leave Taken?",
      selector: (row) => (row.leave_type ? row.leave_type : null),
      cellExport: (row) => (row.leave_type ? row.leave_type : null),
      sortable: true,
    },
    {
      name: "Leave Status",
      selector: (row) =>
        row.leave_status ? checkStatus(row.leave_status) : null,
      cellExport: (row) =>
        row.leave_status ? checkStatus(row.leave_status) : null,
      sortable: true,
    },
    {
      name: "PTOs used",
      selector: (row) => row.use_pto_points,
      cellExport: (row) => row.use_pto_points,
      sortable: true,
    },
    {
      name: "Overtime?",
      selector: (row) => (row.overtime_type ? row.overtime_type : null),
      cellExport: (row) => (row.overtime_type ? row.overtime_type : null),
      sortable: true,
    },
    {
      name: "Overtime Status",
      selector: (row) =>
        row.overtime_status ? checkStatus(row.overtime_status) : null,
      cellExport: (row) =>
        row.overtime_status ? checkStatus(row.overtime_status) : null,
      sortable: true,
    },
    {
      name: "Overtime Hours",
      selector: (row) =>
        row.hours_requested ? row.hours_requested + " hrs" : null,
      cellExport: (row) =>
        row.hours_requested ? row.hours_requested + " hrs" : null,
      sortable: true,
    },
    {
      name: "Holiday Name",
      selector: (row) => row.h_name,
      cellExport: (row) => row.h_name,
      sortable: true,
    },
  ];

  return (
    <div className="box-border bg-white border border-[#e4e4e4] rounded-[15px] grid">
      <div className="form-control flex-1 mx-1">
        <label className="label cursor-pointer">
          <div className="flex-1 mx-1 mr-20">
            <label>
              <div className="label">
                <h1 className="label-text">Search </h1>
              </div>
              <input
                type="text"
                placeholder="Search Employee"
                className="input input-bordered w-full max-w-xs mb-2"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>
          </div>

          <div className="flex-1 mx-1">
            <label>
              <div className="label">
                <h1 className="label-text">Date From</h1>
              </div>
              <DatePicker
                selected={leaveFrom}
                className="input input-bordered w-full max-w-xs mb-2"
                onChange={(date) => setLeaveFrom(date)}
                required
              />
            </label>
          </div>

          <div className="flex-1 mx-1">
            <label>
              <div className="label">
                <h1 className="label-text">Date To</h1>
              </div>
              <DatePicker
                selected={leaveTo}
                className="input input-bordered w-full max-w-xs mb-2"
                onChange={(date) => setLeaveTo(date)}
                required
              />
            </label>
          </div>

          {/* <div className="flex-1 mx-1">
            <label>
              <div className="label">
                <h1 className="label-text">Paid Only? </h1>
              </div>
              <input
                type="checkbox"
                className="toggle"
                onChange={(event) => setIsPaid(event.target.checked ? 1 : 0)}
              />
            </label>
          </div> */}
        </label>
      </div>

      <DataTableExtensions
        columns={columns}
        data={leaves}
        exportHeaders={true}
        filter={false}
        fileName={document.title + " (" + new Date() + ")"}
      >
        <DataTable
          defaultSortFieldId="emp_num"
          defaultSortAsc={false}
          pagination
          highlightOnHover
          striped
        />
      </DataTableExtensions>
    </div>
  );
};

export default ReportAttendance;
