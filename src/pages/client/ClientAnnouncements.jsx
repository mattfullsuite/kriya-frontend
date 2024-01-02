import React from "react";
import BuildingComponent from "../../components/universal/BuildingComponent";
import ClientSideBar from "../../components/client/ClientSideBar";
import Headings from "../../components/universal/Headings";

const ClientAnnouncement = () => {

    return (
        <>
            <ClientSideBar/>
            <div className="p-4 sm:ml-64">
                <Headings text={"Announcements"} />
                <BuildingComponent image={"./svgs/client_building.svg"}/>
            </div>
        </>
    )
}

export default ClientAnnouncement