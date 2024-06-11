import Headings from "../../../components/universal/Headings";
import PayRunNotifications from "./components/PayRunNotification";
import PTOSApproved from "./components/PTOSApproved";
import PayDisputes from "./components/PayDisputes";
import figma from "../../../assets/figma.png";
import BuildingComponent from "../../../components/universal/BuildingComponent";

const PayRunDashboard = () => {
  const ptosData = [
    {
      id: 1,
      empPic: figma,
      name: "Employee Name 1",
      jobTitle: "Software Engineer",
      leaveType: "Sick Leave",
      date: "March 22, 2024",
    },
    {
      id: 2,
      empPic: figma,
      name: "Employee Name 2",
      jobTitle: "Software Engineer",
      leaveType: "Vacation Leave",
      date: "March 22 -26, 2024",
    },
    {
      id: 3,
      empPic: figma,
      name: "Employee Name 3",
      jobTitle: "Software Engineer",
      leaveType: "Emergency Leave",
      date: "March 15-18, 2024",
    },
    {
      id: 4,
      empPic: figma,
      name: "Employee Name 4",
      jobTitle: "Software Engineer",
      leaveType: "Special Leave",
      date: "March 5-8, 2024",
    },
    {
      id: 5,
      empPic: figma,
      name: "Employee Name 5",
      jobTitle: "Software Engineer",
      leaveType: "Sick Leave",
      date: "March 26-28, 2024",
    },
    {
      id: 6,
      empPic: figma,
      name: "Employee Name 6",
      jobTitle: "Software Engineer",
      leaveType: "Sick Leave",
      date: "March 26-28, 2024",
    },
    {
      id: 7,
      empPic: figma,
      name: "Employee Name 7",
      jobTitle: "Software Engineer",
      leaveType: "Sick Leave",
      date: "March 26-28, 2024",
    },
    {
      id: 8,
      empPic: figma,
      name: "Employee Name 8",
      jobTitle: "Software Engineer",
      leaveType: "Sick Leave",
      date: "March 26-28, 2024",
    },
    {
      id: 9,
      empPic: figma,
      name: "Employee Name 9",
      jobTitle: "Software Engineer",
      leaveType: "Sick Leave",
      date: "March 26-28, 2024",
    },
    {
      id: 10,
      empPic: figma,
      name: "Employee Name 10",
      jobTitle: "Software Engineer",
      leaveType: "Sick Leave",
      date: "March 26-28, 2024",
    },
  ];

  const payDisputes = [
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

  const payRunNotifications = [
    {
      empPic: figma,
      empName: "Employee Name",
      action: "Pay Dispute",
      reason: "Pay Run Computation",
      date: "2024-05-03",
    },
    {
      empPic: figma,
      empName: "Employee Name",
      action: "Pay Dispute",
      reason: "Deductions Computation",
      date: "2024-05-03",
    },
    {
      empPic: figma,
      empName: "Employee Name",
      action: "Pay Run",
      reason: "",
      date: "2024-05-02",
    },
    {
      empPic: figma,
      empName: "Employee Name",
      action: "Pay Dispute",
      reason: "Salary Update",
      date: "2024-05-01",
    },
    {
      empPic: figma,
      empName: "Employee Name",
      action: "Pay Dispute",
      reason: "Pay Run Computation",
      date: "2024-05-01",
    },
  ];

  return (
    <>
      <Headings text={"Payrun Management"} />

      {/* <div className="flex flex-col lg:flex-row mt-6 gap-4">
        <PayRunNotifications payRunData={""} />
        <PTOSApproved ptosData={""} />
      </div>
      <PayDisputes payDisputes={""} /> */}
      <BuildingComponent />
    </>
  );
};

export default PayRunDashboard;
