import { useState } from "react";
import DataTable from "react-data-table-component";

const PayDisputes = (props) => {
  const data = props.payDisputes;
  const [disputesData, setDisputesData] = useState(data);

  const columns = [
    {
      name: "Employee Name",
      selector: (row) => row.name,
      cell: (row) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={row.empPic}
              alt="Pic"
              className="w-[40px] h-[40px] rounded-full"
            />
            <div>
              <span className="text-sm">{row.name}</span>
              <br />
              <span className="text-xs">{row.department}</span>
            </div>
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "Issue Raised",
      selector: (row) => row.issueRaised,
      sortable: true,
    },
    { name: "Date Raised", selector: (row) => row.dateRaised, sortable: true },
    { name: "Date Closed", selector: (row) => row.dateClosed, sortable: true },
    { name: "Handled By", selector: (row) => row.handledBy, sortable: true },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => {
        return (
          <>
            {row.status == "New" ? (
              <div className="w-20 p-2 text-center rounded bg-[#FFCD6B]">
                {row.status}
              </div>
            ) : row.status == "Pending" ? (
              <div className="w-20 p-2 text-center rounded bg-[#FF974D]">
                {row.status}
              </div>
            ) : row.status == "Resolved" ? (
              <div className="w-20 p-2 text-center rounded bg-[#7DDA74]">
                {row.status}
              </div>
            ) : (
              <div className="w-20 p-2 text-center rounded bg-[#008080] bg-opacity-30">
                {row.status}
              </div>
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
            <button className="w-24 h-8 bg-[#9E978E] bg-opacity-20 text-[#9E978E] rounded-md">
              Details
            </button>
          </>
        );
      },
    },
  ];

  function handleSearch(e) {
    const searchValue = e.target.value.toLowerCase();
    const newData = data.filter((row) => {
      return row.status.toLowerCase().includes(searchValue);
    });
    setDisputesData(newData);
  }

  return (
    <>
      <div className="w-full mt-3 p-5 rounded-[15px]">
        <div className="flex items-center pb-4">
          <span>Pay Disputes</span>
          <select
            className="ml-auto p-2 w-26 border rounded-lg"
            onChange={(e) => handleSearch(e)}
          >
            <option value="" selected>
              Filter
            </option>
            <option value="new">New</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="border bg-red-500">
          <div className="overflow-x-auto">
            <DataTable
              columns={columns}
              data={disputesData}
              pagination
              highlightOnHover
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PayDisputes;
