import React, { useState, useEffect } from "react";
import Axios from "axios";

import ClientSideBar from "../../components/client/ClientSideBar";
import DashBremainingPTO from "../../components/universal/DashBRemainingPTO";
import DashBButtons from "../../components/universal/DashBButtons";
import DashBBirthdays from "../../components/universal/DashBBirthdays";
import DashBAnniversaries from "../../components/universal/DashBAnniversaries";
import DashBGreeting from "../../components/universal/DashBGreeting";
import DashBPTOApprovedAndOwned from "../../components/universal/DashBPTOApprovedAndOwned";

// import DataTable from 'datatables.net-dt';
// import 'datatables.net-responsive-dt';

// let table = new DataTable('#myTable', {
//     responsive: true
// });

// const handleFormSubmit = () => {x
//   // Date From
//   const dateFrom = document.getElementById("dateFrom").value;

//   // Date To
//   const dateTo = document.getElementById("dateTo").value;

//   // Check if Date To is not earlier than Date From
//   if (new Date(dateTo) < new Date(dateFrom)) {
//     alert("Date To cannot be earlier than Date From");
//     return;
//   }

//   // Display a confirmation prompt
//   const isConfirmed = window.confirm("Are you sure you want to submit the form?");

//   // If the user confirms, submit the form
//   if (isConfirmed) {
//     document.getElementById("leaveForm").submit();
//   }
// };

const ClientDashboard = () => {
  /**const navigate = useNavigate()

   useEffect(() => {
      Axios.get("http://localhost:6197/login").then((response) => {
         if (response.data.loggedIn == false) {
            navigate("/login")
         }
      })
   }, [])**/

  const [users, setUser] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [pleaves, setPendingLeaves] = useState([]);
  const uid = users.emp_id;
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  useEffect(() => {
    const fetchAllPendingLeaves = async () => {
      try {
        const res = await Axios.get(BASE_URL + "/showpendingleaves");
        setPendingLeaves(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPendingLeaves();
  }, []);

  useEffect(() => {
    const fetchAllAnnouncements = async () => {
      try {
        const res = await Axios.get(BASE_URL + "/announcements");
        setAnnouncements(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllAnnouncements();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await Axios.get(BASE_URL + "/login");
        setUser(res.data.user[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <ClientSideBar></ClientSideBar>

      <div className="p-4 sm:ml-64 flex flex-col">
        <DashBGreeting></DashBGreeting>

        <div className="m-4 flex flex-col xl:flex-row">
          <div className="grow">
            <div className="flex flex-col md:flex-row">
              <div>
                <DashBButtons />
              </div>

              <div>
                <DashBremainingPTO />
              </div>
            </div>

            <div className="mt-4">
              <DashBPTOApprovedAndOwned uid={uid} />
            </div>
          </div>

          <div className="divider divider-horizontal divide-x"></div>

          <div className="flex flex-col justify-start lg:flex-row xl:block">
            <DashBBirthdays />
            <DashBAnniversaries />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientDashboard;
