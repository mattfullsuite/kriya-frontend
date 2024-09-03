import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import axios from "axios";
import DatePicker from "react-datepicker";

const ReportMasterlist = () => {
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
        const all_company_leaves_res = await axios.get(
          BASE_URL +
            `/r-retrieveAllCompanyMasterlist?searchterm=${searchTerm}&ispaid=${isPaid}&startdate=${startDate}&lastdate=${lastDate}&delay=1`
        );
        setLeaves(all_company_leaves_res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, [isPaid, leaveTo, leaveFrom, searchTerm]);

  const columns = [
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
      name: "Work Email",
      selector: (row) => row.work_email,
      cellExport: (row) => row.work_email,
    },

    {
      name: "Personal Email",
      selector: (row) => row.personal_email,
      cellExport: (row) => row.personal_email,
    },
    {
      name: "Contact Number",
      selector: (row) => row.contact_num,
      cellExport: (row) => row.contact_num,
    },
    {
      name: "Permanent Address",
      selector: (row) => row.p_address,
      cellExport: (row) => row.p_address,
    },
    {
      name: "Current Address",
      selector: (row) => row.c_address,
      cellExport: (row) => row.c_address,
    },
    {
      name: "Birth Date",
      selector: (row) => moment(row.dob).format("MMM DD, YYYY"),
      cellExport: (row) => moment(row.dob).format("MMM DD, YYYY"),
    },
    {
      name: "Sex",
      selector: (row) => row.sex,
      cellExport: (row) => row.sex,
    },
    {
      name: "Hire Date",
      selector: (row) => moment(row.date_hired).format("MMM DD, YYYY"),
      cellExport: (row) => moment(row.date_hired).format("MMM DD, YYYY"),
    },
    {
      name: "Regularization Date",
      selector: (row) => moment(row.date_regularization).format("MMM DD, YYYY"),
      cellExport: (row) => moment(row.date_regularization).format("MMM DD, YYYY"),
    },
    {
      name: "Employment Status",
      selector: (row) => row.emp_status,
      cellExport: (row) => row.emp_status,
    },
    {
      name: "Civil Status",
      selector: (row) => row.civil_status,
      cellExport: (row) => row.civil_status,
    },
    {
      name: "Emergency Contact Name",
      selector: (row) => row.emergency_contact_name,
      cellExport: (row) => row.emergency_contact_name,
    },
    {
      name: "Emergency Contact Number",
      selector: (row) => row.emergency_contact_num,
      cellExport: (row) => row.emergency_contact_num,
    },
    {
      name: "Position",
      selector: (row) => row.position_name,
      cellExport: (row) => row.position_name,
    },
    {
      name: "Shift Type",
      selector: (row) => (row.shift_type === "SD") ? "Dayshift" : "Nightshift",
      cellExport: (row) => (row.shift_type === "SD") ? "Dayshift" : "Nightshift",
    },
    {
      name: "Shift Start",
      selector: (row) => moment(row.start, "HH:mm:ss a").format("hh:mm a"),
      cellExport: (row) => moment(row.start, "HH:mm:ss a").format("hh:mm a"),
    },
    {
      name: "Shift End",
      selector: (row) => moment(row.end, "HH:mm:ss a").format("hh:mm a"),
      cellExport: (row) => moment(row.end, "HH:mm:ss a").format("hh:mm a"),
    },


  ];

  return (
    <div className="box-border bg-white border border-[#e4e4e4] rounded-[15px] grid">
      <div className="form-control flex-1 mx-1">
        <label className="label cursor-pointer">

        <div className="flex-1 mx-1 mr-20">
            {/* <label>
              <div className="label">
                <h1 className="label-text">Search{" "}</h1>
              </div>
              </label> */}
              <input
                type="text"
                placeholder="Search Employee"
                className="input input-bordered mx-2 mt-5 w-[50%]"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
          </div>

          {/* <div className="flex-1 mx-1">
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

          <div className="flex-1 mx-1">
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
        columns={columns}
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

export default ReportMasterlist;
