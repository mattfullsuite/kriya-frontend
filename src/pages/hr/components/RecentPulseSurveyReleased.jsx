import Subheadings from "../../../components/universal/Subheadings";

const ListTile = ({title, creator, dateCreated, responseCount, commentsCount, detailsLink}) => {
  return (
    <div className="box-border bg-[#f4f4f4] p-2 rounded-[8px] flex flex-col gap-3">
      <div className="box-border flex flex-row justify-between items-start">
        <div className="box-border">
          <p className="text-[#666a40] font-bold text-[15px]">{title}</p>
          <p className="text-[12px] text-[#8b8b8b] leading-none">{"Created by " + creator}</p>
        </div>

        <span className="text-[#8b8b8b] text-[11px]">{dateCreated}</span>
      </div>

      <div className="box-border flex flex-row justify-between items-center">
        <div className="box-border flex flex-row justify-start items-center gap-3">
          <p className="text-[12px] text-[#363636]">
            <span className="text-[14px] font-bold">{responseCount}</span> responses
          </p>

          <p className="text-[12px] text-[#363636]">
            <span className="text-[14px] font-bold">{commentsCount}</span> comments
          </p>
        </div>

        <p className="text-[12px] text-[#8b8b8b] underline">View Details</p>
      </div>
    </div>
  );
};

const RecentPulseSurveyReleased = () => {
  return (
    <div className="box-border bg-white border border-[#e4e4e4] rounded-[15px] p-3">
      <Subheadings text={"Recent Pulse Survey Released"} />

      <div className="box-border flex flex-col gap-2 mt-5">
        <ListTile title={"Weekly Pulse Survey"} creator={"HR Name 1"} dateCreated={"2 hours ago"} responseCount={58} commentsCount={10} />

        <ListTile title={"Weekly Pulse Survey"} creator={"HR Name 1"} dateCreated={"2 hours ago"} responseCount={58} commentsCount={10} />

        <ListTile title={"Weekly Pulse Survey"} creator={"HR Name 1"} dateCreated={"2 hours ago"} responseCount={58} commentsCount={10} />

        <ListTile title={"Weekly Pulse Survey"} creator={"HR Name 1"} dateCreated={"2 hours ago"} responseCount={58} commentsCount={10} />

        <ListTile title={"Weekly Pulse Survey"} creator={"HR Name 1"} dateCreated={"2 hours ago"} responseCount={58} commentsCount={10} />
      </div>
    </div>
  );
};

export default RecentPulseSurveyReleased;
