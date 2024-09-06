import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyFailed, notifySuccess } from "../../../../../assets/toast";
import EmptySvg from "../../../../../assets/svgs/EmptySvg";

const ViewDispute = ({ bgColor, disabledColor, type }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { empID } = useParams();

  const [disputes, setDisputes] = useState([]);
  const [pastDisputes, setPastDisputes] = useState([]);
  const [notif, setNotif] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/d-get-requester-past-disputes/${type}/${empID}`)
      .then((response) => {
        setPastDisputes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${BASE_URL}/d-get-requester-disputes/${type}/${empID}`)
      .then((response) => {
        console.log(response);
        setDisputes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [empID, type]);

  const handleRemove = (disputeID, status) => {
    const updatedDispute = disputes.filter(
      (item) => item.dispute_id === disputeID
    )[0];

    updatedDispute.dispute_status = status;
    updatedDispute.closed_at = moment().format();

    setPastDisputes([updatedDispute, ...pastDisputes]);

    setDisputes((prevItems) =>
      prevItems.filter((item) => item.dispute_id !== disputeID)
    );
  };

  const approveDispute = (disputeID) => {
    document.getElementById(`approve-btn-${disputeID}`).disabled = true;

    axios
      .post(BASE_URL + "/d-approveDispute/" + disputeID)
      .then(() => {
        document.getElementById(`confirm-dispute-${disputeID}`).close();
        notifySuccess("Successfully approved!");
        setNotif("success");

        handleRemove(disputeID, 1);
      })
      .catch((err) => {
        notifyFailed(err.message);
        setNotif("error");

        document.getElementById(`approve-btn-${disputeID}`).disabled = false;
        document.getElementById(`confirm-dispute-${disputeID}`).close();
      });
  };

  const declineDispute = (disputeID) => {
    document.getElementById(`approve-btn-${disputeID}`).disabled = true;

    axios
      .post(BASE_URL + "/d-rejectDispute/" + disputeID)
      .then(() => {
        document.getElementById(`decline-dispute-${disputeID}`).close();
        notifySuccess("Successfully declined!");
        setNotif("success");
        handleRemove(disputeID, 2);
      })
      .catch((err) => {
        notifyFailed(err.message);
        setNotif("error");

        document.getElementById(`decline-btn-${disputeID}`).disabled = false;
        document.getElementById(`decline-dispute-${disputeID}`).close();
      });
  };

  return (
    <>
      {notif != "" && notif === "success" && <ToastContainer />}
      {notif != "" && notif === "error" && <ToastContainer />}

      <div className="max-w-[1200px] flex gap-5 m-auto min-h-screen relative">
        <div className="flex-1 p-5 pr-0">
          <p className="text-[18px] font-medium text-[#363636] mb-3 px-[15px]">
            Pending Disputes
          </p>

          <div className="flex flex-col overflow-y-auto gap-5">
            {disputes.length !== 0 ? (
              disputes.map((dispute) => (
                <div key={dispute.dispute_id}>
                  <div className="border border-[#e4e4e4] rounded-[15px] bg-white">
                    <div className="flex justify-between items-center gap-5 border-b border-[#e4e4e4] p-3 ">
                      <span className="text-[14px] text-[#363636] font-medium">
                        {dispute.dispute_type}
                      </span>

                      <span
                        className={`
                ${
                  dispute.dispute_status === 0
                    ? "bg-amber-200 text-amber-600"
                    : dispute.dispute_status === 1
                    ? " bg-green-200 text-green-600"
                    : dispute.dispute_status === 2
                    ? "bg-red-200 text-red-600"
                    : null
                } text-[12px] px-[5px] py-[2px] rounded-[5px] text-center font-medium
              `}
                      >
                        {dispute.dispute_status === 0
                          ? "PENDING"
                          : dispute.dispute_status === 1
                          ? "APPROVED"
                          : dispute.dispute_status === 2
                          ? "DECLINED"
                          : null}
                      </span>
                    </div>

                    <div className="p-3">
                      <div className="mb-3">
                        <p className="text-[16px] font-medium text-[#363636]">
                          {dispute.dispute_title}
                        </p>

                        <p className="text-[14px] text-[#363636]">{`Date to dispute: ${moment(
                          dispute.dispute_date
                        ).format("MMMM DD, YYYY")}`}</p>

                        <p className="text-[12px] text-[#8b8b8b]">
                          {`Filed on ${moment(dispute.raised_at).format(
                            "MMMM DD, YYYY"
                          )}`}
                        </p>
                      </div>

                      <p className="text-[13px] text-[#363636]">
                        {dispute.dispute_body}
                      </p>
                    </div>

                    {dispute.dispute_status === 0 && (
                      <div className="p-3 border-t border-[#e4e4e4] flex flex-row justify-start gap-2">
                        <button
                          onClick={() =>
                            document
                              .getElementById(
                                `decline-dispute-${dispute.dispute_id}`
                              )
                              .showModal()
                          }
                          className="transition ease-in-out outline-none text-[12px] bg-red-500 hover:bg-red-600 active:bg-red-700 px-3 py-2 rounded-[8px] text-medium text-white"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() =>
                            document
                              .getElementById(
                                `confirm-dispute-${dispute.dispute_id}`
                              )
                              .showModal()
                          }
                          className="transition ease-in-out outline-none text-[12px] bg-green-500 hover:bg-green-600 active:bg-green-700 px-3 py-2 rounded-[8px] text-medium text-white"
                        >
                          Approve
                        </button>
                      </div>
                    )}
                  </div>

                  <dialog
                    className="modal"
                    id={`confirm-dispute-${dispute.dispute_id}`}
                  >
                    <div className="modal-box p-0 rounded-[15px] outline-none">
                      <p className="px-3 py-2 border-b border-[#e4e4e4] text-[16px] font-medium text-[#363636]">
                        Approve dispute?
                      </p>

                      <div className="p-3">
                        <p className="text-[#363636] text-[14px]">
                          Are you sure you want to approve this dispute? This
                          action is irreversible.
                        </p>

                        <div className="mt-5 text-[#363636]">
                          <p className="text-[14px] font-medium">
                            {dispute.dispute_type}
                          </p>

                          <p className="text-[12px]">{dispute.dispute_title}</p>

                          <p className="text-[12px]">
                            File on{" "}
                            {moment(dispute.raised_at).format("MMMM DD, YYYY")}
                          </p>

                          <p className="text-[12px] mt-2">
                            {dispute.dispute_body}
                          </p>
                        </div>
                      </div>

                      <div className="border border-[#e4e4e4] p-2 flex justify-end gap-2">
                        <button
                          onClick={() =>
                            document
                              .getElementById(
                                `confirm-dispute-${dispute.dispute_id}`
                              )
                              .close()
                          }
                          className="outline-none text-[12px] text-[#363636] bg-slate-200 rounded-[8px] px-3 py-2"
                        >
                          Cancel
                        </button>

                        <button
                          id={`approve-btn-${dispute.dispute_id}`}
                          onClick={() => approveDispute(dispute.dispute_id)}
                          className={`outline-none text-[12px] text-white ${bgColor} ${disabledColor} rounded-[8px] px-3 py-2`}
                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  </dialog>

                  <dialog
                    className="modal"
                    id={`decline-dispute-${dispute.dispute_id}`}
                  >
                    <div className="modal-box p-0 rounded-[15px] outline-none">
                      <p className="px-3 py-2 border-b border-[#e4e4e4] text-[16px] font-medium text-[#363636]">
                        Decline dispute?
                      </p>

                      <div className="p-3">
                        <p className="text-[#363636] text-[14px]">
                          Are you sure you want to decline this dispute? This
                          action is irreversible.
                        </p>

                        <div className="mt-5 text-[#363636]">
                          <p className="text-[14px] font-medium">
                            {dispute.dispute_type}
                          </p>

                          <p className="text-[12px]">{dispute.dispute_title}</p>

                          <p className="text-[12px]">
                            File on{" "}
                            {moment(dispute.raised_at).format("MMMM DD, YYYY")}
                          </p>

                          <p className="text-[12px] mt-2">
                            {dispute.dispute_body}
                          </p>
                        </div>
                      </div>

                      <div className="border border-[#e4e4e4] p-2 flex justify-end gap-2">
                        <button
                          onClick={() =>
                            document
                              .getElementById(
                                `decline-dispute-${dispute.dispute_id}`
                              )
                              .close()
                          }
                          className="outline-none text-[12px] text-[#363636] bg-slate-200 rounded-[8px] px-3 py-2"
                        >
                          Cancel
                        </button>

                        <button
                          id={`decline-btn-${dispute.dispute_id}`}
                          onClick={() => declineDispute(dispute.dispute_id)}
                          className={`outline-none text-[12px] text-white ${bgColor} ${disabledColor} rounded-[8px] px-3 py-2`}
                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  </dialog>
                </div>
              ))
            ) : (
              <div className="flex flex-col gap-5 items-center mt-20">
                <EmptySvg />

                <p className="text-center text-[#363636] text-[14px]">
                  No pending disputes.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="w-[400px] sticky top-0 max-h-screen p-5 pl-0 overflow-y-auto">
          <p className="text-[18px] font-medium text-[#363636] mb-3 px-[15px]">
            History
          </p>

          <div className="flex flex-col gap-5">
            {pastDisputes.length !== 0 ? (
              pastDisputes.map((pastDispute) => (
                <div
                  key={pastDispute.dispute_id}
                  className="border border-[#e4e4e4] rounded-[15px] bg-white"
                >
                  <div className="flex justify-between items-center gap-5 border-b border-[#e4e4e4] p-3 ">
                    <span className="text-[14px] text-[#363636] font-medium">
                      {pastDispute.dispute_type}
                    </span>

                    <span
                      className={`
                ${
                  pastDispute.dispute_status === 0
                    ? "bg-amber-200 text-amber-600"
                    : pastDispute.dispute_status === 1
                    ? " bg-green-200 text-green-600"
                    : pastDispute.dispute_status === 2
                    ? "bg-red-200 text-red-600"
                    : null
                } text-[12px] px-[5px] py-[2px] rounded-[5px] text-center font-medium
              `}
                    >
                      {pastDispute.dispute_status === 0
                        ? "PENDING"
                        : pastDispute.dispute_status === 1
                        ? "APPROVED"
                        : pastDispute.dispute_status === 2
                        ? "DECLINED"
                        : null}
                    </span>
                  </div>

                  <div className="p-3">
                    <p className="text-[16px] font-medium text-[#363636]">
                      {pastDispute.dispute_title}
                    </p>
                    <p className="text-[12px] text-[#8b8b8b]">
                      {`Filed on ${moment(pastDispute.raised_at).format(
                        "MMMM DD, YYYY"
                      )}`}
                    </p>

                    <p className="text-[12px] text-[#8b8b8b]">
                      {`Closed on ${moment(pastDispute.closed_at).format(
                        "MMMM DD, YYYY"
                      )}`}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col gap-5 items-center mt-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="fill-[#8b8b8b] w-10 h-10"
                >
                  <path d="M12 8v5h5v-2h-3V8z"></path>
                  <path d="M21.292 8.497a8.957 8.957 0 0 0-1.928-2.862 9.004 9.004 0 0 0-4.55-2.452 9.09 9.09 0 0 0-3.626 0 8.965 8.965 0 0 0-4.552 2.453 9.048 9.048 0 0 0-1.928 2.86A8.963 8.963 0 0 0 4 12l.001.025H2L5 16l3-3.975H6.001L6 12a6.957 6.957 0 0 1 1.195-3.913 7.066 7.066 0 0 1 1.891-1.892 7.034 7.034 0 0 1 2.503-1.054 7.003 7.003 0 0 1 8.269 5.445 7.117 7.117 0 0 1 0 2.824 6.936 6.936 0 0 1-1.054 2.503c-.25.371-.537.72-.854 1.036a7.058 7.058 0 0 1-2.225 1.501 6.98 6.98 0 0 1-1.313.408 7.117 7.117 0 0 1-2.823 0 6.957 6.957 0 0 1-2.501-1.053 7.066 7.066 0 0 1-1.037-.855l-1.414 1.414A8.985 8.985 0 0 0 13 21a9.05 9.05 0 0 0 3.503-.707 9.009 9.009 0 0 0 3.959-3.26A8.968 8.968 0 0 0 22 12a8.928 8.928 0 0 0-.708-3.503z"></path>
                </svg>

                <p className="text-center text-[#8b8b8b] text-[14px]">
                  No recent disputes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDispute;
