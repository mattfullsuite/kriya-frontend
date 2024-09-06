import { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import {
  BrowserRouter,
  MemoryRouter,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
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
  hoverList,
  activeList,
  role,
}) => {
  return (
    <NavLink
      to={`/${role}/my-pulse/employee-services-center/suggestion-box/${messageID}`}
      className={({isActive}) => {
        return isActive
          ? `${activeList} p-3 rounded-[8px] relative`
          : `transition ease-in-out ${hoverList} p-3 rounded-[8px] relative`;
      }}
    >
      <div>
        <div className="flex justify-between items-center gap-5">
          <span
            className={`text-[14px] text-[#363636] ${unread && `font-medium`} flex-1 line-clamp-1 text-ellipsis`}
          >
            {subject}
          </span>

          <span className={`text-[10px] text-white ${bgColor} px-[3px] rounded-[3px] uppercase`}>
            {type}
          </span>
        </div>

        <div className="flex flex-row justify-start items-center gap-2">
          <span
            className={`text-[12px] text-[  #363636] text-ellipsis line-clamp-1 max-w-[40%] leading-none ${
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
  const [cookies] = useCookies(["user"]);
  const socket = SocketService.getSocket();
  const role =
  cookies.user.emp_role === 1
    ? `hr`
    : cookies.user.emp_role === 2
    ? `regular`
    : cookies.user.emp_role === 3
    ? `manager`
    : null;

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
    };
  }, []);

  useEffect(() => {
    socket.on("addNewSuggestion", (data) => {
      setSuggestionBox((prevMessage) => [data, ...prevMessage]);
    });
  }, [socket]);

  return (
    <div className="flex-1 flex flex-col justify-start gap-1 overflow-y-auto p-3 mt-5">
      {isLoading ? (
        <MessagesLoader />
      ) : (
        <>
          {suggestionBox.length == 0 ? (
            <p className="text-center mt-20 text-[14px] text-[#363636] select-none">
              No messages found.
            </p>
          ) : (
            <>
              {suggestionBox.map((message) => (
                <ListTile
                  bgColor={sbTheme.bgColor}
                  hoverList={sbTheme.hoverList}
                  activeList={sbTheme.activeList}
                  subject={message.sb_subject}
                  content={message.sb_content}
                  date={message.sb_date}
                  messageID={message.sb_id}
                  type={message.sb_type}
                  role={role}
                  unread={false}
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SuggestionBox;
