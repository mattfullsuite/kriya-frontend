import Headings from "../../../components/universal/Headings";
import BuildingComponent from "../../../components/universal/BuildingComponent";

const Tickets = () => {
  return (
    <div className="box-border max-w-[1300px] m-auto">
      <Headings text={"Tickets"} />

      <div className="box-border">
        <BuildingComponent />
      </div>
    </div>
  );
};

export default Tickets;