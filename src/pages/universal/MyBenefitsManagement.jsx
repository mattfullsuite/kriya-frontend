import Headings from "../../components/universal/Headings";
import BuildingComponent from "../../components/universal/BuildingComponent";

const MyBenefitsManagement = () => {
  return (
    <div className="box-border m-auto max-w-[1300px] p-5">
      <Headings text={"My Benefits Management"} />

      <div className="box-border">
        <BuildingComponent />
      </div>
    </div>
  );
};

export default MyBenefitsManagement;