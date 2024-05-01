import Headings from "../../../components/universal/Headings";
import PayRunNotifications from "./components/PayRunNotification";
import PTOSApproved from "./components/PTOSApproved";
import PayDisputes from "./components/PayDisputes";
import figma from "../../../assets/figma.png";
const PayRunDashboard = () => {
  let payDisputes = [
    {
      id: 1,
      empPic: figma,
      name: "Employee 1",
      department: "Department",
      issueRaised: "Payroll Computation",
      dateRaised: "April 22, 2024",
      dateClosed: "--",
      handledBy: "--",
      status: "New",
    },
    {
      id: 2,
      empPic: figma,
      name: "Employee 2",
      department: "Department",
      issueRaised: "Earnings Computation",
      dateRaised: "April 22, 2024",
      dateClosed: "--",
      handledBy: "PR Accountant Name",
      status: "Pending",
    },
    {
      id: 3,
      empPic: figma,
      name: "Employee 3",
      department: "Department",
      issueRaised: "Deductions Computation",
      dateRaised: "April 19, 2024",
      dateClosed: "--",
      handledBy: "PR Accountant Name",
      status: "Resolved",
    },
    {
      id: 4,
      empPic: figma,
      name: "Employee 4",
      department: "Department",
      issueRaised: "Payroll Computation",
      dateRaised: "April 20, 2024",
      dateClosed: "April 20, 2024",
      handledBy: "PR Accountant Name",
      status: "Closed",
    },
    {
      id: 5,
      empPic: figma,
      name: "Employee 5",
      department: "Department",
      issueRaised: "Payroll Computation",
      dateRaised: "April 10, 2024",
      dateClosed: "April 12, 2024",
      handledBy: "PR Accountant Name",
      status: "Closed",
    },
  ];

  return (
    <>
      <Headings text={"Pay Run Dashboard"} />

      <div className="flex flex-col lg:flex-row mt-6 gap-4">
        <PayRunNotifications />
        <PTOSApproved />
      </div>
      <PayDisputes payDisputes={payDisputes} />
    </>
  );
};

export default PayRunDashboard;
