import Headings from "../../components/universal/Headings";
import BuildingComponent from "../../components/universal/BuildingComponent";

const MyPerformance = () => {
  return(
    <div className="box-border m-auto max-w-[1300px]">
      <Headings text={"My Performance"} />

      <div className="box-border">
        <BuildingComponent />
      </div>
    </div>
  );
};

export default MyPerformance;