const TeamAbsencesRate = () => {
  return (
    <div className="box-border flex-1 bg-white border border-[#E4E4E4] p-5 rounded-[15px]">
      <p className=" font-bold text-[#008080] text-[14px] text-left">
        <div className="flex flex-row justify-between items-center pb-5">
          <p className=" font-bold text-[#008080] text-[14px] text-left">
            Team Absences Rate
          </p>

          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-[#a6a6a6]"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
            </svg>
          </button>
        </div>

        {/* <select className="outline-none focus:outline-none border border-[#e4e4e4] text-[14px] px-3 py-2 rounded-[8px] text-[#363636] font-normal float-right mb-3">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Anually</option>
          </select> */}

        <Radar data={radarData} options={radarOptions} />
      </p>
    </div>
  );
};

export default TeamAbsencesRate;
