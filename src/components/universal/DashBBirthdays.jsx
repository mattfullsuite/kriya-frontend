import React, {useState, useEffect} from "react";
import Axios from 'axios';
import moment from "moment";

const DashBBirthdays = () => {

  const [upcomingBdays, setUpcomingBdays] = useState([])
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  useEffect(() => {
    const fetchAllBdays = async ()=> {
        try{
            const res = await Axios.get(BASE_URL + "/getupcomingbdays")
            setUpcomingBdays(res.data)
        } catch(err){
            console.log(err)
        }
    };
    fetchAllBdays();
}, []);

    return(
        <>
        {/* Birthdays Table */}
        <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-1 flex-col items-center justify-start">
              <h1 className="text-lg font-semibold">Birthdays</h1>
              <div className="overflow-x-auto max-w-full">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    { upcomingBdays.map((upcomingBday) => (
                    <tr>
                      <td>{upcomingBday.f_name + " " + upcomingBday.s_name}</td>
                      <td>{moment(upcomingBday.dob).format('MMM DD')}</td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
        </>
    )
}

export default DashBBirthdays;