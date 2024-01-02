import ManagerSideBar from "../../components/manager/ManagerSideBar";
import Headings from "../../components/universal/Headings";
import EmployeeDirectoryComponent from "../../components/universal/EmployeeDirectoryComponent";

const LeadDirectory = () => {

  return (
    <>
      <ManagerSideBar></ManagerSideBar>

      <div className="p-4 sm:ml-64 flex flex-col">
        <EmployeeDirectoryComponent color={"#BFD1A0"} />
      </div>
    </>
  );
};

export default LeadDirectory;
