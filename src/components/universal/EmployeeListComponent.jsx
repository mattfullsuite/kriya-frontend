import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const [isLoading, setIsLoading] = useState(true);
  const [deactivated, setDeactivated] = useState([])
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const [all, setAll] = useState([]);
  const [probationary, setProbationary] = useState([]);
  const [regular, setRegular] = useState([]);
  const [parttime, setPartTime] = useState([]);


  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res = await axios.get(BASE_URL + "/employeeslist");
        const res2 = await axios.get(BASE_URL + "/deactivatedAccounts");
        const res3 = await axios.get(BASE_URL + "/allEmployees");
        const res4 = await axios.get(BASE_URL + "/regularEmployees");
        const res5 = await axios.get(BASE_URL + "/probationaryEmployees");
        const res6 = await axios.get(BASE_URL + "/parttimeEmployees");
        setAll(res3.data);
        setProbationary(res5.data);
        setRegular(res4.data);
        setPartTime(res6.data)
        setEmployees(res.data);
        setFilter(res);
        setRecords(res.data);
        setIsLoading(false);
        setDeactivated(res2.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEmployees();
  }, []);

  function handleFilter(event) {
    const newData = employees.filter((row) => {
      return row.searchable
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  function handleAll() {
    setRecords(employees);
  }

  function handleRegular(){
    setRecords(regular)
  }

  function handleProbationary(){
    setRecords(probationary)
  }
  function handleParttime(){
    setRecords(parttime)
  }

  function handleDeactivated() {
    setRecords(deactivated);
  }

  function handleChange(val) {
    if(val === "All") {
      setRecords(all);
    } else if (val === "Regular"){
      setRecords(regular)
    } else if (val === "Probationary"){
      setRecords(probationary)
    } else if (val === "Part-time"){
      setRecords(parttime)
    } else if (val === "Deactivated"){
      setRecords(deactivated)
    }
    
  }


  const columns = [
    {
      name: "",
      selector: (row) =>
        row.emp_pic == "" || row.emp_pic == null ? (
          <div className="h-16 w-16 bg-gray-500 rounded-full flex justify-center items-center text-3xl text-white font-medium m-2">
            {row.f_name.charAt(0) + row.s_name.charAt(0)}
          </div>
        ) : (
          <img
            className="h-16 w-16 rounded-full m-2 object-cover"
            src={"./uploads/" + row.emp_pic}
          />
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
          <a className="btn btn-active btn-xs btn-info">View</a>
        </Link>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <div>
          <div className="mb-5 w-full md:w-1/3">
            <Skeleton height={45} />
          </div>

          <div className="flex flex-row justify-center gap-5 items-center">
            <Skeleton circle height={65} width={65} />
            <div className="w-full">
              <Skeleton height={20} />
            </div>
          </div>

          <div className="flex flex-row justify-center gap-5 items-center">
            <Skeleton circle height={65} width={65} />
            <div className="w-full">
              <Skeleton height={20} />
            </div>
          </div>

          <div className="flex flex-row justify-center gap-5 items-center">
            <Skeleton circle height={65} width={65} />
            <div className="w-full">
              <Skeleton height={20} />
            </div>
          </div>

          <div className="flex flex-row justify-center gap-5 items-center">
            <Skeleton circle height={65} width={65} />
            <div className="w-full">
              <Skeleton height={20} />
            </div>
          </div>

          <div className="flex flex-row justify-center gap-5 items-center">
            <Skeleton circle height={65} width={65} />
            <div className="w-full">
              <Skeleton height={20} />
            </div>
          </div>

          <div className="flex flex-row justify-center gap-5 items-center">
            <Skeleton circle height={65} width={65} />
            <div className="w-full">
              <Skeleton height={20} />
            </div>
          </div>

          <div className="flex flex-row justify-center gap-5 items-center">
            <Skeleton circle height={65} width={65} />
            <div className="w-full">
              <Skeleton height={20} />
            </div>
          </div>

          <div className="flex flex-row justify-center gap-5 items-center">
            <Skeleton circle height={65} width={65} />
            <div className="w-full">
              <Skeleton height={20} />
            </div>
          </div>

          <div className="flex flex-row justify-center gap-5 items-center">
            <Skeleton circle height={65} width={65} />
            <div className="w-full">
              <Skeleton height={20} />
            </div>
          </div>

          <div className="flex flex-row justify-center gap-5 items-center">
            <Skeleton circle height={65} width={65} />
            <div className="w-full">
              <Skeleton height={20} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-5">
            <input
              id = "filter-dd"
              type="text"
              className="input input-bordered w-full md:w-1/3"
              placeholder="Search"
              onChange={handleFilter}
            />

            {/*  */}

            {/* <input type="radio" name="radio-1" className="radio-xs" onClick={handleAll}/><span>All</span>
            <input type="radio" name="radio-1" className="radio-xs" onClick={handleProbationary}/><span>Probationary</span>
            <input type="radio" name="radio-1" className="radio-xs" onClick={handleRegular}/> <span>Regular</span>
            <input type="radio" name="radio-1" className="radio-xs" onClick={handleParttime}/><span>Part Time</span>
            <input type="radio" name="radio-1" className="radio-xs" onClick={handleDeactivated}/> <span>Deactivated</span> */}

            <select 
              className="select select-bordered w-full max-w-xs mx-2"
              onChange={(e) => {handleChange(e.target.value)}}
            >
              <option disabled selected>Filter</option>
              <option>All </option>
              <option>Regular </option>
              <option>Probationary </option>
              <option>Part-time </option>
              <option>Deactivated </option>
            </select>
            

            

          </div>

          <DataTable
            columns={columns}
            data={records}
            pagination
            highlightOnHover
          ></DataTable>
        </div>
      )}
    </>
  );
};

export default EmployeeListComponent;
