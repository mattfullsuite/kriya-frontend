import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import moment from "moment";

const ViewMessage = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  accentColor,
  focusBorder,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const { request_id } = useParams();
  const [messages, setMessages] = useState([]);
  const [requestContent, setRequestContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isForbidden, setIsForbidden] = useState(false);
  const [cookie] = useCookies(["user"]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/sb-get-request-content/" + request_id)
      .then((response) => {
        setRequestContent(response.data[0]);
        console.log(response);
      });
  }, [request_id]);

  useEffect(() => {
    axios
      .get(
        BASE_URL +
          "/sb-get-request-conversation/" +
          request_id +
          "/" +
          cookie.user.emp_id
      )
      .then((response) => {
        setMessages(response.data);
        setIsLoading(false);
        console.log(response);
      })
      .catch((e) => {
        setIsLoading(false);
        setIsForbidden(true);
      });
  }, [request_id]);

  return (
    <div className="min-h-screen max-h-screen flex flex-col justify-between">
      {isForbidden ? (
        <p>Forbidden</p>
      ) : messages.length === 0 ? (
        <div className="flex-1 h-screen flex justify-center items-center">
          No messages found.
        </div>
      ) : (
        <>
          <div className="bg-white p-3 border-b border-[#e4e4e4] flex flex-row justify-between items-center">
            <div>
              <p className="text-[16px] text-[#363636]">
                {requestContent.request_subject}
              </p>
              <p className="text-[14px] text-[#8b8b8b]">
                {moment(requestContent.request_date).format("MMMM DD, YYYY")}
              </p>
            </div>

            <button
              className={`text-[14px] bg-green-500 px-3 py-2 rounded-[8px] text-white`}
            >
              {requestContent.is_resolved === 0 ? `Active` : `Closed`}
            </button>
          </div>

          <div className="flex-1 overflow-auto flex flex-col gap-3 justify-end p-5 bg-white">
            {messages.map((m) => (
              <div
                className={`p-3 rounded-[15px] max-w-[60%]  text-[14px] ${
                  cookie.user.emp_id === m.sender_id
                    ? `self-end text-white ${bgColor}`
                    : `self-start bg-[#e9e9e9] text-[#363636]`
                }`}
              >
                {m.request_chat}
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex flex-row justify-between bg-white border-t border-[#e4e4e4] p-2 gap-2">
        <input
          type="text"
          className={`text-[14px] text-[#363636] transition flex-1 outline-none border bordewr-[#e4e4e4] rounded-[8px] px-2 ${focusBorder}`}
          placeholder="Aa"
        />

        <button
          className={`transition ${bgColor} ${hoverColor} p-3 rounded-[8px]`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-white h-5"
          >
            <path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ViewMessage;
