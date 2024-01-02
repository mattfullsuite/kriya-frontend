import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [emailInfo, setEmail] = useState({ email: "" });
  const [notif, setNotif] =  useState([])
  const BASE_URL = process.env.REACT_APP_BASE_URL; //


  const handleChange = (event) => {
    setEmail({ ...emailInfo, [event.target.name]: [event.target.value] });

    console.log(JSON.stringify(emailInfo));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    document.getElementById("email_input").disabled = true;
    document.getElementById("submit_btn").disabled = true;

    forgotPassword();
  };

  const notifySuccess = () => toast.success('Email link sent!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

  const notifyFailed = () => toast.error('Email is not associated with any account!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

  const forgotPassword = async () => {
    await axios
      .post(BASE_URL + "/forgot-password", emailInfo)
      .then(
        function (response) {
          if(response.data === "success") {
            document.getElementById("email_input").disabled = false;
            document.getElementById("submit_btn").innerText = document.getElementById("submit_btn").textContent = 'RESEND LINK';
            document.getElementById("submit_btn").disabled = false;
              notifySuccess();
          }

          else if(response.data === "error") {
              document.getElementById("email_input").disabled = false;
              document.getElementById("submit_btn").disabled = false;
              notifyFailed();
          }

          setNotif(response.data)

      }
      )
      .catch((err) => console.log(err));
  };

  return (
    <>
      {notif != "" && notif === "success" && <ToastContainer />}
      {notif != "" && notif === "error" && <ToastContainer />}
      <div className="h-screen flex flex-col justify-center items-center gap-5">
        <h1 className="text-3xl font-semibold mb-2 text-center">
          Forgot password?
        </h1>

        <img className="h-44" src="./svgs/forgot_password.svg" />

        <p className="text-sm text-center">
          When memory fails, we've got your back. <br /> Reset your password and
          reclaim your account!{" "}
        </p>

        <form href="/forgot-password" method="POST" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mt-5">
            <input
              className="input input-bordered w-72"
              type="email"
              placeholder="example@email.com"
              name="email"
              required
              onChange={handleChange}
              id="email_input"
            />

            <button className="btn" type="submit" id="submit_btn">
              Send Link
            </button>

            <a href="/login" className="btn btn-ghost">
              BACK TO LOGIN
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
