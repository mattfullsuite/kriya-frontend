import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeDirectoryCard from "./EmployeeDirectoryCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Tree, TreeNode } from "react-organizational-chart";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import Headings from "./Headings";

const EmployeeDirectoryComponent = ({ bgColor, textColor, avatarColor }) => {
  const [directorya, setDirectoryA] = useState([]);
  const [directoryb, setDirectoryB] = useState([]);
  const [directoryc, setDirectoryC] = useState([]);
  const [directoryd, setDirectoryD] = useState([]);
  const [directorye, setDirectoryE] = useState([]);
  const [downlineCount, setDownlineCount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  useEffect(() => {
    const setData = async () => {
      try {
        const a = await axios.get(BASE_URL + "/getDirectory");
        const b = await axios.get(BASE_URL + "/getDirectory");
        const c = await axios.get(BASE_URL + "/getDirectory");
        const d = await axios.get(BASE_URL + "/getDirectory");
        const e = await axios.get(BASE_URL + "/getDirectory");
        const count = await axios.get(BASE_URL + "/getDownlineCount");
        setDirectoryA(a.data);
        setDirectoryB(b.data);
        setDirectoryC(c.data);
        setDirectoryD(d.data);
        setDirectoryE(e.data);
        setDownlineCount(count.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    setData();
  }, []);

  return (
    <>
      {console.log(downlineCount)}
      <Headings text={"Team Chart"} />
      {isLoading ? (
        <div className="flex flex-col justify-center items-center"></div>
      ) : (
        <div className="my-24 mx-20 gap-40">
          {directorya.map(
            (a) =>
              a.position_name == "Chief Executive Officer" && (
                <Accordion
                  alwaysOpen={true}
                  transition={{
                    duration: "300ms",
                    timingFunction: "cubic-bezier(0, 0, 0.2, 1)",
                  }}
                >
                  <AccordionItem isActive={true}>
                    <AccordionHeader>
                      <div
                        className={`box-border ${bgColor} border border-[#e4e4e4] p-3 mb-2 rounded-[10px] w-[300px] relative`}
                      >
                        {a.emp_pic == null || a.emp_pic == "" ? (
                          <div
                            className={`box-border w-10 h-10 rounded-full absolute ${avatarColor} flex justify-center items-center text-white font-bold left-[-15px]`}
                          >
                            {a.f_name.charAt(0) + a.s_name.charAt(0)}
                          </div>
                        ) : (
                          <img
                            src={`./images/${a.emp_pic}`}
                            className="w-10 h-10 rounded-full absolute left-[-15px]"
                          />
                        )}

                        <p
                          className={`${textColor} font-medium text-[14px] text-left ml-8`}
                        >
                          {a.f_name + " " + a.s_name}
                        </p>
                        <p className="text-[#8b8b8b] text-[12px] text-left ml-8">
                          {a.position_name}
                        </p>
                        <p className="text-[#8b8b8b] text-[10px] italic text-left ml-8">
                          {a.work_email}
                        </p>

                        {downlineCount.map(
                          (dc) =>
                            a.emp_id === dc.emp_id && (
                              <div
                                className={`${avatarColor} absolute -right-5 bottom-2 rounded-full box-border py-[1px] px-[5px] flex flex-row flex-nowrap justify-center items-center`}
                              >
                                <span className="text-white ml-[3px] text-[12px]">
                                  {dc.downline_count}
                                </span>

                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className="fill-white h-5"
                                >
                                  <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                </svg>
                              </div>
                            )
                        )}
                      </div>
                    </AccordionHeader>


                    <AccordionBody>
                      {directoryb.map(
                        (b) =>
                          (b.superior_id == a.emp_id) ==
                            (a.position_name == "Chief Executive Officer") && (
                            <AccordionItem isActive={false}>
                              <AccordionHeader>
                                <div className="box-border flex flex-row justify-start items-start ml-[80px] relative">
                                  <svg
                                    viewBox="0 0 71 162"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute h-20 left-[-50px] bottom-10"
                                  >
                                    <rect
                                      width="4"
                                      height="162"
                                      fill="#D9D9D9"
                                    />
                                    <rect
                                      y="162"
                                      width="4"
                                      height="71"
                                      transform="rotate(-90 0 162)"
                                      fill="#D9D9D9"
                                    />
                                  </svg>

                                  <div
                                    className={`box-border ${bgColor} border border-[#e4e4e4] p-3 mb-2 rounded-[10px] w-[300px] relative`}
                                  >
                                    {b.emp_pic == null || b.emp_pic == "" ? (
                                      <div
                                        className={`box-border w-10 h-10 rounded-full absolute ${avatarColor} flex justify-center items-center text-white font-bold left-[-15px]`}
                                      >
                                        {b.f_name.charAt(0) +
                                          b.s_name.charAt(0)}
                                      </div>
                                    ) : (
                                      <img
                                        src={`./images/${b.emp_pic}`}
                                        className="w-10 h-10 rounded-full absolute left-[-15px]"
                                      />
                                    )}

                                    <p
                                      className={`${textColor} font-medium text-[14px] text-left ml-8`}
                                    >
                                      {b.f_name + " " + b.s_name}
                                    </p>
                                    <p className="text-[#8b8b8b] text-[12px] text-left ml-8">
                                      {b.position_name}
                                    </p>
                                    <p className="text-[#8b8b8b] text-[10px] italic text-left ml-8">
                                      {b.work_email}
                                    </p>
                                  </div>
                                  {downlineCount.map(
                                    (dc) =>
                                      b.emp_id === dc.emp_id && (
                                        <div
                                          className={`${avatarColor} absolute -right-5 bottom-4 rounded-full box-border py-[1px] px-[5px] flex flex-row flex-nowrap justify-center items-center`}
                                        >
                                          <span className="text-white ml-[3px] text-[12px]">
                                            {dc.downline_count}
                                          </span>

                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="fill-white h-5"
                                          >
                                            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                          </svg>
                                        </div>
                                      )
                                  )}
                                </div>
                              </AccordionHeader>

                              <AccordionBody>
                                {directoryc.map(
                                  (c) =>
                                    b.emp_id == c.superior_id && (
                                      <AccordionItem isActive={false}>
                                        <AccordionHeader>
                                          <div className="box-border flex flex-row justify-start items-start ml-[160px] relative">
                                            <svg
                                              viewBox="0 0 71 162"
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="absolute h-20 left-[-50px] bottom-10"
                                            >
                                              <rect
                                                width="4"
                                                height="162"
                                                fill="#D9D9D9"
                                              />
                                              <rect
                                                y="162"
                                                width="4"
                                                height="71"
                                                transform="rotate(-90 0 162)"
                                                fill="#D9D9D9"
                                              />
                                            </svg>

                                            <div
                                              className={`box-border ${bgColor} border border-[#e4e4e4] p-3 mb-2 rounded-[10px] w-[300px] relative`}
                                            >
                                              {c.emp_pic == null ||
                                              c.emp_pic == "" ? (
                                                <div
                                                  className={`box-border w-10 h-10 rounded-full absolute ${avatarColor} flex justify-center items-center text-white font-bold left-[-15px]`}
                                                >
                                                  {c.f_name.charAt(0) +
                                                    c.s_name.charAt(0)}
                                                </div>
                                              ) : (
                                                <img
                                                  src={`./images/${c.emp_pic}`}
                                                  className="w-10 h-10 rounded-full absolute left-[-15px]"
                                                />
                                              )}

                                              <p
                                                className={`${textColor} font-medium text-[14px] text-left ml-8`}
                                              >
                                                {c.f_name + " " + c.s_name}
                                              </p>
                                              <p className="text-[#8b8b8b] text-[12px] text-left ml-8">
                                                {c.position_name}
                                              </p>

                                              <p className="text-[#8b8b8b] text-[10px] italic text-left ml-8">
                                                {c.work_email}
                                              </p>

                                              {downlineCount.map(
                                                (dc) =>
                                                  c.emp_id === dc.emp_id && (
                                                    <div
                                                      className={`${avatarColor} absolute -right-5 bottom-2 rounded-full box-border py-[1px] px-[5px] flex flex-row flex-nowrap justify-center items-center`}
                                                    >
                                                      <span className="text-white ml-[3px] text-[12px]">
                                                        {dc.downline_count}
                                                      </span>

                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        className="fill-white h-5"
                                                      >
                                                        <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                                      </svg>
                                                    </div>
                                                  )
                                              )}
                                            </div>
                                          </div>
                                        </AccordionHeader>

                                        <AccordionBody>
                                          {directoryd.map(
                                            (d) =>
                                              c.emp_id == d.superior_id && (
                                                <AccordionItem isActive={false}>
                                                  <AccordionHeader>
                                                    <div className="box-border flex flex-row justify-start items-start ml-[240px] relative">
                                                      <svg
                                                        viewBox="0 0 71 162"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="absolute h-20 left-[-50px] bottom-10"
                                                      >
                                                        <rect
                                                          width="4"
                                                          height="162"
                                                          fill="#D9D9D9"
                                                        />
                                                        <rect
                                                          y="162"
                                                          width="4"
                                                          height="71"
                                                          transform="rotate(-90 0 162)"
                                                          fill="#D9D9D9"
                                                        />
                                                      </svg>

                                                      <div
                                                        className={`box-border ${bgColor} border border-[#e4e4e4] p-3 mb-2 rounded-[10px] w-[300px] relative`}
                                                      >
                                                        {d.emp_pic == null ||
                                                        d.emp_pic == "" ? (
                                                          <div
                                                            className={`box-border w-10 h-10 rounded-full absolute ${avatarColor} flex justify-center items-center text-white font-bold left-[-15px]`}
                                                          >
                                                            {d.f_name.charAt(
                                                              0
                                                            ) +
                                                              d.s_name.charAt(
                                                                0
                                                              )}
                                                          </div>
                                                        ) : (
                                                          <img
                                                            src={`./images/${d.emp_pic}`}
                                                            className="w-10 h-10 rounded-full absolute left-[-15px]"
                                                          />
                                                        )}

                                                        <p
                                                          className={`${textColor} font-medium text-[14px] text-left ml-8`}
                                                        >
                                                          {d.f_name +
                                                            " " +
                                                            d.s_name}
                                                        </p>
                                                        <p className="text-[#8b8b8b] text-[12px] text-left ml-8">
                                                          {d.position_name}
                                                        </p>

                                                        <p className="text-[#8b8b8b] text-[10px] italic text-left ml-8">
                                                          {d.work_email}
                                                        </p>

                                                        {downlineCount.map(
                                                          (dc) =>
                                                            d.emp_id ===
                                                              dc.emp_id && (
                                                              <div
                                                                className={`${avatarColor} absolute -right-5 bottom-4 rounded-full box-border py-[1px] px-[5px] flex flex-row flex-nowrap justify-center items-center`}
                                                              >
                                                                <span className="text-white ml-[3px] text-[12px]">
                                                                  {
                                                                    dc.downline_count
                                                                  }
                                                                </span>

                                                                <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  viewBox="0 0 24 24"
                                                                  className="fill-white h-5"
                                                                >
                                                                  <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                                                </svg>
                                                              </div>
                                                            )
                                                        )}
                                                      </div>
                                                    </div>
                                                  </AccordionHeader>

                                                  <AccordionBody>
                                                    <div className="accordion-body"></div>
                                                  </AccordionBody>
                                                </AccordionItem>
                                              )
                                          )}
                                        </AccordionBody>
                                      </AccordionItem>
                                    )
                                )}
                              </AccordionBody>
                            </AccordionItem>
                          )
                      )}
                    </AccordionBody>
                  </AccordionItem>
                </Accordion>
              )
          )}
        </div>
      )}
    </>
  );
};
export default EmployeeDirectoryComponent;
