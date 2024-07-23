import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const MonthlyPayrollFrequency = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [payFrequency, setPayFrequency] = useState({});
  const inputPayFreqRef = useRef();
  const buttonEditRef = useRef();
  const buttonSaveRef = useRef();

  useEffect(() => {
    getPayFreq();
  }, []);

  const handleInputPayFrequency = (value) => {
    setPayFrequency((prevData) => ({
      ...prevData,
      configuration_value: value,
    }));
  };

  const handleEditClick = () => {
    inputPayFreqRef.current.disabled = false;
    buttonEditRef.current.style.display = "none";
    buttonSaveRef.current.style.display = "block";
  };
  const handleSaveClick = () => {
    updatePayFrequency();

    inputPayFreqRef.current.disabled = true;
    buttonEditRef.current.style.display = "block";
    buttonSaveRef.current.style.display = "none";
  };

  const getPayFreq = async () => {
    try {
      const configuration_name = "Monthly Payroll Frequency";
      const response = await axios.get(
        BASE_URL + `/comp-config-GetCompanyConfiguration/${configuration_name}`
      );
      if (response.status === 200) {
        setPayFrequency(response.data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updatePayFrequency = () => {
    try {
      toast.promise(
        axios.patch(
          `${BASE_URL}/comp-config-UpdateCompanyConfiguration/${payFrequency.company_configuration_id}`,
          payFrequency
        ),
        {
          pending: "Updating pay frequency...",
          success: {
            render: "Pay Frequency updated successfully!",
            autoClose: 3000,
          },
          error: {
            render: "Failed to update number of pay frequency",
            autoClose: 5000,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="p-5 w-full h-fit bg-white border-2 border-gray-200 border-solid rounded-lg">
        <ToastContainer />
        <h1 className="text-2xl font-bold">Monthly Payroll Frequency</h1>
        Set the number of payroll frequency per month.
        <div className="flex gap-2 mt-6">
          <input
            type="number"
            name="num_work_days"
            ref={inputPayFreqRef}
            value={payFrequency.configuration_value}
            className="px-2 w-full border"
            onChange={(e) => handleInputPayFrequency(e.target.value)}
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

export default MonthlyPayrollFrequency;
