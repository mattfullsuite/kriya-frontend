import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

  const navigate = useNavigate()
  const { user_key } = useParams();
  const [user, setUser] = useState([]);
  const [notif, setNotif] =  useState([])
  const[passwordInfo, setPassword] = useState({password: ""});
  const BASE_URL = process.env.REACT_APP_BASE_URL; //


  const handleChange = (event) => {
    setPassword({ ...passwordInfo, [event.target.name]: [event.target.value] });

    console.log(JSON.stringify(passwordInfo))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    document.getElementById("btn_submit").disabled = true;
    document.getElementById("password_input").disabled = true;

    resetPassword()
  }

  const notifySuccess = () => toast.success('Password successfully changed!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

  const notifyFailed = () => toast.error('Something went wrong!', {
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
    axios.post(`${BASE_URL}/reset-password/${user_key}`, passwordInfo)
    .then(
        function (response) {
            if(response.data == "success") {
                notifySuccess();

                setTimeout(function () {
                    navigate("/login")
                  }, 4000);

            }

            else if(response.data == "error") {
                document.getElementById("btn_submit").disabled = false;
                document.getElementById("password_input").disabled = false;
                notifyFailed();
            }

            setNotif(response.data)

        }
    )
    .catch((err) => {
      setNotif("error")
    });
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/reset-password/${user_key}`
        );

        setUser(res.data.length);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUser();
  }, []);

  if (user === 1) {
    return (
      <>
        {notif != "" && notif === "success" && <ToastContainer />}
        {notif != "" && notif === "error" && <ToastContainer />}
        <div className="h-screen flex flex-col justify-center items-center gap-5">
          <h1 className="text-3xl font-semibold mb-2 text-center">
            Reset password
          </h1>

          <img className="h-44" src="../svgs/reset_password.svg" alt="Reset password" />

          <p className="text-sm text-center">
            Get back on track by resetting your password.
          </p>

          <form href="/forgot-password" method="POST" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mt-5">
              <input
                className="input input-bordered w-72"
                type="password"
                placeholder="New password"
                name="password"
                required
                onChange={handleChange}
                id="password_input"
              />

              <button className="btn" type="submit" id = "btn_submit">
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
            Link is broken
          </h1>

          <img className="h-44" src="../svgs/not_available.svg" alt="Broken link" />

          <p className="text-sm text-center">
            Digital Detour: This link got lost in cyberspace. 
          </p>


            <a href="/login" className="btn btn-ace
             w-72">
            GO TO LOGIN
            </a>

        </div>
      </>
    );
  }
};

export default ResetPassword;
