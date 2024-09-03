import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import axios from "axios";
import DatePicker from "react-datepicker";

const ReportPTO = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [ptos, setPTOs] = useState([]);

  // const [isPaid, setIsPaid] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [leaveFrom, setLeaveFrom] = useState(
    new Date(moment().startOf("year").format("MM/DD/YYYY"))
  );
  const [startDate, setStartDate] = useState("1990-01-01");

  const [leaveTo, setLeaveTo] = useState(
    new Date(moment().endOf("year").format("MM/DD/YYYY"))
  );
  const [lastDate, setLastDate] = useState("2100-12-30");

  // useEffect(()=>{
  //   setLastDate(moment(leaveTo).format("YYYY-MM-DD"))
  //   setStartDate(moment(leaveFrom).format("YYYY-MM-DD"))
  // },[leaveTo, leaveFrom])

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const all_company_pto_res = await axios.get(
          BASE_URL + `/r-retrieveAllCompanyPTOs?searchterm=${searchTerm}&delay=1`
        );
        setPTOs(all_company_pto_res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, [searchTerm]);

  const columns = [
    // {
    //   id: "date_filed",
    //   name: "Date Filed",
    //   cell: (row) => moment(row.date_filed).format("MMM DD, YYYY"),
    //   selector: (row) => row.date_filed,
    //   cellExport: (row) => moment(row.date_filed).format("MMM DD, YYYY"),
    //   sortable: true,
    // },

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

    {
      name: "Status",
      selector: (row) => row.emp_status,
      cellExport: (row) => row.emp_status,
      sortable: true,
    },

    // {
    //   name: "Date Hired",
    //   selector: (row) => moment(row.date_regularization).format("MMM DD, YYYY"),
    //   cellExport: (row) => moment(row.date_regularization).format("MMM DD, YYYY"),
    // },
    
    {
      name: "PTO Days",
      selector: (row) => (
        (row.emp_status === "Probationary") ?
        <div><span className="font-bold">{row.leave_balance} </span> <span className="font-italic text-green-600">{"+5"}</span> <span className="font-italic text-[12px] text-[#8b8b8b]">{"(" + moment(row.date_regularization).format("MMMM DD, YYYY") + ")"}</span></div> :
        (row.emp_status = "Regular") ?
          (moment(row.date_hired).add(1, 'M').format('DD-MM-YYYY') > moment().format("DD-MM-YYYY")) ?
            <div><span className="font-bold">{row.leave_balance} </span> <span className="font-italic text-green-600">{"+0.83"}</span></div>
          : <div><span className="font-bold">{row.leave_balance} </span> <span className="font-italic text-green-600">{"+1.25"}</span></div>
        : (row.emp_status = "Part-Time") ? 
        <div><span className="font-bold">{row.leave_balance} </span> <span className="font-italic text-green-600">{"+0.625"}</span></div>
        : null
      ),
      cellExport: (row) => row.leave_balance,
      sortable: true,
    },
    // {
    //   name: "Date(s)",
    //   selector: (row) =>
    //     row.leave_from === row.leave_to
    //       ? moment(row.leave_from).format("MMM DD, YYYY")
    //       : moment(row.leave_from).format("MMM DD, YYYY") +
    //         "  to  " +
    //         moment(row.leave_to).format("MMM DD, YYYY"),
    //   sortable: true,

    //   cellExport: (row) =>
    //     row.leave_from === row.leave_to
    //       ? moment(row.leave_from).format("MMM DD, YYYY")
    //       : moment(row.leave_from).format("MMM DD, YYYY") +
    //         "  to  " +
    //         moment(row.leave_to).format("MMM DD, YYYY"),
    // },
    // {
    //   name: "PTO Points Used",
    //   selector: (row) =>
    //     row.use_pto_points != 0 ? (
    //       <span className="text-green-600 font-bold">{row.use_pto_points}</span>
    //     ) : (
    //       <span className="text-red-500">{row.use_pto_points}</span>
    //     ),
    //   cellExport: (row) => row.use_pto_points,
    // },
  ];

  return (
    <div className="box-border bg-white border border-[#e4e4e4] rounded-[15px]">
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

          {/* <div className="flex-1 mx-1">
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
          </div> */}

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
        data={ptos}
        exportHeaders={true}
        filterHidden={true}
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

export default ReportPTO;
