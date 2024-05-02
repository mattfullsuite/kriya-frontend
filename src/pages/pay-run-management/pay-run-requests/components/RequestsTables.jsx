import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const RequestsTable = (props) => {
  const data = props.requestData;
  const [requestData, setRequestData] = useState(data);

  useEffect(() => {}, []);

  function handleSearch(e) {
    const searchValue = e.target.value.toLowerCase();
    const newData = data.filter((row) => {
      return (
        row.requesterName.toLowerCase().includes(searchValue) ||
        row.recipientName.toLowerCase().includes(searchValue) ||
        row.requestType.toLowerCase().includes(searchValue) ||
        row.dateRequested.toLowerCase().includes(searchValue) ||
        row.status.toLowerCase().includes(searchValue)
      );
    });
    setRequestData(newData);
  }

  const columns = [
    {
      name: "Requester",
      selector: (row) => row.requesterName,
      cell: (row) => {
        return (
          <div className="flex">
            <div>
              <img
                src={row.requesterPic}
                alt="Requester Pic"
                className="w-[40px] h-[40px] rounded-full"
              />
            </div>
            <div className="pl-2 flex flex-col justify-center">
              <span>{row.requesterName}</span>{" "}
              <span className="text-xs">{row.requesterJT}</span>
            </div>
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "Recipient",
      selector: (row) => row.recipientName,
      sortable: true,
    },
    {
      name: "Type of Request",
      selector: (row) => row.requestType,
      sortable: true,
    },
    {
      name: "Date Requested",
      selector: (row) => row.dateRequested,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
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
            onChange={(e) => handleSearch(e)}
          >
            <option value="" selected>
              All
            </option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="executed">Executed</option>
          </select>
        </div>
        <div>
          <DataTable
            columns={columns}
            data={requestData}
            pagination
            highlightOnHover
          />
        </div>
      </div>
    </>
  );
};

export default RequestsTable;
