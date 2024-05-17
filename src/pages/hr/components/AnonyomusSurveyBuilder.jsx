import Subheadings from "../../../components/universal/Subheadings";

const AnonymousSurveyBuilder = () => {
  return (
    <div className="box-border bg-white border border-[#e4e4e4] rounded-[15px] py-5 px-8">
      <Subheadings text={"Anonymous Survey Builder"} />

      <div className="box-border mt-5 flex flex-col gap-5">
        <div>
          <p className="text-[#363636] text-[14px]">Title</p>
          <input
            type="text"
            className="bg-[#F5F5F5] text-[#363636] w-full px-3 py-2 text-[14px] rounded-[5px] border border-[#E4E4E4] focus:border-[#666a40] outline-none mt-2"
            placeholder="Type here"
          />
        </div>

        <div>
          <p className="text-[#363636] text-[14px]">Description</p>
          <input
            type="text"
            className="bg-[#F5F5F5] text-[#363636] w-full px-3 py-2 text-[14px] rounded-[5px] border border-[#E4E4E4] focus:border-[#666a40] outline-none mt-2"
            placeholder="Type here"
          />
        </div>

        <div>
          <p className="text-[#363636] text-[14px]">Question 1</p>
          <div className="box-border bg-[#F5F5F5] border border-[#E0E1D9] rounded-[8px] p-3">

          </div>
        </div>
      </div>
    </div>
  );
};
export default AnonymousSurveyBuilder;
