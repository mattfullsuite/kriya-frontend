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


import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

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

  const [deactivationDate, setDeactivationDate] = useState(new Date());

  const [deactivationInfo, setDeactivationInfo] = useState({
    date_separated: moment(deactivationDate).format("YYYY-MM-DD")
  });


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

  const handleDeactivationSubmit = (event) => {

    //handlePTOpoints();
    document.getElementById("submit-button").disabled = true;

    console.log(JSON.stringify(deactivationDate))

    event.preventDefault();

    // if (leaveFrom <= leaveTo && isWorkday(leaveFrom) && isWorkday(leaveTo)){

    Axios
    .post(`${BASE_URL}/ep-offboardEmployee/${emp_id}`, deactivationInfo)
      .then((res) => {
        if (res.data === "success") {
          document.getElementById("deactivate_employee_modal").close();
          document.getElementById("deactivateForm").reset();

          notifySuccess();

          setTimeout(() => {
            window.top.location = window.top.location
            document.getElementById("submit-button").disabled = false;
          }, 3500)
              // window.location.reload();


        } else if (res.data === "error") {
          document.getElementById("deactivate_employee_modal").close();
          document.getElementById("deactivateForm").reset();
          notifyFailed();

          setTimeout(() => {
            window.top.location = window.top.location
            document.getElementById("submit-button").disabled = false;
          }, 3500)
        }

        setNotif(res.data);
      })

      // .then((res) => console.log(JSON.stringify(leaveInfo)))
      .catch((err) => console.log(err));
    
  };

  const handleCancel = () => {
    document.getElementById("deactivate_employee_modal").close();
    document.getElementById("deactivateForm").reset();
    //window.location.reload();
  };

  const [notif, setNotif] = useState([]);

  const notifySuccess = () =>
    toast.success("Employee is now offboarding/offboarded.", {
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
    toast.error("Something went wrong.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });



  // /ep-getDataOfLoggedInUser

  return (
    
    <ThemeContext.Provider value={{primaryColor:primaryColor, focusBorder: focusBorder, accentColor: accentColor, textColor: textColor, hrView: hrView, disabledBg: disabledBg  }}>
      {notif != "" && notif === "success" && <ToastContainer />}
      {notif != "" && notif === "error" && <ToastContainer />}
      <div className="box-border max-w-[1300px] m-auto p-5">
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
                  <p 
                  className={`text-red-500 text-[14px]`}
                  onClick={() =>
                    document.getElementById("deactivate_employee_modal").showModal()
                  }>
                    Deactivate employee's account
                  </p>

                  {/* Modal - Deactivate Employee   */}
                  <dialog id="deactivate_employee_modal" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-xl text-center">Deactivate Employee</h3>

                      <form
                        id="deactivateForm"
                        action=""
                        method="dialog"
                      ></form>

                    <div className="flex-1 mx-15 justify-center">
                    <label>
                      <div className="label">
                        <h1 className="label-text">
                          Select Offboarding Date <span className="text-red-500"> *</span>
                        </h1>
                      </div>

                      <input
                        id="deactivation_date"
                        name="deactivation_date"
                        type="date"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs mb-2"
                        // min={moment().format("YYYY-MM-DD")}
                        onChange={(event) => 
                          setDeactivationInfo({
                          ...deactivationInfo,
                          date_separated: moment(event.target.value).format("YYYY-MM-DD"),
                        })
                       }
                       required

                      /> 
                    
                      {/* <DatePicker
                        placeholder="Type here"
                        className="input input-bordered w-full max-xs mr-2"
                        selected={deactivationDate}
                        onChange={(date) => (setDeactivationDate(date)) &&
                          setDeactivationInfo({
                          ...deactivationInfo,
                          date_separated: moment(deactivationDate).format("YYYY-MM-DD"),
                        })
                      } }
                        required
                    />*/}
                    </label>
                  </div>

                  <div className="mt-10"><hr/></div>

                  <div className="label mt-10 mb-10">
                    <h1 className="label-text">
                      <span className="text-red-500"> Warning!</span>

                      <p className="text-[14px] text-left text-black">
                        TsekSuite would still keep the data and archive the account. However, offboarded employees will not be able to login to the system unless the account is reactivated again. 
                        Furthermore, the deactivated account will not be seen in relevant features such as team chart, employees list, etc. 
                        Please proceed with caution.
                      </p>
                    </h1>
                  </div>

                <div className="flex justify-end mt-15">
                <button
                  id="submit-button"
                  type="submit"
                  className="btn btn-primary mr-2"
                  onClick={handleDeactivationSubmit}
                >
                  Submit
                </button>

                {/* Cancel Button */}
                {/* If there is a button in form, it will close the modal */}
                <button className="btn" type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>

              </div>
                  </dialog>
                    
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
