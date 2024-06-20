import Headings from "../../../components/universal/Headings";
import BuildingComponent from "../../../components/universal/BuildingComponent";

const SuggestionBox = () => {
  return (
    <div className="box-border max-w-[1300px] m-auto p-5">
      <Headings text={"Tailored Guidance"} />

      <div className="box-border">
        <BuildingComponent />
      </div>
    </div>
  );
};

export default SuggestionBox;