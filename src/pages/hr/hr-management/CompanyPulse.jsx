import Headings from "../../../components/universal/Headings";
import Subheadings from "../../../components/universal/Subheadings";
import CompanyWideCheersMetrics from "../components/CompanyWideCheersMetrics";
import CompanyWidePulseMetrics from "../components/CompanyWidePulseMetrics";
import DepartmentCheersMetrics from "../components/DepartmentCheersMetrics";
import DepartmentPulseMetrics from "../components/DepartmentPulseMetrics";

const CompanyPulse = () => {
  ///cp-getCompanyPulse
  return (
    <div className="box-border max-w-[1300px] m-auto">
      <Headings text={"Company Pulse"} />

      <div className="box-border mt-10">
        <div className="box-border mb-3 mx-[15px]">
          <Subheadings text={"Pulse Metrics"} />
        </div>

        <div className="box-border grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-[700px]">
          <CompanyWidePulseMetrics />

          <DepartmentPulseMetrics />
        </div>
      </div>

      <div className="box-border mt-10">
        <div className="box-border mb-3 mx-[15px]">
          <Subheadings text={"Cheers Metrics"} />
        </div>

        <div className="box-border grid grid-cols-1 lg:grid-cols-2 gap-5">
          <CompanyWideCheersMetrics />

          <DepartmentCheersMetrics />
        </div>
      </div>
    </div>
  );
};

export default CompanyPulse;
