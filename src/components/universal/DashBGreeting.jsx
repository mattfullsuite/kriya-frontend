import React, {useState, useEffect} from "react";
import Axios from 'axios';
import moment from 'moment';

const DashBGreeting = () => {
  const [users, setUser] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await Axios.get(BASE_URL + "/login");
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, []);

  function generateGreetings(){

    var currentHour = moment().format("HH");
  
    if (currentHour >= 3 && currentHour < 12){
        return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 15){
        return "Good Afternoon";
    } else if (currentHour >= 15 && currentHour < 20){
        return "Good Evening";
    } else if (currentHour >= 20 || currentHour < 3){
        return "Good Evening";
    } else {
        return "Hello"
    }
  
  }


    return(
        <>
        {/* Date */}
        <div className="mb-1 text-xl">
          <p>{moment().format("dddd") + ", " + moment().format("MMMM DD, YYYY")}</p>
        </div>

        {/* Greeting */}
        { users.map((user) => (
        <div className="m-2 text-3xl font-bold">
          <p> {generateGreetings()} {user.f_name}!</p>
        </div>
        ))}
        </>
    )
}

export default DashBGreeting;