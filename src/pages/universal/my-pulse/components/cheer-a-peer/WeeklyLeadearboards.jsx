import { useContext } from "react";
import { ThemeContext } from "../../CheerAPeer";

const ListTile = ({ fName, sName, heartBits, place, bgColor }) => {
  return (
    <div className="bg-[#EDEDED] p-3 rounded-[8px] border border-[#e4e4e4] flex flex-row justify-between items-center">
      <div className="flex flex-row justify-start items-center gap-2">
        <div
          className={`${bgColor} w-10 h-10 rounded-full relative flex justify-center items-center text-white`}
        >
          {fName.charAt(0)}
          <div className="absolute -bottom-1 -left-1 text-[12px] bg-[#FFC7A0] px-1 rounded-full text-[#CC5500] font-medium">
            {place}
          </div>
        </div>

        <p className="text-[#363636] text-[14px]">{fName + " " + sName}</p>
      </div>

      <p className="text-[12px] text-[#363636] flex items-center justify-end gap-1">
        {heartBits}
        <svg
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4"
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
        received
      </p>
    </div>
  );
};

const WeeklyLeaderboards = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className="bg-white border border-[#e4e4e4] rounded-[15px]">
      <p className="text-[16px] text-[#363636] font-bold p-3 border-b border-[#e4e4e4] leading-none">
        Weekly Leaderboards
      </p>

      <div className="flex flex-row justify-between items-center p-3 border-b border-[#e4e4e4]">
        <div className="flex flex-row justify-start items-center gap-3">
          <p className="text-[13px] font-medium text-[#363636]">Your rank:</p>

          <div className="flex flex-row justify-center items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full relative ${theme.bgColor} flex justify-center items-center text-white`}
            >
              A
              <div className="absolute -bottom-1 -left-1 text-[12px] bg-[#FFC7A0] px-1 rounded-full text-[#CC5500] font-medium">
                5th
              </div>
            </div>

            <p className="text-[#363636] text-[14px]">Melvin Brown</p>
          </div>
        </div>

        <p className="text-[13px] text-[#363636] flex items-center justify-center gap-1">
          15
          <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4"
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
          received
        </p>
      </div>

      <div className="p-3 h-56 w-full flex flex-row justify-around items-end">
        <div>
          <div
            className={`w-20 h-20 rounded-full flex justify-center items-center ${theme.bgColor} border-[5px] border-[#BDBDBD] relative text-white text-[20px]`}
          >
            K
            <p className="absolute bg-[#BDBDBD] top-0 -right-1 w-6 h-6 leading-none text-center flex justify-center items-center text-white text-[10px] font-medium rounded-full">
              2nd
            </p>
          </div>

          <p className="text-[14px] text-[#363636] text-center">Kelsy Miller</p>
          <p className="text-[12px] text-[#363636] flex items-center justify-center gap-1">
            50
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4"
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
            received
          </p>
        </div>

        <div className="self-start">
          <div
            className={`rounded-full w-28 h-28 flex justify-center items-center ${theme.bgColor} border-[5px] border-[#E0B723] relative text-white text-[32px]`}
          >
            <span>A</span>

            <p className="absolute bg-[#E0B723] top-0 -right-1 w-9 h-9 leading-none text-center flex justify-center items-center text-white text-[14px] font-medium rounded-full">
              1st
            </p>
          </div>

          <p className="text-[14px] text-[#363636] text-center">Matthew Shaw</p>
          <p className="text-[12px] text-[#363636] flex items-center justify-center gap-1 font-bold">
            80
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4"
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
            received
          </p>
        </div>

        <div>
          <div
            className={`w-20 h-20 rounded-full flex justify-center items-center ${theme.bgColor} relative border-[5px] border-[#CD844F] text-white text-[20px]`}
          >
            J
            <p className="absolute bg-[#CD844F] top-0 -right-1 w-6 h-6 leading-none text-center flex justify-center items-center text-white text-[10px] font-medium rounded-full">
              3rd
            </p>
          </div>

          <p className="text-[14px] text-[#363636] text-center">John Smith</p>
          <p className="text-[12px] text-[#363636] flex items-center justify-center gap-1">
            35
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4"
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
            received
          </p>
        </div>
      </div>

      <div className="p-3 flex flex-col justify-start gap-2">
        <ListTile
          fName={"Bryce"}
          sName={"Shaw"}
          heartBits={25}
          place={"4th"}
          bgColor={theme.bgColor}
        />

        <ListTile
          fName={"Melvin"}
          sName={"Brown"}
          heartBits={15}
          place={"5th"}
          bgColor={theme.bgColor}
        />
      </div>
    </div>
  );
};

export default WeeklyLeaderboards;
