import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import moment from "moment";
import SocketService from "../../../../../assets/SocketService";

const ViewComplaintTicket = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  borderColor,
  accentColor,
  focusBorder,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const socket = SocketService.getSocket();

  // getting the request conversation ID in url
  const { complaint_id } = useParams();

  // useStates
  const [messages, setMessages] = useState([]);
  const [complaintContent, setComplaintContent] = useState([]);
  const [isLoading, setIsLoading] = useState([true, true]);
  const [isForbidden, setIsForbidden] = useState(false);
  const [cookie] = useCookies(["user"]);
  const [composedMessage, setComposedMessage] = useState({
    complaint_chat: "",
  });

  const [compID, setCompID] = useState("");
  // end of useStates

  // useRefs
  const scrollRef = useRef(null);
  const messageInputRef = useRef(null);
  const sendBtnRef = useRef(null);
  const prevValue = useRef("");

  const closeRef = useRef(null);
  const modalRef = useRef(null);

  const confirmBtn = useRef(null);
  //end of useRefs

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    setCompID(complaint_id);
  }, [complaint_id]);

  useEffect(() => {
    prevValue.current = compID;
  }, [compID]);

  //fetching request and request conversation
  useEffect(() => {
    setIsLoading([isLoading[0], true]);

    setIsLoading([isLoading[1], true]);

    // get the complaint information using complaint ID
    axios
      .get(BASE_URL + "/sb-get-complaint-ticket-content/" + complaint_id)
      .then((response) => {
        setComplaintContent(response.data[0]);

        setIsForbidden(false);
        setIsLoading([isLoading[0], false]);
      })
      .catch(() => {
        setIsForbidden(true);
        setIsLoading([isLoading[0], false]);
      });

    // get the conversation using complaint ID
    axios
      .get(BASE_URL + "/sb-get-complaint-conversation/" + complaint_id)
      .then((response) => {
        setMessages(response.data);
        setIsLoading([isLoading[1], false]);
        console.log(response.data);
      })
      .catch(() => {
        setIsLoading([isLoading[1], false]);
      });
  }, [complaint_id]);

  // joining and leaving room
  useEffect(() => {
    socket.emit("leaveRoom", prevValue.current); // leaving the room of chat
    socket.emit("joinRoom", complaint_id); // joining the current room of chat
  }, [complaint_id]);

  useEffect(() => {
    socket.on("receiveHrComplaintMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("receiveComplainantMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [socket]);

  // method for sending the message
  const handleSendMessage = () => {
    messageInputRef.current.value = "";
    setComposedMessage({ ...composedMessage, complaint_chat: "" });

    setMessages([
      ...messages,
      {
        complaint_id: complaint_id,
        sender_id: cookie.user.emp_id,
        complaint_chat: composedMessage.complaint_chat,
        f_name: cookie.user.f_name,
        s_name: cookie.user.s_name,
        emp_pic: cookie.user.emp_pic,
        complaint_timestamp: "2024-07-15T06:41:46.000Z",
      },
    ]);

    axios
      .post(BASE_URL + "/sb-insert-complaint-chat", composedMessage)
      .then(() => {
        socket.emit("sendComplainantMessage", {
          complaint_id: complaint_id,
          sender_id: cookie.user.emp_id,
          complaint_chat: composedMessage.complaint_chat,
          f_name: cookie.user.f_name,
          s_name: cookie.user.s_name,
          emp_pic: cookie.user.emp_pic,
          complaint_timestamp: "2024-07-15T06:41:46.000Z",
        });
      })
      .catch((err) => console.log(err));
  };

  // handle activeBtn
  const handleActiveBtn = () => {
    const data = {
      complaintID: complaint_id,
      status: 1,
    };

    confirmBtn.current.disabled = true;

    axios
      .post(BASE_URL + "/sb-update-complaint-status", data)
      .then(() => {
        confirmBtn.current.disabled = false;
        closeRef.current.close();
        socket.emit("closeComplaint", {
          complaintID: complaint_id,
          is_resolved: 1,
        });
        setComplaintContent({ ...complaintContent, is_resolved: 1 });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return isLoading[0] && isLoading[1] ? (
    <div className="h-full flex flex-col justify-center items-center gap-2 bg-white">
      <img className="w-5 h-5" src={"/images/loader.gif"} />

      <p className="text-center text-[14px] text-[#8b8b8b]">Loading...</p>
    </div>
  ) : isForbidden ? (
    <div className="h-full w-full bg-white flex flex-col justify-center items-center p-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        className="max-w-[300px]"
        viewBox="0 0 790 512.20805"
      >
        <path
          d="M925.56335,704.58909,903,636.49819s24.81818,24.81818,24.81818,45.18181l-4.45454-47.09091s12.72727,17.18182,11.45454,43.27273S925.56335,704.58909,925.56335,704.58909Z"
          transform="translate(-205 -193.89598)"
          fill="#e6e6e6"
        />
        <path
          d="M441.02093,642.58909,419,576.13509s24.22155,24.22155,24.22155,44.09565l-4.34745-45.95885s12.42131,16.76877,11.17917,42.23245S441.02093,642.58909,441.02093,642.58909Z"
          transform="translate(-205 -193.89598)"
          fill="#e6e6e6"
        />
        <path
          d="M784.72555,673.25478c.03773,43.71478-86.66489,30.26818-192.8092,30.35979s-191.53562,13.68671-191.57335-30.028,86.63317-53.29714,192.77748-53.38876S784.68782,629.54,784.72555,673.25478Z"
          transform="translate(-205 -193.89598)"
          fill="#e6e6e6"
        />
        <rect y="509.69312" width="790" height="2" fill="#3f3d56" />
        <polygon
          points="505.336 420.322 491.459 420.322 484.855 366.797 505.336 366.797 505.336 420.322"
          fill="#a0616a"
        />
        <path
          d="M480.00587,416.35743H508.3101a0,0,0,0,1,0,0V433.208a0,0,0,0,1,0,0H464.69674a0,0,0,0,1,0,0v-1.54149A15.30912,15.30912,0,0,1,480.00587,416.35743Z"
          fill="#2f2e41"
        />
        <polygon
          points="607.336 499.322 593.459 499.322 586.855 445.797 607.336 445.797 607.336 499.322"
          fill="#a0616a"
        />
        <path
          d="M582.00587,495.35743H610.3101a0,0,0,0,1,0,0V512.208a0,0,0,0,1,0,0H566.69674a0,0,0,0,1,0,0v-1.54149A15.30912,15.30912,0,0,1,582.00587,495.35743Z"
          fill="#2f2e41"
        />
        <path
          d="M876.34486,534.205A10.31591,10.31591,0,0,0,873.449,518.654l-32.23009-131.2928L820.6113,396.2276l38.33533,126.949a10.37185,10.37185,0,0,0,17.39823,11.0284Z"
          transform="translate(-205 -193.89598)"
          fill="#a0616a"
        />
        <path
          d="M851.20767,268.85955a11.38227,11.38227,0,0,0-17.41522,1.15247l-49.88538,5.72709,7.58861,19.24141,45.36779-8.49083a11.44393,11.44393,0,0,0,14.3442-17.63014Z"
          transform="translate(-205 -193.89598)"
          fill="#a0616a"
        />
        <path
          d="M769,520.58909l21.76811,163.37417,27.09338-5.578s-3.98437-118.98157,9.56238-133.32513S810,505.58909,810,505.58909Z"
          transform="translate(-205 -193.89598)"
          fill="#2f2e41"
        />
        <path
          d="M778,475.58909l-10,15s-77-31.99929-77,19-4.40631,85.60944-6,88,18.43762,8.59375,28,7c0,0,11.79687-82.21884,11-87,0,0,75.53355,37.03335,89.87712,33.84591S831.60944,536.964,834,530.58909s-1-57-1-57l-47.81-14.59036Z"
          transform="translate(-205 -193.89598)"
          fill="#2f2e41"
        />
        <path
          d="M779.34915,385.52862l-2.85032-3.42039s-31.92361-71.82815-19.3822-91.21035,67.26762-22.23252,68.97783-21.0924-4.08488,15.9428-.09446,22.78361c0,0-42.394,9.19121-45.24435,10.33134s21.96615,43.2737,21.96615,43.2737l-2.85031,25.6529Z"
          transform="translate(-205 -193.89598)"
          fill="#ccc"
        />
        <path
          d="M835.21549,350.18459S805.57217,353.605,804.432,353.605s-1.71017-7.41084-1.71017-7.41084l-26.223,35.91406S763.57961,486.29929,767,484.58909s66.50531,8.11165,67.07539,3.55114-.57008-27.3631,1.14014-28.50324,29.64328-71.82811,29.64328-71.82811-2.85032-14.82168-12.54142-19.95227S835.21549,350.18459,835.21549,350.18459Z"
          transform="translate(-205 -193.89598)"
          fill="#ccc"
        />
        <path
          d="M855.73783,378.11779l9.121,9.69109S878.41081,499.1687,871,502.58909s-22,3-22,3l-14.35458-52.79286Z"
          transform="translate(-205 -193.89598)"
          fill="#ccc"
        />
        <circle cx="601.72966" cy="122.9976" r="26.2388" fill="#a0616a" />
        <path
          d="M800.57267,320.98789c-.35442-5.44445-7.22306-5.631-12.67878-5.68255s-11.97836.14321-15.0654-4.35543c-2.0401-2.973-1.65042-7.10032.035-10.28779s4.45772-5.639,7.18508-7.99742c7.04139-6.08884,14.29842-12.12936,22.7522-16.02662s18.36045-5.472,27.12788-2.3435c10.77008,3.84307,25.32927,23.62588,26.5865,34.99176s-3.28507,22.95252-10.9419,31.44586-25.18188,5.0665-36.21069,8.088c6.7049-9.48964,2.28541-26.73258-8.45572-31.164Z"
          transform="translate(-205 -193.89598)"
          fill="#2f2e41"
        />
        <circle cx="361.7217" cy="403.5046" r="62.98931" fill="#363636" />
        <path
          d="M524.65625,529.9355a45.15919,45.15919,0,0,1-41.25537-26.78614L383.44873,278.05757a59.83039,59.83039,0,1,1,111.87012-41.86426l72.37744,235.41211a45.07978,45.07978,0,0,1-43.04,58.33008Z"
          transform="translate(-205 -193.89598)"
          fill="#363636"
        />
      </svg>

      <p className="text-[20px] font-medium text-[#363636] mt-5">
        No message found
      </p>

      <p className="text-[14px] text-[#8b8b8b] text-center">
        Message not found – perhaps it's lost in the whispers of the digital
        winds.
      </p>
    </div>
  ) : (
    <>
      <div className="h-full flex flex-col justify-between">
        <div className="bg-white px-5 py-3 border-b border-[#e4e4e4] flex flex-row justify-between items-center gap-5">
          <div>
            <p className="text-[14px] text-[#363636]">
              {complaintContent.complaint_subject}
            </p>
            <p className="text-[12px] text-[#8b8b8b]">
              {`Filed on: ${moment(complaintContent.complaint_date).format(
                "MMMM DD, YYYY"
              )} `}
              <span className="text-[12px]">·</span>
              {` ${
                complaintContent.is_anonymous == 1 &&
                complaintContent.is_anonymous == 1
                  ? `Anonymous`
                  : complaintContent.complainant_fname +
                    " " +
                    complaintContent.complainant_sname
              }`}
            </p>
          </div>

          <div className="flex flex-row items-center gap-3">
            {complaintContent.is_resolved === 0 ? (
              <button
                onClick={() => closeRef.current.showModal()}
                className="text-[12px] terxt-[#363636] font-medium select-none bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-3 py-2 rounded-[8px]"
              >
                Active
              </button>
            ) : (
              <button className="text-[12px] terxt-[#363636] font-medium select-none bg-red-200 text-red-500 px-3 py-2 rounded-[8px]">
                Closed
              </button>
            )}

            <button
              onClick={() => modalRef.current.showModal()}
              className="transition ease-in-out flex justify-center items-center rounded-full h-6 w-6 hover:bg-slate-200 active:bg-slate-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-[#363636]"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                <path d="M11 11h2v6h-2zm0-4h2v2h-2z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 bg-white">
          <div className="min-h-full flex flex-col gap-3 justify-end max-w-[1300px] m-auto">
            <div className="flex flex-col justify-center items-center gap-2 self-center max-w-[60%] mb-12">
              <svg
                viewBox="0 0 37 37"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
              >
                <path
                  d="M18.5 0C8.2991 0 0 8.2991 0 18.5C0 28.7009 8.2991 37 18.5 37C28.7009 37 37 28.7009 37 18.5C37 8.2991 28.7009 0 18.5 0ZM20.35 27.75H16.65V16.65H20.35V27.75ZM20.35 12.95H16.65V9.25H20.35V12.95Z"
                  fill="#8B8B8B"
                />
              </svg>

              <p className="text-center text-[11px] text-[#8b8b8b]">
                All requests submitted to HR will be treated with the utmost
                confidentiality. However, it is important to note that in
                certain circumstances, confidentiality may be limited by legal
                or organizational requirements. HR will make every effort to
                protect your privacy within the bounds of these obligations.
              </p>
            </div>

            <div className="flex flex-row justify-start items-end gap-1">
              <div
                className={`bg-[#e9e9e9] h-8 w-8 flex justify-center items-center rounded-full ${textColor} font-medium`}
              >
                {complaintContent.complainant_fname.charAt(0)}
              </div>

              <div className="flex flex-col gap-1 items-start flex-1">
                <p className="ml-[10px] text-[12px] text-[#8b8b8b]">
                  {complaintContent.complainant_fname +
                    " " +
                    complaintContent.complainant_sname +
                    " (Complainant)"}
                </p>

                <div
                  className={`bg-white max-w-[60%] text-[14px] text-[#363636] self-start p-3 rounded-[15px] border ${borderColor}`}
                >
                  <p className="font-medium text-[14px] mb-2">
                    Complaint: {complaintContent.complaint_subject}
                  </p>
                  <p>
                    Filed on:{" "}
                    {moment(complaintContent.complaint_date).format(
                      "MMMM DD, YYYY"
                    )}
                  </p>
                  <p>
                    {`Sent to: ${
                      complaintContent.hr_fname == null &&
                      complaintContent.hr_sname == null
                        ? `All HR`
                        : complaintContent.hr_fname +
                          " " +
                          complaintContent.hr_sname
                    }`}
                  </p>
                  <p>Explanation: {complaintContent.complaint_content}</p>
                </div>
              </div>
            </div>

            {messages.map((m) =>
              cookie.user.emp_id === m.sender_id ? (
                <div
                  className={`px-3 py-2 rounded-[18px] max-w-[60%] min-w-[37px] text-[14px] hyphens-auto self-end text-white ${bgColor} break-words`}
                >
                  {m.complaint_chat}
                </div>
              ) : (
                <div className="flex flex-row justify-start items-end gap-1">
                  <div
                    className={`bg-[#e9e9e9] h-8 w-8 flex justify-center items-center rounded-full ${textColor} font-medium`}
                  >
                    {m.f_name.charAt(0)}
                  </div>

                  <div className="flex flex-col gap-1 items-start flex-1">
                    <p className="ml-[10px] text-[12px] text-[#8b8b8b]">
                      {m.f_name + " " + m.s_name}
                      {complaintContent.complainant_id != m.sender_id
                        ? " (HR)"
                        : " (Complainant)"}
                    </p>

                    <div
                      className={`px-3 py-2 rounded-full max-w-[60%] min-w-[37px] hyphens-auto text-[14px] bg-[#e9e9e9] text-[#363636] break-words`}
                    >
                      {m.complaint_chat}
                    </div>
                  </div>
                </div>
              )
            )}

            <div ref={scrollRef} />
          </div>
        </div>

        <div className="flex flex-row justify-between bg-white border-t border-[#e4e4e4] p-2 gap-2">
          {!complaintContent.is_resolved ? (
            <>
              <input
                type="text"
                onChange={(e) =>
                  setComposedMessage({
                    ...composedMessage,
                    complaint_chat: e.target.value,
                    complaintID: complaint_id,
                  })
                }
                className={`text-[14px] text-[#363636] transition flex-1 outline-none border bordewr-[#e4e4e4] rounded-full px-3 ${focusBorder}`}
                placeholder="Aa"
                ref={messageInputRef}
              />

              <button
                className={`transition ${bgColor} ${hoverColor} ${disabledColor} p-2 rounded-full`}
                onClick={handleSendMessage}
                disabled={
                  composedMessage.complaint_chat.length == 0 ? true : false
                }
                ref={sendBtnRef}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="fill-white h-5"
                >
                  <path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"></path>
                </svg>
              </button>
            </>
          ) : (
            <p className="text-center text-[12px] text-[#8b8b8b] italic w-full select-none py-2">
              This request was resolved and closed.
            </p>
          )}
        </div>
      </div>

      <dialog ref={closeRef} className="modal">
        <div className="modal-box p-0 rounded-[15px]">
          <p className="px-5 py-3 text-[16px] font-medium text-[#363636] border-b border-[#e4e4e4]">
            Close complaint?
          </p>

          <div className="p-5">
            <p className="text-[14px] text-[#363636]">
              Are you sure you want to close and mark as resolved this
              complaint?
            </p>
            <p className="text-[14px] text-[#363636] mt-5">
              This action is irreversible.
            </p>

            <div className="flex flex-row justify-end gap-2 mt-10">
              <button
                onClick={() => closeRef.current.close()}
                className="text-[14px] text-[#363636] bg-slate-200 rounded-[8px] px-3 py-2"
              >
                Cancel
              </button>

              <button
                ref={confirmBtn}
                onClick={handleActiveBtn}
                className={`text-[14px] text-white ${bgColor} ${disabledColor} rounded-[8px] px-3 py-2`}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-0">
          <div className="px-5 py-3 border-b border-[#e4e4e4] flex flex-row justify-between items-center gap-5">
            <p className=" text-[16px] font-medium text-[#363636]">
              Complaint Details
            </p>

            <button
              onClick={() => modalRef.current.close()}
              className="outline-none transition-all ease-in-out w-6 h-6 rounded-full hover:bg-slate-200 active:bg-slate-300"
            >
              ✕
            </button>
          </div>

          <div className="p-5 flex flex-col gap-5">
            <div>
              <p className="text-[14px] text-[#363636] font-medium">
                Complaint:
              </p>
              <p className="text-[15px] text-[#363636]">
                {complaintContent.complaint_subject}
              </p>
            </div>

            <div>
              <p className="text-[14px] text-[#363636] font-medium">
                Filed on:
              </p>
              <p className="text-[15px] text-[#363636]">
                {moment(complaintContent.complaint_date).format(
                  "MMMM DD, YYYY"
                )}
              </p>
            </div>

            <div>
              <p className="text-[14px] text-[#363636] font-medium">Status:</p>
              <p className="text-[15px] text-[#363636]">
                {complaintContent.is_resolved === 0 ? `Active` : `Closed`}
              </p>
            </div>

            <div>
              <p className="text-[14px] text-[#363636] font-medium">Sent to:</p>
              <p className="text-[15px] text-[#363636]">
                {` ${
                  complaintContent.hr_fname == null &&
                  complaintContent.hr_sname == null
                    ? `All HR`
                    : complaintContent.hr_fname +
                      " " +
                      complaintContent.hr_sname
                }`}
              </p>
            </div>

            <div>
              <p className="text-[14px] text-[#363636] font-medium">Reason:</p>
              <p className="text-[15px] text-[#363636]">
                {complaintContent.complaint_content}
              </p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ViewComplaintTicket;