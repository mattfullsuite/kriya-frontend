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
  const [passwordInfo, setPassword] = useState({ password: "" });
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  const handleChange = (event) => {
    setPassword({ ...passwordInfo, [event.target.name]: [event.target.value] });

    console.log(JSON.stringify(passwordInfo));
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
                  type={(!visible) ? "password" : "text"}
                  placeholder="New password"
                  name="password"
                  required
                  onChange={handleChange}
                  id="password_input"
                  autoComplete="off"
                />

                <button type="button" className="btn btn-circle" onClick={handleVisibility}>
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

              <button className="btn" type="submit" id="btn_submit">
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