import EmployeeCheersTile from "./EmployeeCheersTile";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const EmployeeCheers = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [recentCheers, setRecentCheers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recent_cheers_res = await axios.get(BASE_URL + "/cap-getRecentCheers");
        setRecentCheers(recent_cheers_res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white border border-[#e4e4e4] rounded-[15px] p-3 flex flex-col gap-2 w-full flex-1">
       {recentCheers.map((r) => (
          <EmployeeCheersTile firstName={r.f_name} lastName={r.s_name} position={r.position_name} points={r.heartbits_given} /> 
        ))}
        
    </div>
  );
};

export default EmployeeCheers;
