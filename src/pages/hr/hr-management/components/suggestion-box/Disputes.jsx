import moment from "moment";
import { NavLink } from "react-router-dom";

const ListTile = ({ subject, content, date, unread, bgColor, userID }) => {
  return (
    <NavLink
      to={`/hr/hr-management/tickets/disputes/${userID}`}
      className={(isActive) => {
        return isActive
          ? `bg-[#90946fa9] p-3 rounded-[8px] relative`
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

const Disputes = () => {
  return (
    <div className="flex-1 flex flex-col justify-start gap-2 overflow-y-auto p-3 mt-5">

    </div>
  );
};

export default Disputes;
