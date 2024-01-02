import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HRNumEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //


  const [countInfo, setCountInfo] = useState({
    cc: "",
    rc: "",
    pc: "",
    ptc: "",
  });

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res1 = await axios.get(
          BASE_URL + "/getCurrentEmployees"
        );
        const res2 = await axios.get(
          BASE_URL + "/getRegularEmployees"
        );
        const res3 = await axios.get(
          BASE_URL + "/getProbationaryEmployees"
        );
        const res4 = await axios.get(
          BASE_URL + "/getPartTimeEmployees"
        );
        setCountInfo({
          ...countInfo,
          cc: res1.data.length,
          rc: res2.data.length,
          pc: res3.data.length,
          ptc: res4.data.length,
        });
        console.log(setEmployees.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEmployees();
  }, []);

  return (
    <>
      <div className="flex flex-col">

        <div className="mx-2 mb-4 flex flex-row justify-between items-center">
          <h2 className="text-md font-semibold">Employees</h2>

          <Link to="/addEmployee">
          <button className="btn btn-sm btn-outline normal-case">
            Add New
          </button>
        </Link>
        </div>

        <div className="flex flex-row flex-wrap box-border gap-3 mx-2 mb-4 items-center">
          <div className="w-full basis-full md:basis-4/12 lg:basis-1/12 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col items-center justify-center text-center box-border h-32">
            <h2 className="text-md font-semibold">Number of Employees</h2>
            <h1 className="text-7xl font-extrabold">{countInfo.cc} </h1>
          </div>

          <div className="w-full basis-full md:basis-4/12 lg:basis-1/12 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col items-center justify-center text-center box-border h-32">
            <h1 className="text-3xl font-bold">{countInfo.pc} </h1>
            <h2 className="text-lg font-semibold">Probationary</h2>
          </div>

          <div className="w-full basis-full md:basis-4/12 lg:basis-1/12 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col items-center justify-center text-center box-border h-32">
            <h1 className="text-3xl font-bold">{countInfo.rc} </h1>
            <h2 className="text-lg font-semibold">Regulars</h2>
          </div>

          <div className="w-full basis-full md:basis-4/12 lg:basis-1/12 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col items-center justify-center text-center box-border h-32">
            <h1 className="text-3xl font-bold">{countInfo.ptc} </h1>
            <h2 className="text-lg font-semibold">Part Timers</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default HRNumEmployees;
