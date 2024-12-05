import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import Headings from "./Headings";

const EmployeeDirectoryComponent = ({ bgColor, textColor, avatarColor }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [directorya, setDirectoryA] = useState([]);
  const [directoryb, setDirectoryB] = useState([]);
  const [directoryc, setDirectoryC] = useState([]);
  const [directoryd, setDirectoryD] = useState([]);
  const [directorye, setDirectoryE] = useState([]);
  const [directoryf, setDirectoryF] = useState([]);
  const [directoryg, setDirectoryG] = useState([]);
  const [directoryh, setDirectoryH] = useState([]);
  const [directoryi, setDirectoryI] = useState([]);
  const [directoryj, setDirectoryJ] = useState([]);
  const [downlineCount, setDownlineCount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Adding Superior
  const [emp, setEmp] = useState([]);
  const [newSuperior, setNewSuperior] = useState({
    emp_id: "",
    superior_id: "",
  });

  const addingSuperiorRef = useRef(null);

  //Notifications
  const [notif, setNotif] = useState([]);

  useEffect(() => {
    const setData = async () => {
      try {
        const a = await axios.get(BASE_URL + "/getDirectory");
        const b = await axios.get(BASE_URL + "/getDirectory");
        const c = await axios.get(BASE_URL + "/getDirectory");
        const d = await axios.get(BASE_URL + "/getDirectory");
        const e = await axios.get(BASE_URL + "/getDirectory");
        const f = await axios.get(BASE_URL + "/getDirectory");
        const g = await axios.get(BASE_URL + "/getDirectory");
        const h = await axios.get(BASE_URL + "/getDirectory");
        const i = await axios.get(BASE_URL + "/getDirectory");
        const j = await axios.get(BASE_URL + "/getDirectory");
        const count = await axios.get(BASE_URL + "/getDownlineCount");
        setDirectoryA(a.data);
        setDirectoryB(b.data);
        setDirectoryC(c.data);
        setDirectoryD(d.data);
        setDirectoryE(e.data);
        setDirectoryF(f.data);
        setDirectoryG(g.data);
        setDirectoryH(h.data);
        setDirectoryI(i.data);
        setDirectoryJ(j.data);
        setDownlineCount(count.data);

        const emp_res = await axios.get(BASE_URL + "/req-allemployees");
        setEmp(emp_res.data);

        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    setData();
  }, [directorya, directoryb, directoryc, directoryd, directorye, directoryf, directoryg, directoryh, directoryi, directoryj]);

  const assignNewSuperior = () => {
    axios
      .post(BASE_URL + "/addSuperior", newSuperior)
      .then((res) => {
        if (res.data === "success") {
          addingSuperiorRef.current.close()
          notifySuccess()
        } else if (res.data === "error") {
          addingSuperiorRef.current.close()
          notifyFailed()
        }
        setNotif(res.data);
      })
      .catch((err) => console.log(err));
  };

  const notifySuccess = () =>
    toast.success("Successfully updated! ", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyFailed = () =>
    toast.error("Something went wrong!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <div className="p-5 min-h-screen flex flex-col">
      {notif != "" && notif === "success" && <ToastContainer />}
      {notif != "" && notif === "error" && <ToastContainer />}
      <Headings text={"Team Chart"} />

      {isLoading ? (
        <div className="flex-1 flex flex-col justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <button 
            onClick={() => addingSuperiorRef.current.showModal()}
            className="btn self-end absolute bg-[#90946f] text-[#f7f7f7]"> 
            Modify Superior
          </button>

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
                              src={a.emp_pic}
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
                              (a.position_name ==
                                "Chief Executive Officer") && (
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
                                          src={b.emp_pic}
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
                                                    src={c.emp_pic}
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
                                                  <AccordionItem
                                                    isActive={false}
                                                  >
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
                                                              src={d.emp_pic}
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
                                                    {/* Level 5 */}
                                                    <AccordionBody>
                                                      {directorye.map(
                                                        (e) =>
                                                          d.emp_id ==
                                                            e.superior_id && (
                                                            <AccordionItem
                                                              isActive={false}
                                                            >
                                                              <AccordionHeader>
                                                                <div className="box-border flex flex-row justify-start items-start ml-[320px] relative">
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
                                                                    {e.emp_pic ==
                                                                      null ||
                                                                    e.emp_pic ==
                                                                      "" ? (
                                                                      <div
                                                                        className={`box-border w-10 h-10 rounded-full absolute ${avatarColor} flex justify-center items-center text-white font-bold left-[-15px]`}
                                                                      >
                                                                        {e.f_name.charAt(
                                                                          0
                                                                        ) +
                                                                          e.s_name.charAt(
                                                                            0
                                                                          )}
                                                                      </div>
                                                                    ) : (
                                                                      <img
                                                                        src={
                                                                          e.emp_pic
                                                                        }
                                                                        className="w-10 h-10 rounded-full absolute left-[-15px]"
                                                                      />
                                                                    )}

                                                                    <p
                                                                      className={`${textColor} font-medium text-[14px] text-left ml-8`}
                                                                    >
                                                                      {e.f_name +
                                                                        " " +
                                                                        e.s_name}
                                                                    </p>
                                                                    <p className="text-[#8b8b8b] text-[12px] text-left ml-8">
                                                                      {
                                                                        e.position_name
                                                                      }
                                                                    </p>

                                                                    <p className="text-[#8b8b8b] text-[10px] italic text-left ml-8">
                                                                      {
                                                                        e.work_email
                                                                      }
                                                                    </p>

                                                                    {downlineCount.map(
                                                                      (dc) =>
                                                                        e.emp_id ===
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
                                                                {/* Level 6 */}
                                                                {directoryf.map(
                                                                  (f) =>
                                                                    e.emp_id ==
                                                                      f.superior_id && (
                                                                      <AccordionItem
                                                                        isActive={
                                                                          false
                                                                        }
                                                                      >
                                                                        <AccordionHeader>
                                                                          <div className="box-border flex flex-row justify-start items-start ml-[400px] relative">
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
                                                                              {e.emp_pic ==
                                                                                null ||
                                                                              e.emp_pic ==
                                                                                "" ? (
                                                                                <div
                                                                                  className={`box-border w-10 h-10 rounded-full absolute ${avatarColor} flex justify-center items-center text-white font-bold left-[-15px]`}
                                                                                >
                                                                                  {f.f_name.charAt(
                                                                                    0
                                                                                  ) +
                                                                                    f.s_name.charAt(
                                                                                      0
                                                                                    )}
                                                                                </div>
                                                                              ) : (
                                                                                <img
                                                                                  src={
                                                                                    f.emp_pic
                                                                                  }
                                                                                  className="w-10 h-10 rounded-full absolute left-[-15px]"
                                                                                />
                                                                              )}

                                                                              <p
                                                                                className={`${textColor} font-medium text-[14px] text-left ml-8`}
                                                                              >
                                                                                {f.f_name +
                                                                                  " " +
                                                                                  f.s_name}
                                                                              </p>
                                                                              <p className="text-[#8b8b8b] text-[12px] text-left ml-8">
                                                                                {
                                                                                  f.position_name
                                                                                }
                                                                              </p>

                                                                              <p className="text-[#8b8b8b] text-[10px] italic text-left ml-8">
                                                                                {
                                                                                  f.work_email
                                                                                }
                                                                              </p>

                                                                              {downlineCount.map(
                                                                                (
                                                                                  dc
                                                                                ) =>
                                                                                  f.emp_id ===
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
                                                                          {/* Level 7 */}
                                                                          {directoryg.map(
                                                                            (
                                                                              g
                                                                            ) =>
                                                                              f.emp_id ==
                                                                                g.superior_id && (
                                                                                <AccordionItem
                                                                                  isActive={
                                                                                    false
                                                                                  }
                                                                                >
                                                                                  <AccordionHeader>
                                                                                    <div className="box-border flex flex-row justify-start items-start ml-[480px] relative">
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
                                                                                        {g.emp_pic ==
                                                                                          null ||
                                                                                        g.emp_pic ==
                                                                                          "" ? (
                                                                                          <div
                                                                                            className={`box-border w-10 h-10 rounded-full absolute ${avatarColor} flex justify-center items-center text-white font-bold left-[-15px]`}
                                                                                          >
                                                                                            {g.f_name.charAt(
                                                                                              0
                                                                                            ) +
                                                                                              g.s_name.charAt(
                                                                                                0
                                                                                              )}
                                                                                          </div>
                                                                                        ) : (
                                                                                          <img
                                                                                            src={
                                                                                              g.emp_pic
                                                                                            }
                                                                                            className="w-10 h-10 rounded-full absolute left-[-15px]"
                                                                                          />
                                                                                        )}

                                                                                        <p
                                                                                          className={`${textColor} font-medium text-[14px] text-left ml-8`}
                                                                                        >
                                                                                          {g.f_name +
                                                                                            " " +
                                                                                            g.s_name}
                                                                                        </p>
                                                                                        <p className="text-[#8b8b8b] text-[12px] text-left ml-8">
                                                                                          {
                                                                                            g.position_name
                                                                                          }
                                                                                        </p>

                                                                                        <p className="text-[#8b8b8b] text-[10px] italic text-left ml-8">
                                                                                          {
                                                                                            g.work_email
                                                                                          }
                                                                                        </p>

                                                                                        {downlineCount.map(
                                                                                          (
                                                                                            dc
                                                                                          ) =>
                                                                                            g.emp_id ===
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
                                                                                    {/* Level 8 */}
                                                                                    {directoryh.map(
                                                                                      (
                                                                                        h
                                                                                      ) =>
                                                                                        g.emp_id ==
                                                                                          h.superior_id && (
                                                                                          <AccordionItem
                                                                                            isActive={
                                                                                              false
                                                                                            }
                                                                                          >
                                                                                            <AccordionHeader>
                                                                                              <div className="box-border flex flex-row justify-start items-start ml-[560px] relative">
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
                                                                                                  {h.emp_pic ==
                                                                                                    null ||
                                                                                                  h.emp_pic ==
                                                                                                    "" ? (
                                                                                                    <div
                                                                                                      className={`box-border w-10 h-10 rounded-full absolute ${avatarColor} flex justify-center items-center text-white font-bold left-[-15px]`}
                                                                                                    >
                                                                                                      {h.f_name.charAt(
                                                                                                        0
                                                                                                      ) +
                                                                                                        h.s_name.charAt(
                                                                                                          0
                                                                                                        )}
                                                                                                    </div>
                                                                                                  ) : (
                                                                                                    <img
                                                                                                      src={
                                                                                                        h.emp_pic
                                                                                                      }
                                                                                                      className="w-10 h-10 rounded-full absolute left-[-15px]"
                                                                                                    />
                                                                                                  )}

                                                                                                  <p
                                                                                                    className={`${textColor} font-medium text-[14px] text-left ml-8`}
                                                                                                  >
                                                                                                    {h.f_name +
                                                                                                      " " +
                                                                                                      h.s_name}
                                                                                                  </p>
                                                                                                  <p className="text-[#8b8b8b] text-[12px] text-left ml-8">
                                                                                                    {
                                                                                                      h.position_name
                                                                                                    }
                                                                                                  </p>

                                                                                                  <p className="text-[#8b8b8b] text-[10px] italic text-left ml-8">
                                                                                                    {
                                                                                                      h.work_email
                                                                                                    }
                                                                                                  </p>

                                                                                                  {downlineCount.map(
                                                                                                    (
                                                                                                      dc
                                                                                                    ) =>
                                                                                                      h.emp_id ===
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
                                                                                              {/* Level 9 */}
                                                                                              {directoryi.map(
                                                                                                (
                                                                                                  i
                                                                                                ) =>
                                                                                                  h.emp_id ==
                                                                                                    i.superior_id && (
                                                                                                    <AccordionItem
                                                                                                      isActive={
                                                                                                        false
                                                                                                      }
                                                                                                    >
                                                                                                      <AccordionHeader>
                                                                                                        <div className="box-border flex flex-row justify-start items-start ml-[560px] relative">
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
                                                                                                            {i.emp_pic ==
                                                                                                              null ||
                                                                                                            i.emp_pic ==
                                                                                                              "" ? (
                                                                                                              <div
                                                                                                                className={`box-border w-10 h-10 rounded-full absolute ${avatarColor} flex justify-center items-center text-white font-bold left-[-15px]`}
                                                                                                              >
                                                                                                                {i.f_name.charAt(
                                                                                                                  0
                                                                                                                ) +
                                                                                                                  i.s_name.charAt(
                                                                                                                    0
                                                                                                                  )}
                                                                                                              </div>
                                                                                                            ) : (
                                                                                                              <img
                                                                                                                src={
                                                                                                                  i.emp_pic
                                                                                                                }
                                                                                                                className="w-10 h-10 rounded-full absolute left-[-15px]"
                                                                                                              />
                                                                                                            )}

                                                                                                            <p
                                                                                                              className={`${textColor} font-medium text-[14px] text-left ml-8`}
                                                                                                            >
                                                                                                              {i.f_name +
                                                                                                                " " +
                                                                                                                i.s_name}
                                                                                                            </p>
                                                                                                            <p className="text-[#8b8b8b] text-[12px] text-left ml-8">
                                                                                                              {
                                                                                                                i.position_name
                                                                                                              }
                                                                                                            </p>

                                                                                                            <p className="text-[#8b8b8b] text-[10px] italic text-left ml-8">
                                                                                                              {
                                                                                                                i.work_email
                                                                                                              }
                                                                                                            </p>

                                                                                                            {downlineCount.map(
                                                                                                              (
                                                                                                                dc
                                                                                                              ) =>
                                                                                                                i.emp_id ===
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
                                                                                                        {/* Level 10 */}
                                                                                                        {directoryj.map(
                                                                                                          (
                                                                                                            j
                                                                                                          ) =>
                                                                                                            i.emp_id ==
                                                                                                              j.superior_id && (
                                                                                                              <AccordionItem
                                                                                                                isActive={
                                                                                                                  false
                                                                                                                }
                                                                                                              >
                                                                                                                <AccordionHeader>
                                                                                                                  <div className="box-border flex flex-row justify-start items-start ml-[640px] relative">
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
                                                                                                                      {j.emp_pic ==
                                                                                                                        null ||
                                                                                                                      j.emp_pic ==
                                                                                                                        "" ? (
                                                                                                                        <div
                                                                                                                          className={`box-border w-10 h-10 rounded-full absolute ${avatarColor} flex justify-center items-center text-white font-bold left-[-15px]`}
                                                                                                                        >
                                                                                                                          {j.f_name.charAt(
                                                                                                                            0
                                                                                                                          ) +
                                                                                                                            j.s_name.charAt(
                                                                                                                              0
                                                                                                                            )}
                                                                                                                        </div>
                                                                                                                      ) : (
                                                                                                                        <img
                                                                                                                          src={
                                                                                                                            j.emp_pic
                                                                                                                          }
                                                                                                                          className="w-10 h-10 rounded-full absolute left-[-15px]"
                                                                                                                        />
                                                                                                                      )}

                                                                                                                      <p
                                                                                                                        className={`${textColor} font-medium text-[14px] text-left ml-8`}
                                                                                                                      >
                                                                                                                        {j.f_name +
                                                                                                                          " " +
                                                                                                                          j.s_name}
                                                                                                                      </p>
                                                                                                                      <p className="text-[#8b8b8b] text-[12px] text-left ml-8">
                                                                                                                        {
                                                                                                                          j.position_name
                                                                                                                        }
                                                                                                                      </p>

                                                                                                                      <p className="text-[#8b8b8b] text-[10px] italic text-left ml-8">
                                                                                                                        {
                                                                                                                          j.work_email
                                                                                                                        }
                                                                                                                      </p>

                                                                                                                      {downlineCount.map(
                                                                                                                        (
                                                                                                                          dc
                                                                                                                        ) =>
                                                                                                                          j.emp_id ===
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

          {/* modal for adding a superior */}
          <dialog className="modal" ref={addingSuperiorRef}>
            <div className="bg-white w-[550px] p-5 rounded-[15px]">
              <p className="text-[20px] text-[#363636] font-medium">
                Assign a Superior
              </p>

              <div className="mt-10">
                <div>
                  <label className="text-[12px] text-[#363636] font-medium">
                    Employee Name
                  </label>
                  <select
                    id="emp_id"
                    name="emp_id"
                    onChange={(e) =>
                      setNewSuperior({ ...newSuperior, emp_id: e.target.value })
                    }
                    className={`transition-all ease-in-out w-full border border-[#e4e4e4] outline-none text-[14px] text-[#363636] px-3 py-2 rounded-[8px]`}
                  >
                    <option>Type in or select the employee’s name</option>
                    {emp.map((e) => (
                      <option value={e.emp_id}>
                        {e.s_name +
                          ", " +
                          e.f_name +
                          " " +
                          e.m_name +
                          "     |      " +
                          e.position_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5">
                  <label className="text-[12px] text-[#363636] font-medium">
                    Superior to be Assigned
                  </label>

                  <select
                    id="superior_id"
                    name="superior_id"
                    onChange={(e) =>
                      setNewSuperior({
                        ...newSuperior,
                        superior_id: e.target.value,
                      })
                    }
                    className={`transition-all ease-in-out w-full border border-[#e4e4e4] outline-none text-[14px] text-[#363636] px-3 py-2 rounded-[8px]`}
                  >
                    <option>
                      Type in or select the superior to be assigned
                    </option>

                    {emp.map((e) => (
                      <option value={e.emp_id}>
                        {e.s_name +
                          ", " +
                          e.f_name +
                          " " +
                          e.m_name +
                          "     |      " +
                          e.position_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-16 flex flex-row justify-end gap-3">
                  <button
                    onClick={() => addingSuperiorRef.current.close()}
                    className={`outline-none px-8 py-2 transition-all ease-in-out text-[#363636] bg-[#e7e7e7] hover:bg-[#dadada] text-[14px] rounded-[8px]`}
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => assignNewSuperior()}
                    className={`bg-[#90946f] px-8 py-2 transition-all ease-in-out rounded-[8px] text-[14px] text-white`}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </dialog>
        </>
      )}
    </div>
  );
};

export default EmployeeDirectoryComponent;
