import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const MonthlyWorkingDays = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const inputNumDaysRef = useRef();
  const buttonEditRef = useRef();
  const buttonSaveRef = useRef();

  const [numWorkDays, setNumWorkDays] = useState({});

  const handleEditClick = () => {
    inputNumDaysRef.current.disabled = false;
    buttonEditRef.current.style.display = "none";
    buttonSaveRef.current.style.display = "block";
  };
  const handleSaveClick = () => {
    updateNumWorkDays();

    inputNumDaysRef.current.disabled = true;
    buttonEditRef.current.style.display = "block";
    buttonSaveRef.current.style.display = "none";
  };

  const getNumWorkDays = async () => {
    try {
      const response = await axios.get(
        BASE_URL + "/comp-config-GetCompanyConfiguration"
      );
      if (response.status === 200) {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].configuration_name === "Monthly Working Days") {
            setNumWorkDays(response.data[i]);
            break;
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateNumWorkDays = async () => {
    try {
      toast.promise(
        axios.patch(
          `${BASE_URL}/comp-config-UpdateCompanyConfiguration/${numWorkDays.company_configuration_id}`,
          numWorkDays
        ),
        {
          pending: "Updating number of working days...",
          success: {
            render: "Number of working days updated successfully!",
            autoClose: 3000,
          },
          error: {
            render: "Failed to update number of working days",
            autoClose: 5000,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputNumWorkDays = (input) => {
    setNumWorkDays((prevData) => ({ ...prevData, configuration_value: input }));
  };

  useEffect(() => {
    getNumWorkDays();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="mt-10 p-5 w-full h-fit lg:w-1/2 lg:max-h-1/2 bg-white border-2 border-gray-200 border-solid rounded-lg">
        <h1 className="text-2xl font-bold">Monthly Working Days</h1>
        Set the number of working days per month.
        <div className="flex gap-2 mt-6">
          <input
            type="number"
            name="num_work_days"
            ref={inputNumDaysRef}
            value={numWorkDays.configuration_value}
            className="px-2 w-full border"
            onChange={(e) => handleInputNumWorkDays(e.target.value)}
            disabled
          />
          <button
            ref={buttonEditRef}
            className="btn w-20 bg-[#666A40] shadow-md text-white hover:bg-[#666A40] hover:opacity-60"
            onClick={() => handleEditClick()}
          >
            Edit
          </button>
          <button
            ref={buttonSaveRef}
            className="btn w-20 bg-[#666A40] shadow-md text-white hover:bg-[#666A40] hover:opacity-60 hidden"
            onClick={() => handleSaveClick()}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default MonthlyWorkingDays;