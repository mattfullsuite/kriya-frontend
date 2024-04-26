import { NavLink } from "react-router-dom";

function MyPayslips(props) {
  const user = props.user;
  const userColor = props.userColor;
  return (
    <>
      <div className="flex flex-col gap-3">
        {/* My Payslips */}
        <NavLink to={"/" + user + "/my-payslips"}>
          {(isActive) => {
            return isActive.isActive ? (
              <div className="flex flex-row justify-start items-center gap-8">
                <div
                  className={`bg-[${userColor}] h-7 w-[6px] rounded-r-[8px]`}
                />

                <div>
                  <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className={`w-5 h-5 fill-[${userColor}]`}
                    >
                      <path d="M20 12v6a1 1 0 0 1-2 0V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-6h-2zm-6-1v2H6v-2h8zM6 9V7h8v2H6zm8 6v2h-3v-2h3z"></path>
                    </svg>
                    <span
                      className={`text-[${userColor}] text-[14px] select-none`}
                    >
                      My Payslips
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-row justify-start items-center gap-8">
                <div className="invisible bg-none h-7 w-[6px] rounded-r-[8px]" />

                <div>
                  <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-[#A9A9A9]"
                    >
                      <path d="M20 12v6a1 1 0 0 1-2 0V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-6h-2zm-6-1v2H6v-2h8zM6 9V7h8v2H6zm8 6v2h-3v-2h3z"></path>
                    </svg>
                    <span className="text-[#A9A9A9] text-[14px] select-none">
                      My Payslips
                    </span>
                  </div>
                </div>
              </div>
            );
          }}
        </NavLink>
      </div>
    </>
  );
}
export default MyPayslips;
