import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const ListTile = ({ subject, content, date, unread, bgColor, messageID }) => {
  return (
    <NavLink
      to={`/hr/my-pulse/suggestion-box/request/${messageID}`}
      className={(isActive) => {
        return isActive
          ? `bg-[#90946f22] p-3 rounded-[8px] relative`
          : `bg-transparent p-3 rounded-[8px] relative`;
      }}
    >
      <div>
        <p className={`text-[14px] text-[#363636] ${unread && `font-medium`}`}>
          {subject}
        </p>
        <div className="flex flex-row justify-start items-center gap-2">
          <span
            className={`text-[12px] text-[  #363636] text-ellipsis line-clamp-1 max-w-[65%] leading-none ${
              unread ? `font-medium text-[#363636]` : `text-[#8b8b8b]`
            }`}
          >
            {content}
          </span>

          <span
            className={`font-bold leading-none ${
              unread ? `text-[#363636]` : `text-[#8b8b8b]`
            }`}
          >
            ·
          </span>

          <p
            className={`text-[12px] text-ellipsis flex-1 leading-none ${
              unread ? `font-medium text-[#363636]` : `text-[#8b8b8b]`
            }`}
          >
            {moment(date).fromNow()}
          </p>
        </div>
      </div>

      {unread && (
        <div
          className={`w-2 h-2 rounded-full ${bgColor} absolute right-3 top-[45%]`}
        />
      )}
    </NavLink>
  );
};

const SuggestionBox = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  accentColor,
  focusBorder,
}) => {
  const [messageTab, setMessageTab] = useState("request");
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [isLoading, setIsLoading] = useState(true);

  const [requestMessages, setRequestMessages] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL + "/sb-get-request").then((response) => {
      setRequestMessages(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-row justify-between">
      <div className="w-[350px] min-h-screen max-h-screen bg-white border-l border-r border-[#e4e4e4] flex flex-col justify-between">
        <div>
          <div className="flex flex-row justify-between items-center px-5 pt-5">
            <p className="text-[#363636] text-[20px] font-bold leading-none">
              Suggestion Box
            </p>

            <Link
              to={`${
                messageTab === `request`
                  ? `/hr/my-pulse/suggestion-box/send-request`
                  : `/hr/my-pulse/suggestion-box/send-complaint`
              }`}
              className={`transition-all ${bgColor} ${hoverColor} p-2 rounded-[8px] flex justify-center items-center`}
            >
              <svg
                viewBox="0 0 16 15"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white h-4 w-4 leading-none"
              >
                <path
                  d="M13.7146 0.286134H2.28599C1.49814 0.286134 0.857422 0.924705 0.857422 1.70899V10.2918C0.857422 11.0761 1.49814 11.7147 2.28599 11.7147H4.42885V14.5718L8.96528 11.7147H13.7146C14.5024 11.7147 15.1431 11.0761 15.1431 10.2918V1.70899C15.142 1.33098 14.9909 0.968869 14.7231 0.702113C14.4553 0.435357 14.0926 0.285753 13.7146 0.286134ZM11.5717 6.7147H8.71456V9.57185H7.28599V6.7147H4.42885V5.28613H7.28599V2.42899H8.71456V5.28613H11.5717V6.7147Z"
                  fill="white"
                />
              </svg>
            </Link>
          </div>

          <div className="flex flex-row justify-between mt-5 p-5 pb-0">
            <button
              className={`flex-1 outline-none relative`}
              onClick={() => {
                setMessageTab("request");
              }}
            >
              <p
                className={`${
                  messageTab === "request" ? textColor : `text-[#cbcbcb]`
                } text-center text-[15px] select-none`}
              >
                Request
              </p>

              {messageTab === "request" && (
                <div className={`${bgColor} w-full h-[2px] mt-2 absolute`} />
              )}
            </button>

            <button
              className="flex-1 outline-none relative"
              onClick={() => {
                setMessageTab("complaint");
              }}
            >
              <p
                className={`${
                  messageTab === "complaint" ? textColor : `text-[#cbcbcb]`
                } text-center text-[15px] select-none`}
              >
                Complaint
              </p>

              {messageTab === "complaint" && (
                <div className={`${bgColor} w-full h-[2px] mt-2 absolute`} />
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-start gap-2 overflow-y-auto p-3 mt-5">
          {isLoading ? (
            <div className="h-full animate-pulse flex flex-col justify-start gap-2">
              <div className="w-full h-[65px] rounded-[8px] bg-gray-100" />
              <div className="w-full h-[65px] rounded-[8px] bg-gray-100" />
              <div className="w-full h-[65px] rounded-[8px] bg-gray-100" />
              <div className="w-full h-[65px] rounded-[8px] bg-gray-100" />
              <div className="w-full h-[65px] rounded-[8px] bg-gray-100" />
              <div className="w-full h-[65px] rounded-[8px] bg-gray-100" />
              <div className="w-full h-[65px] rounded-[8px] bg-gray-100" />
              <div className="w-full h-[65px] rounded-[8px] bg-gray-100" />
              <div className="w-full h-[65px] rounded-[8px] bg-gray-100" />
              <div className="w-full h-[65px] rounded-[8px] bg-gray-100" />
            </div>
          ) : (
            <>
              {requestMessages.length == 0 ? <p className="text-center mt-20 text-[14px] text-[#363636] select-none">No messages found.</p> : requestMessages.map((message) => (
                <ListTile
                  bgColor={bgColor}
                  subject={message.request_subject}
                  content={message.request_content}
                  date={message.request_date}
                  messageID={message.request_id}
                  unread={false}
                />
              ))}
            </>
          )}
        </div>
      </div>

      <div className="min-h-screen max-h-screen flex-1 overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default SuggestionBox;
