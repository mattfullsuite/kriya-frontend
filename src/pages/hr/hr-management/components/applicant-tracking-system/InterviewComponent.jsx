const InterviewComponent = ({ stage, bgColor, hoverColor, focusBorder }) => {
  return (
    <div className="bg-white border border-[#e4e4e4] rounded-[15px]">
      <div className="flex">
        <div className="p-5 border-r border-[#e4e4e4] w-[40%]">
          <p className="text-[20px] font-medium text-[#363636]">
            Interview Notes and Feedbacks
          </p>

          <div className="mt-3 flex flex-row justify-start items-center gap-5">
            <span className="text-[14px] text-[#363636]">Interview 1</span>

            <select className="outline-none text-[14px] text-[#363636] border border-[#363636] rounded-[5px] px-2">
              <option>Pending</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
        </div>

        <div className="p-5 flex-1">
          <div className="w-full flex flex-row justify-start items-center">
            <span className="text-[#8b8b8b] text-[14px] w-[30%]">
              Date of Interview
            </span>

            <input
              type="date"
              className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] rounded-[5px] p-[2px] w-[150px]"
              value={"02/25/2024"}
            />
          </div>

          <div className="w-full flex flex-row justify-start items-center mt-3">
            <span className="text-[#8b8b8b] text-[14px] w-[30%]">
              Interviewer
            </span>

            <input
              type="text"
              className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] rounded-[5px] p-[2px] w-[150px]"
              value={"Percy Veniegas"}
              readOnly={true}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 border-t border-[#e4e4e4] flex flex-col h-[500px]">
        {/* conversation scrollable */}
        <div className="flex-1 p-5 overflow-auto flex flex-col gap-3">
          {/* timestamp */}
          <div className="flex flex-row justify-center items-center gap-2">
            <div className="flex-1 border-t border-[#8b8b8b]" />
            <span className="text-[#8b8b8b] text-[12px]">January 20, 2024</span>
            <div className="flex-1 border-t border-[#8b8b8b]" />
          </div>
          {/* end of timestamp */}

          {/* bubble post */}
          <div className="rounded-[15px] bg-[#F7F7F7] p-5">
            <div className="flex flex-row justify-between items-center">
              <div className="flex justify-start items-center gap-2">
                <div
                  className={`${bgColor} w-10 h-10 rounded-full text-white font-bold flex justify-center items-center`}
                >
                  IV
                </div>

                <span className="text-[14px] font-medium text-[#363636]">
                  Ivan Percival Veniegas
                </span>
              </div>

              <span className="text-[12px] text-[#8b8b8b]">4:00 PM</span>
            </div>

            <p className="mt-5 text-[14px] text-[#363636]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id,
              maxime deserunt. Aliquam optio obcaecati repudiandae odit eos
              dicta quam amet! Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Cumque molestiae aperiam blanditiis ea pariatur
              debitis magnam unde tenetur rerum assumenda eum quas neque
              corporis reiciendis quia explicabo sint dignissimos eos
              voluptates, ratione quasi perspiciatis laboriosam voluptas!
              Pariatur porro voluptas, tenetur dignissimos nemo ipsam illum
              veniam, neque rem vel, blanditiis consequatur.
            </p>
          </div>
          {/* end of bubble post */}

          {/* timestamp */}
          <div className="flex flex-row justify-center items-center gap-2">
            <div className="flex-1 border-t border-[#8b8b8b]" />
            <span className="text-[#8b8b8b] text-[12px]">Today</span>
            <div className="flex-1 border-t border-[#8b8b8b]" />
          </div>
          {/* end of timestamp */}

          {/* bubble post */}
          <div className="rounded-[15px] bg-[#F7F7F7] p-5">
            <div className="flex flex-row justify-between items-center">
              <div className="flex justify-start items-center gap-2">
                <div
                  className={`${bgColor} w-10 h-10 rounded-full text-white font-bold flex justify-center items-center`}
                >
                  IV
                </div>

                <span className="text-[14px] font-medium text-[#363636]">
                  Ivan Percival Veniegas
                </span>
              </div>

              <span className="text-[12px] text-[#8b8b8b]">4:00 PM</span>
            </div>

            <p className="mt-5 text-[14px] text-[#363636]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id,
              maxime deserunt. Aliquam optio obcaecati repudiandae odit eos
              dicta quam amet! Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Cumque molestiae aperiam blanditiis ea pariatur
              debitis magnam unde tenetur rerum assumenda eum quas neque
              corporis reiciendis quia explicabo sint dignissimos eos
              voluptates, ratione quasi perspiciatis laboriosam voluptas!
              Pariatur porro voluptas, tenetur dignissimos nemo ipsam illum
              veniam, neque rem vel, blanditiis consequatur.
            </p>
          </div>
          {/* end of bubble post */}
        </div>
        {/* end of conversation scrollable */}

        <div className="p-3 border-t border-[#e4e4e4] flex gap-2">
          <input className={`transition-all ease-in-out flex-1 outline-none border border-[#e4e4e4] rounded-[8px] px-3 py-2 text-[14px] text-[#363636] ${focusBorder}`} placeholder="Type here" />

          <button
            className={`outline-none ${bgColor} text-[14px] text-white rounded-[8px] px-3`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewComponent;
