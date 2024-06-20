import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

const Login = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  const navigate = useNavigate();

  const [work_email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notif, setNotif] = useState("");
  const [visible, setVisible] = useState(false);

  const [loginStatus, setLoginStatus] = useState("");

  const [ipAddress, setIPAddress] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");

  const [cookie, setCookie] = useCookies(["user"]);

  // useEffect(() => {
  //   const fetchGeolocationData = async ()=> {
  //     await fetch('https://geolocation-db.com/json/')
  //       .then(response => response.json())
  //       .then(data => {
  //         setIPAddress(data.IPv4)
  //         setCountry(data.country_name)
  //         setLatitude(data.latitude)
  //         setLongitude(data.longitude)
  //         setCity(data.city)
  //         setPostal(data.postal)

  //         console.log(ipAddress);
  //         console.log(country);
  //         console.log(latitude);
  //         console.log(longitude);
  //         console.log(city);
  //         console.log(postal);
  //       })
  //       .catch(error => console.log(error))
  //   }
  //   fetchGeolocationData();
  // }, [])

  Axios.defaults.withCredentials = true;

  const loginEmployee = () => {
    Axios.post(BASE_URL + "/processlogin", {
      work_email: work_email,
      password: password,
      // ipAdress: ipAddress,
      // latitude: latitude,
      // longitude: longitude,
      // country: country,
      // city: city,
      // postal: postal,
    }).then((response) => {
      if (response.data.message) {
        console.log(response.data.message);
        setLoginStatus(response.data.message);
      } else if (response.data === "error") {
        notifyFailed();
      } else {
        // if (response.data.emp_role === 0) {
        //   navigate("/adminDashboard");
        //   console.log("The user is an admin.");
        // } else
        var now = new Date();
        if (now.getMonth() == 11) {
          var current = new Date(now.getFullYear() + 1, 0, 1);
        } else {
          var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        }
        setCookie("user", response.data, { path: "/", expires: current });
        if (response.data.emp_role === 1) {
          console.log("The user is an HR.");
          navigate("/hr/dashboard");
        } else if (response.data.emp_role === 2) {
          console.log("The user is an employee,");
          navigate("/regular/dashboard");
        } else if (response.data.emp_role === 3) {
          console.log("The user is a team lead,");
          navigate("/manager/dashboard");
        } else if (response.data.emp_role === 4) {
          console.log("The user is a payroll accountant,");
          navigate("/regular/dashboard");
        }
      }
      setNotif(response.data);
    });
  };

  useEffect(() => {
    Axios.get(BASE_URL + "/login")
      .then((response) => {
        if (response.data.loggedIn === true) {
          // if (response.data.user[0].emp_role === 0) {
          //   navigate("/adminDashboard");
          // } else
          if (response.data.user[0].emp_role === 2) {
            navigate("/regular/dashboard");
          } else if (response.data.user[0].emp_role === 3) {
            navigate("/manager/dashboard");
          } else if (response.data.user[0].emp_role === 1) {
            navigate("/hr/dashboard");
          } else if (response.data.user[0].emp_role === 4) {
            navigate("/payrollaccountant/dashboard");
          } else if (response.data == "error") {
            console.log(response.data);
          } else {
            console.log("The user is not authorized to log in to the system!");
          }
          console.log(response.data.user[0].work_email + " is logged in.");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/serverDown");
      });
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      loginEmployee();
    }
  };

  const notifyFailed = () =>
    toast.error("Incorrect username/password!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  function setVisibility() {
    visible === false ? setVisible(true) : setVisible(false);
  }

  // return (
  //   <>
  //     {notif != "" && notif === "error" && <ToastContainer />}

  //     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
  //       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
  //         <img
  //           className="mx-auto h-20 w-auto"
  //           src="../Fs-logo.png"
  //           alt="FullSuite Logo"
  //         />
  //         <h2 className="mt-0 mb-3 font-sans text-center text-l leading-9 tracking-tight text-gray-900">
  //           FullSuite
  //         </h2>
  //         <h2 className="mt-0 font-mono text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
  //           HRI System
  //         </h2>
  //       </div>

  //       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  //         <div>
  //           <label
  //             htmlFor="email"
  //             className="block right text-sm font-medium leading-6 text-gray-900"
  //           >
  //             Email Address
  //           </label>
  //           <div className="mt-2">
  //             <input
  //               id="email"
  //               name="email"
  //               type="email"
  //               autoComplete="email"
  //               onChange={(e) => {
  //                 setEmail(e.target.value);
  //               }}
  //               onKeyDown={handleKeyPress}
  //               required
  //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0097B2] sm:text-sm sm:leading-6 p-2"
  //             />
  //           </div>
  //         </div>

  //         <div>
  //           <div className="flex items-center justify-between">
  //             <label
  //               htmlFor="password"
  //               className="block text-sm font-medium leading-6 text-gray-900"
  //             >
  //               Password
  //             </label>
  //           </div>
  //           <div className="mt-2">
  //             <input
  //               id="password"
  //               name="password"
  //               type={"text"}
  //               autoComplete="current-password"
  //               onChange={(e) => {
  //                 setPassword(e.target.value);
  //               }}
  //               onKeyDown={handleKeyPress}
  //               required
  //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0097B2] sm:text-sm sm:leading-6 p-2"
  //             />
  //             <div className="flex items-center mt-4 mb-4">
  //               <input
  //                 className="checkbox checkbox-sm mr-2"
  //                 id="check"
  //                 type="checkbox"
  //               />
  //               <label className="text-sm" for="check">
  //                 Show Password
  //               </label>
  //             </div>
  //           </div>
  //           <a
  //             href="/forgot-password"
  //             className="text-sm text-blue-800 hover:underline"
  //           >
  //             Forgot password?
  //           </a>
  //         </div>

  //         <div>
  //           <button
  //             type="submit"
  //             onClick={loginEmployee}
  //             onKeyDown={handleKeyPress}
  //             className="mt-4 flex w-full justify-center rounded-md bg-[#0097B2] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#4A6E7E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  //           >
  //             Log in
  //           </button>
  //         </div>

  //         <h1>{loginStatus}</h1>
  //       </div>
  //     </div>
  //   </>
  // );

  // return (
  //   <>
  //     {notif != "" && notif === "error" && <ToastContainer />}
  //     <div className="flex flex-row justify-center">
  //       <div className="flex-1 bg-login-bg bg-no-repeat bg-cover bg-center relative sm:md:hidden lg:inline-block">
  //         <div className="absolute h-screen w-full bg-gradient-to-r from-[#ffffff00] to-[#007184]"></div>
  //         <span className="p-2 bottom-0 absolute text-[10px] text-slate-200">
  //           <a href="https://www.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_40871274.htm#query=office&position=0&from_view=search&track=sph&uuid=069dd47e-247d-4a92-9a8e-468f946c5d4a">
  //             Image by atlascompany
  //           </a>{" "}
  //           on Freepik
  //         </span>
  //       </div>

  //       <div className="flex flex-col gap-8 justify-center items-center h-screen bg-[#007184] w-full md:w-full lg:w-2/5">
  //         <img
  //           src="../svgs/logo-full.svg"
  //           alt="FullSuite logo"
  //           className="h-20"
  //         />
  //         <div className="card bg-base-100 shadow-xl p-5 w-80">
  //           <h1 className="font-bold text-2xl text-center">Tseksuite Portal</h1>

  //           <div className="flex flex-col justify-center items-center gap-3 mt-7 mb-5">
  //             <input
  //               name="email"
  //               type="email"
  //               autoComplete="email"
  //               onChange={(e) => {
  //                 setEmail(e.target.value);
  //               }}
  //               onKeyDown={handleKeyPress}
  //               className="input input-bordered w-full border-gray-300 focus:outline-none"
  //               placeholder="Work Email"
  //             />

  //             <div className="flex flex-row justify-center items-center w-full gap-1 border-gray-300 border rounded-lg pr-1">
  //               <input
  //                 type={!visible ? "password" : "text"}
  //                 name="password"
  //                 id="password"
  //                 className="input input-bordered w-full border-transparent focus:outline-none"
  //                 placeholder="Password"
  //                 value={password}
  //                 autoComplete="current-password"
  //                 onChange={(e) => {
  //                   setPassword(e.target.value);
  //                 }}
  //                 onKeyDown={handleKeyPress}
  //               />

  //               <button
  //                 className="btn btn-circle btn-ghost btn-sm"
  //                 onClick={setVisibility}
  //               >
  //                 {!visible ? (
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     fill="none"
  //                     viewBox="0 0 24 24"
  //                     strokeWidth={1.5}
  //                     stroke="currentColor"
  //                     className="w-4 h-4"
  //                   >
  //                     <path
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
  //                     />
  //                     <path
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  //                     />
  //                   </svg>
  //                 ) : (
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     fill="none"
  //                     viewBox="0 0 24 24"
  //                     strokeWidth={1.5}
  //                     stroke="currentColor"
  //                     className="w-4 h-4"
  //                   >
  //                     <path
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
  //                     />
  //                   </svg>
  //                 )}
  //               </button>
  //             </div>
  //             <a
  //               href="/forgot-password"
  //               className="text-[12px] text-[#007184] font-bold text-left w-full"
  //             >
  //               Forgot password?
  //             </a>
  //           </div>

  //           <input
  //             type="submit"
  //             value="Login"
  //             className="btn normal-case bg-[#007184] text-[#FFFFFF] hover:bg-[#14383e]"
  //             onClick={loginEmployee}
  //             onKeyDown={handleKeyPress}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <>
      {notif != "" && notif === "error" && <ToastContainer />}
      <div className="h-screen w-full flex flex-row justify-between">
        <div className="flex-1 bg-white shadow-lg hidden justify-center items-center md:flex">
          <div className="m-16">
            <p className="text-left text-[24px] text-[#363636] font-bold font-['Montserrat']">
              Welcome to
            </p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              zoomAndPan="magnify"
              viewBox="0 0 1195.5 570"
              height="760"
              preserveAspectRatio="xMidYMid meet"
              version="1.0"
              className="h-44"
            >
              <defs>
                <filter
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                  id="2fa92fef17"
                >
                  <feColorMatrix
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                    color-interpolation-filters="sRGB"
                  />
                </filter>
                <g />
                <clipPath id="81c96e481d">
                  <path
                    d="M 0 0.121094 L 1195 0.121094 L 1195 569.878906 L 0 569.878906 Z M 0 0.121094 "
                    clip-rule="nonzero"
                  />
                </clipPath>
                <clipPath id="54253da24b">
                  <path
                    d="M 0 216.351562 L 268.523438 216.351562 L 268.523438 484.875 L 0 484.875 Z M 0 216.351562 "
                    clip-rule="nonzero"
                  />
                </clipPath>
                <clipPath id="af63edf709">
                  <path
                    d="M 134.261719 216.351562 C 60.109375 216.351562 0 276.460938 0 350.613281 C 0 424.765625 60.109375 484.875 134.261719 484.875 C 208.414062 484.875 268.523438 424.765625 268.523438 350.613281 C 268.523438 276.460938 208.414062 216.351562 134.261719 216.351562 Z M 134.261719 216.351562 "
                    clip-rule="nonzero"
                  />
                </clipPath>
                <clipPath id="86b40ba3e9">
                  <path
                    d="M 0 89.546875 L 268.523438 89.546875 L 268.523438 358.070312 L 0 358.070312 Z M 0 89.546875 "
                    clip-rule="nonzero"
                  />
                </clipPath>
                <clipPath id="14293aa449">
                  <path
                    d="M 134.261719 89.546875 C 60.109375 89.546875 0 149.660156 0 223.808594 C 0 297.960938 60.109375 358.070312 134.261719 358.070312 C 208.414062 358.070312 268.523438 297.960938 268.523438 223.808594 C 268.523438 149.660156 208.414062 89.546875 134.261719 89.546875 Z M 134.261719 89.546875 "
                    clip-rule="nonzero"
                  />
                </clipPath>
                <mask id="24823218ed">
                  <g filter="url(#2fa92fef17)">
                    <rect
                      x="-119.55"
                      width="1434.6"
                      fill="#000000"
                      y="-57"
                      height="684"
                      fill-opacity="0.5"
                    />
                  </g>
                </mask>
                <clipPath id="cf1bfe3428">
                  <path
                    d="M 0 0.351562 L 268.523438 0.351562 L 268.523438 268.875 L 0 268.875 Z M 0 0.351562 "
                    clip-rule="nonzero"
                  />
                </clipPath>
                <clipPath id="6cf4129d32">
                  <path
                    d="M 134.261719 0.351562 C 60.109375 0.351562 0 60.460938 0 134.613281 C 0 208.765625 60.109375 268.875 134.261719 268.875 C 208.414062 268.875 268.523438 208.765625 268.523438 134.613281 C 268.523438 60.460938 208.414062 0.351562 134.261719 0.351562 Z M 134.261719 0.351562 "
                    clip-rule="nonzero"
                  />
                </clipPath>
                <clipPath id="f07358e583">
                  <rect x="0" width="269" y="0" height="269" />
                </clipPath>
              </defs>
              <g clip-path="url(#81c96e481d)">
                <path
                  fill="#ffffff"
                  d="M 0 0.121094 L 1195 0.121094 L 1195 569.878906 L 0 569.878906 Z M 0 0.121094 "
                  fill-opacity="1"
                  fill-rule="nonzero"
                />
              </g>
              <g clip-path="url(#54253da24b)">
                <g clip-path="url(#af63edf709)">
                  <path
                    fill="#008080"
                    d="M 0 216.351562 L 268.523438 216.351562 L 268.523438 484.875 L 0 484.875 Z M 0 216.351562 "
                    fill-opacity="1"
                    fill-rule="nonzero"
                  />
                </g>
              </g>
              <g fill="#36454f" fill-opacity="1">
                <g transform="translate(265.808233, 398.114494)">
                  <g>
                    <path d="M 97.171875 -67.671875 L 73.125 -43.9375 L 73.125 0 L 23.09375 0 L 23.09375 -237.96875 L 73.125 -237.96875 L 73.125 -103.265625 L 146.234375 -172.53125 L 205.890625 -172.53125 L 134.046875 -99.421875 L 212.3125 0 L 151.6875 0 Z M 97.171875 -67.671875 " />
                  </g>
                </g>
              </g>
              <g fill="#36454f" fill-opacity="1">
                <g transform="translate(477.445241, 398.114494)">
                  <g>
                    <path d="M 70.875 -149.765625 C 76.863281 -158.109375 84.9375 -164.414062 95.09375 -168.6875 C 105.25 -172.96875 116.953125 -175.109375 130.203125 -175.109375 L 130.203125 -128.921875 C 124.640625 -129.347656 120.898438 -129.5625 118.984375 -129.5625 C 104.660156 -129.5625 93.4375 -125.550781 85.3125 -117.53125 C 77.1875 -109.519531 73.125 -97.492188 73.125 -81.453125 L 73.125 0 L 23.09375 0 L 23.09375 -172.53125 L 70.875 -172.53125 Z M 70.875 -149.765625 " />
                  </g>
                </g>
              </g>
              <g fill="#36454f" fill-opacity="1">
                <g transform="translate(615.650617, 398.114494)">
                  <g>
                    <path d="M 23.09375 -172.53125 L 73.125 -172.53125 L 73.125 0 L 23.09375 0 Z M 48.109375 -196.59375 C 38.910156 -196.59375 31.425781 -199.265625 25.65625 -204.609375 C 19.882812 -209.953125 17 -216.578125 17 -224.484375 C 17 -232.398438 19.882812 -239.03125 25.65625 -244.375 C 31.425781 -249.71875 38.910156 -252.390625 48.109375 -252.390625 C 57.296875 -252.390625 64.773438 -249.820312 70.546875 -244.6875 C 76.316406 -239.5625 79.203125 -233.148438 79.203125 -225.453125 C 79.203125 -217.117188 76.316406 -210.222656 70.546875 -204.765625 C 64.773438 -199.316406 57.296875 -196.59375 48.109375 -196.59375 Z M 48.109375 -196.59375 " />
                  </g>
                </g>
              </g>
              <g fill="#36454f" fill-opacity="1">
                <g transform="translate(712.169944, 398.114494)">
                  <g>
                    <path d="M 194.34375 -172.53125 L 116.421875 10.578125 C 108.503906 30.460938 98.71875 44.46875 87.0625 52.59375 C 75.414062 60.71875 61.359375 64.78125 44.890625 64.78125 C 35.910156 64.78125 27.035156 63.390625 18.265625 60.609375 C 9.503906 57.828125 2.347656 53.976562 -3.203125 49.0625 L 15.078125 13.46875 C 18.921875 16.882812 23.351562 19.554688 28.375 21.484375 C 33.40625 23.410156 38.378906 24.375 43.296875 24.375 C 50.140625 24.375 55.695312 22.71875 59.96875 19.40625 C 64.25 16.09375 68.097656 10.585938 71.515625 2.890625 L 72.15625 1.28125 L -2.5625 -172.53125 L 49.0625 -172.53125 L 97.5 -55.484375 L 146.234375 -172.53125 Z M 194.34375 -172.53125 " />
                  </g>
                </g>
              </g>
              <g fill="#36454f" fill-opacity="1">
                <g transform="translate(903.925912, 398.114494)">
                  <g>
                    <path d="M 92.6875 -175.109375 C 119.40625 -175.109375 139.925781 -168.742188 154.25 -156.015625 C 168.582031 -143.296875 175.75 -124.109375 175.75 -98.453125 L 175.75 0 L 128.921875 0 L 128.921875 -21.484375 C 119.515625 -5.453125 101.984375 2.5625 76.328125 2.5625 C 63.066406 2.5625 51.570312 0.316406 41.84375 -4.171875 C 32.125 -8.660156 24.695312 -14.859375 19.5625 -22.765625 C 14.425781 -30.679688 11.859375 -39.660156 11.859375 -49.703125 C 11.859375 -65.742188 17.898438 -78.359375 29.984375 -87.546875 C 42.066406 -96.742188 60.722656 -101.34375 85.953125 -101.34375 L 125.71875 -101.34375 C 125.71875 -112.25 122.398438 -120.640625 115.765625 -126.515625 C 109.140625 -132.398438 99.203125 -135.34375 85.953125 -135.34375 C 76.753906 -135.34375 67.71875 -133.894531 58.84375 -131 C 49.976562 -128.113281 42.441406 -124.210938 36.234375 -119.296875 L 18.28125 -154.265625 C 27.6875 -160.890625 38.960938 -166.019531 52.109375 -169.65625 C 65.265625 -173.289062 78.789062 -175.109375 92.6875 -175.109375 Z M 88.828125 -31.109375 C 97.378906 -31.109375 104.96875 -33.082031 111.59375 -37.03125 C 118.226562 -40.988281 122.9375 -46.816406 125.71875 -54.515625 L 125.71875 -72.15625 L 91.40625 -72.15625 C 70.875 -72.15625 60.609375 -65.421875 60.609375 -51.953125 C 60.609375 -45.535156 63.117188 -40.457031 68.140625 -36.71875 C 73.171875 -32.976562 80.066406 -31.109375 88.828125 -31.109375 Z M 88.828125 -31.109375 " />
                  </g>
                </g>
              </g>
              <g clip-path="url(#86b40ba3e9)">
                <g clip-path="url(#14293aa449)">
                  <path
                    fill="#cc5500"
                    d="M 0 89.546875 L 268.523438 89.546875 L 268.523438 358.070312 L 0 358.070312 Z M 0 89.546875 "
                    fill-opacity="1"
                    fill-rule="nonzero"
                  />
                </g>
              </g>
              <g mask="url(#24823218ed)">
                <g transform="matrix(1, 0, 0, 1, 0, 216)">
                  <g clip-path="url(#f07358e583)">
                    <g clip-path="url(#cf1bfe3428)">
                      <g clip-path="url(#6cf4129d32)">
                        <path
                          fill="#008080"
                          d="M 0 0.351562 L 268.523438 0.351562 L 268.523438 268.875 L 0 268.875 Z M 0 0.351562 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>

            <p className="text-[16px] text-[#363636] font-['Poppins']">
              Transforming analytics into actionable strategies to boost
              employee satisfaction, productivity, and organizational success.{" "}
              <Link className="text-[#cc5500] underline">Learn more</Link>.
            </p>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="w-[350px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              zoomAndPan="magnify"
              viewBox="0 0 1195.5 570"
              height="760"
              preserveAspectRatio="xMidYMid meet"
              version="1.0"
              className="h-16 md:hidden"
            >
              <defs>
                <filter
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                  id="2fa92fef17"
                >
                  <feColorMatrix
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                    color-interpolation-filters="sRGB"
                  />
                </filter>
                <g />
                <clipPath id="81c96e481d">
                  <path
                    d="M 0 0.121094 L 1195 0.121094 L 1195 569.878906 L 0 569.878906 Z M 0 0.121094 "
                    clip-rule="nonzero"
                  />
                </clipPath>
                <clipPath id="54253da24b">
                  <path
                    d="M 0 216.351562 L 268.523438 216.351562 L 268.523438 484.875 L 0 484.875 Z M 0 216.351562 "
                    clip-rule="nonzero"
                  />
                </clipPath>
                <clipPath id="af63edf709">
                  <path
                    d="M 134.261719 216.351562 C 60.109375 216.351562 0 276.460938 0 350.613281 C 0 424.765625 60.109375 484.875 134.261719 484.875 C 208.414062 484.875 268.523438 424.765625 268.523438 350.613281 C 268.523438 276.460938 208.414062 216.351562 134.261719 216.351562 Z M 134.261719 216.351562 "
                    clip-rule="nonzero"
                  />
                </clipPath>
                <clipPath id="86b40ba3e9">
                  <path
                    d="M 0 89.546875 L 268.523438 89.546875 L 268.523438 358.070312 L 0 358.070312 Z M 0 89.546875 "
                    clip-rule="nonzero"
                  />
                </clipPath>
                <clipPath id="14293aa449">
                  <path
                    d="M 134.261719 89.546875 C 60.109375 89.546875 0 149.660156 0 223.808594 C 0 297.960938 60.109375 358.070312 134.261719 358.070312 C 208.414062 358.070312 268.523438 297.960938 268.523438 223.808594 C 268.523438 149.660156 208.414062 89.546875 134.261719 89.546875 Z M 134.261719 89.546875 "
                    clip-rule="nonzero"
                  />
                </clipPath>
                <mask id="24823218ed">
                  <g filter="url(#2fa92fef17)">
                    <rect
                      x="-119.55"
                      width="1434.6"
                      fill="#000000"
                      y="-57"
                      height="684"
                      fill-opacity="0.5"
                    />
                  </g>
                </mask>
                <clipPath id="cf1bfe3428">
                  <path
                    d="M 0 0.351562 L 268.523438 0.351562 L 268.523438 268.875 L 0 268.875 Z M 0 0.351562 "
                    clip-rule="nonzero"
                  />
                </clipPath>
                <clipPath id="6cf4129d32">
                  <path
                    d="M 134.261719 0.351562 C 60.109375 0.351562 0 60.460938 0 134.613281 C 0 208.765625 60.109375 268.875 134.261719 268.875 C 208.414062 268.875 268.523438 208.765625 268.523438 134.613281 C 268.523438 60.460938 208.414062 0.351562 134.261719 0.351562 Z M 134.261719 0.351562 "
                    clip-rule="nonzero"
                  />
                </clipPath>
                <clipPath id="f07358e583">
                  <rect x="0" width="269" y="0" height="269" />
                </clipPath>
              </defs>
              <g clip-path="url(#81c96e481d)">
                <path
                  fill="#ffffff"
                  d="M 0 0.121094 L 1195 0.121094 L 1195 569.878906 L 0 569.878906 Z M 0 0.121094 "
                  fill-opacity="1"
                  fill-rule="nonzero"
                />
              </g>
              <g clip-path="url(#54253da24b)">
                <g clip-path="url(#af63edf709)">
                  <path
                    fill="#008080"
                    d="M 0 216.351562 L 268.523438 216.351562 L 268.523438 484.875 L 0 484.875 Z M 0 216.351562 "
                    fill-opacity="1"
                    fill-rule="nonzero"
                  />
                </g>
              </g>
              <g fill="#36454f" fill-opacity="1">
                <g transform="translate(265.808233, 398.114494)">
                  <g>
                    <path d="M 97.171875 -67.671875 L 73.125 -43.9375 L 73.125 0 L 23.09375 0 L 23.09375 -237.96875 L 73.125 -237.96875 L 73.125 -103.265625 L 146.234375 -172.53125 L 205.890625 -172.53125 L 134.046875 -99.421875 L 212.3125 0 L 151.6875 0 Z M 97.171875 -67.671875 " />
                  </g>
                </g>
              </g>
              <g fill="#36454f" fill-opacity="1">
                <g transform="translate(477.445241, 398.114494)">
                  <g>
                    <path d="M 70.875 -149.765625 C 76.863281 -158.109375 84.9375 -164.414062 95.09375 -168.6875 C 105.25 -172.96875 116.953125 -175.109375 130.203125 -175.109375 L 130.203125 -128.921875 C 124.640625 -129.347656 120.898438 -129.5625 118.984375 -129.5625 C 104.660156 -129.5625 93.4375 -125.550781 85.3125 -117.53125 C 77.1875 -109.519531 73.125 -97.492188 73.125 -81.453125 L 73.125 0 L 23.09375 0 L 23.09375 -172.53125 L 70.875 -172.53125 Z M 70.875 -149.765625 " />
                  </g>
                </g>
              </g>
              <g fill="#36454f" fill-opacity="1">
                <g transform="translate(615.650617, 398.114494)">
                  <g>
                    <path d="M 23.09375 -172.53125 L 73.125 -172.53125 L 73.125 0 L 23.09375 0 Z M 48.109375 -196.59375 C 38.910156 -196.59375 31.425781 -199.265625 25.65625 -204.609375 C 19.882812 -209.953125 17 -216.578125 17 -224.484375 C 17 -232.398438 19.882812 -239.03125 25.65625 -244.375 C 31.425781 -249.71875 38.910156 -252.390625 48.109375 -252.390625 C 57.296875 -252.390625 64.773438 -249.820312 70.546875 -244.6875 C 76.316406 -239.5625 79.203125 -233.148438 79.203125 -225.453125 C 79.203125 -217.117188 76.316406 -210.222656 70.546875 -204.765625 C 64.773438 -199.316406 57.296875 -196.59375 48.109375 -196.59375 Z M 48.109375 -196.59375 " />
                  </g>
                </g>
              </g>
              <g fill="#36454f" fill-opacity="1">
                <g transform="translate(712.169944, 398.114494)">
                  <g>
                    <path d="M 194.34375 -172.53125 L 116.421875 10.578125 C 108.503906 30.460938 98.71875 44.46875 87.0625 52.59375 C 75.414062 60.71875 61.359375 64.78125 44.890625 64.78125 C 35.910156 64.78125 27.035156 63.390625 18.265625 60.609375 C 9.503906 57.828125 2.347656 53.976562 -3.203125 49.0625 L 15.078125 13.46875 C 18.921875 16.882812 23.351562 19.554688 28.375 21.484375 C 33.40625 23.410156 38.378906 24.375 43.296875 24.375 C 50.140625 24.375 55.695312 22.71875 59.96875 19.40625 C 64.25 16.09375 68.097656 10.585938 71.515625 2.890625 L 72.15625 1.28125 L -2.5625 -172.53125 L 49.0625 -172.53125 L 97.5 -55.484375 L 146.234375 -172.53125 Z M 194.34375 -172.53125 " />
                  </g>
                </g>
              </g>
              <g fill="#36454f" fill-opacity="1">
                <g transform="translate(903.925912, 398.114494)">
                  <g>
                    <path d="M 92.6875 -175.109375 C 119.40625 -175.109375 139.925781 -168.742188 154.25 -156.015625 C 168.582031 -143.296875 175.75 -124.109375 175.75 -98.453125 L 175.75 0 L 128.921875 0 L 128.921875 -21.484375 C 119.515625 -5.453125 101.984375 2.5625 76.328125 2.5625 C 63.066406 2.5625 51.570312 0.316406 41.84375 -4.171875 C 32.125 -8.660156 24.695312 -14.859375 19.5625 -22.765625 C 14.425781 -30.679688 11.859375 -39.660156 11.859375 -49.703125 C 11.859375 -65.742188 17.898438 -78.359375 29.984375 -87.546875 C 42.066406 -96.742188 60.722656 -101.34375 85.953125 -101.34375 L 125.71875 -101.34375 C 125.71875 -112.25 122.398438 -120.640625 115.765625 -126.515625 C 109.140625 -132.398438 99.203125 -135.34375 85.953125 -135.34375 C 76.753906 -135.34375 67.71875 -133.894531 58.84375 -131 C 49.976562 -128.113281 42.441406 -124.210938 36.234375 -119.296875 L 18.28125 -154.265625 C 27.6875 -160.890625 38.960938 -166.019531 52.109375 -169.65625 C 65.265625 -173.289062 78.789062 -175.109375 92.6875 -175.109375 Z M 88.828125 -31.109375 C 97.378906 -31.109375 104.96875 -33.082031 111.59375 -37.03125 C 118.226562 -40.988281 122.9375 -46.816406 125.71875 -54.515625 L 125.71875 -72.15625 L 91.40625 -72.15625 C 70.875 -72.15625 60.609375 -65.421875 60.609375 -51.953125 C 60.609375 -45.535156 63.117188 -40.457031 68.140625 -36.71875 C 73.171875 -32.976562 80.066406 -31.109375 88.828125 -31.109375 Z M 88.828125 -31.109375 " />
                  </g>
                </g>
              </g>
              <g clip-path="url(#86b40ba3e9)">
                <g clip-path="url(#14293aa449)">
                  <path
                    fill="#cc5500"
                    d="M 0 89.546875 L 268.523438 89.546875 L 268.523438 358.070312 L 0 358.070312 Z M 0 89.546875 "
                    fill-opacity="1"
                    fill-rule="nonzero"
                  />
                </g>
              </g>
              <g mask="url(#24823218ed)">
                <g transform="matrix(1, 0, 0, 1, 0, 216)">
                  <g clip-path="url(#f07358e583)">
                    <g clip-path="url(#cf1bfe3428)">
                      <g clip-path="url(#6cf4129d32)">
                        <path
                          fill="#008080"
                          d="M 0 0.351562 L 268.523438 0.351562 L 268.523438 268.875 L 0 268.875 Z M 0 0.351562 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <h1 className="text-left text-[24px] text-[#363636] font-bold font-['Montserrat']">
              Login to kriya
            </h1>

            <div className="flex flex-col mt-10">
              <label className="text-[16px] text-[#363636] font-['Poppins']">Work email</label>
              <input
                type="email"
                className="transition outline-none bg-white font-['Poppins'] text-[14px] text-[#363636] border border-[#e4e4e4] focus:border-[#6f97b0] rounded-[8px] p-3"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onKeyDown={handleKeyPress}
              />
            </div>

            <div className="flex flex-col mt-5">
              <label className="text-[16px] text-[#363636] font-['Poppins']">Password</label>
              <input
                type="password"
                className="transition outline-none bg-white text-[14px] text-[#363636] border border-[#e4e4e4] focus:border-[#6f97b0] rounded-[8px] p-3"
                value={password}
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={handleKeyPress}
              />
            </div>

            <div className="flex flex-col">
              <button
                onClick={loginEmployee}
                onKeyDown={handleKeyPress}
                className="transition-all outline-none font-['Poppins'] p-3 bg-[#36454F] hover:bg-[#29333a] text-white text-[14px] rounded-[8px] mt-5"
              >
                Log in
              </button>

              <Link to={"/forgot-password"} className="text-[14px] text-[#36454F] mt-3 underline font-['Montserrat']">
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
