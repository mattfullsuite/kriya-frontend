import Headings from "../../components/universal/Headings";
import BuildingComponent from "../../components/universal/BuildingComponent";

const AcademyCourses = () => {
  return (
    <div className="box-border m-auto max-w-[1300px] p-5">
      <Headings text={"Academy Courses"} />

      <div className="box-border">
        <BuildingComponent />
      </div>
    </div>
  );
};

export default AcademyCourses;
