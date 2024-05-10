import axios from "axios";
import { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";

const ReportsTable = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [reportsData, setReportsData] = useState([]);
  const dataGroup = useRef([]);
  const [dataAllPayslip, setdataAllPayslip] = useState([]);
  const [downloadData, setDownloadData] = useState([]);
  const dataAll = useRef([]);

  const fetchGroupData = async () => {
    try {
      const result = await axios.get(BASE_URL + "/mp-getAllPaySlipGroups");
      dataGroup.current = result.data;
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewClick = (data) => {
    const created_at = data.created_at;
    const newData = dataAll.current.filter((row) => {
      return row.created_at.toLowerCase().includes(created_at);
    });
    setdataAllPayslip(newData);
    document.getElementById("group-records").showModal();
  };

  const handleDownloadClick = (data) => {
    const created_at = data.created_at;
    const newData = dataAll.current.filter((row) => {
      return row.created_at.toLowerCase().includes(created_at);
    });
    setDownloadData(newData);
    DownloadData(newData);
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
      name: "Download",
      selector: (row) => row.created_at,
      cell: (row) => {
        return (
          <>
            <div className="flex flex-row gap-2">
              {/* <button
                className="w-24 h-8 bg-[#666A40] bg-opacity-20 text-[#9E978E] rounded-md"
                onClick={() => handleViewClick(row)}
              >
                View
              </button> */}
              <button
                className="w-10 h-8 flex bg-[#666A40] items-center justify-center fill-[#f7f7f7] rounded-md hover:bg-[#f7f7f7] hover:fill-[#666A40] hover:border-2 hover:border-[#666A40]"
                onClick={() => handleDownloadClick(row)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"></path>
                </svg>
              </button>
            </div>
          </>
        );
      },
    },
  ];

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();
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

  const DownloadData = (downloadData) => {
    const data = downloadData;

    const tranformData = (data) => {
      const transformedData = [];

      //Object Array
      data.forEach((record) => {
        const newObject = {};
        //Object
        Object.keys(record).forEach((key) => {
          if (key == "payables" || key == "totals") {
            const dataObject = JSON.parse(record[key]);
            Object.keys(dataObject).forEach((keyLevel1) => {
              if (key == "payables") {
                const categories = dataObject[keyLevel1];
                Object.keys(categories).forEach((payItem) => {
                  newObject[payItem] = categories[payItem];
                });
              }
              newObject[keyLevel1] = dataObject[keyLevel1];
            });
          } else {
            newObject[key] = record[key];
          }
        });
        transformedData.push(newObject);
      });
      return transformedData;
    };

    const jsonToCSV = (jsonData) => {
      const header =
        Object.keys(jsonData[0])
          .map((key) => `"${key}"`)
          .join(",") + "\n";
      const rows = jsonData
        .map((row) =>
          Object.values(row)
            .map((value) => `"${value}"`)
            .join(",")
        )
        .join("\n");
      return header + rows;
    };

    function createCSVBlob(csvString) {
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      return blob;
    }

    const download = (data) => {
      const transformed = tranformData(data);
      const csv = jsonToCSV(transformed);
      const csvBlob = createCSVBlob(csv);
      const url = URL.createObjectURL(csvBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.csv"); // or any other name you want
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    download(data);
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
    </>
  );
};

export default ReportsTable;
