import Subheadings from "../../../components/universal/Subheadings";

const Chips = ({ text }) => {
  return (
    <div className="box-border flex flex-row justify-center items-center gap-3 bg-[#e4e4e4] py-1 px-2 rounded-[5px]">
      <span className="text-[#363636] text-[12px]">{text}</span>

      <svg viewBox="0 0 5 5" className="w-2">
        <path
          d="M4.37505 0L2.49978 1.875L0.624945 0L0 0.625L1.87483 2.5L0 4.375L0.624945 5L2.49978 3.125L4.37505 5L5 4.375L3.12517 2.5L5 0.625L4.37505 0Z"
          fill="#A9A9A9"
        />
      </svg>
    </div>
  );
};

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

          <div className="box-border bg-[rgb(245,245,245)] border border-[#E0E1D9] rounded-[8px] p-3 flex flex-col gap-3">
            <div className="box-border">
              <p className="text-[#363636] text-[13px] font-medium leading-none">
                Question
              </p>
              <input
                type="text"
                className="bg-white text-[#363636] w-full px-3 py-2 text-[14px] rounded-[5px] border border-[#E4E4E4] focus:border-[#666a40] outline-none mt-2"
                placeholder="Type here"
              />
            </div>

            <div className="box-border">
              <p className="text-[#363636] text-[13px] font-medium leading-none">
                Answers
              </p>
              <input
                type="text"
                className="bg-white text-[#363636] w-full px-3 py-2 text-[14px] rounded-[5px] border border-[#E4E4E4] focus:border-[#666a40] outline-none mt-2"
                placeholder="Type here"
              />

              <button className="flex flex-row jsutify-center items-center gap-1 mt-1 float-end">
                <svg viewBox="0 0 10 10" fill="none" className="w-4">
                  <g clip-path="url(#clip0_1385_9379)">
                    <path
                      d="M5.41675 2.91699H4.58341V4.58366H2.91675V5.41699H4.58341V7.08366H5.41675V5.41699H7.08341V4.58366H5.41675V2.91699Z"
                      fill="#666A40"
                    />
                    <path
                      d="M4.99992 0.833008C2.70242 0.833008 0.833252 2.70217 0.833252 4.99967C0.833252 7.29717 2.70242 9.16634 4.99992 9.16634C7.29742 9.16634 9.16658 7.29717 9.16658 4.99967C9.16658 2.70217 7.29742 0.833008 4.99992 0.833008ZM4.99992 8.33301C3.162 8.33301 1.66659 6.83759 1.66659 4.99967C1.66659 3.16176 3.162 1.66634 4.99992 1.66634C6.83783 1.66634 8.33325 3.16176 8.33325 4.99967C8.33325 6.83759 6.83783 8.33301 4.99992 8.33301Z"
                      fill="#666A40"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1385_9379">
                      <rect width="10" height="10" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-[#666a40] text-[12px] font-medium">
                  Add Choice
                </span>
              </button>
            </div>

            <div className="box-border flex flex-col sm:flex-row justify-between items-center gap-5 mt-5">
              <div className="flex flex-row justify-start items-center gap-5">
                <div className="box-border flex flex-row justify-center items-center gap-1">
                  <input type="checkbox" className="accent-[#666a40]" />

                  <span className="text-[#a9a9a9] text-[13px]">Required</span>
                </div>

                <div className="box-border flex flex-row justify-center items-center gap-1">
                  <input type="checkbox" className="accent-[#666a40]" />

                  <span className="text-[#a9a9a9] text-[13px]">
                    Enable comments
                  </span>
                </div>
              </div>

              <div className="box-border flex flex-row gap-5">
                <button>
                  <svg
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5"
                  >
                    <path
                      d="M13.5 0H6C5.17275 0 4.5 0.67275 4.5 1.5V4.5H1.5C0.67275 4.5 0 5.17275 0 6V13.5C0 14.3273 0.67275 15 1.5 15H9C9.82725 15 10.5 14.3273 10.5 13.5V10.5H13.5C14.3273 10.5 15 9.82725 15 9V1.5C15 0.67275 14.3273 0 13.5 0ZM1.5 13.5V6H9L9.0015 13.5H1.5ZM13.5 9H10.5V6C10.5 5.17275 9.82725 4.5 9 4.5H6V1.5H13.5V9Z"
                      fill="#A9A9A9"
                    />
                  </svg>
                </button>

                <button>
                  <svg
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5"
                  >
                    <path
                      d="M2.25 3.75H1.5V13.5C1.5 13.8978 1.65804 14.2794 1.93934 14.5607C2.22064 14.842 2.60218 15 3 15H10.5C10.8978 15 11.2794 14.842 11.5607 14.5607C11.842 14.2794 12 13.8978 12 13.5V3.75H2.25ZM5.25 12.75H3.75V6H5.25V12.75ZM9.75 12.75H8.25V6H9.75V12.75ZM10.2135 1.5L9 0H4.5L3.2865 1.5H0V3H13.5V1.5H10.2135Z"
                      fill="#A9A9A9"
                    />
                  </svg>
                </button>

                <button>
                  <svg
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5"
                  >
                    <path
                      d="M8.25122 3.75H6.75122V6.75H3.75122V8.25H6.75122V11.25H8.25122V8.25H11.2512V6.75H8.25122V3.75Z"
                      fill="#A9A9A9"
                    />
                    <path
                      d="M7.5 0C3.3645 0 0 3.3645 0 7.5C0 11.6355 3.3645 15 7.5 15C11.6355 15 15 11.6355 15 7.5C15 3.3645 11.6355 0 7.5 0ZM7.5 13.5C4.19175 13.5 1.5 10.8082 1.5 7.5C1.5 4.19175 4.19175 1.5 7.5 1.5C10.8082 1.5 13.5 4.19175 13.5 7.5C13.5 10.8082 10.8082 13.5 7.5 13.5Z"
                      fill="#A9A9A9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="box-border p-3 bg-[rgb(245,245,245)] border border-[#E0E1D9] rounded-[8px] flex flex-col gap-4">
          <div className="box-border">
            <p className="text-[#363636] text-[13px] font-medium leading-none">
              Start Date & Time
            </p>

            <div className="box-border flex flex-row justify-start h-8 gap-3 mt-2">
              <input type="date" className="text-[#363636] outline-none border border-[#e4e4e4] rounded-[8px] px-2 text-[14px]" />

              <input type="time" className="text-[#363636] outline-none border border-[#e4e4e4] rounded-[8px] px-2 text-[14px]" />
            </div>
          </div>

          <div className="box-border">
            <p className="text-[#363636] text-[13px] font-medium leading-none">
              End Date & Time
            </p>

            <div className="box-border flex flex-row justify-start h-8 gap-3 mt-2">
              <input type="date" className="text-[#363636] outline-none border border-[#e4e4e4] rounded-[8px] px-2 text-[14px]" />

              <input type="time" className="text-[#363636] outline-none border border-[#e4e4e4] rounded-[8px] px-2 text-[14px]" />
            </div>
          </div>

          <div className="box-border">
            <div className="flex flex-row justify-between items-center">
              <p className="text-[#363636] text-[13px] leading-none">
                Participants
              </p>

              <div className="box-border flex flex-row items-center gap-2">
                <div className="box-border flex flex-row justify-center items-center gap-1">
                  <input type="checkbox" />

                  <span className="text-[#a9a9a9] text-[13px] leading-none">
                    All
                  </span>
                </div>

                <button className="flex flex-row jsutify-center items-center gap-1 mt-1 float-end">
                  <svg viewBox="0 0 10 10" fill="none" className="w-4">
                    <g clip-path="url(#clip0_1385_9379)">
                      <path
                        d="M5.41675 2.91699H4.58341V4.58366H2.91675V5.41699H4.58341V7.08366H5.41675V5.41699H7.08341V4.58366H5.41675V2.91699Z"
                        fill="#666A40"
                      />
                      <path
                        d="M4.99992 0.833008C2.70242 0.833008 0.833252 2.70217 0.833252 4.99967C0.833252 7.29717 2.70242 9.16634 4.99992 9.16634C7.29742 9.16634 9.16658 7.29717 9.16658 4.99967C9.16658 2.70217 7.29742 0.833008 4.99992 0.833008ZM4.99992 8.33301C3.162 8.33301 1.66659 6.83759 1.66659 4.99967C1.66659 3.16176 3.162 1.66634 4.99992 1.66634C6.83783 1.66634 8.33325 3.16176 8.33325 4.99967C8.33325 6.83759 6.83783 8.33301 4.99992 8.33301Z"
                        fill="#666A40"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1385_9379">
                        <rect width="10" height="10" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-[#666a40] text-[12px] font-medium leading-none">
                    Add Participants
                  </span>
                </button>
              </div>
            </div>

            <div className="box-border bg-white p-2 rounded-[8px] border border-[#e4e4e4] mt-2 flex flex-row flex-wrap justify-start items-start gap-2 min-h-[100px]">
              <Chips text={"Engineering"} />

              <Chips text={"Finance Operations"} />

              <Chips text={"HR"} />

              <Chips text={"Data Operations Associate"} />

              <Chips text={"Business Operations"} />
            </div>
          </div>

          <div className="box-border">
            <div className="flex flex-row justify-between items-center">
              <p className="text-[#363636] text-[13px] leading-none">
                Survey results viewers
              </p>

              <div className="box-border flex flex-row items-center gap-2">
                <div className="box-border flex flex-row justify-center items-center gap-1">
                  <input type="checkbox" />

                  <span className="text-[#a9a9a9] text-[13px] leading-none">
                    All
                  </span>
                </div>

                <button className="flex flex-row jsutify-center items-center gap-1 mt-1 float-end">
                  <svg viewBox="0 0 10 10" fill="none" className="w-4">
                    <g clip-path="url(#clip0_1385_9379)">
                      <path
                        d="M5.41675 2.91699H4.58341V4.58366H2.91675V5.41699H4.58341V7.08366H5.41675V5.41699H7.08341V4.58366H5.41675V2.91699Z"
                        fill="#666A40"
                      />
                      <path
                        d="M4.99992 0.833008C2.70242 0.833008 0.833252 2.70217 0.833252 4.99967C0.833252 7.29717 2.70242 9.16634 4.99992 9.16634C7.29742 9.16634 9.16658 7.29717 9.16658 4.99967C9.16658 2.70217 7.29742 0.833008 4.99992 0.833008ZM4.99992 8.33301C3.162 8.33301 1.66659 6.83759 1.66659 4.99967C1.66659 3.16176 3.162 1.66634 4.99992 1.66634C6.83783 1.66634 8.33325 3.16176 8.33325 4.99967C8.33325 6.83759 6.83783 8.33301 4.99992 8.33301Z"
                        fill="#666A40"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1385_9379">
                        <rect width="10" height="10" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-[#666a40] text-[12px] font-medium leading-none">
                    Add Viewers
                  </span>
                </button>
              </div>
            </div>

            <div className="box-border bg-white p-2 rounded-[8px] border border-[#e4e4e4] mt-2 flex flex-row flex-wrap justify-start items-start gap-2 min-h-[100px]">
              <Chips text={"CEO"} />
              <Chips text={"HR"} />
            </div>
          </div>
        </div>

        <div className="box-border flex flex-col gap-5">
          <div className="box-border">
            <p className="text-[14px] text-[#363636]">Anonymity</p>

            <p className="text-[11px] text-[#B2AC88]">
              Allow employees to answer and send their survey responses
              anonymously.
            </p>

            <label class="inline-flex items-center cursor-pointer gap-2">
              <input type="checkbox" class="sr-only peer" />
              <div
                class="relative w-7 h-4 bg-gray-300 
                            rounded-full peer 
                            peer-checked:after:translate-x-full 
                            rtl:peer-checked:after:-translate-x-full 
                            peer-checked:after:border-white after:content-[''] 
                            after:absolute after:top-[2px] after:start-[2px] 
                            after:bg-white   after:rounded-full after:h-3 
                            after:w-3 after:transition-all  
                            peer-checked:bg-[#666a40]"
              ></div>
              <span className="text-[14px] text-[#363636]">
                Allow anonymous responses
              </span>
            </label>
          </div>

          <div className="box-border">
            <p className="text-[14px] text-[#363636]">Comment replies</p>

            <p className="text-[11px] text-[#B2AC88]">
              Allow survey admins and results viewers to reply to comments.
            </p>

            <label class="inline-flex items-center cursor-pointer gap-2">
              <input type="checkbox" class="sr-only peer" />
              <div
                class="relative w-7 h-4 bg-gray-300 
                            rounded-full peer 
                            peer-checked:after:translate-x-full 
                            rtl:peer-checked:after:-translate-x-full 
                            peer-checked:after:border-white after:content-[''] 
                            after:absolute after:top-[2px] after:start-[2px] 
                            after:bg-white   after:rounded-full after:h-3 
                            after:w-3 after:transition-all  
                            peer-checked:bg-[#666a40]"
              ></div>
              <span className="text-[14px] text-[#363636]">
                Allow comment replies
              </span>
            </label>
          </div>
        </div>

        <button className="bg-[#666a40] text-white p-2 rounded-[8px]">
          Send Survey
        </button>
      </div>
    </div>
  );
};
export default AnonymousSurveyBuilder;
