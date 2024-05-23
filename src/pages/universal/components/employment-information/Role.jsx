import { useContext } from "react";
import { ThemeContext } from "../../EmployeeInformation";

const Role = () => {
  const theme = useContext(ThemeContext);
  return (
    <div className="box-border bg-white p-5 border border-[#e4e4e4] rounded-[15px]">
      <div className="box-border grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          className={`box-border min-h-[200px] flex flex-col justify-between border border-[#e4e4e4] bg-white  rounded-[15px] p-5`}
        >
          <div className="box-border flex flex-row items-start">
            <p className={`flex-1 text-[14px] font-medium ${theme.textColor}`}>
              Current position
            </p>

            <div className="flex-1">
              <p className={`flex-1 text-[14px] ${theme.textColor}`}>
                Software Engineer
              </p>
              <p className={`flex-1 text-[10px] italic ${theme.textColor}`}>
                Until January 10, 2024
              </p>
            </div>
          </div>

          <div className="box-border flex flex-row items-start">
            <p className={`flex-1 text-[14px] font-medium ${theme.textColor}`}>
              Division
            </p>

            <p className={`flex-1 text-[14px] ${theme.textColor}`}>
              Venture Capital
            </p>
          </div>

          <div className="box-border flex flex-row items-start">
            <p className={`flex-1 text-[14px] font-medium ${theme.textColor}`}>
              Department
            </p>

            <p className={`flex-1 text-[14px] ${theme.textColor}`}>
              Engineering
            </p>
          </div>

          <div className="box-border flex flex-row items-start">
            <p className={`flex-1 text-[14px] font-medium ${theme.textColor}`}>
              Work email
            </p>

            <p className={`flex-1 text-[14px] ${theme.textColor}`}>
              marvin@fullsuite.ph
            </p>
          </div>
        </div>

        <div
          className={`box-border min-h-[200px] flex flex-col justify-between border border-[#e4e4e4] bg-white  rounded-[15px] p-5`}
        >
          <div className="box-border flex flex-row justify-between items-center">
            <p
              className={`flex-1 text-[16px] font-semibold ${theme.textColor}`}
            >
              Reporting to
            </p>

            {theme.hrView && (
              <div className="box-border flex flex-row justify-center items-center gap-1">
                <p
                  className={`flex-1 text-[14px] font-medium ${theme.textColor}`}
                >
                  Check profile
                </p>
              </div>
            )}
          </div>

          <div className="box-border flex flex-row justify-end gap-3 mr-5">
            <div className={`box-border w-16 h-16 rounded-full ${theme.primaryColor} flex justify-center items-center text-white font-bold text-[20px]`}>
                MP
            </div>

            <div>
                <p className={`${theme.textColor} font-medium text-[15px]`}>Ma. Rona Po</p>
                <p className={`${theme.textColor} text-[13px]`}>Chief Executive Officer</p>
                <p className={`${theme.textColor} text-[13px] italic`}>maggie@fullsuite.ph</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
