import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet, NavLink } from "react-router-dom";

const PayrollEmployee = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [workEmail, setWorkEmail] = useState("");

  const pulseSubNav = useRef(null);
  const pulseChevron = useRef(null);
  const managePayrollSubnav = useRef(null);
  const managePayrollChevron = useRef(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios
      .get(BASE_URL + "/login")
      .then((response) => {
        if (response.data.loggedIn === true) {
          if (response.data.user[0].emp_role === 0) {
            navigate("/admin/dashboard");
          } else if (response.data.user[0].emp_role === 4) {
            //navigate("/clientDashboard");
            return console.log(
              response.data.user[0].work_email + " authenticated for this page."
            );
          } else if (response.data.user[0].emp_role === 3) {
            navigate("/manager/dashboard");
          } else if (response.data.user[0].emp_role === 1) {
            navigate("/hr/dashboard");
          } else if (response.data.user[0].emp_role === 2) {
            navigate("/regular/dashboard");
          } else if (response.data == "error") {
            console.log(response.data);
          } else {
            console.log("The user is not authorized to log in to the system!");
          }
        } else {
          console.log("You are not authorized to enter this system.");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/serverDown");
      });
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(BASE_URL + "/myProfile");
        setProfilePic(res.data[0].emp_pic);
        setFirstName(res.data[0].f_name);
        setLastName(res.data[0].s_name);
        setPosition(res.data[0].position_name);
        setWorkEmail(res.data[0].work_email);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, []);

  const logoutEmployee = () => {
    try {
      axios.get(BASE_URL + "/logout");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handlePulseSubNav = () => {
    if (pulseSubNav.current.classList.contains("hidden")) {
      pulseSubNav.current.classList.remove("hidden");
      pulseChevron.current.classList.remove("rotate-180");
    } else {
      pulseSubNav.current.classList.add("hidden");
      pulseChevron.current.classList.add("rotate-180");
    }
  };

  const handleManagePayrollSubnav = () => {
    if (managePayrollSubnav.current.classList.contains("hidden")) {
      managePayrollSubnav.current.classList.remove("hidden");
      managePayrollChevron.current.classList.remove("rotate-180");
    } else {
      managePayrollSubnav.current.classList.add("hidden");
      managePayrollChevron.current.classList.add("rotate-180");
    }
  };

  return (
    <div className="drawer md:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="w-72 min-h-full bg-white flex flex-col items-center relative">
          <div className="group/card box-border bg-gradient-to-br from-[#CC5500] to-[#FF974D] p-3 rounded-[15px] w-[85%] mt-5 drop-shadow-lg">
            <div className="box-border flex flex-row justify-start items-center gap-2">
              {/* <div className="box-border w-[3rem] h-[3rem] bg-white rounded-full"></div> */}

              {profilePic === "" || profilePic === null ? (
                  <div className="box-border w-[3rem] h-[3rem] bg-white rounded-full flex justify-center items-center">
                    <span className="font-bold text-[#90946f]">
                      {firstName.charAt(0) + lastName.charAt(0)}
                    </span>
                  </div>
                ) : (
                  <img
                    className="box-border w-[3rem] h-[3rem] bg-white rounded-full"
                    src={profilePic}
                  />
                )}

              <div className="box-border flex-1">
                <p className="text-white text-[15px] line-clamp-1">
                  {firstName + " " + lastName}
                </p>
                <p className="text-white text-[10px] line-clamp-1">
                  {position}
                </p>
                <p className="text-white text-[10px] line-clamp-1">
                  {workEmail}
                </p>
              </div>
            </div>
            <p className="text-white text-[12px] mt-9">Regular Employee</p>
          </div>

          <div className="mt-10 w-full flex flex-col flex-nowrap gap-3">
            <NavLink to="/accountant/dashboard">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div
                      className={`bg-[#EC7E30] h-7 w-[6px] rounded-r-[8px]`}
                    />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#EC7E30]"
                        >
                          <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"></path>
                        </svg>
                        <span className="text-[#EC7E30] text-[14px] select-none">
                          Dashboard
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />
                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#A9A9A9]"
                        >
                          <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"></path>
                        </svg>
                        <span className="text-[#A9A9A9] text-[14px] select-none">
                          Dashboard
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </NavLink>

            <div className="flex flex-row justify-start items-center gap-8 w-full">
              <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />

              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-[#A9A9A9]"
                  >
                    <path d="M15.78 15.84S18.64 13 19.61 12c3.07-3 1.54-9.18 1.54-9.18S15 1.29 12 4.36C9.66 6.64 8.14 8.22 8.14 8.22S4.3 7.42 2 9.72L14.25 22c2.3-2.33 1.53-6.16 1.53-6.16zm-1.5-9a2 2 0 0 1 2.83 0 2 2 0 1 1-2.83 0zM3 21a7.81 7.81 0 0 0 5-2l-3-3c-2 1-2 5-2 5z"></path>
                  </svg>
                  <span className="text-[#A9A9A9] text-[14px] select-none">
                    My Onboarding Plan
                  </span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-[#A9A9A9] mr-3"
                >
                  <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
                </svg>
              </div>
            </div>

            <NavLink to="/accountant/my-personal-information">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div
                      className={`bg-[#EC7E30] h-7 w-[6px] rounded-r-[8px]`}
                    />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#EC7E30]"
                        >
                          <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM8.715 8c1.151 0 2 .849 2 2s-.849 2-2 2-2-.849-2-2 .848-2 2-2zm3.715 8H5v-.465c0-1.373 1.676-2.785 3.715-2.785s3.715 1.412 3.715 2.785V16zM19 15h-4v-2h4v2zm0-4h-5V9h5v2z"></path>
                        </svg>
                        <span className="text-[#EC7E30] text-[14px] select-none">
                          My Personal Information
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#A9A9A9]"
                        >
                          <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM8.715 8c1.151 0 2 .849 2 2s-.849 2-2 2-2-.849-2-2 .848-2 2-2zm3.715 8H5v-.465c0-1.373 1.676-2.785 3.715-2.785s3.715 1.412 3.715 2.785V16zM19 15h-4v-2h4v2zm0-4h-5V9h5v2z"></path>
                        </svg>
                        <span className="text-[#A9A9A9] text-[14px] select-none">
                          My Personal Information
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </NavLink>

            <NavLink to="/accountant/my-payslips">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div
                      className={`bg-[#EC7E30] h-7 w-[6px] rounded-r-[8px]`}
                    />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#A9A9A9]"
                        >
                          <path d="M20 12v6a1 1 0 0 1-2 0V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-6h-2zm-6-1v2H6v-2h8zM6 9V7h8v2H6zm8 6v2h-3v-2h3z"></path>
                        </svg>
                        <span className="text-[#EC7E30] text-[14px] select-none">
                          My Payslips
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#A9A9A9]"
                        >
                          <path d="M20 12v6a1 1 0 0 1-2 0V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-6h-2zm-6-1v2H6v-2h8zM6 9V7h8v2H6zm8 6v2h-3v-2h3z"></path>
                        </svg>
                        <span className="text-[#A9A9A9] text-[14px] select-none">
                          My Payslips
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </NavLink>

            <NavLink to="/accountant/my-time-off-and-attendance">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div
                      className={`bg-[#EC7E30] h-7 w-[6px] rounded-r-[8px]`}
                    />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#EC7E30]"
                        >
                          <path d="M21 20V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM9 18H7v-2h2v2zm0-4H7v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm2-5H5V7h14v2z"></path>
                        </svg>
                        <span className="text-[#EC7E30] text-[14px] select-none">
                          My Time Off & Attendance
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#A9A9A9]"
                        >
                          <path d="M21 20V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM9 18H7v-2h2v2zm0-4H7v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm2-5H5V7h14v2z"></path>
                        </svg>
                        <span className="text-[#A9A9A9] text-[14px] select-none">
                          My Time Off & Attendance
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </NavLink>

            <div className="flex flex-row justify-start items-center gap-8 w-full">
              <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />

              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-[#A9A9A9]"
                  >
                    <path d="M14 9h8v6h-8z"></path>
                    <path d="M20 3H5C3.346 3 2 4.346 2 6v12c0 1.654 1.346 3 3 3h15c1.103 0 2-.897 2-2v-2h-8c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h8V5c0-1.103-.897-2-2-2z"></path>
                  </svg>
                  <span className="text-[#A9A9A9] text-[14px] select-none">
                    My Benefits Management
                  </span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-[#A9A9A9] mr-3"
                >
                  <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
                </svg>
              </div>
            </div>

            {/* My Pulse */}
            <div className="box-border flex flex-row justify-between items-center">
              <NavLink to="/accountant/my-pulse" className="flex-1">
                {(isActive) => {
                  return isActive.isActive ? (
                    <div className="flex flex-row justify-start items-center gap-8">
                      <div
                        className={`bg-[#EC7E30] h-7 w-[6px] rounded-r-[8px]`}
                      />

                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 fill-[#EC7E30]"
                          >
                            <path d="M16.97 4.757a.999.999 0 0 0-1.918-.073l-3.186 9.554-2.952-6.644a1.002 1.002 0 0 0-1.843.034L5.323 12H2v2h3.323c.823 0 1.552-.494 1.856-1.257l.869-2.172 3.037 6.835c.162.363.521.594.915.594l.048-.001a.998.998 0 0 0 .9-.683l2.914-8.742.979 3.911A1.995 1.995 0 0 0 18.781 14H22v-2h-3.22l-1.81-7.243z"></path>
                          </svg>
                          <span className="text-[#EC7E30] text-[14px] select-none">
                            My Pulse
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-row justify-start items-center gap-8">
                      <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />

                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 fill-[#A9A9A9]"
                          >
                            <path d="M16.97 4.757a.999.999 0 0 0-1.918-.073l-3.186 9.554-2.952-6.644a1.002 1.002 0 0 0-1.843.034L5.323 12H2v2h3.323c.823 0 1.552-.494 1.856-1.257l.869-2.172 3.037 6.835c.162.363.521.594.915.594l.048-.001a.998.998 0 0 0 .9-.683l2.914-8.742.979 3.911A1.995 1.995 0 0 0 18.781 14H22v-2h-3.22l-1.81-7.243z"></path>
                          </svg>
                          <span className="text-[#A9A9A9] text-[14px] select-none">
                            My Pulse
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }}
              </NavLink>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-[#A9A9A9] w-6 h-6 mr-2 transition cursor-pointer"
                ref={pulseChevron}
                onClick={handlePulseSubNav}
              >
                <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
              </svg>
            </div>

            {/* My Pulse SubNav */}
            <div className="box-border flex flex-col gap-3" ref={pulseSubNav}>
              <NavLink to={"/accountant/my-pulse/mood-tracker"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#EC7E30] text-[14px] ml-[4.1rem] select-none">
                      Mood Tracker
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem] select-none">
                      Mood Tracker
                    </span>
                  );
                }}
              </NavLink>

              <NavLink to={"/accountant/my-pulse/cheer-a-peer"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#EC7E30] text-[14px] ml-[4.1rem] select-none">
                      Cheer a Peer
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem] select-none">
                      Cheer a Peer
                    </span>
                  );
                }}
              </NavLink>

              <NavLink to={"/accountant/my-pulse/weekly-pulse-survey"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#EC7E30] text-[14px] ml-[4.1rem] select-none">
                      Anonymous Pulse Survey
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem] select-none">
                      Anonymous Pulse Survey
                    </span>
                  );
                }}
              </NavLink>

              <NavLink to={"/accountant/my-pulse/suggestion-box"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#EC7E30] text-[14px] ml-[4.1rem] select-none">
                      Suggestion Box
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem] select-none">
                      Suggestion Box
                    </span>
                  );
                }}
              </NavLink>

              <NavLink to={"/accountant/my-pulse/tailored-guidance"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#EC7E30] text-[14px] ml-[4.1rem] select-none">
                      Tailored Guidance
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem] select-none">
                      Tailored Guidance
                    </span>
                  );
                }}
              </NavLink>
            </div>

            <div className="flex flex-row justify-start items-center gap-8 w-full">
              <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />

              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-[#A9A9A9]"
                  >
                    <path d="M12 4C6.486 4 2 8.486 2 14a9.89 9.89 0 0 0 1.051 4.445c.17.34.516.555.895.555h16.107c.379 0 .726-.215.896-.555A9.89 9.89 0 0 0 22 14c0-5.514-4.486-10-10-10zm5.022 5.022L13.06 15.06a1.53 1.53 0 0 1-2.121.44 1.53 1.53 0 0 1 0-2.561l6.038-3.962a.033.033 0 0 1 .045.01.034.034 0 0 1 0 .035z"></path>
                  </svg>
                  <span className="text-[#A9A9A9] text-[14px] select-none">
                    My Performance
                  </span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-[#A9A9A9] mr-3"
                >
                  <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
                </svg>
              </div>
            </div>

            <div className="flex flex-row justify-start items-center gap-8 w-full">
              <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />

              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-[#A9A9A9]"
                  >
                    <path d="M19.5 3A2.502 2.502 0 0 0 17 5.5c0 .357.078.696.214 1.005l-1.955 2.199A3.977 3.977 0 0 0 13 8c-.74 0-1.424.216-2.019.566L8.707 6.293l-.023.023C8.88 5.918 9 5.475 9 5a3 3 0 1 0-3 3c.475 0 .917-.12 1.316-.316l-.023.023L9.567 9.98A3.956 3.956 0 0 0 9 12c0 .997.38 1.899.985 2.601l-2.577 2.576A2.472 2.472 0 0 0 6.5 17C5.122 17 4 18.121 4 19.5S5.122 22 6.5 22 9 20.879 9 19.5c0-.321-.066-.626-.177-.909l2.838-2.838c.421.15.867.247 1.339.247 2.206 0 4-1.794 4-4 0-.636-.163-1.229-.428-1.764l2.117-2.383c.256.088.526.147.811.147C20.879 8 22 6.879 22 5.5S20.879 3 19.5 3zM13 14c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"></path>
                  </svg>
                  <span className="text-[#A9A9A9] text-[14px] select-none">
                    Team Chart
                  </span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-[#A9A9A9] mr-3"
                >
                  <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
                </svg>
              </div>
            </div>

            <div className="flex flex-row justify-start items-center gap-8 w-full">
              <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />

              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-[#A9A9A9]"
                  >
                    <path d="M2 7v1l11 4 9-4V7L11 4z"></path>
                    <path d="M4 11v4.267c0 1.621 4.001 3.893 9 3.734 4-.126 6.586-1.972 7-3.467.024-.089.037-.178.037-.268V11L13 14l-5-1.667v3.213l-1-.364V12l-3-1z"></path>
                  </svg>
                  <span className="text-[#A9A9A9] text-[14px] line-clamp-1 select-none">
                    Academy Courses
                  </span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-[#A9A9A9] mr-3"
                >
                  <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
                </svg>
              </div>
            </div>

            {/* Payroll Management */}
            <div className="box-border flex flex-row justify-between items-center">
              <NavLink to="/accountant/manage-payroll" className="flex-1">
                {(isActive) => {
                  return isActive.isActive ? (
                    <div className="flex flex-row justify-start items-center gap-8">
                      <div
                        className={`bg-[#EC7E30] h-7 w-[6px] rounded-r-[8px]`}
                      />

                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 fill-[#EC7E30]"
                          >
                            <path d="M19 3h-2.25a1 1 0 0 0-1-1h-7.5a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 17H5V5h2v2h10V5h2v15z"></path>
                          </svg>
                          <span className="text-[#EC7E30] text-[14px] select-none">
                            Manage Payroll
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-row justify-start items-center gap-8">
                      <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />

                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 fill-[#A9A9A9]"
                          >
                            <path d="M19 3h-2.25a1 1 0 0 0-1-1h-7.5a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 17H5V5h2v2h10V5h2v15z"></path>
                          </svg>
                          <span className="text-[#A9A9A9] text-[14px] select-none">
                            Manage Payroll
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }}
              </NavLink>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-[#A9A9A9] w-6 h-6 mr-2 transition cursor-pointer"
                ref={managePayrollChevron}
                onClick={handleManagePayrollSubnav}
              >
                <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
              </svg>
            </div>

            {/* Payroll Management SubNav */}
            <div
              className="box-border flex flex-col gap-3"
              ref={managePayrollSubnav}
            >
              <NavLink to={"/accountant/manage-payroll/run-regular-payroll"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#EC7E30] text-[14px] ml-[4.1rem] select-none">
                      Run Regular Payroll
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem] select-none">
                      Run Regular Payroll
                    </span>
                  );
                }}
              </NavLink>

              <NavLink to={"/accountant/manage-payroll/run-last-pay"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#EC7E30] text-[14px] ml-[4.1rem] select-none">
                      Run Last Pay
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem] select-none">
                      Run Last Pay
                    </span>
                  );
                }}
              </NavLink>

              <NavLink to={"/accountant/manage-payroll/payroll-settings"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#EC7E30] text-[14px] ml-[4.1rem] select-none">
                      Payroll Settings
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem] select-none">
                      Payroll Settings
                    </span>
                  );
                }}
              </NavLink>

              <NavLink to={"/accountant/manage-payroll/upload-a-pay-register"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#EC7E30] text-[14px] ml-[4.1rem] select-none">
                      Upload a Pay Register
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem] select-none">
                      Upload a Pay Register
                    </span>
                  );
                }}
              </NavLink>
            </div>

            <NavLink to="/accountant/policies-handbook">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div
                      className={`bg-[#EC7E30] h-7 w-[6px] rounded-r-[8px]`}
                    />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="fill-[#EC7E30] h-5 w-5"
                        >
                          <path d="M6.012 18H21V4a2 2 0 0 0-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1zM8 6h9v2H8V6z"></path>
                        </svg>
                        <span className="text-[#EC7E30] text-[14px] select-none">
                          Policies Handbook
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="fill-[#A9A9A9] h-5 w-5"
                        >
                          <path d="M6.012 18H21V4a2 2 0 0 0-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1zM8 6h9v2H8V6z"></path>
                        </svg>
                        <span className="text-[#A9A9A9] text-[14px] select-none">
                          Policies Handbook
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </NavLink>

            <div className="flex flex-row justify-start items-center gap-8 w-full">
              <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />

              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-[#A9A9A9]"
                  >
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 16h-2v-2h2v2zm.976-4.885c-.196.158-.385.309-.535.459-.408.407-.44.777-.441.793v.133h-2v-.167c0-.118.029-1.177 1.026-2.174.195-.195.437-.393.691-.599.734-.595 1.216-1.029 1.216-1.627a1.934 1.934 0 0 0-3.867.001h-2C8.066 7.765 9.831 6 12 6s3.934 1.765 3.934 3.934c0 1.597-1.179 2.55-1.958 3.181z"></path>
                  </svg>
                  <span className="text-[#A9A9A9] text-[14px] line-clamp-1 select-none">
                    Help Center
                  </span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-[#A9A9A9] mr-3"
                >
                  <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
                </svg>
              </div>
            </div>

            <div className="divider mx-5 my-0"></div>

            <NavLink to="/accountant/hr-request">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div className="bg-[#EC7E30] h-7 w-[6px] rounded-r-[8px] select-none" />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="fill-[#EC7E30] w-5 h-5"
                        >
                          <path d="M20 2H4c-1.103 0-2 .897-2 2v18l4-4h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm-7 13h-2v-2h2v2zm0-4h-2V5h2v6z"></path>
                        </svg>
                        <span className="text-[#EC7E30] text-[14px] select-none">
                          HR Request
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="fill-[#A9A9A9] w-5 h-5"
                        >
                          <path d="M20 2H4c-1.103 0-2 .897-2 2v18l4-4h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm-7 13h-2v-2h2v2zm0-4h-2V5h2v6z"></path>
                        </svg>
                        <span className="text-[#A9A9A9] text-[14px] select-none">
                          HR Request
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </NavLink>

            <NavLink to="/accountant/extras">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div
                      className={`bg-[#EC7E30] h-7 w-[6px] rounded-r-[8px]`}
                    />

                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="fill-[#EC7E30] w-5 h-5"
                        >
                          <path d="M21.993 7.95a.96.96 0 0 0-.029-.214c-.007-.025-.021-.049-.03-.074-.021-.057-.04-.113-.07-.165-.016-.027-.038-.049-.057-.075-.032-.045-.063-.091-.102-.13-.023-.022-.053-.04-.078-.061-.039-.032-.075-.067-.12-.094-.004-.003-.009-.003-.014-.006l-.008-.006-8.979-4.99a1.002 1.002 0 0 0-.97-.001l-9.021 4.99c-.003.003-.006.007-.011.01l-.01.004c-.035.02-.061.049-.094.073-.036.027-.074.051-.106.082-.03.031-.053.067-.079.102-.027.035-.057.066-.079.104-.026.043-.04.092-.059.139-.014.033-.032.064-.041.1a.975.975 0 0 0-.029.21c-.001.017-.007.032-.007.05V16c0 .363.197.698.515.874l8.978 4.987.001.001.002.001.02.011c.043.024.09.037.135.054.032.013.063.03.097.039a1.013 1.013 0 0 0 .506 0c.033-.009.064-.026.097-.039.045-.017.092-.029.135-.054l.02-.011.002-.001.001-.001 8.978-4.987c.316-.176.513-.511.513-.874V7.998c0-.017-.006-.031-.007-.048zm-10.021 3.922L5.058 8.005 7.82 6.477l6.834 3.905-2.682 1.49zm.048-7.719L18.941 8l-2.244 1.247-6.83-3.903 2.153-1.191zM13 19.301l.002-5.679L16 11.944V15l2-1v-3.175l2-1.119v5.705l-7 3.89z"></path>
                        </svg>
                        <span className="text-[#EC7E30] text-[14px] select-none">
                          Extras
                        </span>
                      </div>

                      <span className="font-medium bg-blue-400 text-[12px] text-white px-[6px] py-[2px  ] mr-3 rounded-[5px]">
                        BETA
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />

                    <div className="flex flex-row justify-between w-full items-center">
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="fill-[#A9A9A9] w-5 h-5"
                        >
                          <path d="M21.993 7.95a.96.96 0 0 0-.029-.214c-.007-.025-.021-.049-.03-.074-.021-.057-.04-.113-.07-.165-.016-.027-.038-.049-.057-.075-.032-.045-.063-.091-.102-.13-.023-.022-.053-.04-.078-.061-.039-.032-.075-.067-.12-.094-.004-.003-.009-.003-.014-.006l-.008-.006-8.979-4.99a1.002 1.002 0 0 0-.97-.001l-9.021 4.99c-.003.003-.006.007-.011.01l-.01.004c-.035.02-.061.049-.094.073-.036.027-.074.051-.106.082-.03.031-.053.067-.079.102-.027.035-.057.066-.079.104-.026.043-.04.092-.059.139-.014.033-.032.064-.041.1a.975.975 0 0 0-.029.21c-.001.017-.007.032-.007.05V16c0 .363.197.698.515.874l8.978 4.987.001.001.002.001.02.011c.043.024.09.037.135.054.032.013.063.03.097.039a1.013 1.013 0 0 0 .506 0c.033-.009.064-.026.097-.039.045-.017.092-.029.135-.054l.02-.011.002-.001.001-.001 8.978-4.987c.316-.176.513-.511.513-.874V7.998c0-.017-.006-.031-.007-.048zm-10.021 3.922L5.058 8.005 7.82 6.477l6.834 3.905-2.682 1.49zm.048-7.719L18.941 8l-2.244 1.247-6.83-3.903 2.153-1.191zM13 19.301l.002-5.679L16 11.944V15l2-1v-3.175l2-1.119v5.705l-7 3.89z"></path>
                        </svg>
                        <span className="text-[#A9A9A9] text-[14px] select-none">
                          Extras
                        </span>
                      </div>

                      <span className="font-medium bg-blue-400 text-[12px] text-white px-[6px] py-[2px  ] mr-3 rounded-[5px] select-none">
                        BETA
                      </span>
                    </div>
                  </div>
                );
              }}
            </NavLink>

            <div className="divider mx-5 my-0"></div>

            <div className="flex flex-row justify-start items-center gap-8 cursor-pointer">
              <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />

              <div>
                <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-[#A9A9A9]"
                  >
                    <path d="M12 3c-4.963 0-9 4.037-9 9v.001l5-4v3h7v2H8v3l-5-4C3.001 16.964 7.037 21 12 21s9-4.037 9-9-4.037-9-9-9z"></path>
                  </svg>
                  <a onClick={logoutEmployee}>
                    <span className="text-[#A9A9A9] text-[14px] select-none">
                      Logout
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="drawer-content bg-[#F7F7F7] p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default PayrollEmployee;
