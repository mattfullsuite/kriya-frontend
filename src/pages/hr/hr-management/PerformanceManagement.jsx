import Headings from "../../../components/universal/Headings";
import BuildingComponent from "../../../components/universal/BuildingComponent";

const PerformanceManagement = () => {
  return (
    <div className="box-border max-w-[1300px] m-auto p-5">
      <Headings text={"Performance Managament"} />

      <div className="box-border">
        <BuildingComponent />
      </div>
    </div>
  );
};

export default PerformanceManagement;