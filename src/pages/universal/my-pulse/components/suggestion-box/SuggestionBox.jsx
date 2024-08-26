import { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { NavLink } from "react-router-dom";
import MessagesLoader from "./MessagesLoader";
import { EmployeeServicesCenterContext } from "../../EmployeeServicesCenter";
import SocketService from "../../../../../assets/SocketService";
import { useCookies } from "react-cookie";

const ListTile = ({
  subject,
  content,
  date,
  unread,
  bgColor,
  messageID,
  type,
}) => {
  return (
    <NavLink
      to={`/hr/my-pulse/employee-services-center/suggestion-box/${messageID}`}
      className={(isActive) => {
        return isActive
          ? `bg-slate-200 p-3 rounded-[8px] relative`
          : `bg-transparent p-3 rounded-[8px] relative`;
      }}
    >
      <div>
        <div className="flex justify-between items-center gap-5">
          <span
            className={`text-[14px] text-[#363636] ${unread && `font-medium`}`}
          >
            {subject}
          </span>

          <span className="text-[10px] text-[#8b8b8b] bg-[#f7f7f7] px-[3px] rounded-[3px] uppercase">{type}</span>
        </div>

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
          className={`w-2 h-2 rounded-full ${bgColor} absolute right-3 top-[60%]`}
        />
      )}
    </NavLink>
  );
};

const SuggestionBox = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [cookies, setCookie] = useCookies(["user"]);
  const socket = SocketService.getSocket();

  //   useStates
  const [isLoading, setIsLoading] = useState(true);
  const [suggestionBox, setSuggestionBox] = useState([]);
  //   end of useStates

  //   useContext
  const sbTheme = useContext(EmployeeServicesCenterContext);
  // end of useContext

  // fetching complaint messages
  useEffect(() => {
    axios
      .get(BASE_URL + "/sb-get-suggestion-box")
      .then((response) => {
        setSuggestionBox(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    socket.emit("joinRoom", `suggestionBox-${cookies.user.emp_id}`);

    return () => {
      socket.emit("leaveRoom", `suggestionBox-${cookies.user.emp_id}`);
    }
  }, []);

  useEffect(() => {
    socket.on("addNewSuggestion", (data) => {
      setSuggestionBox((prevMessage) => [data, ...prevMessage]);
    })
  }, [socket]);



  return (
    <div className="flex-1 flex flex-col justify-start gap-2 overflow-y-auto p-3 mt-5">
      {isLoading ? (
        <MessagesLoader />
      ) : (
        <>
          {suggestionBox.length == 0 ? (
            <p className="text-center mt-20 text-[14px] text-[#363636] select-none">
              No messages found.
            </p>
          ) : (
            suggestionBox.map((message) => (
              <ListTile
                bgColor={sbTheme.bgColor}
                subject={message.sb_subject}
                content={message.sb_content}
                date={message.sb_date}
                messageID={message.sb_id}
                type={message.sb_type}
                unread={false}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default SuggestionBox;
