import DataTable from "react-data-table-component";
import moment from "moment/moment";
import { useEffect, useState } from "react";

const RecurringPayRecords = ({
  recurringPayList,
  showAddForm,
  showEditRecord,
  empID,
}) => {
  const [payList, setPayList] = useState();

  useEffect(() => {
    if (recurringPayList) {
      setPayList(recurringPayList);
    }
  }, [recurringPayList]);

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();

    const newData = recurringPayList.filter((row) => {
      const matchesPayItem = row["Pay Item"]
        .toLowerCase()
        .includes(searchValue);
      const matchesDateStart = moment(row["Date Start"])
        .format("MMMM DD, YYYY")
        .toLowerCase()
        .includes(searchValue);
      const matchesDateEnd = moment(row["Date End"])
        .format("MMMM DD, YYYY")
        .toLowerCase()
        .includes(searchValue);

      // Include name in search if empID is present
      const matchesName =
        !empID && row["Name"].toLowerCase().includes(searchValue);

      return (
        matchesName || matchesPayItem || matchesDateStart || matchesDateEnd
      );
    });

    setPayList(newData);
  };

  let columns = [
    {
      name: "ID",
      selector: (row) => row.ID,
      sortable: true,
    },
    {
      name: "Pay Item",
      selector: (row) => row["Pay Item"],
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row["Amount"].toFixed(2),
      sortable: true,
    },
    {
      name: "Continuous",
      selector: (row) => (row["Continuous"] ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Date Start",
      selector: (row) =>
        row["Date Start"] != null &&
        moment(row["Date Start"]).format("MMMM DD, YYYY"),
      sortable: true,
    },
    {
      name: "Date End",
      selector: (row) =>
        row["Date End"] != null &&
        moment(row["Date End"]).format("MMMM DD, YYYY"),
      sortable: true,
    },
    {
      name: "Edit",
      cell: (row) => (
        <div>
          <button
            className="btn btn-sm btn-edit bg-[#666A40] shadow-md px-4 text-white hover:bg-[#666A40] hover:opacity-60 w-12"
            onClick={() => showEditRecord(row)}
          >
            <svg
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.46582 13.01H11.9317M6.82774 3.27982L8.47233 1.46582L11.3503 4.64032L9.70573 6.45429M6.82774 3.27982L3.56787 6.87559C3.45883 6.99584 3.39757 7.159 3.39757 7.32908V10.2379H6.03472C6.18891 10.2379 6.33677 10.1704 6.44585 10.0501L9.70573 6.45429M6.82774 3.27982L9.70573 6.45429"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  // Insert the "Name" column as the second column if empID is not provided
  if (!empID) {
    columns.splice(1, 0, {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
    });
  }

  return (
    <>
      <div className={` bg-white rounded-xl ${empID ? "mt-0" : "mt-10"} p-5`}>
        {/* Action Bar */}
        <div className="flex flex-col p-2 sm:flex-row gap-2">
          <div className="w-full">
            <input
              type="text"
              className="input input-bordered w-full sm:w-64 md:w-80 border mr-auto"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div
            className=" btn w-full sm:w-32 bg-[#666A40] shadow-md text-white hover:bg-[#666A40] hover:opacity-60 ml-auto"
            onClick={() => showAddForm(empID)}
          >
            + Add
          </div>
        </div>
        <div className="mt-2 p-2">
          <DataTable columns={columns} data={payList} pagination />
        </div>
      </div>
    </>
  );
};

export default RecurringPayRecords;
