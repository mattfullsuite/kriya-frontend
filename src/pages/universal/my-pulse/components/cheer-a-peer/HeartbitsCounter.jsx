import { useContext } from "react";
import { ThemeContext } from "../../CheerAPeer";
import axios from "axios";

const HeartbitsCounter = ({myHeartbits}) => {
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  // const [myHeartbits, setMyHeartbits] = useState([]);

  // useEffect(() => {
  //   const fetchAllData = async () => {
  //     try {
  //       const my_heartbits_res = await axios.get(BASE_URL + "/cap-getMyHeartbits");
  //       setMyHeartbits(my_heartbits_res.data[0]);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   fetchAllData();
  // }, []);

  
  const theme = useContext(ThemeContext);
  return (
    <div className="box-border p-3 bg-white border border-[#E4E4E4] rounded-[15px] flex-1 flex flex-col justify-between  gap-8 md:gap-0">
      <div className="box-border flex flex-row justify-between items-center">
        <div className="box-border flex flex-row justify-start items-center gap-2">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6"
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

          <p className="text-[#363636] text-[14px]">Total Heartbits</p>
        </div>

        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="transition w-5 h-5 fill-[#dfdfdf] hover:fill-[#A9A9A9]"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
          </svg>
        </button>
      </div>

      <div className="box-border flex flex-row flex-nowrap justify-center items-center gap-5">
        <div className="box-border">
          <p className="font-bold text-[#363636] text-[28px]">
            {myHeartbits.heartbits_balance}
            <span className="text-[12px] text-[#8b8b8b] font-normal">
            {" "} points
            </span>

            <span className="ml-10 mr-10">|</span>

            {myHeartbits.total_heartbits}
            <span className="text-[12px] text-[#8b8b8b] font-normal">
            {" "}received
            </span>
          </p>
          
        </div>

        {/* <button className={`${theme.bgColor} rounded-[4px] w-6 h-6 flex justify-center items-center`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-white w-5 h-5"
          >
            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
          </svg>
        </button> */}
      </div>
    </div>
  );
};

export default HeartbitsCounter;
