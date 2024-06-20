import { useEffect, useState } from "react";
import CheerAPeerPostComponent from "./components/cheer-a-peer/CheerAPeerPostComponent";
import Headings from "../../../components/universal/Headings";
import Subheadings from "../../../components/universal/Subheadings";
import EmployeeCheers from "./components/cheer-a-peer/EmployeeCheers";
import { createContext } from "react";
import HeartbitsCounter from "./components/cheer-a-peer/HeartbitsCounter";
import RecentCheer from "./components/cheer-a-peer/RecentCheer";
import Recognition from "./components/cheer-a-peer/Recognition";
import RecognitionDepartmentLeaderboard from "./components/cheer-a-peer/RecognitionDepartmentLeaderboard";
import AsyncGithubUserMentions from "./components/cheer-a-peer/AsyncGithubUserMentions.jsx"
import TopWord from "./components/cheer-a-peer/TopWord";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { MentionsInput, Mention } from 'react-mentions'

export const ThemeContext = createContext(null);

const CheerAPeer = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  accentColor,
  focusBorder,
}) => {
  axios.defaults.withCredentials = true;
  const [cookie, setCookie] = useCookies(['user']);
  const [notif, setNotif] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [myHeartbits, setMyHeartbits] = useState([]);

  const [peers, setPeers] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        axios.post(BASE_URL + "/cap-createHeartbits");

        const my_heartbits_res = await axios.get(
          BASE_URL + "/cap-getMyHeartbits"
        );
        setMyHeartbits(my_heartbits_res.data[0]);

        const my_peers_res = await axios.get(BASE_URL + "/cap-getMentionPeers");
        setPeers(my_peers_res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllData();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        bgColor: bgColor,
        hoverColor: hoverColor,
        focusBorder: focusBorder,
        fillColor: fillColor,
        textColor: textColor,
        disabledColor: disabledColor,
      }}
    >
      <div className="box-border max-w-[1300px] m-auto">
        {notif != "" && notif === "success" && <ToastContainer />}
        {notif != "" && notif === "error" && <ToastContainer />}

        <Headings text={"Cheer a Peer"} />

        <div className="box-border mt-10">
          <div className="box-border grid grid-cols-1 xl:grid-cols-3 gap-y-5 xl:gap-5">
            <div className="box-border col-span-2 flex flex-col gap-8">
              <div className="box-border flex flex-col md:flex-row justify-between gap-5">
                <CheerAPeerPostComponent
                  setNotif={setNotif}
                  myHeartbits={myHeartbits}
                  setMyHeartbits={setMyHeartbits}
                  bgColor={bgColor}
                  hoverColor={hoverColor}
                  disabledColor={disabledColor}
                  focusBorder={focusBorder}
                />


                <HeartbitsCounter myHeartbits={myHeartbits} />
              </div>

              <div className="box-border flex flex-col sm:flex-row  justify-between gap-5 flex-1">
                <div className="box-border flex-1 flex flex-col justify-between min-h-[200px]">
                  <div className="box-border mx-[15px] mb-2">
                    <Subheadings text={"Peers Who Cheered You"} />
                  </div>

                  <EmployeeCheers />
                </div>

                <div className="box-border flex-1 flex flex-col justify-between min-h-[200px]">
                  <div className="box-border mx-[15px] mb-2 flex flex-row flex-nowrap justify-between items-center">
                    <Subheadings text={"Recent Cheer"} />

                    {cookie.user.emp_role == 1 ? (
                      <Link to={"/hr/my-pulse/cheer-a-peer/all-cheers"}>
                        <div className="flex flex-row justify-center items-center h-0">
                          <p className={`${textColor} text-[13px]`}>See all</p>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className={`${fillColor} w-6 h-6`}
                          >
                            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                          </svg>
                        </div>
                      </Link>
                    ) : cookie.user.emp_role == 2 ? (
                      <Link to={"/regular/my-pulse/cheer-a-peer/all-cheers"}>
                        <div className="flex flex-row justify-center items-center h-0">
                          <p className={`${textColor} text-[13px]`}>See all</p>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className={`${fillColor} w-6 h-6`}
                          >
                            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                          </svg>
                        </div>
                      </Link>
                    ) : cookie.user.emp_role == 3 ? (
                      <Link to={"/manager/my-pulse/cheer-a-peer/all-cheers"}>
                        <div className="flex flex-row justify-center items-center h-0">
                          <p className={`${textColor} text-[13px]`}>See all</p>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className={`${fillColor} w-6 h-6`}
                          >
                            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                          </svg>
                        </div>
                      </Link>
                    ) : null}
                  </div>

                  <RecentCheer />
                </div>
              </div>
            </div>
            <Recognition />
          </div>

          <div className="box-border grid grid-cols1 gap-5 lg:grid-cols-2 mt-10">
            <RecognitionDepartmentLeaderboard />

            <TopWord />
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default CheerAPeer;
