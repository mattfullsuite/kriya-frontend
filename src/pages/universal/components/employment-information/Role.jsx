import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../EmployeeInformation";
import Axios from "axios";
import { useParams } from "react-router-dom";

const Role = () => {
  const theme = useContext(ThemeContext);

  const { emp_id } = useParams();
  const [userData, setUserData] = useState([]);
  const [otherUserData, setOtherUserData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  
  const [superiorData, setSuperiorData] = useState([]);
  const [otherUserSuperiorData, setOtherUserSuperiorData] = useState([]);
  const [userSuperiorData, setUserSuperiorData] = useState([]);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user_data_res = await Axios.get(BASE_URL + "/ep-getDataOfLoggedInUser");
        setUserData(user_data_res.data);

        const superior_data_res = await Axios.get(BASE_URL + "/ep-getSuperiorDataOfLoggedInUser");
        setSuperiorData(superior_data_res.data);

        const certain_user_data_res = await Axios.get(BASE_URL + "/ep-viewEmployee/" + emp_id)
        setOtherUserData(certain_user_data_res.data);

        const certain_superior_user_data_res = await Axios.get(BASE_URL + "/ep-viewEmployeeSuperior/" + emp_id)
        setOtherUserData(certain_superior_user_data_res.data);

        (theme.hrView ? setEmployeeData(certain_user_data_res.data) : setEmployeeData(user_data_res.data))
        (theme.hrView ? setSuperiorData(certain_superior_user_data_res.data) : setSuperiorData(superior_data_res.data))
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <div className="box-border bg-white p-5 border border-[#e4e4e4] rounded-[15px]">

    {employeeData.map((u) => (
      <div className="box-border grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          className={`box-border min-h-[200px] flex flex-col justify-between border border-[#e4e4e4] bg-white  rounded-[15px] p-5`}
        >
          <div className="box-border flex flex-row items-start">
            <p className={`flex-1 text-[14px] font-medium ${theme.textColor}`}>
              Current Position
            </p>

            <div className="flex-1">
              <p className={`flex-1 text-[14px] ${theme.textColor}`}>
                {u.position_name}
              </p>
              <p className={`flex-1 text-[10px] italic ${theme.textColor}`}>
                Until ????
              </p>
            </div>
          </div>

          <div className="box-border flex flex-row items-start">
            <p className={`flex-1 text-[14px] font-medium ${theme.textColor}`}>
              Division
            </p>

            <p className={`flex-1 text-[14px] ${theme.textColor}`}>
              {u.div_name}
            </p>
          </div>

          <div className="box-border flex flex-row items-start">
            <p className={`flex-1 text-[14px] font-medium ${theme.textColor}`}>
              Department
            </p>

            <p className={`flex-1 text-[14px] ${theme.textColor}`}>
              {u.dept_name}
            </p>
          </div>

          <div className="box-border flex flex-row items-start">
            <p className={`flex-1 text-[14px] font-medium ${theme.textColor}`}>
              Work Email
            </p>

            <p className={`flex-1 text-[14px] ${theme.textColor}`}>
              {u.work_email}
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

          {superiorData.map((s) => (
          <div className="box-border flex flex-row justify-end gap-3 mr-5">
            <div className={`box-border w-16 h-16 rounded-full ${theme.primaryColor} flex justify-center items-center text-white font-bold text-[20px]`}>
              {(s.emp_pic) ? <img className={`box-border w-16 h-16 rounded-full`} src={s.emp_pic}/> : s.f_name.charAt(0) + s.s_name.charAt(0)}
            </div>

            <div>
                <p className={`${theme.textColor} font-medium text-[15px]`}>{s.f_name + " " + s.m_name + " " + s.s_name}</p>
                <p className={`${theme.textColor} text-[13px]`}>{s.position_name}</p>
                <p className={`${theme.textColor} text-[13px] italic`}>{s.work_email}</p>
            </div>
          </div>
          ))}
        </div>
      </div>
    ))}
    </div>
  );
};

export default Role;
