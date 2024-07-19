import { useRef, useState, useEffect } from "react";
import HeartbitsTransactionTiles from "./HeartbitsTransactionTiles";
import axios from "axios"

const HeartBitsTransactionHistory = () => {
  const transactionRef = useRef(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  const [myNotificationData, setMyNotificationData] = useState([]);
  const [myNotificationDataLimited, setMyNotificationDataLimited] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(0);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const my_notifications_limited_res = await axios.get(
          BASE_URL + "/cap-getDataForMyNotificationsLimited"
        );
        setMyNotificationDataLimited(my_notifications_limited_res.data);

        const my_notifications_res = await axios.get(
          BASE_URL + "/cap-getDataForMyNotifications"
        );
        setMyNotificationData(my_notifications_res.data);

        const user_res = await axios.get(BASE_URL + "/login")
        setLoggedInUser(user_res.data.user[0].emp_id)
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="bg-white border border-[#e4e4e4] rounded-[15px] p-5">
      <div className="flex flex-row justify-between items-center">
        <span className="text-[14px] text-[#606060] font-bold">
          My Transaction History
        </span>

        <button
          className="flex flex-row justify-center items-center outline-none"
          onClick={() => {
            transactionRef.current.showModal();
          }}
        >
          <span className="text-[12px] text-[#666a40] font-medium">
            See all
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-[#666A40]"
          >
            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-2 mt-3">
      {myNotificationDataLimited.map((n) => (
        (loggedInUser === n.cheerer_id) ?
        <HeartbitsTransactionTiles fName={n.c_f_name} sName={n.c_s_name} notifBody={"Sent " + n.hb_given + " heartbits to "} heartbits={n.hb_given} date={n.posted_at}/>
        : 
        <HeartbitsTransactionTiles fName={n.p_f_name} sName={n.p_s_name} notifBody={"Received " + n.hb_given + " heartbits from "} heartbits={n.hb_given} date={n.posted_at}/>
      ))}
      </div>

      <dialog
        ref={transactionRef}
        className="modal"
      >
        <div className="modal-box flex flex-col justify-between">
          <div className="flex flex-row justify-between items-center">
            <p className="text-[14px] font-bold text-[#363636]">My Transaction History</p>

            <button
              className="transition-all bg-[#f2f2f2] hover:bg-[#dddddd] rounded-full outline-none"
              onClick={() => {
                transactionRef.current.close();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 fill-[#b4b4b4]"
              >
                <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-2 overflow-auto justify-start flex-1 mt-10">
          {myNotificationData.map((n) => (
            (loggedInUser === n.cheerer_id) ?
            <HeartbitsTransactionTiles fName={n.c_f_name} sName={n.c_s_name} notifBody={"Sent " + n.hb_given + " heartbits to "} heartbits={n.hb_given} date={n.posted_at}/>
            : 
            <HeartbitsTransactionTiles fName={n.p_f_name} sName={n.p_s_name} notifBody={"Received " + n.hb_given + " heartbits from "} heartbits={n.hb_given} date={n.posted_at}/>
          ))}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default HeartBitsTransactionHistory;
