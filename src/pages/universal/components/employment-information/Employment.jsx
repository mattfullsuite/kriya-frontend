import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../EmployeeInformation";
import Axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";

const Employment = () => {
  const theme = useContext(ThemeContext);

  const { emp_id } = useParams();
  const [userData, setUserData] = useState([]);
  const [otherUserData, setOtherUserData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user_data_res = await Axios.get(BASE_URL + "/ep-getDataOfLoggedInUser");
        setUserData(user_data_res.data);

        const certain_user_data_res = await Axios.get(BASE_URL + "/ep-viewEmployee/" + emp_id)
        setOtherUserData(certain_user_data_res.data);

        (theme.hrView ? setEmployeeData(certain_user_data_res.data) : setEmployeeData(user_data_res.data))
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, []);

  return (

    <div className="box-border bg-white p-5 border border-[#e4e4e4] rounded-[15px]">
      {employeeData.map((u) => (
      <div className="box-border grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div
          className={`box-border border border-[#e4e4e4] bg-white rounded-[15px] min-h-[120px] p-3 flex flex-col justify-between`}
        >
          <p className={`${theme.textColor} text-left text-[14px] font-medium`}>
            Date of Hire
          </p>

          <p className={`${theme.textColor} text-right text-[14px]`}>
            {moment(u.date_hired).format("MMMM DD, YYYY")}
          </p>
        </div>

        <div
          className={`box-border border border-[#e4e4e4] bg-white rounded-[15px] min-h-[120px] p-3 flex flex-col justify-between`}
        >
          <p className={`${theme.textColor} text-left text-[14px] font-medium`}>
            Date of Regularization
          </p>

          <p className={`${theme.textColor} text-right text-[14px]`}>
            {moment(u.date_regularization).format("MMMM DD, YYYY")}
          </p>
        </div>

        <div
          className={`box-border border border-[#e4e4e4] bg-white rounded-[15px] min-h-[120px] p-3 flex flex-col justify-between`}
        >
          <p className={`${theme.textColor} text-left text-[14px] font-medium`}>
            Last Salary Increase
          </p>

          <p className={`${theme.textColor} text-right text-[14px]`}>
          {/* {moment(u.date_hired).format("MMMM DD, YYYY")} */}
          </p>
        </div>
      </div>
      ))}

      <hr className="my-5" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div
          className={`border border-[#e4e4e4] bg-white min-h-[150px] rounded-[15px] p-5 flex flex-col justify-between`}
        >
          <div className="box-border flex flex-row justify-start items-center gap-3">
            <img
              src={theme.hrView ? "../../../images/sss_logo.png" : "../images/sss_logo.png"}
              className="h-7 object-contain"
            />
            <p className={`${theme.textColor} text-[16px] font-medium`}>
              SSS No.
            </p>
          </div>

          <div className="box-border flex flex-row justify-end items-center gap-3">
            <p className={`${theme.textColor} text-[16px]`}>
            {/* {moment(u.date_hired).format("MMMM DD, YYYY")} */}
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

        <div
          className={`border border-[#e4e4e4] bg-white min-h-[150px] rounded-[15px] p-5 flex flex-col justify-between`}
        >
          <div className="box-border flex flex-row justify-start items-center gap-3">
            <img
              src={theme.hrView ? "../../../images/pagibig_logo.png" : "../images/pagibig_logo.png"}
              className="h-7 object-contain"
            />
            <p className={`${theme.textColor} text-[16px] font-medium`}>
              HDMIF No.
            </p>
          </div>

          <div className="box-border flex flex-row justify-end items-center gap-3">
            <p className={`${theme.textColor} text-[16px]`}>
            {/* {moment(u.date_hired).format("MMMM DD, YYYY")} */}
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

        <div
          className={`border border-[#e4e4e4] bg-white min-h-[150px] rounded-[15px] p-5 flex flex-col justify-between`}
        >
          <div className="box-border flex flex-row justify-start items-center gap-3">
            <img
              src={theme.hrView ? "../../../images/philhealth_logo.png" : "../images/philhealth_logo.png"}
              className="h-7 object-contain"
            />
            <p className={`${theme.textColor} text-[16px] font-medium`}>
              PHIC No.
            </p>
          </div>

          <div className="box-border flex flex-row justify-end items-center gap-3">
            <p className={`${theme.textColor} text-[16px]`}>
              {/* {moment(u.date_hired).format("MMMM DD, YYYY")} */}
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

        <div
          className={`border border-[#e4e4e4] bg-white min-h-[150px] rounded-[15px] p-5 flex flex-col justify-between`}
        >
          <div className="box-border flex flex-row justify-start items-center gap-3">
            <img
              src={theme.hrView ? "../../../images/bir_logo.png" : "../images/bir_logo.png"}
              className="h-7 object-contain"
            />
            <p className={`${theme.textColor} text-[16px] font-medium`}>
              TIN
            </p>
          </div>

          <div className="box-border flex flex-row justify-end items-center gap-3">
            <p className={`${theme.textColor} text-[16px]`}>
            {/* {moment(u.date_hired).format("MMMM DD, YYYY")} */}
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
      </div>
    </div>
  );
};

export default Employment;
