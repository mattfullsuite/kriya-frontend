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
  const [visible, setVisible] = useState(false);

  const [loginStatus, setLoginStatus] = useState("");

  const [ipAddress, setIPAddress] = useState('')
  const [country, setCountry] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [city, setCity] = useState('')
  const [postal, setPostal] = useState('')

  useEffect(() => {
    const fetchGeolocationData = async ()=> {
      await fetch('https://geolocation-db.com/json/')
        .then(response => response.json())
        .then(data => {
          setIPAddress(data.IPv4)
          setCountry(data.country_name)
          setLatitude(data.latitude)
          setLongitude(data.longitude)
          setCity(data.city)
          setPostal(data.postal)

          console.log(ipAddress);
          console.log(country);
          console.log(latitude);
          console.log(longitude);
          console.log(city);
          console.log(postal);
        })
        .catch(error => console.log(error))
    }
    fetchGeolocationData();
  }, [])

  Axios.defaults.withCredentials = true;

  const loginEmployee = () => {

    Axios.post(BASE_URL + "/processlogin", {
      work_email: work_email,
      password: password,
      ipAdress: ipAddress,
      latitude: latitude,
      longitude: longitude,
      country: country,
      city: city,
      postal: postal,
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
        if (response.data.emp_role === 1) {
          console.log("The user is an HR.");
          navigate("/hr/dashboard");
        } else if (response.data.emp_role === 2) {
          console.log("The user is an employee,");
          navigate("/regular/dashboard");
        } else if (response.data.emp_role === 3) {
          console.log("The user is a team lead,");
          navigate("/manager/dashboard");
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
      theme: "colored",
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
  //               type={showPassword ? "text" : "password"}
  //               value={password}
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
  //                 value={showPassword}
  //                 onChange={() => setShowPassword((prev) => !prev)}
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

  return (
    <>
      {notif != "" && notif === "error" && <ToastContainer />}
      <div className="flex flex-row justify-center">
        <div className="flex-1 bg-login-bg bg-no-repeat bg-cover bg-center relative sm:md:hidden lg:inline-block">
          <div className="absolute h-screen w-full bg-gradient-to-r from-[#ffffff00] to-[#007184]"></div>
            <span className="p-2 bottom-0 absolute text-[10px] text-slate-200"><a href="https://www.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_40871274.htm#query=office&position=0&from_view=search&track=sph&uuid=069dd47e-247d-4a92-9a8e-468f946c5d4a">Image by atlascompany</a> on Freepik</span>
        </div>

        <div className="flex flex-col gap-8 justify-center items-center h-screen bg-[#007184] w-full md:w-full lg:w-2/5">
          <img src="../svgs/logo-full.svg" alt="FullSuite logo" className="h-20" />
          <div className="card bg-base-100 shadow-xl p-5 w-80">
            <h1 className="font-bold text-2xl text-center">Tseksuite Portal</h1>

            <div className="flex flex-col justify-center items-center gap-3 mt-7 mb-5">
              <input
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onKeyDown={handleKeyPress}
                className="input input-bordered w-full border-gray-300 focus:outline-none"
                placeholder="Work Email"
              />

              <div className="flex flex-row justify-center items-center w-full gap-1 border-gray-300 border rounded-lg pr-1">
                <input
                  type={!visible ? "password" : "text"}
                  name="password"
                  id="password"
                  className="input input-bordered w-full border-transparent focus:outline-none"
                  placeholder="Password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyDown={handleKeyPress}
                />

                <button
                  className="btn btn-circle btn-ghost btn-sm"
                  onClick={setVisibility}
                >
                  {!visible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <a
                href="/forgot-password"
                className="text-[12px] text-[#007184] font-bold text-left w-full"
              >
                Forgot password?
              </a>
            </div>

            <input
              type="submit"
              value="Login"
              className="btn normal-case bg-[#007184] text-[#FFFFFF] hover:bg-[#14383e]"
              onClick={loginEmployee}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
