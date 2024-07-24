import { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { NavLink } from "react-router-dom";
import MessagesLoader from "./MessagesLoader";
import { SuggestionBoxContext } from "../../SuggestionBox";

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

const RequestMessages = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //   useStates
  const [isLoading, setIsLoading] = useState(true);
  const [requestMessages, setRequestMessages] = useState([]);
  //   end of useStates

  //   useContext
  const sbTheme = useContext(SuggestionBoxContext);
  // end of useContext

  // fetching request messages
  useEffect(() => {
    axios.get(BASE_URL + "/sb-get-request").then((response) => {
      setRequestMessages(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-start gap-2 overflow-y-auto p-3 mt-5">
      {isLoading ? (
        <MessagesLoader />
      ) : (
        <>
          {requestMessages.length == 0 ? (
            <p className="text-center mt-20 text-[14px] text-[#363636] select-none">
              No messages found.
            </p>
          ) : (
            requestMessages.map((message) => (
              <ListTile
                bgColor={sbTheme.bgColor}
                subject={message.request_subject}
                content={message.request_content}
                date={message.request_date}
                messageID={message.request_id}
                unread={false}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default RequestMessages;
