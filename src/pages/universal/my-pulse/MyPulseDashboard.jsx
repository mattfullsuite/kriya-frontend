import BuildingComponent from "../../../components/universal/BuildingComponent";
import Headings from "../../../components/universal/Headings";

const MyPulseDashboard = ({ color }) => {
  return (
    <div className="max-w-[1300px] m-auto p-5">
      <Headings text={"My Pulse"} />

      <div className="box-border">
        <BuildingComponent />
      </div>
    </div>
  );
};

export default MyPulseDashboard;
