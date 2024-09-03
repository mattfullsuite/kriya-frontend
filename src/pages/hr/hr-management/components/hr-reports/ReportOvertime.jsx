import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import axios from "axios";
import DatePicker from "react-datepicker";

const ReportOvertime = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [leaves, setLeaves] = useState([]);

  const [isPaid, setIsPaid] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');

  const [leaveFrom, setLeaveFrom] = useState(new Date(moment().startOf('year').format('MM/DD/YYYY')))
  const [startDate, setStartDate] = useState("1990-01-01");

  const [leaveTo, setLeaveTo] = useState(new Date(moment().endOf('year').format('MM/DD/YYYY')));
  const [lastDate, setLastDate] = useState("2100-12-30");

  useEffect(()=>{
    setLastDate(moment(leaveTo).format("YYYY-MM-DD"))
    setStartDate(moment(leaveFrom).format("YYYY-MM-DD"))
  },[leaveTo, leaveFrom])

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const all_company_overtime_res = await axios.get(
          BASE_URL +
            `/r-retrieveAllCompanyOvertime?searchterm=${searchTerm}&startdate=${startDate}&lastdate=${lastDate}&delay=1`
        );
        setLeaves(all_company_overtime_res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, [leaveTo, leaveFrom, searchTerm]);

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
      selector: (row) => moment(row.date_requested).format("MMM DD, YYYY"),
      cellExport: (row) => moment(row.date_requested).format("MMM DD, YYYY"),
      sortable: true,
    },

    {
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
      cellExport: (row) => row.hours_requested + " hr(/s)",
      sortable: true,
    },
    {
      name: "Overtime Status",
      selector: (row) =>
        <span className="text-600 font-bold">{checkOvertimeStatus(row.overtime_status)}</span>,
      cellExport: (row) => checkOvertimeStatus(row.overtime_status),
      sortable: true,
    }
  ];

  return (
    <div className="box-border bg-white border border-[#e4e4e4] rounded-[15px]">
      <div className="form-control flex-1 mx-1">
        <label className="label cursor-pointer">

        <div className="flex-1 mx-1 mr-20">
            <label>
              <div className="label">
                <h1 className="label-text">Search{" "}</h1>
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
                onChange={(date) =>
                  setLeaveFrom(date)
                }
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
                onChange={(date) =>
                  setLeaveTo(date)
                }
                required
              />
            </label>
          </div>

          {/* <div className="flex-1 mx-1">
            <label>
              <div className="label">
                <h1 className="label-text">Paid Only?{" "}</h1>
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
        columns={overtimeColumns}
        data={leaves}
        exportHeaders={true}
        filter={false}
        fileName={document.title + " (" + new Date() + ")"}
      >
        <DataTable
          defaultSortFieldId="date_filed"
          defaultSortAsc={false}
          pagination
          highlightOnHover
          striped
        />
      </DataTableExtensions>
    </div>
  );
};

export default ReportOvertime;
