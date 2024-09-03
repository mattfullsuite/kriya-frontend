import { Link } from "react-router-dom";
import MyRecentCheerTiles from "./MyRecentCheerTiles";

import { useState, useEffect, useContext, useReducer, useRef } from "react";
import axios from "axios";

const MyRecentCheersLimited = () => {
  ///cap-getMyRecentCheersWidget

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [topHashtags, setTopHashtags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const top_hashtags_res = await axios.get(
          BASE_URL + "/cap-getTopTenHashtags"
        );
        setTopHashtags(top_hashtags_res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white border border-[#e4e4e4] rounded-[15px] p-5">
      <div className="flex flex-row justify-between items-center">
        <span className="text-[14px] text-[#606060] font-bold">
          Top Hashtags
        </span>

        {/* <Link to="/hr/my-pulse/cheer-a-peer/recent-cheers">
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
        </Link> */}
      </div>

      {topHashtags.map((th, i) => (
      <div className="flex flex-col gap-2 mt-3">
        <div className="bg-[#f0f0f0] p-3 rounded-[8px] flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center gap-3">

            <div className="leading-none text-[12px] font-bold">{i+1 + "."}</div>

            <div>
              <p className="leading-none text-[15px] font-medium">{th.hashtags}</p>
            </div>
          </div>
          
          <div className="bg-[#666a40] flex flex-row justify-center items-center gap-1 py-[2px] px-[4px] rounded-full">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-3"
          >
            <circle cx="10" cy="10" r="10" fill="#FFD336" />
            <circle cx="10.0001" cy="9.99953" r="7.71242" fill="#FFAE36" />
            <path
              d="M14.0811 6.82735C13.8046 6.54889 13.4759 6.32782 13.1137 6.17687C12.7516 6.02592 12.3632 5.94805 11.9708 5.94775C11.2287 5.94788 10.5137 6.22671 9.96741 6.72906C9.42113 6.22663 8.70609 5.94778 7.96398 5.94775C7.57118 5.94816 7.18234 6.02627 6.81984 6.17757C6.45734 6.32887 6.12833 6.55038 5.85175 6.82935C4.67205 8.01435 4.67255 9.86782 5.85275 11.0478L9.96741 15.1634L14.0821 11.0478C15.2623 9.86782 15.2628 8.01435 14.0811 6.82735Z"
              fill="#FF4F18"
            />
            <g clip-path="url(#clip0_836_5364)">
              <path
                d="M13.321 8.89243C13.3088 8.8432 13.2809 8.79928 13.2415 8.76729C13.2022 8.73529 13.1535 8.71694 13.1028 8.71501C13.0521 8.71308 13.0022 8.72768 12.9605 8.75659C12.9189 8.78551 12.8877 8.82718 12.8718 8.87533L12.1256 11.1129L11.4342 9.55686C11.4154 9.5149 11.3847 9.47939 11.3458 9.45475C11.307 9.43011 11.2618 9.41742 11.2158 9.41827C11.1698 9.41912 11.1251 9.43346 11.0872 9.45952C11.0493 9.48558 11.0199 9.5222 11.0026 9.56483L10.5932 10.5888H9.81494V11.0572H10.5932C10.786 11.0572 10.9567 10.9415 11.0279 10.7628L11.2314 10.2541L11.9427 11.8549C11.9806 11.9399 12.0647 11.994 12.157 11.994L12.1682 11.9938C12.2154 11.9915 12.2608 11.975 12.2984 11.9465C12.3361 11.9179 12.3642 11.8786 12.379 11.8338L13.0615 9.78639L13.2908 10.7024C13.3159 10.8038 13.3743 10.8939 13.4567 10.9582C13.5391 11.0225 13.6406 11.0574 13.7451 11.0572H14.499V10.5888H13.7449L13.321 8.89243Z"
                fill="#FFAE36"
              />
            </g>
            <defs>
              <clipPath id="clip0_836_5364">
                <rect
                  width="5.62091"
                  height="5.62091"
                  fill="white"
                  transform="translate(9.34656 7.77832)"
                />
              </clipPath>
            </defs>
          </svg>
          <span className="text-white text-[11px] leading-none">{th.sum_hb}</span>
        </div>

        </div>
      </div>
      ))}
    </div>
  );
};

export default MyRecentCheersLimited;
