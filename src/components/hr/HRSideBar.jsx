import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SideBarProfile from "../universal/SideBarProfile";

const HRSideBar = () => {
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  const logoutEmployee = () => {
    try {
      Axios.get(BASE_URL + "/logout");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Axios.get(BASE_URL + "/login").then((response) => {
      if (response.data.loggedIn === false) {
        navigate("/login");
        window.location.reload();
      }
    });
  }, []);

  useEffect(() => {
    Axios.get(BASE_URL + "/login").then((response) => {
      if (response.data.loggedIn === true) {
        if (response.data.user[0].emp_role === 0) {
          navigate("/adminDashboard");
        } else if (response.data.user[0].emp_role === 2) {
          navigate("/clientDashboard");
        } else if (response.data.user[0].emp_role === 3) {
          navigate("/leadDashboard");
        } else if (response.data.user[0].emp_role === 1) {
          //navigate("/hrDashboard");
          return console.log(response.data.user[0].work_email + " authenticated for this page.")
        } else if (response.data == "error") {
          console.log(response.data);
        } else {
          console.log("The user is not authorized to log in to the system!");
        }
      }
    }).catch((err) => {
      console.log(err) 
      navigate("/serverDown")});
  }, []);


  setTimeout(function () {
    alert("Session has expired. You'll be redirected to the login.");
    window.location.reload();
  }, 60 * 60 * 24 * 1000);

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="white"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-[#555656] dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <div className="flex flex-col items-center justify-center">
              <SideBarProfile
                color={"text-white"}
                fill={"white"}
                link_to={"/hrProfile"}
                hover={"bg-gray-800"}
              ></SideBarProfile>
            </div>
            <li>
              <Link to="/hrDashboard">
                <a
                  href="#"
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    class="w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z"
                      clip-rule="evenodd"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <span class="ml-3 text-white">Dashboard</span>
                </a>
              </Link>
            </li>

            <li>
              <Link to="/employees">
                <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    class="w-6 h-6"
                  >
                    <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                  </svg>

                  <span class="flex-1 ml-3 whitespace-nowrap text-white">
                    Employees
                  </span>
                  <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-800 rounded-full dark:bg-gray-700 dark:text-gray-300"></span>
                </a>
              </Link>
            </li>

            <li>
              <Link to="/HRAnnouncements">
                <a
                  href="#"
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    class="w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <span class="flex-1 ml-3 whitespace-nowrap text-white">
                    Announcements
                  </span>
                  <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-800 rounded-full dark:bg-gray-700 dark:text-gray-300"></span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/hrAttendance">
                <a
                  href="#"
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    class="w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <span class="flex-1 ml-3 whitespace-nowrap text-white">
                    Attendance
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/hrTraining">
                <a
                  href="#"
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    class="w-5 h-5"
                  >
                    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                  </svg>

                  <span class="flex-1 ml-3 whitespace-nowrap text-white">
                    Training
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/HRDirectory">
                <a
                  href="#"
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    class="w-6 h-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                      clip-rule="evenodd"
                    />
                    <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                  </svg>

                  <span class="flex-1 ml-3 whitespace-nowrap text-white">
                    Directory
                  </span>
                </a>
              </Link>
            </li>

            <li>
              <Link to="/HRManage">
                <a
                  href="#"
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    class="w-6 h-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <span class="flex-1 ml-3 whitespace-nowrap text-white">
                    Preferences
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <a
                //href="#"
                onClick={logoutEmployee}
                class="mt-12 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span class="flex-1 ml-3 whitespace-nowrap text-white">
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

export default HRSideBar;
