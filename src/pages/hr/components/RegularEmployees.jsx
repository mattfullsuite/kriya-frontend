import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import ContainerHeadings from "./ContainerHeading";
import { Link } from "react-router-dom";
import moment from "moment";

const RegularEmployees = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //pagination
  const [defaultData, setDefaultData] = useState([]);
  const [searchData, setSearchData] = useState([])
  //Data to Feed
  const [data, setData] = useState([]);

	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");

  const [isSearch, setIsSearch] = useState(false)

	const fetchUsers = async page => {
		setLoading(true);

		const response = await axios.get(BASE_URL + `/em-paginatedRegularEmployees?page=${page}&limit=${perPage}&delay=1`);

    console.log("PAGINATION DATA: ", response.data)

		setData(response.data.data2);
    setDefaultData(response.data.data2);

		setTotalRows(response.data.pagination.total);
		setLoading(false);
	};

  const fetchSearch = async page => {
    setIsSearch(true);
		setLoading(true);

		const response = await axios.get(BASE_URL + `/em-searchRegularEmployeeList?searchTerm=${searchTerm}`);

    console.log("Search Data: ", response.data)

		setData(response.data);
    setSearchData(response.data);
		setLoading(false);
	};

  const handlePageChange = page => {
		fetchUsers(page);
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true);

		const response = await axios.get(BASE_URL + `/em-paginatedRegularEmployees?page=${page}&limit=${newPerPage}&delay=1`);

		setData(response.data.data2);
		setPerPage(newPerPage);
		setLoading(false);
	};

	useEffect(() => {
		fetchUsers(1); // fetch page 1 of users
	}, []);

  const handleSearch = () => {
    fetchSearch()
  }

  const regularEmployeeColumn = [
    {
      name: "Employee Number",
      selector: (row) => (
        <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-1 my-2">
          <div className="box-border w-10 h-10 rounded-full bg-[#d9d9d9] flex justify-center items-center text-[#666A40] font-bold text-[20px]">
          {(row.emp_pic) ? <img className={`box-border w-10 h-10 rounded-full`} src={row.emp_pic} /> : row.f_name.charAt(0) + row.s_name.charAt(0)}
          </div>

          <p className="text-[#363636] flex-1">{row.emp_num}</p>
        </div>
      ),
      width: "150px",
      sortable: true,
    },

    {
      name: "Name",
      selector: (row) => (
        <p className="text-[#363636]">
          {row.s_name + ", " + row.f_name + " " + row.m_name}
        </p>
      ),
      grow: 1,
      sortable: true,
    },

    {
      name: "Role",
      selector: (row) => <p className="text-[#363636]">{row.position_name}</p>,
      grow: 1,
      sortable: true,
    },

    {
      name: "Direct Manager",
      selector: (row) => (
        <p className="text-[#363636]">
          {(!row.superior_f_name) ? "----" : row.superior_f_name + " " + row.superior_s_name}
        </p>
      ),
      grow: 1,
      sortable: true,
    },

    {
      name: "Hire Date",
      selector: (row) => (
        <p className="text-[#363636]">
          {moment(row.date_hired).format("MMM DD YYYY")}
        </p>
      ),
      width: "120px",
      sortable: true,
    },

    {
      name: "Offboarding Date",
      selector: (row) => (
        <p className="text-[#363636]">
          {row.date_offboarding
            ? moment(row.date_offboarding).format("MMM DD YYYY")
            : "---"}
        </p>
      ),
      width: "120px",
      sortable: true,
    },

    {
      name: "Separation Date",
      selector: (row) => (
        <p className="text-[#363636]">
          {row.date_separated != null
            ? moment(row.date_separated).format("MMM DD YYYY")
            : "---"}
        </p>
      ),
      width: "120px",
      sortable: true,
    },

    {
      name: "Action",
      selector: (row) => (
        <Link to={`/hr/employees/view-employee/` + row.emp_id}>
          <a className="btn btn-active btn-xs bg-[#D8D8D0] text-[#666A40]">
            View
          </a>
        </Link>
      ),
      width: "100px",
      sortable: true,
    },
  ];

  return (
    <div className="box-border bg-white p-5 rounded-[15px] border border-[#E4E4E4] mt-5 grid">
      <div className="transition-all box-border overflow-y-hidden">
        <div className="box-border flex flex-row flex-nowrap justify-start gap-2 max-w-[700px] pb-5">
          <Link to="/hr/employees/add-employee">
            <button className="bg-[#666A40] px-3 rounded-[8px] flex flex-row flex-nowrap justify-center items-center gap-1 h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-white w-6 h-6"
              >
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
              </svg>
              <span className="text-white text-[14px]">Add New</span>
            </button>
          </Link>
          <input
            type="text"
            value={searchTerm}
            className="bg-[#F7F7F7] border border-[#E4E4E4] rounded-[8px] px-2 py-2 text-[14px] focus:outline-none text-[#363636] flex-1 h-full"
            placeholder="Search Employee..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button 
              className="bg-[#666A40] px-2 py-2 rounded-[8px] flex flex-row flex-nowrap justify-center items-center gap-1 h-full"
              onClick={() => handleSearch()}
              >
              <span className="text-white text-[14px]">Search</span>
          </button>

          {(isSearch) &&
            <button 
                className="bg-[#666A40] px-2 py-2 rounded-[8px] flex flex-row flex-nowrap justify-center items-center gap-1 h-full"
                onClick={() => {setData(defaultData)
                                setIsSearch(false)
                                setSearchTerm("")}}
                >
                <span className="text-white text-[14px]">Reset</span>
            </button>
          }

          <select className="bg-[#F7F7F7] border border-[#E4E4E4] rounded-[8px] px-2 py-2 text-[14px] focus:outline-none text-[#363636] w-[100px]">
            <option>Filter</option>
          </select>
        </div>

        <DataTable
          columns={regularEmployeeColumn}
          data={data}
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default RegularEmployees;
