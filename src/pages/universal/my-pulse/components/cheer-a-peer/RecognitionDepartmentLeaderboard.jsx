import Subheadings from "../../../../../components/universal/Subheadings";

const RecognitionDepartmentLeaderboard = () => {
  return (
    <div className="box-boarder bg-white rounded-[15px] border border-[#e4e4e4] p-5">
      <Subheadings text={"% of Users  Giving or Receiving Recognition"} />

      <div className="box-border flex-1 flex flex-col justify-center gap-7 mt-5">
        <div className="box-border">
          <div className="box-border flex flex-row flex-nowrap justify-between items-center">
            <span className="text-[14px] text-[#363636]">Engineering</span>

            <spa className="text-[#363636] text-[20px]">91%</spa>
          </div>

          <div className="box-border h-3 w-full rounded-full bg-[#E4E4E4] mt-1 relative">
            <div className="box-border transition-all h-full w-[91%] rounded-full bg-[#3EAA43]" />
          </div>
        </div>

        <div className="box-border">
          <div className="box-border flex flex-row flex-nowrap justify-between items-center">
            <span className="text-[14px] text-[#363636]">
              Business Development
            </span>

            <spa className="text-[#363636] text-[20px]">85%</spa>
          </div>

          <div className="box-border h-3 w-full rounded-full bg-[#E4E4E4] mt-1 relative">
            <div className="box-border transition-all h-full w-[85%] rounded-full bg-[#3EAA43]" />
          </div>
        </div>

        <div className="box-border">
          <div className="box-border flex flex-row flex-nowrap justify-between items-center">
            <span className="text-[14px] text-[#363636]">
              Information Security
            </span>

            <spa className="text-[#363636] text-[20px]">82%</spa>
          </div>

          <div className="box-border h-3 w-full rounded-full bg-[#E4E4E4] mt-1 relative">
            <div className="box-border transition-all h-full w-[82%] rounded-full bg-[#3EAA43]" />
          </div>
        </div>

        <div className="box-border">
          <div className="box-border flex flex-row flex-nowrap justify-between items-center">
            <span className="text-[14px] text-[#363636]">
              Finance Operations
            </span>

            <spa className="text-[#363636] text-[20px]">78%</spa>
          </div>

          <div className="box-border h-3 w-full rounded-full bg-[#E4E4E4] mt-1 relative">
            <div className="box-border transition-all h-full w-[78%] rounded-full bg-[#3EAA43]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecognitionDepartmentLeaderboard;
