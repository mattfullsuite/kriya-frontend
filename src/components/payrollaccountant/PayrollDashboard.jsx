import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function PayrollDashboard() {
//   const navigate = useNavigate();
const [loading, setLoading] = useState(true);
//   const userDataCookie = Cookies.get("userData");

//   useEffect(() => {
//     checkUserData();
//   }, [navigate]);

//   const checkUserData = () => {

//     if (!userDataCookie) {
//       navigate("/login");
//     } else {
//       setLoading(true);
//     }
//   };
  return (
    <>
      {loading &&
        <>
          <div className="flex lg:flex-row flex-col">
            <Link
                  to="/tsekpay-run"
                  className="flex items-center text-gray-900 rounded-lg"
                >
              <div className="flex flex-col lg:w-[100%]">
                <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-col items-center justify-center">
                  <h1 className="text-xl font-semibold mb-4">
                    Generate Pay Run
                  </h1>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-24 h-24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>

                </div>
              </div>
            </Link>
            <div className="m-2 p-3 border-2 lg:w-[70%] border-gray-200 border-solid rounded-lg  flex flex-col">
              <h1>Important Dates</h1>
            </div>
          </div>
        </>
      }
    </>
  );
}

export default PayrollDashboard;