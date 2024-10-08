import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HRNumEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        const res1 = await axios.get(BASE_URL + "/getCurrentEmployees");

        const res2 = await axios.get(BASE_URL + "/getRegularEmployees");

        const res3 = await axios.get(BASE_URL + "/getProbationaryEmployees");

        const res4 = await axios.get(BASE_URL + "/getPartTimeEmployees");

        setCountInfo({
          ...countInfo,
          cc: res1.data.length,
          rc: res2.data.length,
          pc: res3.data.length,
          ptc: res4.data.length,
        });

        setIsLoading(false);
        console.log(setEmployees.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEmployees();
  }, []);

  return (
    <>
      <div className="mx-2 mb-4 flex flex-row justify-between items-center">
        <h2 className="text-md font-semibold">Company Snapshot</h2>

        <Link to="/hr/employees/add-employee">
          <button className="btn btn-sm btn-outline normal-case">
            Add New
          </button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex flex-row flex-wrap box-border gap-3 mx-2 mb-4 items-center">
          <div className="w-full basis-full md:basis-4/12 lg:basis-1/12 p-3 border border-[#e4e4e4] border-solid rounded-[15px] bg-white flex flex-1 flex-col items-center justify-center text-center box-border h-32">
            <h2 className="text-md font-semibold">
              <Skeleton height={20} width={160} />
            </h2>
            <h1 className="text-7xl font-extrabold">
              <Skeleton height={55} width={60} />
            </h1>
          </div>

          <div className="w-full basis-full md:basis-4/12 lg:basis-1/12 p-3 border border-[#e4e4e4] border-solid rounded-[15px] bg-white flex flex-1 flex-col items-center justify-center text-center box-border h-32">
            <h1 className="text-3xl font-bold">
              <Skeleton height={35} width={60} />
            </h1>
            <h2 className="text-lg font-semibold">
              <Skeleton height={20} width={120} />
            </h2>
          </div>

          <div className="w-full basis-full md:basis-4/12 lg:basis-1/12 p-3 border border-[#e4e4e4] border-solid rounded-[15px] bg-white flex flex-1 flex-col items-center justify-center text-center box-border h-32">
            <h1 className="text-3xl font-bold">
              <Skeleton height={35} width={60} />
            </h1>
            <h2 className="text-lg font-semibold">
              <Skeleton height={20} width={120} />
            </h2>
          </div>

          <div className="w-full basis-full md:basis-4/12 lg:basis-1/12 p-3 border border-[#e4e4e4] border-solid rounded-[15px] bg-white  flex flex-1 flex-col items-center justify-center text-center box-border h-32">
            <h1 className="text-3xl font-bold">
              <Skeleton height={35} width={60} />
            </h1>
            <h2 className="text-lg font-semibold">
              <Skeleton height={20} width={120} />
            </h2>
          </div>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap box-border gap-3 mx-2 mb-4 items-center">
          <div className="w-full basis-full md:basis-4/12 lg:basis-1/12 p-3 border border-[#e4e4e4] border-solid rounded-[15px] bg-white  flex flex-1 flex-col items-center justify-center text-center box-border h-32">
            <h2 className="text-md font-semibold">Number of Employees</h2>
            <h1 className="text-7xl font-extrabold">{countInfo.cc} </h1>
          </div>

          <div className="w-full basis-full md:basis-4/12 lg:basis-1/12 p-3 border border-[#e4e4e4] border-solid rounded-[15px] bg-white  flex flex-1 flex-col items-center justify-center text-center box-border h-32">
            <h1 className="text-3xl font-bold">{countInfo.pc} </h1>
            <h2 className="text-lg font-semibold">Probationary</h2>
          </div>

          <div className="w-full basis-full md:basis-4/12 lg:basis-1/12 p-3 border border-[#e4e4e4] border-solid rounded-[15px] bg-white  flex flex-1 flex-col items-center justify-center text-center box-border h-32">
            <h1 className="text-3xl font-bold">{countInfo.rc} </h1>
            <h2 className="text-lg font-semibold">Regulars</h2>
          </div>

          <div className="w-full basis-full md:basis-4/12 lg:basis-1/12 p-3 border border-[#e4e4e4] border-solid rounded-[15px] bg-white  flex flex-1 flex-col items-center justify-center text-center box-border h-32">
            <h1 className="text-3xl font-bold">{countInfo.ptc} </h1>
            <h2 className="text-lg font-semibold">Part Timers</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default HRNumEmployees;
