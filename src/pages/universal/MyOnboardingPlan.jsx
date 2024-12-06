import { useState } from "react";
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

  backgroundCol,
  hoverCol,
  textCol,
  borderCol,
}) => {

  const tasks = [
    {
      title: "Welcome Packet",
      status: "Not Yet Started",
      description: "Read more to know more about your company.",
      progress: "0 / 1",
      items: ["Fullsuite Welcome Packet"],
    },
    {
      title: "Pre Employment Requirements",
      status: "Not Yet Started",
      description: "Submit the following to your HR to complete your onboarding process.",
      progress: "0 / 1",
      items: [
        "NBI Clearance",
        "Police Clearance",
        "Regional Trial Court Clearance",
        "Municipal Trial Court Clearance",
        "Barangay Clearance",
        "TIN, SSS, PHIC Numbers",
        "Proof of Undergrad Degree or Transcript of Records",
        "Birth Certificate",
        "Certificate of Employment",
        "2316",
        "Anthony 0",
        "Anthony 1",
        "Anthony 2",
        "Anthony 3",
        "Anthony 4",
        "Anthony 5",
        "Anthony 6",
        "Anthony 7",
        "Anthony 8",
        "Anthony 9",
        "Anthony 10",
        "Anthony 11",
        "Anthony 12",
        "Anthony 13",
        "Anthony 14",
        "Anthony 15",
        "Anthony 16",
        "Anthony 17",
        "Anthony 18",
        "Anthony 19",
      ],
    },
    {
      title: "Policies",
      status: "Not Yet Started",
      description: "Go over and accept the policies and procedures as they are established and relevant to you and your role.",
      progress: "0 / 1",
      items: [
        "Acceptable Usage Policy",
        "Access Control Policy",
        "Business Continuity Plan",
        "Compliance Policy",
        "Data Breach Notification Policy",
        "Data Retention Policy",
        "Proof of Undergrad Degree or Transcript of Records",
        "Code of Business Conduct Policy",
        "Communications and Network Policy",
        "Compliance Procedure",
        "Data Classification Policy",
        "Encryption Policy",
      ],
    },
    {
      title: "Trainings",
      status: "Not Yet Started",
      description: "Go through essential and short courses then answer a short assessment after.",
      progress: "0 / 1",
      items: ["KriyaHR Trainings and Tutorial", "KriyaHR Trainings Test"],
    },
  ];

  //#region small screen
  //For small screen
  const getClassBgColor = () => {    
    return `collapse-title bg-white peer-checked:${backgroundCol} peer-checked:text-white peer-checked:border-white`
  };

  const getClassStatusHover = () => {
    return `text-xs border border-x-1 border-y-1 round p-2 rounded-2xl ${hoverCol}`
  };

  const getClassContent = () => {
    return `collapse-content bg-white peer-checked:bg-white peer-checked:${textCol} p-2 border ${borderCol} border-x-1 border-y-1 rounded-bl-2xl rounded-br-2xl`
  };

  const getClassContentItem = () => {
    return `text-xs border ${borderCol} border-x-1 border-y-1 round p-2 rounded-2xl hover:text-black hover:border-black text-center mb-2`
  };
  //#endregion

  //#region extra large
  //For extra large screens
  const getLargeBgColor = () => {
    return `transition-all ease-in-out duration-1000 w-full hidden xl:flex xl:flex-col p-4 bg-white border border-[#e4e4e4] rounded-2xl ${hoverCol} group`
  };

  const getLargeTitle = () => {
    return `text-[.75rem] group-hover:${textCol} group-hover:font-semibold`
  };

  const getLargeStatus = () => {
    return `text-[.70rem] border border-x-1 border-y-1 border-black round p-1 rounded-2xl group-hover:font-semibold group-hover:${borderCol} group-hover:${textCol}`
  };

  const getlargeDescription = () => {
    return `text-[.70rem] p-4 text-[#9BADB9] group-hover:${textCol} group-hover:font-semibold`
  };

  const getLargeProgress = () => {
    return `text-[.75rem] self-end text-[#9BADB9] group-hover:font-semibold group-hover:${textCol}`;
  };
  //#endregion

  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  const itemsPerPage = 12;
  const currentItems = selectedTask ? selectedTask.items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage): [];

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setCurrentPage(0);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    document.getElementById('my-drawer-4').checked = true;
  }

  const handleNextPage = () => { 
    setCurrentPage((prev) => prev + 1); 
  }; 
  
  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="m-auto max-w-full p-5">
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
                    Software Engineer
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

      <div className="mt-10">
        <div className="ml-[15px]">
          <Subheadings text={"Onboarding Process"} />
        </div>

        <div className="flex">
          {/* This only works when the screen size is small - Anthony */}
          <div className="xl:hidden">
              {tasks.map((task, index) => (
                <div className="p-5 rounded-[15px] mt-3 flex flex-col" key={index}>
                  <div className="bg-base-200 collapse xl:hidden">
                    <input type="checkbox" className="peer" />
                    <div className={getClassBgColor()}>
                      <div className="h-fit flex flex-row p-4 justify-between items-center flex-wrap">
                        <p className="text-sm">{task.title}</p>
                        <p className={getClassStatusHover()}>{task.status}</p>
                      </div>
                      <div className="h-fit flex flex-row p-4 justify-between items-center flex-wrap gap-3">
                        <p className="text-sm text-left">{task.description}</p>
                        <p className="text-sm text-right">{task.progress}</p>
                      </div>
                    </div>
                    <div className={getClassContent()}>
                      {task.items.map((item, itemIndex) => (
                        <p key={itemIndex} className={getClassContentItem()}>
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* This only works when the screen size is large - Anthony */}
          <div className="p-5 rounded-[15px] hidden xl:flex xl:w-[30%] xl:gap-5 xl:flex-wrap">
                {tasks.map((task, index) => (
                <div className={getLargeBgColor()} key={index} onClick={() => handleTaskClick(task)}>
                  <div className="flex flex-row items-center justify-between w-full">
                    <p className={getLargeTitle()}>{task.title}</p>
                    <p className={getLargeStatus()}>{task.status}</p>
                  </div>
                
                <div className="flex flex-col justify-between items-center flex-wrap">
                    <p className={getlargeDescription()}>{task.description}</p>
                    <p className={getLargeProgress()}>{task.progress}</p>
                  </div>
                </div>
                ))}
          </div>
          
          <div className="p-5 rounded-[15px] hidden xl:flex xl:w-[70%] xl:gap-5 xl:flex-wrap">
                <div className={`transition-all ease-in-out duration-1000 w-full hidden xl:flex xl:flex-col bg-white border border-[#e4e4e4] rounded-2xl ${hoverCol} group`}>
              {selectedTask ? 
                ( <div className={`transition-all ease-in-out duration-1000 w-full h-1/5 border-b border-[#E4E4E4] group-hover:${borderCol} px-4 pt-4`} key={selectedTask.title}>
                    <div className="flex flex-row items-center justify-between w-full">
                      <p className={`text-sm group-hover:${textCol} group-hover:font-semibold`}>{selectedTask.title}</p> 
                      <p className={`text-[.80rem] border border-x-1 border-y-1 border-black p-1 rounded-2xl group-hover:font-semibold group-hover:${borderCol} group-hover:${textCol}`}>{selectedTask.status}</p>
                    </div>
                    
                    <div className="transition-all ease-in-out duration-1000 flex flex-col justify-between items-start flex-wrap">
                      <p className={`duration-1000 text-[.80rem] p-4 text-[#9BADB9] group-hover:${textCol} group-hover:font-semibold`}>{selectedTask.description}</p>
                      <p className={`duration-1000 text-sm self-end text-[#9BADB9] group-hover:font-semibold group-hover:${textCol}`}>{selectedTask.progress}</p>
                    </div>
                  </div>
                ) : (
                    <p className="text-center mt-2">Select a task to see the details</p>
              )}

              {selectedTask ? (
                  <div className={`transition-all ease-in-out duration-1000 w-full h-4/5 flex flex-wrap items-start justify-around group-hover:${backgroundCol} rounded-bl-2xl rounded-br-2xl`}>
                    {currentItems.map((item, index) =>
                      <div className={`w-[45%] h-[10%] m-2 ${backgroundCol} bg-opacity-40 hover:bg-gray-400 text-xs p-2 flex items-center justify-between border group-hover:text-white group-hover:border-white rounded-lg`} key={index} onClick={()=> handleItemClick(item)}>
                        <p>{item}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                          <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    {selectedTask.items.length > itemsPerPage && 
                    ( <div className="w-full flex justify-between items-end px-5">
                        <button className={`arrow-button border border-x-1 border-y-1 border-black p-1 rounded-md text-xs group-hover:text-white group-hover:border-white hover:bg-gray-400`} onClick={handlePreviousPage} disabled={currentPage === 0} >
                          Previous
                        </button>
                      
                        <button className={`arrow-button border border-x-1 border-y-1 border-black p-1 rounded-md text-xs group-hover:text-white group-hover:border-white hover:bg-gray-400`} onClick={handleNextPage} disabled={(currentPage + 1) * itemsPerPage >= selectedTask.items.length}>
                          Next
                        </button>
                      </div>
                    )}
                    {/* Drawer Component */}
                    <div className="drawer drawer-end">
                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content"> 
                          {/* Page content here */}
                        
                        </div>
                        <div className="drawer-side">
                          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay">
                          </label>
                          <ul className="menu bg-base-200 text-base-content min-h-full w-[40%] p-4"> 
                            {/* Sidebar content here */} 
                            {
                            selectedItem && (
                              <>
                              <h2 className="text-xl font-bold">{selectedTask.title}</h2>
                              <p className="text-left text-lg mt">{selectedItem}</p>
                              <p className="w-[20%] mt text-xs text-center border border-x-1 border-y-1 border-black p-1 rounded-2xl">{selectedTask.status}</p>
                              </> 
                            )} 
                          </ul>
                        </div>
                      </div>
                  </div>
              ): (
                <div className="hidden"></div>
              )}
                </div>
          </div>
        </div>
    </div>
  </div>
  );
};

export default MyOnboardingPlan;
