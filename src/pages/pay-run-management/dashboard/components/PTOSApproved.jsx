import { useState } from "react";
import DataTable from "react-data-table-component";

const PTOSApproved = (props) => {
  const [ptosData, setPTOSData] = useState(props.ptosData);

  const columns = [
    {
      name: "Requester",
      selector: (row) => row.name,
      cell: (row) => {
        return (
          <>
            <div className="flex gap-2 items-center">
              <img
                src={row.empPic}
                alt="Pic"
                className="w-[40px] h-[40px] rounded-full"
              />
              <div>
                <span>{row.name}</span>
                <br />
                <span className="text-xs">{row.jobTitle}</span>
              </div>
            </div>
          </>
        );
      },
      width: "250px",
    },
    {
      name: "Leave Type",
      selector: (row) => row.leaveType,
    },
    {
      name: "Date(s)",
      selector: (row) => row.date,
      width: "180px",
    },
  ];

  return (
    <>
      <div className="w-1/2 bg-white p-5 rounded-[15px]">
        <span>PTOs Approved - Effective Upcoming Pay Run</span>
        <div>
          <DataTable columns={columns} data={ptosData} highlightOnHover />
        </div>
      </div>
    </>
  );
};

export default PTOSApproved;
