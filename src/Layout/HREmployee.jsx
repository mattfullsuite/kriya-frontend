import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet, NavLink } from "react-router-dom";

// Navigation Imports
import MyPayslips from "../components/layout/MyPayslips";
import PayRunManagement from "../components/layout/hr-management/pay-run-managment/PayRunManagement";

const Navigator = ({ svg, label, link }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) => {
        return isActive
          ? "flex flex-row flex-nowrap justify-start w-[100%] items-center gap-3 bg-[#0098B6] px-3 py-2 rounded-[10px]"
          : "flex flex-row flex-nowrap justify-start w-[100%] items-center gap-3 hover:bg-[#0098b68e] hover:transition-colors hover:duration-200 hover:ease-in px-3 py-2 rounded-[10px]";
      }}
    >
      {svg}

      <span className="text-[#E7E7E7]">{label}</span>
    </NavLink>
  );
};

const HREmployee = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  // User type and color for side navigation
  const user = "hr";
  const userColor = "#90946f";

  const [profilePic, setProfilePic] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [workEmail, setWorkEmail] = useState("");

  const [checkIfDownline, setCheckIfDownline] = useState([]);

  const pulseSubNav = useRef(null);
  const pulseChevron = useRef(null);

  const teamSubNav = useRef(null);
  const teamChevron = useRef(null);

  const hrSubNav = useRef(null);
  const hrChevron = useRef(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const empRole = useRef();
  useEffect(() => {
    axios
      .get(BASE_URL + "/login")
      .then((response) => {
        empRole.current = response.data.user[0].emp_role;
        if (response.data.loggedIn === true) {
          if (empRole.current === 0) {
            navigate("/admin/dashboard");
          } else if (empRole.current === 2) {
            navigate("/regular/dashboard");
          } else if (empRole.current === 3) {
            navigate("/manager/dashboard");
          } else if (empRole.current === 1) {
            //navigate("/hrDashboard");
            return console.log(
              response.data.user[0].work_email + " authenticated for this page."
            );
          } else if (response.data == "error") {
            console.log(response.data);
          } else {
            console.log("The user is not authorized to log in to the system!");
          }
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

        //checkDownline
        const downline_res = await axios.get(BASE_URL + "/mt-checkDownline");
        setCheckIfDownline(downline_res.data.length);
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

  // const handlePulseSubNav = () => {
  //   if(pulseSubNav.current.classList.contains("hidden")) {
  //     pulseSubNav.current.classList.remove("hidden")
  //     pulseChevron.current.classList.remove("rotate-180")
  //   } else {
  //     pulseSubNav.current.classList.add("hidden")
  //     pulseChevron.current.classList.add("rotate-180")
  //   }
  // }

  const handlePulseSubNav = () => {
    if (pulseSubNav.current.classList.contains("hidden")) {
      pulseSubNav.current.classList.remove("hidden");
      pulseSubNav.current.classList.add("flex");
      pulseChevron.current.classList.add("-rotate-180");
      pulseSubNav.current.classList.remove("h-0");
    } else {
      pulseSubNav.current.classList.add("hidden");
      pulseChevron.current.classList.remove("-rotate-180");
      pulseSubNav.current.classList.add("h-0");
    }
  };

  const handleTeamSubNav = () => {
    if (teamSubNav.current.classList.contains("hidden")) {
      teamSubNav.current.classList.remove("hidden");
      teamSubNav.current.classList.add("flex");
      teamChevron.current.classList.add("-rotate-180");
    } else {
      teamSubNav.current.classList.add("hidden");
      teamChevron.current.classList.remove("-rotate-180");
    }
  };

  const handleHrSubNav = () => {
    if (hrSubNav.current.classList.contains("hidden")) {
      hrSubNav.current.classList.remove("hidden");
      hrSubNav.current.classList.add("flex");
      hrChevron.current.classList.add("-rotate-180");
    } else {
      hrSubNav.current.classList.add("hidden");
      hrChevron.current.classList.remove("-rotate-180");
    }
  };

  return (
    <div className="drawer md:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content bg-[#F7F7F7] p-5 min-h-screen">
        <Outlet />
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu w-72 h-full bg-white flex flex-col items-center p-0">
          <div className="box-border mb-5 w-full flex justify-center h-[150px]">
            <div className="group/card box-border bg-gradient-to-br from-[#666A40] to-[#a0a47d] p-3 rounded-[15px] w-[85%] mt-5 drop-shadow-lg">
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
                    src={"../uploads/" + profilePic}
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
              <p className="text-white text-[12px] mt-9">Human Resource</p>
            </div>
          </div>

          <div className="flex-1 no-scrollbar overflow-auto pb-5 w-full flex flex-col flex-nowrap gap-3">
            <NavLink to="/hr/dashboard">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div
                      className={`bg-[#90946f] h-7 w-[6px] rounded-r-[8px]`}
                    />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#90946f]"
                        >
                          <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"></path>
                        </svg>
                        <span className="text-[#90946f] text-[14px]">
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
                        <span className="text-[#A9A9A9] text-[14px]">
                          Dashboard
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </NavLink>
            <NavLink to="/hr/my-onboarding-plan">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div
                      className={`bg-[#90946f] h-7 w-[6px] rounded-r-[8px]`}
                    />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#90946f]"
                        >
                          <path d="M15.78 15.84S18.64 13 19.61 12c3.07-3 1.54-9.18 1.54-9.18S15 1.29 12 4.36C9.66 6.64 8.14 8.22 8.14 8.22S4.3 7.42 2 9.72L14.25 22c2.3-2.33 1.53-6.16 1.53-6.16zm-1.5-9a2 2 0 0 1 2.83 0 2 2 0 1 1-2.83 0zM3 21a7.81 7.81 0 0 0 5-2l-3-3c-2 1-2 5-2 5z"></path>
                        </svg>
                        <span className="text-[#90946f] text-[14px]">
                          My Onboarding Plan
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
                          <path d="M15.78 15.84S18.64 13 19.61 12c3.07-3 1.54-9.18 1.54-9.18S15 1.29 12 4.36C9.66 6.64 8.14 8.22 8.14 8.22S4.3 7.42 2 9.72L14.25 22c2.3-2.33 1.53-6.16 1.53-6.16zm-1.5-9a2 2 0 0 1 2.83 0 2 2 0 1 1-2.83 0zM3 21a7.81 7.81 0 0 0 5-2l-3-3c-2 1-2 5-2 5z"></path>
                        </svg>
                        <span className="text-[#A9A9A9] text-[14px]">
                          My Onboarding Plan
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </NavLink>
            <NavLink to="/hr/my-personal-information">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div
                      className={`bg-[#90946f] h-7 w-[6px] rounded-r-[8px]`}
                    />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#90946f]"
                        >
                          <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM8.715 8c1.151 0 2 .849 2 2s-.849 2-2 2-2-.849-2-2 .848-2 2-2zm3.715 8H5v-.465c0-1.373 1.676-2.785 3.715-2.785s3.715 1.412 3.715 2.785V16zM19 15h-4v-2h4v2zm0-4h-5V9h5v2z"></path>
                        </svg>
                        <span className="text-[#90946f] text-[14px]">
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
                        <span className="text-[#A9A9A9] text-[14px]">
                          My Personal Information
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </NavLink>
            <MyPayslips user={user} userColor={userColor} />
            <NavLink to="/hr/my-time-off-and-attendance">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div
                      className={`bg-[#90946f] h-7 w-[6px] rounded-r-[8px]`}
                    />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#90946f]"
                        >
                          <path d="M21 20V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM9 18H7v-2h2v2zm0-4H7v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm2-5H5V7h14v2z"></path>
                        </svg>
                        <span className="text-[#90946f] text-[14px]">
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
                        <span className="text-[#A9A9A9] text-[14px]">
                          My Time Off & Attendance
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </NavLink>
            <NavLink to="/hr/my-benefits-management">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div
                      className={`bg-[#90946f] h-7 w-[6px] rounded-r-[8px]`}
                    />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#90946f]"
                        >
                          <path d="M14 9h8v6h-8z"></path>
                          <path d="M20 3H5C3.346 3 2 4.346 2 6v12c0 1.654 1.346 3 3 3h15c1.103 0 2-.897 2-2v-2h-8c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h8V5c0-1.103-.897-2-2-2z"></path>
                        </svg>
                        <span className="text-[#90946f] text-[14px]">
                          My Benefits Management
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
                          <path d="M14 9h8v6h-8z"></path>
                          <path d="M20 3H5C3.346 3 2 4.346 2 6v12c0 1.654 1.346 3 3 3h15c1.103 0 2-.897 2-2v-2h-8c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h8V5c0-1.103-.897-2-2-2z"></path>
                        </svg>
                        <span className="text-[#A9A9A9] text-[14px]">
                          My Benefits Management
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </NavLink>
            {/* My Pulse */}
            <div className="box-border flex flex-row justify-between items-center">
              <NavLink to="/hr/my-pulse" className="flex-1">
                {(isActive) => {
                  return isActive.isActive ? (
                    <div className="flex flex-row justify-start items-center gap-8">
                      <div
                        className={`bg-[#90946f] h-7 w-[6px] rounded-r-[8px]`}
                      />

                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 fill-[#90946f]"
                          >
                            <path d="M16.97 4.757a.999.999 0 0 0-1.918-.073l-3.186 9.554-2.952-6.644a1.002 1.002 0 0 0-1.843.034L5.323 12H2v2h3.323c.823 0 1.552-.494 1.856-1.257l.869-2.172 3.037 6.835c.162.363.521.594.915.594l.048-.001a.998.998 0 0 0 .9-.683l2.914-8.742.979 3.911A1.995 1.995 0 0 0 18.781 14H22v-2h-3.22l-1.81-7.243z"></path>
                          </svg>
                          <span className="text-[#90946f] text-[14px] select-none">
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
                          <span className="text-[#A9A9A9] text-[14px]">
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
                className="fill-[#A9A9A9] w-5 h-5 mr-2 transition cursor-pointer"
                ref={pulseChevron}
                onClick={handlePulseSubNav}
              >
                <path d="M16.939 7.939 12 12.879l-4.939-4.94-2.122 2.122L12 17.121l7.061-7.06z"></path>
              </svg>
            </div>
            {/* My Pulse SubNav */}
            <div className="box-border hidden flex-col gap-3" ref={pulseSubNav}>
              <NavLink to={"/hr/my-pulse/mood-tracker"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#90946f] text-[14px] ml-[4.1rem]">
                      Mood Tracker
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem]">
                      Mood Tracker
                    </span>
                  );
                }}
              </NavLink>

              <NavLink to={"/hr/my-pulse/cheer-a-peer"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#90946f] text-[14px] ml-[4.1rem]">
                      Cheer a Peer
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem]">
                      Cheer a Peer
                    </span>
                  );
                }}
              </NavLink>
              {/* <div className="box-border flex flex-row justify-between items-center ml-[4.1rem]">
                <span className="text-[#A9A9A9] text-[14px] select-none">
                  Cheer a Peer
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-[#A9A9A9] mr-3"
                >
                  <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
                </svg>
              </div> */}

              {/* <NavLink to={"/hr/my-pulse/weekly-pulse-survey"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#90946f] text-[14px] ml-[4.1rem]">
                      Weekly Pulse Survey
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem]">
                      Weekly Pulse Survey
                    </span>
                  );
                }}
              </NavLink> */}

              <div className="box-border flex flex-row justify-between items-center ml-[4.1rem]">
                <span className="text-[#A9A9A9] text-[14px] select-none">
                  Weekly Pulse Survey
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-[#A9A9A9] mr-3"
                >
                  <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
                </svg>
              </div>

              {/* <NavLink to={"/hr/my-pulse/suggestion-box"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#90946f] text-[14px] ml-[4.1rem]">
                      Suggestion Box
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem]">
                      Suggestion Box
                    </span>
                  );
                }}
              </NavLink> */}

              <div className="box-border flex flex-row justify-between items-center ml-[4.1rem]">
                <span className="text-[#A9A9A9] text-[14px] select-none">
                  Suggestion Box
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-[#A9A9A9] mr-3"
                >
                  <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
                </svg>
              </div>
              {/*
              <NavLink to={"/hr/my-pulse/tailored-guidance"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#90946f] text-[14px] ml-[4.1rem]">
                      Tailored Guidance
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem]">
                      Tailored Guidance
                    </span>
                  );
                }}
              </NavLink> */}

              <div className="box-border flex flex-row justify-between items-center ml-[4.1rem]">
                <span className="text-[#A9A9A9] text-[14px] select-none">
                  Tailored Guidance
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-[#A9A9A9] mr-3"
                >
                  <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
                </svg>
              </div>
            </div>
            <NavLink to="/hr/my-performance">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div
                      className={`bg-[#90946f] h-7 w-[6px] rounded-r-[8px]`}
                    />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#90946f]"
                        >
                          <path d="M12 4C6.486 4 2 8.486 2 14a9.89 9.89 0 0 0 1.051 4.445c.17.34.516.555.895.555h16.107c.379 0 .726-.215.896-.555A9.89 9.89 0 0 0 22 14c0-5.514-4.486-10-10-10zm5.022 5.022L13.06 15.06a1.53 1.53 0 0 1-2.121.44 1.53 1.53 0 0 1 0-2.561l6.038-3.962a.033.033 0 0 1 .045.01.034.034 0 0 1 0 .035z"></path>
                        </svg>
                        <span className="text-[#90946f] text-[14px]">
                          My Performance
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
                          <path d="M12 4C6.486 4 2 8.486 2 14a9.89 9.89 0 0 0 1.051 4.445c.17.34.516.555.895.555h16.107c.379 0 .726-.215.896-.555A9.89 9.89 0 0 0 22 14c0-5.514-4.486-10-10-10zm5.022 5.022L13.06 15.06a1.53 1.53 0 0 1-2.121.44 1.53 1.53 0 0 1 0-2.561l6.038-3.962a.033.033 0 0 1 .045.01.034.034 0 0 1 0 .035z"></path>
                        </svg>
                        <span className="text-[#A9A9A9] text-[14px]">
                          My Performance
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </NavLink>
            <NavLink to="/hr/team-chart">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div
                      className={`bg-[#90946f] h-7 w-[6px] rounded-r-[8px]`}
                    />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#90946f]"
                        >
                          <path d="M19.5 3A2.502 2.502 0 0 0 17 5.5c0 .357.078.696.214 1.005l-1.955 2.199A3.977 3.977 0 0 0 13 8c-.74 0-1.424.216-2.019.566L8.707 6.293l-.023.023C8.88 5.918 9 5.475 9 5a3 3 0 1 0-3 3c.475 0 .917-.12 1.316-.316l-.023.023L9.567 9.98A3.956 3.956 0 0 0 9 12c0 .997.38 1.899.985 2.601l-2.577 2.576A2.472 2.472 0 0 0 6.5 17C5.122 17 4 18.121 4 19.5S5.122 22 6.5 22 9 20.879 9 19.5c0-.321-.066-.626-.177-.909l2.838-2.838c.421.15.867.247 1.339.247 2.206 0 4-1.794 4-4 0-.636-.163-1.229-.428-1.764l2.117-2.383c.256.088.526.147.811.147C20.879 8 22 6.879 22 5.5S20.879 3 19.5 3zM13 14c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"></path>
                        </svg>
                        <span className="text-[#90946f] text-[14px]">
                          Team Chart
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
                          <path d="M19.5 3A2.502 2.502 0 0 0 17 5.5c0 .357.078.696.214 1.005l-1.955 2.199A3.977 3.977 0 0 0 13 8c-.74 0-1.424.216-2.019.566L8.707 6.293l-.023.023C8.88 5.918 9 5.475 9 5a3 3 0 1 0-3 3c.475 0 .917-.12 1.316-.316l-.023.023L9.567 9.98A3.956 3.956 0 0 0 9 12c0 .997.38 1.899.985 2.601l-2.577 2.576A2.472 2.472 0 0 0 6.5 17C5.122 17 4 18.121 4 19.5S5.122 22 6.5 22 9 20.879 9 19.5c0-.321-.066-.626-.177-.909l2.838-2.838c.421.15.867.247 1.339.247 2.206 0 4-1.794 4-4 0-.636-.163-1.229-.428-1.764l2.117-2.383c.256.088.526.147.811.147C20.879 8 22 6.879 22 5.5S20.879 3 19.5 3zM13 14c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"></path>
                        </svg>
                        <span className="text-[#A9A9A9] text-[14px]">
                          Team Chart
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </NavLink>
            <NavLink to="/hr/academy-courses">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div
                      className={`bg-[#90946f] h-7 w-[6px] rounded-r-[8px]`}
                    />
                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#90946f]"
                        >
                          <path d="M2 7v1l11 4 9-4V7L11 4z"></path>
                          <path d="M4 11v4.267c0 1.621 4.001 3.893 9 3.734 4-.126 6.586-1.972 7-3.467.024-.089.037-.178.037-.268V11L13 14l-5-1.667v3.213l-1-.364V12l-3-1z"></path>
                        </svg>
                        <span className="text-[#90946f] text-[14px]">
                          Academy Courses
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
                          <path d="M2 7v1l11 4 9-4V7L11 4z"></path>
                          <path d="M4 11v4.267c0 1.621 4.001 3.893 9 3.734 4-.126 6.586-1.972 7-3.467.024-.089.037-.178.037-.268V11L13 14l-5-1.667v3.213l-1-.364V12l-3-1z"></path>
                        </svg>
                        <span className="text-[#A9A9A9] text-[14px]">
                          Academy Courses
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </NavLink>

            {/* Chimera Tab */}
            {
              // #region Manage Payroll
            }
            {/* <ManagePayroll
              user={user}
              userColor={userColor}
              userRole={empRole.current}
            /> */}
            {
              // #endregion
            }
            {/* My Team */}
            {checkIfDownline > 0 ? (
              <div className="box-border flex flex-row justify-between items-center">
                <NavLink to="/hr/my-team" className="flex-1">
                  {(isActive) => {
                    return isActive.isActive ? (
                      <div className="flex flex-row justify-start items-center gap-8">
                        <div
                          className={`bg-[#90946f] h-7 w-[6px] rounded-r-[8px]`}
                        />

                        <div className="flex flex-row justify-between items-center w-full">
                          <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="w-5 h-5 fill-[#90946f]"
                            >
                              <path d="M16.97 4.757a.999.999 0 0 0-1.918-.073l-3.186 9.554-2.952-6.644a1.002 1.002 0 0 0-1.843.034L5.323 12H2v2h3.323c.823 0 1.552-.494 1.856-1.257l.869-2.172 3.037 6.835c.162.363.521.594.915.594l.048-.001a.998.998 0 0 0 .9-.683l2.914-8.742.979 3.911A1.995 1.995 0 0 0 18.781 14H22v-2h-3.22l-1.81-7.243z"></path>
                            </svg>
                            <span className="text-[#90946f] text-[14px]">
                              My Team
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
                            <span className="text-[#A9A9A9] text-[14px]">
                              My Team
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
                  className="fill-[#A9A9A9] w-5 h-5 mr-[0.6rem] transition cursor-pointer"
                  ref={teamChevron}
                  onClick={handleTeamSubNav}
                >
                  <path d="M16.939 7.939 12 12.879l-4.939-4.94-2.122 2.122L12 17.121l7.061-7.06z"></path>
                </svg>
              </div>
            ) : null}
            <div className="box-border hidden flex-col gap-3" ref={teamSubNav}>
              <NavLink to={"/hr/my-team/team-pto-and-attendance"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#90946f] text-[14px] ml-[4.1rem]">
                      Team PTO & Attendance
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem]">
                      Team PTO & Attendance
                    </span>
                  );
                }}
              </NavLink>

              <NavLink to={"/hr/my-team/engagement-index"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#90946f] text-[14px] ml-[4.1rem]">
                      Engagement Index
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem]">
                      Engagement Index
                    </span>
                  );
                }}
              </NavLink>

              <NavLink to={"/hr/my-team/performance-management"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#90946f] text-[14px] ml-[4.1rem]">
                      Performance Management
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem]">
                      Performance Management
                    </span>
                  );
                }}
              </NavLink>

              <NavLink to={"/hr/my-team/compensation-and-rewards"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#90946f] text-[14px] ml-[4.1rem]">
                      Compensation & Rewards
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem]">
                      Compensation & Rewards
                    </span>
                  );
                }}
              </NavLink>

              <NavLink to={"/hr/my-team/academy-scorecard"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <span className="text-[#90946f] text-[14px] ml-[4.1rem]">
                      Academy Scorecard
                    </span>
                  ) : (
                    <span className="text-[#A9A9A9] text-[14px] ml-[4.1rem]">
                      Academy Scorecard
                    </span>
                  );
                }}
              </NavLink>
            </div>
            <div className="box-border flex flex-row justify-between items-center">
              <NavLink to="/hr/hr-management" className="flex-1">
                {(isActive) => {
                  return isActive.isActive ? (
                    <div className="flex flex-row justify-start items-center gap-8">
                      <div
                        className={`bg-[#90946f] h-7 w-[6px] rounded-r-[8px]`}
                      />

                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 fill-[#90946f]"
                          >
                            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3.33A1.67 1.67 0 1 1 10.33 7 1.67 1.67 0 0 1 12 5.33zm3.33 12.5-1.66.84-1.39-3.89h-.56l-1.39 3.89-1.66-.84 1.66-4.72v-1.66L7 10.33l.56-1.66 3.33 1.11h2.22l3.33-1.11.56 1.66-3.33 1.12v1.66z"></path>
                          </svg>
                          <span className="text-[#90946f] text-[14px]">
                            HR Management
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
                            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3.33A1.67 1.67 0 1 1 10.33 7 1.67 1.67 0 0 1 12 5.33zm3.33 12.5-1.66.84-1.39-3.89h-.56l-1.39 3.89-1.66-.84 1.66-4.72v-1.66L7 10.33l.56-1.66 3.33 1.11h2.22l3.33-1.11.56 1.66-3.33 1.12v1.66z"></path>
                          </svg>
                          <span className="text-[#A9A9A9] text-[14px]">
                            HR Management
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
                className="fill-[#A9A9A9] w-5 h-5 mr-[0.6rem] transition cursor-pointer"
                ref={hrChevron}
                onClick={handleHrSubNav}
              >
                <path d="M16.939 7.939 12 12.879l-4.939-4.94-2.122 2.122L12 17.121l7.061-7.06z"></path>
              </svg>
            </div>
            <div className="box-border hidden flex-col gap-3" ref={hrSubNav}>
              <NavLink to={"/hr/hr-management/employee-management"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <div class="dropdown dropdown-hover w-full">
                      <div
                        tabindex="0"
                        role="button"
                        className="box-border flex flex-row justify-between items-center ml-[4.1rem] relative group/compay-pulse"
                      >
                        <span className="text-[#90946f] text-[14px] select-none">
                          Employee Management
                        </span>
                      </div>

                      <ul
                        tabindex="0"
                        class="dropdown-content z-[1] menu p-2 shadow rounded-[16px] w-52 ml-20 bg-[#E2E4CB]"
                      >
                        <li className="transition group/list hover:bg-[#666A40] rounded-[8px]">
                          <NavLink
                            to="/hr/hr-management/employee-management/applicant-tracking-system"
                            className="group-hover/list:text-white text-[#666A40]"
                          >
                            Applicant Tracking System
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div class="dropdown dropdown-hover w-full">
                      <div
                        tabindex="0"
                        role="button"
                        className="box-border flex flex-row justify-between items-center ml-[4.1rem] relative group/compay-pulse"
                      >
                        <span className="text-[#A9A9A9] text-[14px] select-none">
                          Employee Management
                        </span>
                      </div>

                      <ul
                        tabindex="0"
                        class="dropdown-content z-[1] menu p-2 shadow rounded-[16px] w-52 ml-20 bg-[#E2E4CB]"
                      >
                        <li className="transition group/list hover:bg-[#666A40] rounded-[8px]">
                          <NavLink
                            to="/hr/hr-management/employee-management/applicant-tracking-system"
                            className="group-hover/list:text-white text-[#666A40]"
                          >
                            Applicant Tracking System
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  );
                }}
              </NavLink>

              <NavLink to={"/hr/hr-management/company-pulse"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    // <span className="text-[#90946f] text-[14px] ml-[4.1rem]">
                    //   Company Pulse
                    // </span>

                    <div class="dropdown dropdown-hover w-full">
                      <div
                        tabindex="0"
                        role="button"
                        className="box-border flex flex-row justify-between items-center ml-[4.1rem] relative group/compay-pulse"
                      >
                        <span className="text-[#90946f] text-[14px] select-none">
                          Company Pulse
                        </span>
                      </div>

                      <ul
                        tabindex="0"
                        class="dropdown-content z-[1] menu p-2 shadow rounded-[16px] w-52 ml-20 bg-[#E2E4CB]"
                      >
                        <li className="transition group/list hover:bg-[#666A40] rounded-[8px]">
                          <NavLink
                            to="/hr/hr-management/company-pulse/surveys"
                            className="group-hover/list:text-white text-[#666A40]"
                          >
                            Surveys
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div class="dropdown dropdown-hover w-full">
                      <div
                        tabindex="0"
                        role="button"
                        className="box-border flex flex-row justify-between items-center ml-[4.1rem] relative group/company-pulse"
                      >
                        <span className="text-[#A9A9A9] text-[14px] select-none">
                          Company Pulse
                        </span>
                      </div>

                      <ul
                        tabindex="0"
                        class="dropdown-content z-[1] menu p-2 shadow rounded-[16px] w-52 ml-20 bg-[#E2E4CB]"
                      >
                        <li className="transition group/list hover:bg-[#666A40] rounded-[8px]">
                          <NavLink
                            to="/hr/hr-management/company-pulse/surveys"
                            className="group-hover/list:text-white text-[#666A40]"
                          >
                            Surveys
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  );
                }}
              </NavLink>

              <PayRunManagement
                user={user}
                userColor={userColor}
                userRole={empRole.current}
              />

              <NavLink to={"/hr/hr-management/time-off-and-attendance"}>
                {(isActive) => {
                  return isActive.isActive ? (
                    <div className="box-border flex flex-row justify-between items-center ml-[4.1rem]">
                      <span className="text-[#90946f] text-[14px] select-none">
                        Time Off & Attendance
                      </span>
                    </div>
                  ) : (
                    <div className="box-border flex flex-row justify-between items-center ml-[4.1rem]">
                      <span className="text-[#A9A9A9] text-[14px] select-none">
                        Time Off & Attendance
                      </span>
                    </div>
                  );
                }}
              </NavLink>

              <div className="box-border flex flex-row justify-between items-center ml-[4.1rem]">
                <span className="text-[#A9A9A9] text-[14px] select-none">
                  Performance Management
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-[#A9A9A9] mr-3"
                >
                  <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
                </svg>
              </div>

              <div className="box-border flex flex-row justify-between items-center ml-[4.1rem]">
                <span className="text-[#A9A9A9] text-[14px] select-none">
                  Workfore Analytics
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-[#A9A9A9] mr-3"
                >
                  <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
                </svg>
              </div>

              <div className="box-border flex flex-row justify-between items-center ml-[4.1rem]">
                <span className="text-[#A9A9A9] text-[14px] select-none">
                  Tickets
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-[#A9A9A9] mr-3"
                >
                  <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
                </svg>
              </div>
            </div>
            <NavLink to="/hr/policies-handbook">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div
                      className={`bg-[#90946f] h-7 w-[6px] rounded-r-[8px]`}
                    />

                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="fill-[#90946f] h-5 w-5"
                        >
                          <path d="M6.012 18H21V4a2 2 0 0 0-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1zM8 6h9v2H8V6z"></path>
                        </svg>
                        <span className="text-[#90946f] text-[14px]">
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
                        <span className="text-[#A9A9A9] text-[14px]">
                          Policies Handbook
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </NavLink>
            <NavLink to="/hr/help-center">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div
                      className={`bg-[#90946f] h-7 w-[6px] rounded-r-[8px]`}
                    />
                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#90946f]"
                        >
                          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 16h-2v-2h2v2zm.976-4.885c-.196.158-.385.309-.535.459-.408.407-.44.777-.441.793v.133h-2v-.167c0-.118.029-1.177 1.026-2.174.195-.195.437-.393.691-.599.734-.595 1.216-1.029 1.216-1.627a1.934 1.934 0 0 0-3.867.001h-2C8.066 7.765 9.831 6 12 6s3.934 1.765 3.934 3.934c0 1.597-1.179 2.55-1.958 3.181z"></path>
                        </svg>
                        <span className="text-[#90946f] text-[14px]">
                          Help Center
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
                          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 16h-2v-2h2v2zm.976-4.885c-.196.158-.385.309-.535.459-.408.407-.44.777-.441.793v.133h-2v-.167c0-.118.029-1.177 1.026-2.174.195-.195.437-.393.691-.599.734-.595 1.216-1.029 1.216-1.627a1.934 1.934 0 0 0-3.867.001h-2C8.066 7.765 9.831 6 12 6s3.934 1.765 3.934 3.934c0 1.597-1.179 2.55-1.958 3.181z"></path>
                        </svg>
                        <span className="text-[#A9A9A9] text-[14px]">
                          Help Center
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </NavLink>
            <NavLink to="/hr/settings">
              {(isActive) => {
                return isActive.isActive ? (
                  <div className="flex flex-row justify-start items-center gap-8">
                    <div
                      className={`bg-[#90946f] h-7 w-[6px] rounded-r-[8px]`}
                    />
                    <div>
                      <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-[#90946f]"
                        >
                          <path d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"></path>
                        </svg>
                        <span className="text-[#90946f] text-[14px]">
                          Settings
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
                          <path d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"></path>
                        </svg>
                        <span className="text-[#A9A9A9] text-[14px]">
                          Settings
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </NavLink>
          </div>

          <div className="box-border bg-white border-t border-[#e4e4e4] p-2 flex flex-row justify-between items-center w-full">
            <img src={"/images/kriya.png"} className="h-10" />

            <button
              className="bg-[#F4F4F4] p-2 rounded-[8px]"
              onClick={logoutEmployee}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-[#A9A9A9] w-6 h-6"
              >
                <path d="M12 3c-4.963 0-9 4.037-9 9v.001l5-4v3h7v2H8v3l-5-4C3.001 16.964 7.037 21 12 21s9-4.037 9-9-4.037-9-9-9z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HREmployee;
