import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeDirectoryCard from "./EmployeeDirectoryCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EmployeeDirectoryComponent = ({ color }) => {
  const [directory, setDirectory] = useState([]);
  const [division, setDivision] = useState([]);
  const [department, setDepartment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  var deptArray = [];

  useEffect(() => {
    const setData = async () => {
      try {
        const dir = await axios.get(BASE_URL + "/getDirectory");
        const div = await axios.get(BASE_URL + "/getDivision");
        const dept = await axios.get(BASE_URL + "/getDepartment");
        setDirectory(dir.data);
        setDivision(div.data);
        setDepartment(dept.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    setData();
  });
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center">
          <div className="mb-10">
            <Skeleton width={150} height={40} />
          </div>
          <div className="flex flex-row flex-wrap justify-center items-center gap-4 mb-4 px-20">
            <div className="border border-gray-200 flex flex-col justify-between items-center p-5 w-64 h-[330px] rounded-xl cursor-default hover:shadow-lg hover:transition-shadow">
              <div className="flex flex-col justify-center items-center gap-5">
                <div className="h-28 w-28">
                  <Skeleton circle height={115} width={115} />
                </div>

                <div className="flex flex-col gap-0">
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                </div>
              </div>

              <div className="flex flex-row flex-nowrap gap-1 items-center justify-center w-full">
                <Skeleton height={40} width={220} />
              </div>
            </div>

            <div className="border border-gray-200 flex flex-col justify-between items-center p-5 w-64 h-[330px] rounded-xl cursor-default hover:shadow-lg hover:transition-shadow">
              <div className="flex flex-col justify-center items-center gap-5">
                <div className="h-28 w-28">
                  <Skeleton circle height={115} width={115} />
                </div>

                <div className="flex flex-col gap-0">
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                </div>
              </div>

              <div className="flex flex-row flex-nowrap gap-1 items-center justify-center w-full">
                <Skeleton height={40} width={220} />
              </div>
            </div>

            <div className="border border-gray-200 flex flex-col justify-between items-center p-5 w-64 h-[330px] rounded-xl cursor-default hover:shadow-lg hover:transition-shadow">
              <div className="flex flex-col justify-center items-center gap-5">
                <div className="h-28 w-28">
                  <Skeleton circle height={115} width={115} />
                </div>

                <div className="flex flex-col gap-0">
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                </div>
              </div>

              <div className="flex flex-row flex-nowrap gap-1 items-center justify-center w-full">
                <Skeleton height={40} width={220} />
              </div>
            </div>

            <div className="border border-gray-200 flex flex-col justify-between items-center p-5 w-64 h-[330px] rounded-xl cursor-default hover:shadow-lg hover:transition-shadow">
              <div className="flex flex-col justify-center items-center gap-5">
                <div className="h-28 w-28">
                  <Skeleton circle height={115} width={115} />
                </div>

                <div className="flex flex-col gap-0">
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                </div>
              </div>

              <div className="flex flex-row flex-nowrap gap-1 items-center justify-center w-full">
                <Skeleton height={40} width={220} />
              </div>
            </div>

            <div className="border border-gray-200 flex flex-col justify-between items-center p-5 w-64 h-[330px] rounded-xl cursor-default hover:shadow-lg hover:transition-shadow">
              <div className="flex flex-col justify-center items-center gap-5">
                <div className="h-28 w-28">
                  <Skeleton circle height={115} width={115} />
                </div>

                <div className="flex flex-col gap-0">
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                </div>
              </div>

              <div className="flex flex-row flex-nowrap gap-1 items-center justify-center w-full">
                <Skeleton height={40} width={220} />
              </div>
            </div>

            <div className="border border-gray-200 flex flex-col justify-between items-center p-5 w-64 h-[330px] rounded-xl cursor-default hover:shadow-lg hover:transition-shadow">
              <div className="flex flex-col justify-center items-center gap-5">
                <div className="h-28 w-28">
                  <Skeleton circle height={115} width={115} />
                </div>

                <div className="flex flex-col gap-0">
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                </div>
              </div>

              <div className="flex flex-row flex-nowrap gap-1 items-center justify-center w-full">
                <Skeleton height={40} width={220} />
              </div>
            </div>

            <div className="border border-gray-200 flex flex-col justify-between items-center p-5 w-64 h-[330px] rounded-xl cursor-default hover:shadow-lg hover:transition-shadow">
              <div className="flex flex-col justify-center items-center gap-5">
                <div className="h-28 w-28">
                  <Skeleton circle height={115} width={115} />
                </div>

                <div className="flex flex-col gap-0">
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                </div>
              </div>

              <div className="flex flex-row flex-nowrap gap-1 items-center justify-center w-full">
                <Skeleton height={40} width={220} />
              </div>
            </div>

            <div className="border border-gray-200 flex flex-col justify-between items-center p-5 w-64 h-[330px] rounded-xl cursor-default hover:shadow-lg hover:transition-shadow">
              <div className="flex flex-col justify-center items-center gap-5">
                <div className="h-28 w-28">
                  <Skeleton circle height={115} width={115} />
                </div>

                <div className="flex flex-col gap-0">
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                </div>
              </div>

              <div className="flex flex-row flex-nowrap gap-1 items-center justify-center w-full">
                <Skeleton height={40} width={220} />
              </div>
            </div>

            <div className="border border-gray-200 flex flex-col justify-between items-center p-5 w-64 h-[330px] rounded-xl cursor-default hover:shadow-lg hover:transition-shadow">
              <div className="flex flex-col justify-center items-center gap-5">
                <div className="h-28 w-28">
                  <Skeleton circle height={115} width={115} />
                </div>

                <div className="flex flex-col gap-0">
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                </div>
              </div>

              <div className="flex flex-row flex-nowrap gap-1 items-center justify-center w-full">
                <Skeleton height={40} width={220} />
              </div>
            </div>

            <div className="border border-gray-200 flex flex-col justify-between items-center p-5 w-64 h-[330px] rounded-xl cursor-default hover:shadow-lg hover:transition-shadow">
              <div className="flex flex-col justify-center items-center gap-5">
                <div className="h-28 w-28">
                  <Skeleton circle height={115} width={115} />
                </div>

                <div className="flex flex-col gap-0">
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                  <span className="text-center text-[14px] text-ellipsis font-semibold">
                    <Skeleton height={15} width={120} />
                  </span>
                </div>
              </div>

              <div className="flex flex-row flex-nowrap gap-1 items-center justify-center w-full">
                <Skeleton height={40} width={220} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-24 flex flex-col gap-40 px-5">
          {division.map((div) => (
            <div>
              <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold text-center mb-2">
                  {div.div_name}
                </h1>

                <div className={"h-2 w-20 bg-[" + color + "]"}></div>
              </div>

              {department.map(
                (dept) =>
                  dept.div_id == div.div_id && (
                    <div className="my-10">
                      <h2 className="text-xl font-semibold text-center mb-3 mt-20">
                        {dept.dept_name != "Not Applicable" && dept.dept_name}
                      </h2>
                      <div className="flex flex-row flex-wrap justify-center items-center gap-4 mb-4">
                        {directory.map(
                          (d) =>
                            dept.manager_id == d.emp_id && (
                              <EmployeeDirectoryCard
                                image={d.emp_pic}
                                firstName={d.f_name}
                                lastName={d.s_name}
                                department={"Manager"}
                                position={d.position_name}
                                workEmail={d.work_email}
                              />
                            )
                        )}
                      </div>
                      <div className="flex flex-row flex-wrap justify-center items-center gap-4">
                        {directory.map(
                          (d) =>
                            dept.dept_id == d.dept_id &&
                            dept.manager_id != d.emp_id && (
                              <EmployeeDirectoryCard
                                image={d.emp_pic}
                                firstName={d.f_name}
                                lastName={d.s_name}
                                position={d.position_name}
                                workEmail={d.work_email}
                              />
                            )
                        )}
                      </div>
                    </div>
                  )
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default EmployeeDirectoryComponent;
