import Subheadings from "../../../components/universal/Subheadings";

const ParticipationByDepartment = () => {
  return (
    <div className="box-border bg-white border border-[#e4e4e4] rounded-[15px] p-3">
      <Subheadings text={"Participation By Department"} />

      <div className="box-border flex flex-col justify-center gap-5 mt-5">
        <div className="box-border">
          <div className="box-border flex flex-row flex-nowrap justify-between items-center">
            <span className="text-[14px] text-[#363636]">Engineering</span>

            <spa className="text-[#363636] text-[20px] font-bold">91%</spa>
          </div>

          <div className="box-border h-3 w-full rounded-full bg-[#E4E4E4] mt-1 relative">
            <div className="box-border transition-all h-full w-[91%] rounded-full bg-[#666a40]" />
          </div>
        </div>

        <div className="box-border">
          <div className="box-border flex flex-row flex-nowrap justify-between items-center">
            <span className="text-[14px] text-[#363636]">
              Business Development
            </span>

            <spa className="text-[#363636] text-[20px] font-bold">85%</spa>
          </div>

          <div className="box-border h-3 w-full rounded-full bg-[#E4E4E4] mt-1 relative">
            <div className="box-border transition-all h-full w-[85%] rounded-full bg-[#666a40]" />
          </div>
        </div>

        <div className="box-border">
          <div className="box-border flex flex-row flex-nowrap justify-between items-center">
            <span className="text-[14px] text-[#363636]">
              Information Security
            </span>

            <spa className="text-[#363636] text-[20px] font-bold">82%</spa>
          </div>

          <div className="box-border h-3 w-full rounded-full bg-[#E4E4E4] mt-1 relative">
            <div className="box-border transition-all h-full w-[82%] rounded-full bg-[#666a40]" />
          </div>
        </div>

        <div className="box-border">
          <div className="box-border flex flex-row flex-nowrap justify-between items-center">
            <span className="text-[14px] text-[#363636]">
              Finance Operations
            </span>

            <spa className="text-[#363636] text-[20px] font-bold">78%</spa>
          </div>

          <div className="box-border h-3 w-full rounded-full bg-[#E4E4E4] mt-1 relative">
            <div className="box-border transition-all h-full w-[78%] rounded-full bg-[#666a40]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipationByDepartment;
