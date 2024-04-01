import React, {useState, useEffect} from "react";
//import BuildingComponent from "../../components/universal/BuildingComponent";
import HRSideBar from "../../components/hr/HRSideBar";
import Headings from "../../components/universal/Headings";
import DataTable from "react-data-table-component";
import DataTableExtensions from 'react-data-table-component-extensions';
import axios from "axios"
import moment from "moment"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import 'react-data-table-component-extensions/dist/index.css';

const HRReports = () => {

  const BASE_URL = process.env.REACT_APP_BASE_URL; 

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

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(BASE_URL + "/retrieveAllLeaves");
        const res2 = await axios.get(BASE_URL + "/retrieveAllPaidLeaves");
        setLeaves(res.data);
        setPaidLeaves(res2.data);
       
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, []);

  const handleSubmit = (event) => {
    setBase((prevState) => !prevState)

    setReportInfo({
      ...reportInfo,
    leave_from: moment(leaveFrom).format('YYYY-MM-DD'),
    leave_to: moment(leaveTo).format('YYYY-MM-DD'),
    });

    event.preventDefault()
    
    axios.post(BASE_URL + "/retrieveAllBetweenLeaves", reportInfo)
    .then((res) => { 
        setDateRange(res.data);
        console.log(dateRange)
    })

    axios.post(BASE_URL + "/retrieveAllPaidBetweenLeaves", reportInfo)
    .then((res) => { 
        setPaidDateRange(res.data);
        console.log(paidDateRange)
    })
            
}

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
        selector: (row) => (row.use_pto_points != 0) ? <span className="text-green-600 font-bold">{row.use_pto_points}</span> : <span className="text-red-500">{row.use_pto_points}</span>,
        cellExport: (row) => row.use_pto_points,
        },
    ]
    return (
        <>
        <HRSideBar/>
        <div className="p-1 sm:ml-64 flex flex-col">

          <div className="m-6">
          <Headings text={"HR Reports"} />

          <div className="m-4 p-6">
          <div className="flex">
                {/* Date From */}
                <div className="flex-1 mx-1">
                  <label>
                    <div className="label">
                      <h1 className="label-text">
                        Date From
                      </h1>
                    </div>
                    <DatePicker
                      selected={leaveFrom}
                      className="input input-bordered w-full max-w-xs mb-2"
                      onChange={(date) =>
                        setLeaveFrom(date) 
                        && setReportInfo({
                            ...reportInfo,
                            leave_from: moment(leaveFrom).format("YYYY-MM-DD"),
                          })}
                      required
                    />
                  </label>
                </div>

                <div className="flex-1 mx-1">
                  {/* Date To */}

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
                        setLeaveTo(date) && setReportInfo({
                            ...reportInfo,
                            leave_to: moment(leaveTo).format("YYYY-MM-DD"),
                          })}
                      required
                    />
                  </label>
                </div>

                <div className="flex-1 mx-1">
                    <button 
                    className="btn btn-blue mt-9"
                    onClick={handleSubmit}
                    >
                    Check
                    </button>
                </div>

                <div className="form-control flex-1 mx-1">
                    <label className="label cursor-pointer">
                        <span className="label-text">Only Show Paid Leaves <input type="checkbox" className="toggle mt-12" onChange={(event) => setChecked(event.target.checked)}/></span> 
                    </label>
                </div>
              </div>
                
          </div>

          <DataTableExtensions
            columns={columns}
            //data={(!base) ? leaves : (checked) ? paidleaves : (base) ? dateRange : leaves}
            data={  
                    (checked & base) ? paidDateRange :
                    (base) ? dateRange : 
                    (checked) ? paidleaves : leaves
                }
            exportHeaders={true}
            filterHidden={true}
            fileName = {document.title + " (" + new Date() + ")"}
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
        </div>
        </>
    )
}

export default HRReports