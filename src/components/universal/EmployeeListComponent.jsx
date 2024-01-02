import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

import { Link, useNavigate } from "react-router-dom";

const EmployeeListComponent = () => {
  // const handleDelete = async (user_id) => {
  //     try {
  //         await axios.delete("http://localhost:6197/employeeslist/" + user_id)
  //     } catch(err){
  //         console.log(err)
  //     }
  // }
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState(employees);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res = await axios.get(BASE_URL + "/employeeslist");
        setEmployees(res.data);
        setFilter(res);
        setRecords(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEmployees();
  }, []);

  function handleFilter(event) {
    const newData = employees.filter((row) => {
      return row.f_name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  const columns = [
    {
      name: "",
      selector: (row) => (
        (row.emp_pic == "" || row.emp_pic == null) ? <div className="h-16 w-16 bg-gray-500 rounded-full flex justify-center items-center text-3xl text-white font-medium m-2">{row.f_name.charAt(0) + row.s_name.charAt(0)}</div> : <img className="h-16 w-16 rounded-full m-2 object-cover" 
        src = {"./uploads/" + row.emp_pic} />
      ),
    },
    {
      name: "Employee Number",
      selector: (row) => row.emp_num,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.s_name + ", " + row.f_name + " " + row.m_name,
      sortable: true,
    },

    {
      name: "Present Address",
      selector: (row) => row.c_address,
      sortable: true,
    },

    {
      name: "Work Email",
      selector: (row) => row.work_email,
      sortable: true,
    },

    {
      name: "Contact Number",
      selector: (row) => row.contact_num,
      sortable: true,
    },

    {
      name: "Actions",
      selector: (row) => (
        <Link to={`/viewEmployee/` + row.emp_id}>
        <a 
        className="btn btn-active btn-xs btn-info">
          View
        </a>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-5">
        <input
          type="text"
          className="input input-bordered w-full md:w-1/3"
          placeholder="Search by name..."
          onChange={handleFilter}
        />
      </div>

      <DataTable
        columns={columns}
        data={records}
        pagination
        highlightOnHover
      ></DataTable>
    </div>
  );
};

export default EmployeeListComponent;
