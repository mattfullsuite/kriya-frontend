import React from "react";
import ClientSideBar from "../client/ClientSideBar";
import ManagerSideBar from "../manager/ManagerSideBar";

export default function Layout({ children }) {
    return (
    <div>
      {/* Attaching all file components */}
      <ManagerSideBar>
      <ClientSideBar>
      {children}
      </ClientSideBar>
      </ManagerSideBar>
    </div>
    );
  }