import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../CheerAPeer";
import axios from "axios";
import Subheadings from "../../../../../components/universal/Subheadings";

const RecognitionDepartmentLeaderboard = () => {
  const [total, setTotal] = useState([]);
  const [received, setReceived] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const received_cheer_res = await axios.get(
          BASE_URL + "/cap-getAllGivenAndReceived"
        );
        const cheer_posts_res = await axios.get(BASE_URL + "/cap-getCheers")
        setReceived(received_cheer_res.data);
        setTotal(cheer_posts_res.data.length)

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  function getPercentage(value, totalLine){
    return `w-[${Math.round((value / totalLine) * 100)}]`
  }

  
  return (
    <div className="box-boarder bg-white rounded-[15px] border border-[#e4e4e4] p-5">
      <Subheadings text={"% of Users  Giving or Receiving Recognition"} />

      <div className="box-border flex-1 flex flex-col justify-center gap-7 mt-5">

        {received.map((r, i) => 
        <div className="box-border">
          <div className="box-border flex flex-row flex-nowrap justify-between items-center">
            <span className="text-[14px] text-[#363636]">{r.dept_name}</span>

            <span className="text-[#363636] text-[20px]">{Math.round((r.total_cheers / (total * 2)) * 100 )} %</span>
          </div>

          <div className="box-border h-3 w-full rounded-full bg-[#E4E4E4] mt-1 relative">
            <div className={`box-border transition-all h-full ${getPercentage(r.total_cheers, total)} rounded-full bg-[#3EAA43]`} />
          </div>
        </div>
        )}

      </div>
    </div>
  );
};

export default RecognitionDepartmentLeaderboard;
