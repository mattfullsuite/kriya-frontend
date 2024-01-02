import React from "react";
import BuildingComponent from "../../components/universal/BuildingComponent";
import ClientSideBar from "../../components/client/ClientSideBar";
import Headings from "../../components/universal/Headings";

const ClientAttendance = () => {

    return (
        <>
            <ClientSideBar/>
            <div className="p-4 sm:ml-64">
                <Headings text={"Attendance"} />
                <BuildingComponent image={"./svgs/client_building.svg"}/>
            </div>
        </>
    )
}

export default ClientAttendance