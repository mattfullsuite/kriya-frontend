import Axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import Headings from "../../components/universal/Headings";
import Subheadings from "../../components/universal/Subheadings";
import Personal from "./components/employment-information/Personal";
import Contact from "./components/employment-information/Contact";
import Employment from "./components/employment-information/Employment";
import Role from "./components/employment-information/Role";
import Documents from "./components/employment-information/Documents";
import ButtonBack from "../../components/universal/ButtonBack";
import { useParams } from "react-router-dom";

export const ThemeContext = createContext(null);

const EmployeeInformation = ({
  hrView,
  avatarColor,
  textColor,
  accentColor,
  primaryColor,
  focusBorder,
  disabledBg
}) => {
  const { emp_id } = useParams();

  const [activeTab, setActiveTab] = useState(1);
  const [userData, setUserData] = useState([]);
  const [otherUserData, setOtherUserData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);


  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user_data_res = await Axios.get(BASE_URL + "/ep-getDataOfLoggedInUser");
        setUserData(user_data_res.data);

        const certain_user_data_res = await Axios.get(`${BASE_URL}/ep-viewEmployee/${emp_id}`)
        setOtherUserData(certain_user_data_res.data);

        (hrView ? setEmployeeData(certain_user_data_res.data) : setEmployeeData(user_data_res.data))
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, [emp_id]);



  // /ep-getDataOfLoggedInUser

  return (
    <ThemeContext.Provider value={{primaryColor:primaryColor, focusBorder: focusBorder, accentColor: accentColor, textColor: textColor, hrView: hrView, disabledBg: disabledBg  }}>
      <div className="box-border max-w-[1300px] m-auto">
        {hrView ? <ButtonBack /> :  <Headings text={"My Personal Information"} />}
        <div
          className={`box-border grid ${
            hrView ? `grid-cols-3 gap-5` : `grid-cols-1 max-w-[900px] m-auto`
          } mt-10`}
        >
          <div
            className={`box-border flex flex-col gap-4 ${
              hrView && `col-span-2`
            }`}
          >

          {employeeData.map((u) => (
            <div className="box-border bg-white border border-[#e4e4e4] p-5 rounded-[15px] flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-5 w-full">
              <div
                className={`box-border w-24 h-24 rounded-full ${avatarColor} text-white flex justify-center items-center text-[32px] font-medium`}
              >
                {u.f_name.charAt(0) + u.s_name.charAt(0)}
              </div>

              <div className="box-border">
                <p className="text-[20px] text-[#363636] font-medium text-center sm:text-left">
                 {/* // Marvin Directo Bautista */}
                 {u.f_name + " " + u.m_name + " " + u.s_name}
                </p>
                <p className="text-[#8b8b8b] text-[14px] text-center sm:text-left">{u.position_name}</p>
                <p className="text-[#8b8b8b] text-[14px] text-center sm:text-left">{u.work_email}</p>
              </div>
            </div>
          ))}

            <div
              className={`box-border w-full ${accentColor} p-2 rounded-[12px] flex flex-row justify-between overflow-x-auto`}
            >
              <button
                onClick={() => {
                  setActiveTab(1);
                }}
                className={`text-[13px] flex-1 px-3 py-2 rounded-[6px] select-none ${
                  activeTab === 1
                    ? `${primaryColor} text-white`
                    : `${textColor}`
                }`}
              >
                Personal
              </button>

              <button
                onClick={() => {
                  setActiveTab(2);
                }}
                className={`text-[13px] flex-1 px-3 py-2 rounded-[6px] select-none ${
                  activeTab === 2
                    ? `${primaryColor} text-white`
                    : `${textColor}`
                }`}
              >
                Contact
              </button>

              <button
                onClick={() => {
                  setActiveTab(3);
                }}
                className={`text-[13px] flex-1 px-3 py-2 rounded-[6px] select-none ${
                  activeTab === 3
                    ? `${primaryColor} text-white`
                    : `${textColor}`
                }`}
              >
                Employment
              </button>

              <button
                onClick={() => {
                  setActiveTab(4);
                }}
                className={`text-[13px] flex-1 px-3 py-2 rounded-[6px] select-none ${
                  activeTab === 4
                    ? `${primaryColor} text-white`
                    : `${textColor}`
                }`}
              >
                Role
              </button>

              <button
                onClick={() => {
                  setActiveTab(5);
                }}
                className={`text-[13px] flex-1 px-3 py-2 rounded-[6px] select-none ${
                  activeTab === 5
                    ? `${primaryColor} text-white`
                    : `${textColor}`
                }`}
              >
                Documents
              </button>
            </div>

            {activeTab === 1 ? (
              <Personal />
            ) : activeTab === 2 ? (
              <Contact />
            ) : activeTab === 3 ? (
              <Employment />
            ) : activeTab === 4 ? (
              <Role />
            ) : activeTab === 5 ? (
              <Documents />
            ) : null}
          </div>

          {hrView && (
            <div className="box-border bg-white p-5 rounded-[15px] border border-[#e4e4e4] flex flex-col gap-2 h-[300px]">
              <Subheadings text={"Actions"} />

              <div className="box-border flex flex-col gap-16">
                <div className="box-border mt-5 flex flex-col gap-4">
                  <p className={`${textColor} text-[14px]`}>Edit PTO</p>


                  <p className={`${textColor} text-[14px]`}>
                    Reset employee's password
                  </p>

                  <p className={`${textColor} text-[14px]`}>
                    Edit employee information
                  </p>
                </div>

                <div className="box-border">
                  <p className={`text-red-500 text-[14px]`}>
                    Deactivate employee's account
                  </p>
                  <p className="text-[#8b8b8b] text-[10px]">
                    When the employee resigned, input the date separated and it
                    will deactivate the user’s account and prohibits to login
                    the system.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default EmployeeInformation;
