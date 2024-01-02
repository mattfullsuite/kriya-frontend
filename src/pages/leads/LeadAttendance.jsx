import React from "react";
import BuildingComponent from "../../components/universal/BuildingComponent";
import Headings from "../../components/universal/Headings";
import ManagerSideBar from "../../components/manager/ManagerSideBar";

const LeadAttendance = () => {

    return (
        <>
            <ManagerSideBar/>
            <div className="p-4 sm:ml-64">
                <Headings text={"Attendance"} />
                <BuildingComponent image={"./svgs/lead_building.svg"}/>
            </div>
        </>
    )
}

export default LeadAttendance