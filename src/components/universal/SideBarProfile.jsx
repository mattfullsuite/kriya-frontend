import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SideBarProfile = ({ color, link_to, fill, hover }) => {
  const [profile, setProfile] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await Axios.get(BASE_URL + "/myProfile");
        setProfile(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, []);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const res = await Axios.get("http://localhost:6197/login");
  //       setUser(res.data.user);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  return (
    <>
    {profile.map((user) => (
      <div>
          <div className="flex justify-center mt-5  mb-5">
            {/* <img
              className="h-28- w-28 rounded-full ring-2 ring-white"
              src={user.emp_pic}
              alt=""
            /> */}

            {user.emp_pic == "" || user.emp_pic == null ? (
              <div className="h-28 w-28 bg-gray-500 rounded-full flex justify-center items-center text-5xl text-white font-medium m-2 ring-2 ring-white">
                {user.f_name.charAt(0) + user.s_name.charAt(0)}
              </div>
            ) : (
              <img
                className="h-28 w-28 rounded-full m-2 ring-2 ring-white object-cover"
                src={"../uploads/" + user.emp_pic}
              />
            )}

            {/* (row.emp_pic == "") ? <div className="h-28 w-28 bg-gray-500 rounded-full flex justify-center items-center text-4xl text-white font-medium m-2">{row.f_name.charAt(0) + row.s_name.charAt(0)}</div> : <img className="h-16 w-16 rounded-full m-2" 
        src={row.emp_pic} /> */}
          </div>
      
        <div className="flex flex-col items-center justify-center">
          
            <div className={`font-bold text-xl existing-class ${color}`}>
              {user.f_name + " " + user.s_name}
            </div>
          

          
            <div className={`mb-1 text-center ${color}`}>{user.position_name}</div>
          <div>
            <Link to={`${link_to}`}>
              <a className={`mb-12 flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:${hover} dark:hover:bg-gray-700 group`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={`${fill}`}
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className={`ml-3 ${color}`}>Profile</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      ))}
    </>
  );
};

export default SideBarProfile;
