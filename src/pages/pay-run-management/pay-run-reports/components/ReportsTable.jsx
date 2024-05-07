import moment from "moment";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import GroupDialog from "./GroupDialog";

const ReportsTable = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [reportsData, setReportsData] = useState([]);
  const dataGroup = useRef([]);
  const [dataAllPayslip, setdataAllPayslip] = useState([]);
  const dataAll = useRef([]);

  const fetchGroupData = async () => {
    try {
      const result = await axios.get(BASE_URL + "/mp-getAllPaySlipGroups");
      dataGroup.current = result.data;
      console.log("Group: ", result.data);
      setReportsData(dataGroup.current);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllPayslip = async () => {
    try {
      const result = await axios.get(BASE_URL + "/mp-getAllPayslip");
      dataAll.current = result.data;
      setdataAllPayslip(dataAll.current);
      console.log("All: ", dataAll.current);
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewClick = (data) => {
    const created_at = data.created_at;
    console.log("View: ", created_at);
    console.log("Data All: ", dataAll.current);
    // const searchValue = created_at.toLowerCase();
    const newData = dataAll.current.filter((row) => {
      return row.created_at.toLowerCase().includes(created_at);
    });
    console.log("New Data", newData);
    setdataAllPayslip(newData);
    document.getElementById("group-records").showModal();
  };

  useEffect(() => {
    fetchAllPayslip();
    fetchGroupData();
  }, []);

  const columns = [
    {
      name: "Date and Time Generated",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row) => row.date_from,
      cell: (row) => {
        return (
          <>
            {row.date_from} - {row.date_to}
          </>
        );
      },
      sortable: true,
    },
    {
      name: "Pay Date",
      selector: (row) => row.date_payment,
      sortable: true,
    },
    {
      name: "Source",
      selector: (row) => row.source,
      cell: "",
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.created_at,
      cell: (row) => {
        return (
          <>
            <div className="flex flex-row gap-2">
              <button
                className="w-24 h-8 bg-[#9E978E] bg-opacity-20 text-[#9E978E] rounded-md"
                onClick={() => handleViewClick(row)}
              >
                View
              </button>
              {/* <button
                className="w-10 h-8 flex bg-[#Cc0202] items-center justify-center text-[#f7f7f7] rounded-md  hover:bg-[#Cc0202] hover:opacity-60 "
                onClick={() => handleViewClick(row.created_at)}
              >
                <svg
                  width="13"
                  height="14"
                  viewBox="0 0 13 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4006 6.59681V12.6255C10.4006 12.838 10.2445 13.0103 10.0518 13.0103H2.60939C2.41672 13.0103 2.26053 12.838 2.26053 12.6255V6.59681M5.16771 10.4449V6.59681M7.49345 10.4449V6.59681M11.5635 4.0312H8.65633M8.65633 4.0312V1.85063C8.65633 1.6381 8.50016 1.46582 8.30747 1.46582H4.3537C4.16103 1.46582 4.00484 1.6381 4.00484 1.85063V4.0312M8.65633 4.0312H4.00484M1.09766 4.0312H4.00484"
                    stroke="white"
                    stroke-width="1.95694"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button> */}
            </div>
          </>
        );
      },
    },
  ];

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();
    console.log(reportsData);
    const newData = dataGroup.current.filter((row) => {
      return (
        row.created_at.toLowerCase().includes(searchValue) ||
        row.date_from.toLowerCase().includes(searchValue) ||
        row.date_to.toLowerCase().includes(searchValue) ||
        row.date_payment.toLowerCase().includes(searchValue) ||
        row.source.toLowerCase().includes(searchValue)
      );
    });
    setReportsData(newData);
  };

  return (
    <>
      <div className="mt-10 p-5 w-full rounded-[15px] bg-white">
        <div className="w-fit items-center flex gap-4 ml-auto ">
          <div className="px-2 h-6 flex items-center gap-2 rounded-full bg-[#F5F5F5]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              className="px-2 w-96 focus:outline-0 bg-[#F5F5F5]"
              id="search-box"
              placeholder="Filter..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <select
            className="p-2 w-26 border rounded-lg"
            onChange={(e) => handleSearch(e.target.value)}
          >
            <option value="" defaultValue>
              All
            </option>
            <option value="created">Created</option>
            <option value="uploaded">Upload</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <DataTable
            className="width-fit"
            columns={columns}
            data={reportsData}
            pagination
            highlightOnHover
          />
        </div>
      </div>
      <GroupDialog dataAllPayslip={dataAllPayslip} />
    </>
  );
};

export default ReportsTable;
