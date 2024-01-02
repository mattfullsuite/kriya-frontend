import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  const navigate = useNavigate();

  const [work_email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notif, setNotif] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  Axios.defaults.withCredentials = true;

  const loginEmployee = () => {
    Axios.post(BASE_URL + "/processlogin", {
      work_email: work_email,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        console.log(response.data.message);
        setLoginStatus(response.data.message);
      } else if (response.data === "error") {
        notifyFailed();
      } else {
        if (response.data.emp_role === 0) {
          navigate("/adminDashboard");
          console.log("The user is an admin.");
        } else if (response.data.emp_role === 1) {
          console.log("The user is an HR.");
          navigate("/hrDashboard");
        } else if (response.data.emp_role === 2) {
          console.log("The user is an employee,");
          navigate("/clientDashboard");
        } else if (response.data.emp_role === 3) {
          console.log("The user is a team lead,");
          navigate("/leadDashboard");
        }
      }
      setNotif(response.data);
    });
  };

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
          navigate("/hrDashboard");
        } else if (response.data == "error") {
          console.log(response.data);
        } else {
          console.log("The user is not authorized to log in to the system!");
        }
        console.log(response.data.user[0].work_email + " is logged in.");
      }
    });
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      loginEmployee();
    }
  };

  const notifyFailed = () =>
    toast.error("Incorrect username/password!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <>
      {notif != "" && notif === "error" && <ToastContainer />}

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="../Fs-logo.png"
            alt="FullSuite Logo"
          />
          <h2 className="mt-0 mb-3 font-sans text-center text-l leading-9 tracking-tight text-gray-900">
            FullSuite
          </h2>
          <h2 className="mt-0 font-mono text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
            HRI System
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label
              htmlFor="email"
              className="block right text-sm font-medium leading-6 text-gray-900"
            >
              Email Address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onKeyDown={handleKeyPress}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0097B2] sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={handleKeyPress}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0097B2] sm:text-sm sm:leading-6 p-2"
              />
              <div className="flex items-center mt-4 mb-4">
                <input
                  className="checkbox checkbox-sm mr-2"
                  id="check"
                  type="checkbox"
                  value={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                />
                <label className="text-sm" for="check">
                  Show Password
                </label>
              </div>
            </div>
            <a
              href="/forgot-password"
              className="text-sm text-blue-800 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              onClick={loginEmployee}
              onKeyDown={handleKeyPress}
              className="mt-4 flex w-full justify-center rounded-md bg-[#0097B2] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#4A6E7E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </button>
          </div>

          <h1>{loginStatus}</h1>
        </div>
      </div>
    </>
  );
  // <div className="login-signup-form animated fadeInDown">
  //     <div className="form">
  //             <h1 className="title">Login to your account</h1>
  //             <input
  //             type="email"
  //             onChange={(e) => {
  //                 setEmail(e.target.value)
  //             }}
  //             placeholder="Email Address"/>

  //             <input
  //             type="password"
  //             onChange={(e) => {
  //                 setPassword(e.target.value)
  //             }}
  //             placeholder="Password"/>

  //             <button onClick={ loginEmployee } className="btn btn-block">Login</button>

  //             <h1>{loginStatus}</h1>
  //     </div>
  // </div>
};

export default Login;
