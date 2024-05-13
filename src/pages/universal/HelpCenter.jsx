import Headings from "../../components/universal/Headings";
import BuildingComponent from "../../components/universal/BuildingComponent";

const HelpCenter = () => {
  return (
    <div className="box-border m-auto max-w-[1300px]">
      <Headings text={"Help Center"} />

      <div className="box-border">
        <BuildingComponent />
      </div>
    </div>
  );
};

export default HelpCenter;
