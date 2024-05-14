import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { user_key } = useParams();
  const [user, setUser] = useState([]);
  const [notif, setNotif] = useState([]);
  const [visible, setVisible] = useState(false);
  const [passwordInfo, setPassword] = useState({password: ""});

  const [length, setLength] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);

  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  function hasUpperCase(str) {
    for (var i = 0; i < str.length; i++) {
      if (str[i] !== str[i].toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  function hasLowerCase(str) {
    for (var i = 0; i < str.length; i++) {
      if (str[i] !== str[i].toUpperCase()) {
        return true;
      }
    }
    return false;
  }

  function hasNumber(str) {
    return /\d/.test(str);
  }

  function hasSpecialCharacters(str) {
    var specialCharactersRegex = /[!@#$%^&*()_+=\-:'.<>?[\]{}|]/;
    return specialCharactersRegex.test(str);
}

  const handleChange = (event) => {
    const password = event.target.value;

    setUpperCase(hasUpperCase(password));
    setLowerCase(hasLowerCase(password));
    setNumber(hasNumber(password));
    setSpecialChar(hasSpecialCharacters(password));
    password.length >= 8 ? setLength(true) : setLength(false);

    setPassword({...passwordInfo, password: event.target.value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    document.getElementById("btn_submit").disabled = true;
    document.getElementById("password_input").disabled = true;

    resetPassword();
  };

  const notifySuccess = () =>
    toast.success("Password successfully changed!", {
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
    toast.error("Something went wrong!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const resetPassword = async () => {
    axios
      .post(`${BASE_URL}/reset-password/${user_key}`, passwordInfo)
      .then(function (response) {
        if (response.data == "success") {
          notifySuccess();

          setTimeout(function () {
            navigate("/login");
          }, 4000);
        } else if (response.data == "error") {
          document.getElementById("btn_submit").disabled = false;
          document.getElementById("password_input").disabled = false;
          notifyFailed();
        }

        setNotif(response.data);
      })
      .catch((err) => {
        setNotif("error");
      });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/reset-password/${user_key}`);

        setUser(res.data.length);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUser();
  }, []);

  function handleVisibility() {
    !visible ? setVisible(true) : setVisible(false);
  }

  if (user === 1) {
    return (
      <>
        {notif != "" && notif === "success" && <ToastContainer />}
        {notif != "" && notif === "error" && <ToastContainer />}
        <div className="h-screen flex flex-col justify-center items-center gap-5">
          <h1 className="text-3xl font-semibold mb-2 text-center">
            Reset password
          </h1>

          <img
            className="h-44"
            src="../svgs/reset_password.svg"
            alt="Reset password"
          />

          <p className="text-sm text-center">
            Get back on track by resetting your password.
          </p>

          <form href="/forgot-password" method="POST" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mt-5">
              <div className="flex flex-row justify-center gap-3 mb-5">
                <input
                  className="input input-bordered w-72"
                  type={!visible ? "password" : "text"}
                  placeholder="New password"
                  name="password"
                  required
                  onChange={handleChange}
                  id="password_input"
                  autoComplete="false"
                />

                <button
                  type="button"
                  className="btn btn-circle"
                  onClick={handleVisibility}
                >
                  {visible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
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
                      className="w-6 h-6"
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

              <div className="flex flex-col justify-start items-start gap-2 mb-10">
                <div className="flex flex-row flex-nowrap gap-1 items-center justify-start">
                  {length === true ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 fill-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 fill-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}

                  <span
                    className={
                      length === true
                        ? "text-[12px] text-green-500"
                        : "text-[12px] text-red-500"
                    }
                  >
                    Passwords must be at least 8 characters in length
                  </span>
                </div>

                <div className="flex flex-row flex-nowrap gap-1 items-center justify-start">
                  {upperCase === true ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 fill-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 fill-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}

                  <span
                    className={
                      upperCase === true
                        ? "text-[12px] text-green-500"
                        : "text-[12px] text-red-500"
                    }
                  >
                    Includes uppercase letter
                  </span>
                </div>

                <div className="flex flex-row flex-nowrap gap-1 items-center justify-start">
                  {lowerCase === true ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 fill-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 fill-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}

                  <span
                    className={
                      lowerCase === true
                        ? "text-[12px] text-green-500"
                        : "text-[12px] text-red-500"
                    }
                  >
                    Includes lowercase letter
                  </span>
                </div>

                <div className="flex flex-row flex-nowrap gap-1 items-center justify-start">
                  {number === true ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 fill-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 fill-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}

                  <span
                    className={
                      number === true
                        ? "text-[12px] text-green-500"
                        : "text-[12px] text-red-500"
                    }
                  >
                    Includes number
                  </span>
                </div>

                <div className="flex flex-row flex-nowrap gap-1 items-center justify-start">
                  {specialChar === true ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 fill-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 fill-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}

                  <span
                    className={
                      specialChar === true
                        ? "text-[12px] text-green-500"
                        : "text-[12px] text-red-500"
                    }
                  >
                    {
                      "At least one special character(!@#$%^&*()_+=-:'.<>?[]{}|)"
                    }
                  </span>
                </div>
              </div>

              <button
                className="btn"
                type="submit"
                id="btn_submit"
                disabled={
                  (length === false ||
                    upperCase === false ||
                    lowerCase === false ||
                    number === false ||
                    specialChar === false) &&
                  true
                }
              >
                Change password
              </button>

              <a href="/login" className="btn btn-ghost">
                GO TO LOGIN
              </a>
            </div>
          </form>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="h-screen flex flex-col justify-center items-center gap-5">
          <h1 className="text-3xl font-semibold mb-2 text-center">
            Link is broken.
          </h1>

          <img
            className="h-44"
            src="../svgs/not_available.svg"
            alt="Broken link"
          />

          <p className="text-sm text-center">
            Digital Detour: This link got lost in cyberspace.
          </p>

          <a
            href="/login"
            className="btn btn-ace
             w-72"
          >
            GO TO LOGIN
          </a>
        </div>
      </>
    );
  }
};

export default ResetPassword;
