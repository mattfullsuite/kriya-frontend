import { useContext } from "react";
import { ThemeContext } from "../universal/CheerAPeer";

const EmployeeCheersTile = ({firstName, lastName, position, points}) => {
    const theme = useContext(ThemeContext);

  return (
    <div className="transition flex flex-row justify-between items-center w-full hover:bg-slate-100 p-3 rounded-[7.5px]">
      <div className="box-border flex flex-row flex-nowrap justify-start items-center gap-2">
        <div className={`${theme.bgColor} box-border w-10 h-10 rounded-full flex justify-center items-center text-white font-bold text-[15px]`}>
            {firstName.charAt(0) + lastName.charAt(0)}
        </div>

        <div className="box-border">
            <p className="text-[14px] text-[#363636] leading-none">{firstName + " " + lastName}</p>
            <p className="text-[12px] text-[#8b8b8b] leading-none">{position}</p>
        </div>
      </div>

      <button className={`${theme.bgColor} rounded-[6px] text-white focus:otuline-none text-[12px] px-3 py-1`}>Details</button>
    </div>
  );
};

export default EmployeeCheersTile;
