import { ThemeContext } from "../../CheerAPeer";
import Subheadings from "../../../../../components/universal/Subheadings";
import { Doughnut } from "react-chartjs-2";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const ListTile = () => {
  return(
    <div className="p-3 flex flex-row justify-between items-start bg-[#F4F4F4] rounded-[8px]">
      <div className="flex flex-row justify-start items-center gap-2">
        <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex justify-center items-center">A</div>

        <div>
          <p className="text-[#CC5500] text-[13px]">This is a notif title</p>
          <p className="text-[#363636] text-[13px]">This is the notif content</p>
        </div>
      </div>

      <span className="text-[#8b8b8b] text-[10px]">Just now</span>
    </div>
  )
}

const CheerNotification = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  return (
    <div className="box-border p-5 bg-white border border-[#e4e4e4] rounded-[15px]">
      <p className="text-[16px] text-[#363636] font-bold">Notifications</p>

      <div className="mt-5 flex flex-col gap-2">
        {/* <ListTile />
        <ListTile />
        <ListTile />
        <ListTile />
        <ListTile /> */}
      </div>
    </div>
  );
};

export default CheerNotification;
