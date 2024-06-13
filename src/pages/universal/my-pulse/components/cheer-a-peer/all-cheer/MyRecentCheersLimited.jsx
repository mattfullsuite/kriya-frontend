import { Link } from "react-router-dom";
import MyRecentCheerTiles from "./MyRecentCheerTiles";

const MyRecentCheersLimited = () => {
  return (
    <div className="bg-white border border-[#e4e4e4] rounded-[15px] p-5">
      <div className="flex flex-row justify-between items-center">
        <span className="text-[14px] text-[#606060] font-bold">
          My Recent Cheers
        </span>

        <Link to="/hr/my-pulse/cheer-a-peer/recent-cheers">
          <button className="flex flex-row justify-center items-center">
            <span className="text-[12px] text-[#666a40] font-medium">
              See all
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-[#666A40]"
            >
              <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
            </svg>
          </button>
        </Link>
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <MyRecentCheerTiles />
        <MyRecentCheerTiles />
        <MyRecentCheerTiles />
        <MyRecentCheerTiles />
        <MyRecentCheerTiles />
      </div>
    </div>
  );
};

export default MyRecentCheersLimited;
