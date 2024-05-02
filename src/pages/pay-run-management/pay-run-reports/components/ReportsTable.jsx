import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const ReportsTable = (props) => {
  const data = props.reportsData;
  const [reportsData, setReportsData] = useState(data);
  const [filterValues, setFilterValues] = useState([]);

  const columns = [
    {
      name: "Date and Time Generated",
      selector: (row) => row.dateTimeGenerated,
      cell: "",
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row) => row.duration,
      cell: "",
      sortable: true,
    },
    {
      name: "Pay Date",
      selector: (row) => row.payDate,
      cell: "",
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
      selector: "",
      cell: (row) => {
        return (
          <button className="w-24 h-8 bg-[#9E978E] bg-opacity-20 text-[#9E978E] rounded-md">
            View
          </button>
        );
      },
      sortable: true,
    },
  ];

  function handleSearch(e) {
    const searchValue = e.target.value.toLowerCase();
    const newData = data.filter((row) => {
      return (
        row.dateTimeGenerated.toLowerCase().includes(searchValue) ||
        row.duration.toLowerCase().includes(searchValue) ||
        row.payDate.toLowerCase().includes(searchValue) ||
        row.source.toLowerCase().includes(searchValue)
      );
    });
    setReportsData(newData);
  }

  useEffect(() => {
    const uniquePayDate = [...new Set(data.map((item) => item.payDate))];
    setFilterValues(uniquePayDate);
  }, []);

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
              placeholder="Filter..."
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <select
            className="p-2 w-26 border rounded-lg"
            onChange={(e) => handleSearch(e)}
          >
            <option value="" defaultValue>
              All
            </option>
            {filterValues.length > 0 &&
              filterValues.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
        <div>
          <DataTable
            columns={columns}
            data={reportsData}
            pagination
            highlightOnHover
          />
        </div>
      </div>
    </>
  );
};

export default ReportsTable;
