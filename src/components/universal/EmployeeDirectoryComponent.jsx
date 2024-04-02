import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeDirectoryCard from "./EmployeeDirectoryCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Tree, TreeNode } from 'react-organizational-chart';

const EmployeeDirectoryComponent = ({ color }) => {
  const [directorya, setDirectoryA] = useState([]);
  const [directoryb, setDirectoryB] = useState([]);
  const [directoryc, setDirectoryC] = useState([]);
  const [directoryd, setDirectoryD] = useState([]);
  const [directorye, setDirectoryE] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  var deptArray = [];

  useEffect(() => {
    const setData = async () => {
      try {
        const a = await axios.get(BASE_URL + "/getDirectory");
        const b = await axios.get(BASE_URL + "/getDirectory");
        const c = await axios.get(BASE_URL + "/getDirectory");
        const d = await axios.get(BASE_URL + "/getDirectory");
        const e = await axios.get(BASE_URL + "/getDirectory");
        setDirectoryA(a.data);
        setDirectoryB(b.data);
        setDirectoryC(c.data);
        setDirectoryD(d.data);
        setDirectoryE(e.data);
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
          {directorya.map((a) => ( 
            (a.position_name == "Chief Executive Officer") && <Tree label={<div>{a.f_name + " " + a.s_name} </div>}>
              {directoryb.map((b) => ( 
                (b.superior_id == a.emp_id == (a.position_name == "Chief Executive Officer")) && <TreeNode label={<div value={b.emp_id}>{b.f_name + " " + b.s_name}</div>}>
                  {directoryc.map((c) => ( 
                    (b.emp_id == c.superior_id) && <TreeNode label={<div value={c.emp_id}>{c.f_name + " " + c.s_name}</div>}>
                      {directoryd.map((d) => ( 
                        (c.emp_id == d.superior_id) && <TreeNode label={<div value={d.emp_id}>{d.f_name + " " + d.s_name}</div>}>
                          {directorye.map((e) => ( 
                            (d.emp_id == e.superior_id) && <TreeNode label={<div value={e.emp_id}>{e.f_name + " " + e.s_name}</div>}>
                            </TreeNode>
                          ))}
                        </TreeNode>
                      ))}
                    </TreeNode>
                  ))}
                </TreeNode>
              ))}
            </Tree>
          ))}
        </div>
      )}
    </>
  );
};
export default EmployeeDirectoryComponent;
