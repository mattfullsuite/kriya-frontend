import BuildingComponent from "../../../components/universal/BuildingComponent";
import Headings from "../../../components/universal/Headings";

const MyPulseDashboard = ({ color }) => {
  return (
    <>
      <Headings text={"My Pulse"} />

      <div className="box-border">
        <BuildingComponent />
      </div>
    </>
  );
};

export default MyPulseDashboard;
