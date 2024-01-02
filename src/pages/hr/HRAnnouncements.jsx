import React from "react";
import BuildingComponent from "../../components/universal/BuildingComponent";
import HRSideBar from "../../components/hr/HRSideBar";
import Headings from "../../components/universal/Headings";

const HRAnnouncement = () => {

    return (
        <>
            <HRSideBar/>
            <div className="p-4 sm:ml-64">
                <Headings text={"Announcements"} />
                <BuildingComponent image={"./svgs/hr_building.svg"}/>
            </div>
        </>
    )
}

export default HRAnnouncement