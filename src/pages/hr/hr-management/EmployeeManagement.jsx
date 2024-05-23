import Headings from "../../../components/universal/Headings";
import { useState, useRef } from "react";
import AllEmployees from "../components/AllEmployees";
import OnboardingEmployees from "../components/OnboardingEmployees";
import ProbationaryEmployees from "../components/ProbationaryEmployees";
import RegularEmployees from "../components/RegularEmployees";
import OffboardingEmployees from "../components/OffboardingEmployees";

const EmployeeManagement = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="box-border max-w-[1300px] m-auto">
      <Headings text={"Employee Management"} />

      <div
        className={`box-border w-full bg-[#EAECDB] p-2 rounded-[12px] flex flex-row justify-between overflow-x-auto max-w-[900px] m-auto mt-10`}
      >
        <button
          onClick={() => {
            setActiveTab(1);
          }}
          className={`text-[13px] flex-1 px-3 py-2 rounded-[6px] select-none ${
            activeTab === 1 ? `bg-[#676b41] text-white` : `text-[#666A40]`
          }`}
        >
          All
        </button>

        <button
          onClick={() => {
            setActiveTab(2);
          }}
          className={`text-[13px] flex-1 px-3 py-2 rounded-[6px] select-none ${
            activeTab === 2 ? `bg-[#676b41] text-white` : `text-[#666A40]`
          }`}
        >
          Onboarding
        </button>

        <button
          onClick={() => {
            setActiveTab(3);
          }}
          className={`text-[13px] flex-1 px-3 py-2 rounded-[6px] select-none ${
            activeTab === 3 ? `bg-[#676b41] text-white` : `text-[#666A40]`
          }`}
        >
          Probationary
        </button>

        <button
          onClick={() => {
            setActiveTab(4);
          }}
          className={`text-[13px] flex-1 px-3 py-2 rounded-[6px] select-none ${
            activeTab === 4 ? `bg-[#676b41] text-white` : `text-[#666A40]`
          }`}
        >
          Regular
        </button>

        <button
          onClick={() => {
            setActiveTab(5);
          }}
          className={`text-[13px] flex-1 px-3 py-2 rounded-[6px] select-none ${
            activeTab === 5 ? `bg-[#676b41] text-white` : `text-[#666A40]`
          }`}
        >
          Offboarding
        </button>
      </div>

      {activeTab === 1 ? (
        <AllEmployees />
      ) : activeTab === 2 ? (
        <OnboardingEmployees />
      ) : activeTab === 3 ? (
        <ProbationaryEmployees />
      ) : activeTab === 4 ? (
        <RegularEmployees />
      ) : activeTab === 5 ? (
        <OffboardingEmployees />
      ) : null}
    </div>
  );
};

export default EmployeeManagement;
