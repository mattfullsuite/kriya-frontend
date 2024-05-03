import { useState } from "react";
import moment from "moment/moment";

const PayRunNotifications = (props) => {
  const data = props.payRunData;
  const [notificationsData, setNotificationsData] = useState(data);
  const dateToday = moment();

  const daysDuration = (dateGiven) => {
    const dayNum = dateToday.diff(moment(dateGiven), "days");
    if (dayNum > 0) {
      if (dayNum > 1) {
        return dayNum + " days ago";
      }
      return dayNum + " day ago";
    }
    return "Today";
  };

  return (
    <>
      <div className="w-1/2 bg-white p-5 rounded-[15px]">
        <span>Payroll Notification</span>
        <div className="flex flex-col items-center">
          <hr className="w-full my-6" />
          {notificationsData.length > 0 &&
            notificationsData.map((item) => (
              <div className="p-4 w-full flex bg-[#F4F4F4] my-2.5 items-center rounded-lg ">
                <div className="w-12">
                  <img src={item.empPic} className="w-10 h-10 rounded-full" />
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-auto mt-[-20px]"
                  >
                    <path
                      d="M20 12V18C20 18.2652 19.8946 18.5196 19.7071 18.7071C19.5196 18.8946 19.2652 19 19 19C18.7348 19 18.4804 18.8946 18.2929 18.7071C18.1054 18.5196 18 18.2652 18 18V4C18 3.73478 17.8946 3.48043 17.7071 3.29289C17.5196 3.10536 17.2652 3 17 3H3C2.73478 3 2.48043 3.10536 2.29289 3.29289C2.10536 3.48043 2 3.73478 2 4V18C2 19.654 3.346 21 5 21H19C20.654 21 22 19.654 22 18V12H20ZM14 11V13H6V11H14ZM6 9V7H14V9H6ZM14 15V17H11V15H14Z"
                      fill="#666A40"
                    />
                  </svg>
                </div>
                <div className="w-full flex pl-2">
                  <div>
                    {item.action === "Pay Dispute" ? (
                      <span>{item.action} Raised</span>
                    ) : (
                      <span>A {item.action} has been executed</span>
                    )}
                    {item.reason.length > 0 && <span> : {item.reason}</span>}
                    <br />
                    <span>{item.empName}</span>
                  </div>
                  <div className="ml-auto">{daysDuration(item.date)}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default PayRunNotifications;
