import { useState, useContext, useEffect } from "react";
import { TicketsContext } from "../../Tickets";
import axios from "axios";
import MessagesLoader from "../../../../universal/my-pulse/components/suggestion-box/MessagesLoader";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";

const ListTile = ({ name, unread, bgColor, requesterID, type, position, hoverList, activeList }) => {
  return (
    <NavLink
      key={requesterID}
      to={`/hr/hr-management/tickets/disputes/${
        type === `all`
          ? `all`
          : type === `attendance`
          ? `attendance`
          : type === `payroll`
          ? `payroll`
          : null
      }/${requesterID}`}
      className={({isActive}) => {
        return isActive
          ? `${activeList} p-3 rounded-[8px] relative`
          : `transition ease-in-out ${hoverList} p-3 rounded-[8px] relative`;
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className={`h-10 w-10 rounded-full ${bgColor} flex items-center justify-center text-white text-[16px] font-medium font-white`}
        >
          {name.charAt(0)}
        </div>

        <div>
          <p
            className={`text-[14px] text-[#363636] ${unread && `font-medium`}`}
          >
            {name}
          </p>

          <p className="text-[12px] text-[#8b8b8b]">{position}</p>
        </div>
      </div>
    </NavLink>
  );
};

const Disputes = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [access] = useCookies(["access"]);

  //   useStates
  const [isLoading, setIsLoading] = useState(true);
  const [disputes, setDisputes] = useState([]);
  const [disputeType, setDisputeType] = useState("all");
  const [refreshed, setRefreshed] = useState(false);
  //   end of useStates

  const ticketsTheme = useContext(TicketsContext);

  useEffect(() => {
    if (
      access.access[0].access_attendance == 1 &&
      access.access[0].access_payroll == 1
    ) {
      setDisputeType("all");
    } else {
      if (access.access[0].access_attendance == 1) {
        setDisputeType("attendance");
      } else {
        setDisputeType("payroll");
      }
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const requesters = await axios.get(
          BASE_URL + "/d-get-requesters/" + disputeType
        );
        setIsLoading(false);
        setRefreshed(false);
        setDisputes(requesters.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [refreshed, disputeType]);

  return (
    <div className="flex-1 flex flex-col justify-start gap-2 overflow-y-auto p-3 mt-5">
      <div className="flex flex-row justify-between gap-5">
        <div className="flex flex-row justify-start gap-2">
          {access.access[0].access_attendance === 1 &&
            access.access[0].access_payroll === 1 && (
              <button
                onClick={() => setDisputeType("all")}
                className={`${
                  disputeType === `all`
                    ? `${ticketsTheme.lightColor} ${ticketsTheme.textColor}`
                    : `bg-[#ededed] text-[#c8c8c8]`
                } text-[12px] px-3 py-1 rounded-full`}
              >
                All
              </button>
            )}

          {access.access[0].access_attendance === 1 && (
            <button
              onClick={() => setDisputeType("attendance")}
              className={`${
                disputeType === `attendance`
                  ? `${ticketsTheme.lightColor} ${ticketsTheme.textColor}`
                  : `bg-[#ededed] text-[#c8c8c8]`
              } text-[12px] px-3 py-1 rounded-full`}
            >
              Attendance
            </button>
          )}

          {access.access[0].access_payroll === 1 && (
            <button
              onClick={() => setDisputeType("payroll")}
              className={`${
                disputeType === `payroll`
                  ? `${ticketsTheme.lightColor} ${ticketsTheme.textColor}`
                  : `bg-[#ededed] text-[#c8c8c8]`
              } text-[12px] px-3 py-1 rounded-full`}
            >
              Payroll
            </button>
          )}
        </div>

        <button
          onClick={() => setRefreshed(true)}
          className={`bg-[#ededed] text-[#c8c8c8] text-[12px] p-1 rounded-full`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`h-5 ${ticketsTheme.fillColor}`}
          >
            <path d="M10 11H7.101l.001-.009a4.956 4.956 0 0 1 .752-1.787 5.054 5.054 0 0 1 2.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 0 1 2.018 0 4.978 4.978 0 0 1 2.525 1.361l1.416-1.412a7.036 7.036 0 0 0-2.224-1.501 6.921 6.921 0 0 0-1.315-.408 7.079 7.079 0 0 0-2.819 0 6.94 6.94 0 0 0-1.316.409 7.04 7.04 0 0 0-3.08 2.534 6.978 6.978 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 4-4zm4 2h2.899l-.001.008a4.976 4.976 0 0 1-2.103 3.138 4.943 4.943 0 0 1-1.787.752 5.073 5.073 0 0 1-2.017 0 4.956 4.956 0 0 1-1.787-.752 5.072 5.072 0 0 1-.74-.61L7.05 16.95a7.032 7.032 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 0 0 2.818 0 7.031 7.031 0 0 0 4.395-2.945 6.974 6.974 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z"></path>
          </svg>
        </button>
      </div>

      {isLoading ? (
        <MessagesLoader />
      ) : (
        <>
          {disputes.length == 0 ? (
            <p className="text-center mt-20 text-[14px] text-[#363636] select-none">
              No disputes found.
            </p>
          ) : (
            disputes.map((dispute) => (
              <ListTile
                bgColor={ticketsTheme.bgColor}
                hoverList={ticketsTheme.hoverList}
                activeList={ticketsTheme.activeList}
                name={dispute.requester_name}
                requesterID={dispute.emp_id}
                position={dispute.position_name}
                type={disputeType}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Disputes;
