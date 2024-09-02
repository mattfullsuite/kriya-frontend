import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../EmployeeInformation";
import Axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";

const Employment = () => {
  const theme = useContext(ThemeContext);

  const { emp_id } = useParams();
  const [userData, setUserData] = useState([]);
  const [benefits, setBenefits] = useState([])
  const [otherUserData, setOtherUserData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // User View
      const user_data_res = await Axios.get(
        BASE_URL + "/ep-getDataOfLoggedInUser"
      );
      const user_data = user_data_res.data[0];

      // Manager View
      const certain_user_data_res = await Axios.get(
        BASE_URL + "/ep-viewEmployee/" + emp_id
      );

      const benefits_res = await Axios.get(
        BASE_URL + "/ep-getEmployeeRecords/" + emp_id
      )
      setBenefits(benefits_res.data)

      const last_salary_increase_res = await Axios.get(
        BASE_URL + "/es-GetEmployeeLastSalaryIncrease/" + user_data.emp_id
      );
      const last_increase_date =
        last_salary_increase_res.data?.[0]?.increase_date || "N/A";

      // Update userData with last_increase
      const updatedUserData = {
        ...user_data,
        last_increase: last_increase_date,
      };

      // Set the updated data in state
      setUserData(updatedUserData);
      setOtherUserData(certain_user_data_res.data);

      // Decide which view to display
      theme.hrView
        ? setEmployeeData(certain_user_data_res.data)
        : setEmployeeData(updatedUserData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="box-border bg-white p-5 border border-[#e4e4e4] rounded-[15px]">
      <div className="box-border grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div
          className={`box-border border border-[#e4e4e4] bg-white rounded-[15px] min-h-[120px] p-3 flex flex-col justify-between`}
        >
          <p className={`${theme.textColor} text-left text-[14px] font-medium`}>
            Date of Hire
          </p>

          <p className={`${theme.textColor} text-right text-[14px]`}>
            {moment(userData.date_hired).format("MMMM DD, YYYY")}
          </p>
        </div>

        <div
          className={`box-border border border-[#e4e4e4] bg-white rounded-[15px] min-h-[120px] p-3 flex flex-col justify-between`}
        >
          <p className={`${theme.textColor} text-left text-[14px] font-medium`}>
            Date of Regularization
          </p>

          <p className={`${theme.textColor} text-right text-[14px]`}>
            {moment(userData.date_regularization).format("MMMM DD, YYYY")}
          </p>
        </div>

        <div
          className={`box-border border border-[#e4e4e4] bg-white rounded-[15px] min-h-[120px] p-3 flex flex-col justify-between`}
        >
          <p className={`${theme.textColor} text-left text-[14px] font-medium`}>
            Last Salary Increase
          </p>

          <p className={`${theme.textColor} text-right text-[14px]`}>
            {userData.last_increase != "N/A"
              ? moment(userData.last_increase).format("MMMM DD, YYYY")
              : "N/A"}
          </p>
        </div>
      </div>

      <hr className="my-5" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

      {benefits.map((b) => (
        <div
          className={`border border-[#e4e4e4] bg-white min-h-[150px] rounded-[15px] p-5 flex flex-col justify-between`}
        >
          <div className="box-border flex flex-row justify-start items-center gap-3">
            <img
              src={
                theme.hrView
                  ? `../../../images/${b.contribution_name}_logo.png`
                  : `../images/${b.contribution_name}_logo.png`
              }
              className="h-7 object-contain"
            />
            <p className={`${theme.textColor} text-[16px] font-medium`}>
              {b.contribution_name + " No."}
            </p>
          </div>

          <div className="box-border flex flex-row justify-end items-center gap-3">
            <p className={`${theme.textColor} text-[16px]`}>
              {b.contribution_account_id}
            </p>

            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-[#8b8b8b]"
              >
                <path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path>
              </svg>
            </button>
          </div>
        </div>
        ))}
        
      </div>


    </div>
  );
};

export default Employment;
