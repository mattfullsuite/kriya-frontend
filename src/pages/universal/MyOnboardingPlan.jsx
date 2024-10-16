import Headings from "../../components/universal/Headings";
import Subheadings from "../../components/universal/Subheadings";

const MyOnboardingPlan = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  accentColor,
  lightColor,
  focusBorder,
  progressColor,
}) => {
  return (
    <div className="m-auto max-w-[1300px] p-5">
      <Headings text={"My Onboarding Plan"} />

      <div className="mt-10">
        <div className="ml-[15px]">
          <Subheadings text={"My Role Details"} />
        </div>

        <div className="bg-white border border-[#e4e4e4] p-5 rounded-[15px] mt-3 flex flex-col xl:flex-row gap-5">
          <div className="w-full xl:w-[250px] flex flex-col justify-center items-center">
            <img
              className="h-24 w-24 rounded-full"
              src="https://avatars.slack-edge.com/2024-09-02/7664796085156_92cb8acb16a3e3d8fe21_192.jpg"
            />

            <span className="text-[20px] font-bold text-[#363636] leading-none mt-3">
              Marvin Bautista
            </span>
            <span className="text-[14px] text-[#8b8b8b] italic">
              Software Engineer
            </span>

            <div className="flex flex-row items-center gap-1 mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 fill-[#363636]"
              >
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"></path>
              </svg>
              <span className="text-[14px] text-[#363636]">
                marvin@fullsuite.ph
              </span>
            </div>

            <div className="flex flex-row items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 fill-[#363636]"
              >
                <path d="M20 6h-3V4c0-1.103-.897-2-2-2H9c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v3h20V8c0-1.103-.897-2-2-2zM9 4h6v2H9V4zm5 10h-4v-2H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-8v2z"></path>
              </svg>
              <span className="text-[14px] text-[#363636]">
                December 04, 2023
              </span>
            </div>
          </div>

          <div className="border-r border-[#e4e4e4]" />

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="font-bold text-[#363636] text-[16px]">
                  My Team
                </span>
                <span className="text-[#363636] text-[16px]">
                  Venture Capital Division
                </span>
                <span className="text-[#8b8b8b] text-[12px]">
                  Engineering Department
                </span>
              </div>

              <div className="flex justify-center items-center">
                <span className={`${textColor} text-[14px] leading-none`}>
                  View all
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${fillColor} w-6 h-6`}
                  viewBox="0 0 24 24"
                >
                  <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                </svg>
              </div>
            </div>

            <div className="mt-5 grid lg:grid-cols-2 xl:grid-cols-3 gap-3">
              <div
                className={`flex justify-start items-center gap-2 p-3 ${bgColor} rounded-[10px]`}
              >
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://ca.slack-edge.com/TKUG58KSM-UL4LMP59T-555196f36780-192"
                />

                <div className="flex flex-col">
                  <span className="text-[14px] font-medium text-white">
                    Zsolt Malota
                  </span>
                  <span className="text-[12px] leading-none text-[#f4f4f4]">
                    Chief Customer Officer
                  </span>
                  <span className="text-[12px] text-[#f4f4f4] italic">
                    My Manager
                  </span>
                </div>
              </div>

              <div
                className={`flex justify-start items-center gap-2 p-3 rounded-[10px]`}
              >
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://avatars.slack-edge.com/2024-06-07/7260729159744_875c3f22fa40f59f5608_192.png"
                />

                <div className="flex flex-col">
                  <span className="text-[14px] font-medium text-[#363636]">
                    Deon Paul Sadcopen
                  </span>
                  <span className="text-[12px] leading-none text-[#8b8b8b]">
                    Software Engineer
                  </span>
                  <span className="text-[12px] text-[#8b8b8b] italic">
                    Teammate
                  </span>
                </div>
              </div>

              <div
                className={`flex justify-start items-center gap-2 p-3 rounded-[10px]`}
              >
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://avatars.slack-edge.com/2024-03-01/6740363963937_9262839ecd03a848a07f_192.jpg"
                />

                <div className="flex flex-col">
                  <span className="text-[14px] font-medium text-[#363636]">
                    Benjie Pecson
                  </span>
                  <span className="text-[12px] leading-none text-[#8b8b8b]">
                    Software Engineer
                  </span>
                  <span className="text-[12px] text-[#8b8b8b] italic">
                    Teammate
                  </span>
                </div>
              </div>

              <div
                className={`flex justify-start items-center gap-2 p-3 rounded-[10px]`}
              >
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://avatars.slack-edge.com/2024-08-01/7512885793618_6dd245dc59bcbbb45953_192.jpg"
                />

                <div className="flex flex-col">
                  <span className="text-[14px] font-medium text-[#363636]">
                    Anthony Cabulang
                  </span>
                  <span className="text-[12px] leading-none text-[#8b8b8b]">
                    Software Engineer
                  </span>
                  <span className="text-[12px] text-[#8b8b8b] italic">
                    Teammate
                  </span>
                </div>
              </div>

              <div
                className={`flex justify-start items-center gap-2 p-3 rounded-[10px]`}
              >
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://avatars.slack-edge.com/2023-12-06/6301334409970_8d7ae560cc0e3fd030ee_192.png"
                />

                <div className="flex flex-col">
                  <span className="text-[14px] font-medium text-[#363636]">
                    Antoinette Sanchez
                  </span>
                  <span className="text-[12px] leading-none text-[#8b8b8b]">
                    Software Engineer
                  </span>
                  <span className="text-[12px] text-[#8b8b8b] italic">
                    Teammate
                  </span>
                </div>
              </div>

              <div
                className={`flex justify-start items-center gap-2 p-3 rounded-[10px]`}
              >
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://avatars.slack-edge.com/2023-10-02/5988993593649_79ab167596c2be4ea06f_192.jpg"
                />

                <div className="flex flex-col">
                  <span className="text-[14px] font-medium text-[#363636]">
                    Michael Angelo Artiaga
                  </span>
                  <span className="text-[12px] leading-none text-[#8b8b8b]">
                    Software Engineer
                  </span>
                  <span className="text-[12px] text-[#8b8b8b] italic">
                    Teammate
                  </span>
                </div>
              </div>

              <div
                className={`flex justify-start items-center gap-2 p-3 rounded-[10px]`}
              >
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://ca.slack-edge.com/TKUG58KSM-U0584721JJW-329a0a0c8708-192"
                />

                <div className="flex flex-col">
                  <span className="text-[14px] font-medium text-[#363636]">
                    John Carlo Pagaduan
                  </span>
                  <span className="text-[12px] leading-none text-[#8b8b8b]">
                    Veronica Delegencia
                  </span>
                  <span className="text-[12px] text-[#8b8b8b] italic">
                    Teammate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOnboardingPlan;
