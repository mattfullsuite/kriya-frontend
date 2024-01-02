import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import SideBarProfile from "../universal/SideBarProfile";

const ClientSideBar = () => {
  const navigate = useNavigate()
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  
  const logoutEmployee = () => {
    try { 
      Axios.get(BASE_URL + "/logout");
      navigate("/")
    } catch(err){
      console.log(err)
    }
};

useEffect(() => {
    Axios.get(BASE_URL +"/login").then((response) => {
       if (response.data.loggedIn === false) {
        navigate("/login")
        window.location.reload()
       }
    })
}, [])

setTimeout(function () {
  alert("Session has expired. You'll be redirected to the login.")
  navigate("/login")
  window.location.reload()
}, 60 * 60 * 24 * 1000)

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="white"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#0097B2] dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <SideBarProfile color={"text-white"} fill={"white"} link_to={"/empProfile"} hover={"bg-gray-800"}></SideBarProfile>

          {/* { users.map((user) => (
            <div className="flex justify-center mt-10">
              <img
                className="h-20 w-20 rounded-full ring-2 ring-white"
                src={user.emp_pic}
          
                alt=""
              />
            </div>
            ))} */}

            {/* <div className="flex flex-col items-center justify-center">
             
              { users.map((user) => (
              <div className="font-bold text-xl text-white">
                { user.f_name + " " + user.s_name}
              </div>
              ))}

              { titles.map((title) => (
              <div className="mb-1 text-white">{title.title}</div>
              ))}
              <div>
                <Link to="/empProfile">
                <a
                  className="mb-12 flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="ml-3 text-white">Profile</span>
                </a>
                </Link>
              </div>
            </div> */}

            <div className="flex items-center justify-center"></div>

            <li></li>
            <li>
              <Link to="/clientDashboard">
              <a
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="ml-3 text-white">Dashboard</span>
              </a>

              </Link>
              
            </li>

            <li>
              <Link to="/clientAnnouncements">
                <a
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="flex-1 ml-3 whitespace-nowrap text-white">
                    Announcements
                  </span>
                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-800 rounded-full dark:bg-gray-700 dark:text-gray-300"></span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/clientAttendance">
                <a
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="flex-1 ml-3 whitespace-nowrap text-white">
                    Attendance
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/clientTraining">
                <a
                  
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-5 h-5"
                  >
                    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                  </svg>

                  <span className="flex-1 ml-3 whitespace-nowrap text-white">
                    Training
                  </span>
                </a>
              </Link>
            </li>
            <li>
            <Link to="/clientDirectory">
              <a
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                    clipRule="evenodd"
                  />
                  <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap text-white">
                  Directory
                </span>
              </a>
              </Link>
            </li>
            <li>
              <a
                onClick={ logoutEmployee }
                className="mt-12 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap text-white">
                  Logout
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default ClientSideBar;
