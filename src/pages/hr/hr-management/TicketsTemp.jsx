import BuildingComponent from "../../../components/universal/BuildingComponent";
import Headings from "../../../components/universal/Headings";

const TicketsTemp = () => {
  return (
    <div className="max-w-[1300px] m-auto p-5">
    <Headings text={"Tickets"} />
    <div className="box-border">
      <BuildingComponent />
    </div>
    </div>
  );
};

export default TicketsTemp;
