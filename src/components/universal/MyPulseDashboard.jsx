import BuildingComponent from "./BuildingComponent";
import Headings from "./Headings";


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