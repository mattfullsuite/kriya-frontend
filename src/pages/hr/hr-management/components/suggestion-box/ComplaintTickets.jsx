import { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { NavLink } from "react-router-dom";
import MessagesLoader from "../../../../universal/my-pulse/components/suggestion-box/MessagesLoader";
import { TicketsContext } from "../../Tickets";

const ListTile = ({ subject, content, date, unread, bgColor, messageID }) => {
  return (
    <NavLink
      to={`/hr/hr-management/tickets/complaint/${messageID}`}
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

const ComplaintTickets = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //   useStates
  const [isLoading, setIsLoading] = useState(true);
  const [complaintTickets, setComplaintTickets] = useState([]);
  //   end of useStates

  // useContext
  const ticketsTheme = useContext(TicketsContext);
  // end of useContext

  useEffect(() => {
    axios
      .get(BASE_URL + "/sb-get-complaint-tickets")
      .then((response) => {
        setComplaintTickets(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-start gap-2 overflow-y-auto p-3 mt-5">
      {isLoading ? (
        <MessagesLoader />
      ) : (
        <>
          {complaintTickets.length == 0 ? (
            <p className="text-center mt-20 text-[14px] text-[#363636] select-none">
              No messages found.
            </p>
          ) : (
            complaintTickets.map((ticket) => (
              <ListTile
                bgColor={ticketsTheme.bgColor}
                subject={
                  ticket.complainant_fname + " " + ticket.complainant_sname
                }
                content={ticket.complaint_content}
                date={ticket.complaint_date}
                messageID={ticket.complaint_id}
                unread={false}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default ComplaintTickets;
