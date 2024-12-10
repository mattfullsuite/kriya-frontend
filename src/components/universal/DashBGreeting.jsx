import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashBGreeting = () => {
  const [firstName, setFirstName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await Axios.get(BASE_URL + "/login");
        setFirstName(res.data.user[0].f_name);
        //response.data.user[0].emp_role
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, []);

  function generateGreetings() {
    var currentHour = moment().format("HH");

    if (currentHour >= 3 && currentHour < 12) {
      return "Good Morning,";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon,";
    } else if (currentHour >= 17 && currentHour < 20) {
      return "Good Evening,";
    } else if (currentHour >= 20 || currentHour < 3) {
      return "Good Evening,";
    } else {
      return "Hello,";
    }
  }

  return (
    <>
      {isLoading ? (
        <>
          {/* Date */}
          <div className="mb-1 text-xl">
            <p>
              <Skeleton height={20} width={230} />
            </p>
          </div>
          {/* Greeting */}

          <div className="m-2 text-3xl font-bold">
            <p>
              <Skeleton height={30} width={400} />
            </p>
          </div>
        </>
      ) : (
        <>
          {/* This is for the current date for today <div className="mb-1 text-xl">
            <p>
              {moment().format("dddd") +
                ", " +
                moment().format("MMMM DD, YYYY")}
            </p>
          </div> */}

          <div className=" text-3xl font-bold">
            <h1>
              {generateGreetings()} {firstName}!
            </h1>
          </div>
        </>
      )}
    </>
  );
};

export default DashBGreeting;
