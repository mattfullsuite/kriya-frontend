import BuildingComponent from "../../components/universal/BuildingComponent.jsx";
import Headings from "../../components/universal/Headings";

const ManagePayrollDashboard = () => {
  return (
    <>
      <Headings text={"Manage Payroll"} />

      <div className="box-border">
        <BuildingComponent />
      </div>
    </>
  );
};
export default ManagePayrollDashboard;
