import Headings from "../../../components/universal/Headings";
import BuildingComponent from "../../../components/universal/BuildingComponent";

const WeeklyPulseSurvey = () => {
  return (
    <div className="box-border max-w-[1300px] m-auto">
      <Headings text={"Weekly Pulse Survey"} />

      <div className="box-border">
        <BuildingComponent />
      </div>
    </div>
  );
};

export default WeeklyPulseSurvey;
