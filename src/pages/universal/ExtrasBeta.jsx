import ClientSideBar from "../../components/client/ClientSideBar";
import SpeechToText from "../hr/SpeechToText";
import Headings from "../../components/universal/Headings";
const ExtrasBeta = () => {
  return (
    <>
      <div className="flex flex-col bg-[#f7f7f7]">
        <Headings text={"Extras"} />

        <div className="flex flex-row justify-between items-center mx-3 ">
          <span className="font-bold text-[#363636] text-[16px]">
            Meetings - Speech to Text
          </span>
        </div>

        <div className="bg-white box-border w-full p-3 rounded-[15px] border border-[#E4E4E4] mt-2 flex flex-col md:flex-row justify-between gap-5 min-h-[300px]">
          <SpeechToText />
        </div>
      </div>
    </>
  );
};

export default ExtrasBeta;
