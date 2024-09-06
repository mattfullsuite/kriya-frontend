import { useState, useContext, useEffect } from "react";
import { TicketsContext } from "../../Tickets";
import axios from "axios";
import MessagesLoader from "../../../../universal/my-pulse/components/suggestion-box/MessagesLoader";
import moment from "moment";
import { NavLink } from "react-router-dom";
import SocketService from "../../../../../assets/SocketService";
import { useCookies } from "react-cookie";

const ListTile = ({ subject, content, date, unread, bgColor, type, messageID }) => {
  return (
    <NavLink
      to={`/hr/hr-management/tickets/employee-initiated/${messageID}`}
      className={({isActive}) => {
        return isActive
          ? `bg-[#90946f22] p-3 rounded-[8px] relative`
          : `bg-transparent p-3 rounded-[8px] relative`;
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

const EmployeeInitiated = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const socket = SocketService.getSocket();
  const [cookie, setCookie] = useCookies(["user"]);

  //   useStates
  const [isLoading, setIsLoading] = useState(true);
  const [employeeInitiated, setEmployeeInitiated] = useState([]);
  //   end of useStates

  const ticketsTheme = useContext(TicketsContext);

  useEffect(() => {
    axios
      .get(BASE_URL + "/sb-get-employee-initiated")
      .then((response) => {
        setIsLoading(false);
        setEmployeeInitiated(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    socket.emit("joinRoom", "newSuggestionBoxAll");
    socket.emit("joinRoom", `newSuggestionBox-${cookie.user.emp_id}`);

    return () => {
      socket.emit("leaveRoom", "newSuggestionBoxAll");
      socket.emit("leaveRoom", `newSuggestionBox-${cookie.user.emp_id}`);
    };
  }, []);

  useEffect(() => {
    socket.on("receiveNewAll", (data) => {
      setEmployeeInitiated((previousData) => [data, ...previousData]);
    });

    socket.on("receiveNewOnlyMe", (data) => {
      setEmployeeInitiated((previousData) => [data, ...previousData]);
    })
  }, [socket]);

  return (
    <div className="flex-1 flex flex-col justify-start gap-2 overflow-y-auto p-3 mt-5">
      {isLoading ? (
        <MessagesLoader />
      ) : (
        <>
          {employeeInitiated.length == 0 ? (
            <p className="text-center mt-20 text-[14px] text-[#363636] select-none">
              No messages found.
            </p>
          ) : (
            employeeInitiated.map((ticket) => (
              <ListTile
                bgColor={ticketsTheme.bgColor}
                subject={ticket.sb_subject}
                content={ticket.sb_content}
                type={ticket.sb_type}
                date={ticket.sb_date}
                messageID={ticket.sb_id}
                unread={false}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeInitiated;
