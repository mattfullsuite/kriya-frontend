import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import ViewPayDispute from "./ViewPayDispute";
import moment from "moment";

const RequestsTable = ({ data, handleViewClick }) => {
  const [requestData, setRequestData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    setRequestData(data);
    setDisplayedData(data);
  }, [data]);

  const handleSearch = (e) => {
    let searchValue = e.target.value;
    const newData = requestData.filter((row) => {
      return (
        row.name?.toLowerCase().includes(searchValue) ||
        moment(row.raised_at)
          .format("MMM. DD, YYYY")
          .toString()
          .toLowerCase()
          .includes(searchValue) ||
        row.dispute_title?.toLowerCase().includes(searchValue) ||
        row.dispute_body?.toLowerCase().includes(searchValue) ||
        row.handled_by?.toLowerCase().includes(searchValue)
        // ||
        // row.dispute_status?.toString().includes(searchValue)
      );
    });
    setDisplayedData(newData);
  };

  const handleFilter = (e) => {
    let searchValue = e.target.value;
    const newData = requestData.filter((row) => {
      return row.dispute_status?.toString().includes(searchValue);
    });
    setDisplayedData(newData);
  };

  const handleRowClick = (data) => {
    handleViewClick(data);
  };

  const columns = [
    {
      name: "Requester",
      selector: (row) => row.name,
      cell: (row) => {
        return (
          <div className="flex">
            <div className="pl-2 flex flex-col justify-center">
              <span>{row.name}</span>{" "}
              <span className="text-xs">{row.position_name}</span>
            </div>
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "Date Raised",
      selector: (row) => moment(row.raised_at).format("MMM. DD, YYYY"),
      sortable: true,
    },
    {
      name: "Type of Complaint",
      selector: (row) => row.dispute_title,
      sortable: true,
    },
    {
      name: "Reason",
      selector: (row) => row.dispute_body,
      sortable: true,
    },
    {
      name: "Handled By",
      selector: (row) => row.handled_by,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.dispute_status,
      cell: (row) => {
        return (
          <>
            {row.dispute_status == "0" ? (
              <div className="w-20 p-2 text-center rounded">Pending</div>
            ) : row.dispute_status == "1" ? (
              <div className="w-20 p-2 text-center rounded">Accepted</div>
            ) : (
              <div className="w-20 p-2 text-center rounded">Declined</div>
            )}
          </>
        );
      },
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <>
            <button
              className=" p-2 w-20 bg-[#666A40] text-white rounded"
              onClick={() => handleRowClick(row)}
            >
              View
            </button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="mt-10 p-5 w-full rounded-[15px] bg-white">
        <div className="w-fit items-center flex gap-4 ml-auto ">
          <div className="  px-2 h-6 flex items-center gap-2 rounded-full bg-[#F5F5F5]">
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
              placeholder="Filter employees..."
              onChange={(e) => handleSearch(e)}
            />
          </div>

          <select
            className="p-2 w-26 border rounded-lg"
            onChange={(e) => handleFilter(e)}
          >
            <option value="" defaultValue>
              All
            </option>
            <option value="0">Pending</option>
            <option value="1">Declined</option>
            <option value="2">Accepted</option>
          </select>
        </div>
        <div>
          <DataTable
            columns={columns}
            data={displayedData}
            pagination
            highlightOnHover
          />
        </div>
      </div>
    </>
  );
};

export default RequestsTable;
