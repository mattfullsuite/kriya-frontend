import { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import {
  BrowserRouter,
  MemoryRouter,
  NavLink,
  Route,
  Routes,
  useParams,
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
  latestChat,
  latestChatTime,
  role,
  setSuggestionBox,
}) => {
  return (
    <NavLink
      key={messageID}
      onClick={() => {
        setSuggestionBox((prev) => {
          const index = prev.findIndex((msg) => msg.sb_id === messageID);

          if (index !== -1) {
            const updatedMessages = [...prev];
            updatedMessages[index] = {
              ...updatedMessages[index],
              count_chat: 0,
            };

            return updatedMessages;
          }
        });
      }}
      to={`/${role}/my-pulse/employee-services-center/suggestion-box/${messageID}`}
      className={({ isActive }) => {
        return isActive
          ? `${activeList} p-3 rounded-[8px] relative`
          : `transition ease-in-out ${hoverList} p-3 rounded-[8px] relative`;
      }}
    >
      <div>
        <div className="flex justify-between items-center gap-5">
          <span
            className={`text-[14px] text-[#363636] ${
              unread != 0 && `font-medium`
            } flex-1 line-clamp-1 text-ellipsis`}
          >
            {subject}
          </span>

          <span
            className={`text-[10px] text-white ${bgColor} px-[3px] rounded-[3px] uppercase`}
          >
            {type}
          </span>
        </div>

        <div className="flex flex-row justify-start items-center gap-2">
          <span
            className={`text-[12px] text-[  #363636] text-ellipsis line-clamp-1 max-w-[40%] leading-none ${
              unread != 0 ? `font-medium text-[#363636]` : `text-[#8b8b8b]`
            }`}
          >
            {latestChat === null ? content : latestChat}
          </span>

          <span
            className={`font-bold leading-none ${
              unread != 0 ? `text-[#363636]` : `text-[#8b8b8b]`
            }`}
          >
            ·
          </span>

          <p
            className={`text-[12px] text-ellipsis flex-1 leading-none ${
              unread != 0 ? `font-medium text-[#363636]` : `text-[#8b8b8b]`
            }`}
          >
            {moment(latestChatTime === null ? date : latestChatTime).fromNow()}
          </p>
        </div>
      </div>

      {unread != 0 && (
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

  const { sbID } = useParams();

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
    socket.on("addNewSuggestion", (data) => {
      const temp = { ...data, count_chat: 0 };

      setSuggestionBox((prevMessage) => [temp, ...prevMessage]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("addSuggestionBoxCount", (data) => {
      setSuggestionBox((prev) => {
        const index = prev.findIndex((msg) => msg.sb_id === data.sb_id);

        if (sbID != data.sb_id) {
          const updatedMessage = {
            ...prev[index],
            count_chat: 1,
            latest_chat: data.latest_chat,
            latest_chat_time: data.latest_chat_time,
          };

          const updatedMessages = [
            updatedMessage,
            ...prev.slice(0, index),
            ...prev.slice(index + 1),
          ];

          return updatedMessages;
        } else {
          const updatedMessage = {
            ...prev[index],
            count_chat: 0,
            latest_chat: data.latest_chat,
            latest_chat_time: data.latest_chat_time,
          };

          const updatedMessages = [
            updatedMessage,
            ...prev.slice(0, index),
            ...prev.slice(index + 1),
          ];

          return updatedMessages;
        }
      });
    });
  }, [socket, sbID, suggestionBox]);

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
                  setSuggestionBox={setSuggestionBox}
                  type={message.sb_type}
                  latestChat={message.latest_chat}
                  latestChatTime={message.latest_chat_time}
                  role={role}
                  unread={message.count_chat}
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
