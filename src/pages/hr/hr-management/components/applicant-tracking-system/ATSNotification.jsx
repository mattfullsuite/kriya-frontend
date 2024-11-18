import { useState, useEffect, useContext, useReducer, useRef } from "react";
import axios from "axios";


export const ATSNotification = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [notifs, setNotifs] = useState([]);

    useEffect(() => {
        const fetchNotifs = async () => {
            try {
                const response = await axios.get(BASE_URL + "/atsNotifs"); 
                setNotifs(response.data); 
            } catch (e) {
                console.log(e);
            } 
        }; fetchNotifs(); 
    }, []);

  return (
    <div className="overflow-y-scroll h-[24.5rem]">
        <div className="flex grow bg-white p-5">
            <ul> 
                {
                    notifs.length === 0 && 
                    <li className="bg-gray-100 p-5 m-2 rounded-[8px] flex items-center text-sm gap-5">
                        <div className="avatar placeholder flex justify-start">
                            <div className="bg-neutral text-neutral-content w-8 rounded-full">
                                <span className="text-left">!</span>
                            </div>
                        </div>
                        No notifications available
                    </li>
                } 
                
                {
                    notifs.length > 0 && notifs.map((notif, index) => (
                    <li className="bg-gray-100 p-5 m-2 rounded-[8px] flex items-center text-sm gap-5" key={index}>
                        <div className="avatar placeholder flex justify-start">
                            <div className="bg-neutral text-neutral-content w-8 rounded-full">
                                <span className="text-left">{notif.name.charAt(0)}</span>
                            </div>
                        </div>
                        {notif.notification}
                    </li> 
                    ))
                } 
            </ul>
        </div>
    </div>
  )
}
