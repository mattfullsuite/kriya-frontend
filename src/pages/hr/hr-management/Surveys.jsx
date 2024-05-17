import Headings from "../../../components/universal/Headings";
import AnonymousSurveyBuilder from "../components/AnonyomusSurveyBuilder";
import ParticipationByDepartment from "../components/ParticipationByDepartment";
import RecentPulseSurveyReleased from "../components/RecentPulseSurveyReleased";
import SurveyOverview from "../components/SurveyOverview";

const Surveys = () => {
  return (
    <div className="box-border max-w-[1300px] m-auto">
      <Headings text={"Surveys"} />

      <div className="box-border mt-10 grid grid-cols-1 lg:grid-cols-3 gap-y-5 lg:gap-5">
        <div className="box-border flex flex-col gap-5">
          <SurveyOverview />

          <ParticipationByDepartment />

          <RecentPulseSurveyReleased />
        </div>

        <div className="box-border col-span-2">
          <AnonymousSurveyBuilder />
        </div>
      </div>
    </div>
  );
};

export default Surveys;
