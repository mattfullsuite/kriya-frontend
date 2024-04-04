import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Outlet, NavLink } from "react-router-dom";

const RegularEmployee = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;

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
                  <span className="font-bold text-[#EC7E30]">
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
            <p className="text-white text-[12px] mt-9">Regular Employee</p>
          </div>

          <div className="mt-10 w-full flex flex-col flex-nowrap gap-3">
            <NavLink to="/regular/dashboard">
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
                        <span className="text-[#EC7E30] text-[14px]">
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
                  <span className="text-[#A9A9A9] text-[14px]">
                    My Onboarding Plan
                  </span>
                </div>

                <span className="text-[10px] font-semibold mr-3 bg-yellow-400 px-1 py-[2px] rounded-[5px] text-[#363636]">
                  LOCKED
                </span>
              </div>
            </div>

            <NavLink to="/regular/my-personal-information">
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
                        <span className="text-[#EC7E30] text-[14px]">
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

            <div className="flex flex-row justify-start items-center gap-8 w-full">
              <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />

              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-[#A9A9A9]"
                  >
                    <path d="M20 12v6a1 1 0 0 1-2 0V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-6h-2zm-6-1v2H6v-2h8zM6 9V7h8v2H6zm8 6v2h-3v-2h3z"></path>
                  </svg>
                  <span className="text-[#A9A9A9] text-[14px]">
                    My Payslips
                  </span>
                </div>

                <span className="text-[10px] font-semibold mr-3 bg-yellow-400 px-1 py-[2px] rounded-[5px] text-[#363636]">
                  LOCKED
                </span>
              </div>
            </div>

            <NavLink to="/regular/my-time-off-and-attendance">
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
                        <span className="text-[#EC7E30] text-[14px]">
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
                  <span className="text-[#A9A9A9] text-[14px]">
                    My Benefits Manage...
                  </span>
                </div>

                <span className="text-[10px] font-semibold mr-3 bg-yellow-400 px-1 py-[2px] rounded-[5px] text-[#363636]">
                  LOCKED
                </span>
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
                    <path d="M16.97 4.757a.999.999 0 0 0-1.918-.073l-3.186 9.554-2.952-6.644a1.002 1.002 0 0 0-1.843.034L5.323 12H2v2h3.323c.823 0 1.552-.494 1.856-1.257l.869-2.172 3.037 6.835c.162.363.521.594.915.594l.048-.001a.998.998 0 0 0 .9-.683l2.914-8.742.979 3.911A1.995 1.995 0 0 0 18.781 14H22v-2h-3.22l-1.81-7.243z"></path>
                  </svg>
                  <span className="text-[#A9A9A9] text-[14px]">My Pulse</span>
                </div>

                <span className="text-[10px] font-semibold mr-3 bg-yellow-400 px-1 py-[2px] rounded-[5px] text-[#363636]">
                  LOCKED
                </span>
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
                    <path d="M12 4C6.486 4 2 8.486 2 14a9.89 9.89 0 0 0 1.051 4.445c.17.34.516.555.895.555h16.107c.379 0 .726-.215.896-.555A9.89 9.89 0 0 0 22 14c0-5.514-4.486-10-10-10zm5.022 5.022L13.06 15.06a1.53 1.53 0 0 1-2.121.44 1.53 1.53 0 0 1 0-2.561l6.038-3.962a.033.033 0 0 1 .045.01.034.034 0 0 1 0 .035z"></path>
                  </svg>
                  <span className="text-[#A9A9A9] text-[14px]">
                    My Performance
                  </span>
                </div>

                <span className="text-[10px] font-semibold mr-3 bg-yellow-400 px-1 py-[2px] rounded-[5px] text-[#363636]">
                  LOCKED
                </span>
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
                  <span className="text-[#A9A9A9] text-[14px]">Team Chart</span>
                </div>

                <span className="text-[10px] font-semibold mr-3 bg-yellow-400 px-1 py-[2px] rounded-[5px] text-[#363636]">
                  LOCKED
                </span>
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
                  <span className="text-[#A9A9A9] text-[14px] line-clamp-1">
                    Academy Courses
                  </span>
                </div>

                <span className="text-[10px] font-semibold mr-3 bg-yellow-400 px-1 py-[2px] rounded-[5px] text-[#363636]">
                  LOCKED
                </span>
              </div>
            </div>

            <NavLink to="/regular/policies-handbook">
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
                        <span className="text-[#EC7E30] text-[14px]">
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

            <NavLink to="/regular/help-center">
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
                          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 16h-2v-2h2v2zm.976-4.885c-.196.158-.385.309-.535.459-.408.407-.44.777-.441.793v.133h-2v-.167c0-.118.029-1.177 1.026-2.174.195-.195.437-.393.691-.599.734-.595 1.216-1.029 1.216-1.627a1.934 1.934 0 0 0-3.867.001h-2C8.066 7.765 9.831 6 12 6s3.934 1.765 3.934 3.934c0 1.597-1.179 2.55-1.958 3.181z"></path>
                        </svg>
                        <span className="text-[#EC7E30] text-[14px]">
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

            <div className="flex flex-row justify-start items-center gap-8">
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
                    <span className="text-[#A9A9A9] text-[14px]">Logout</span>
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

export default RegularEmployee;
