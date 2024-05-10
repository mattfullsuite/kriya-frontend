import CheerAPeerPostComponent from "../temp/CheerAPeerPostComponent";
import Headings from "./Headings";
import Subheadings from "./Subheadings";
import EmployeeCheers from "../temp/EmployeeCheers";
import { createContext } from "react";
import HeartbitsCounter from "../temp/HeartbitsCounter";
import RecentCheer from "../temp/RecentCheer";
import Recognition from "../temp/Recognition";
import RecognitionDepartmentLeaderboard from "../temp/RecognitionDepartmentLeaderboard";
import TopWord from "../temp/TopWord";

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
  return (
    <ThemeContext.Provider
      value={{
        bgColor: bgColor,
        hoverColor: hoverColor,
        focusBorder: focusBorder,
        fillColor: fillColor,
        textColor: textColor,
      }}
    >
      <div className="box-border max-w-[1300px] m-auto">
        <Headings text={"Cheer a Peer"} />

        <div className="box-border mt-10">
          <div className="box-border grid grid-cols-1 xl:grid-cols-3 gap-y-5 xl:gap-5">
            <div className="box-border col-span-2 flex flex-col gap-8">
              <div className="box-border flex flex-col md:flex-row justify-between gap-5">
                <CheerAPeerPostComponent />

                <HeartbitsCounter />
              </div>

              <div className="box-border flex flex-col sm:flex-row  justify-between gap-5">
                <div className="box-border flex-1 flex flex-col justify-between">
                  <div className="box-border mx-[15px] mb-2">
                    <Subheadings text={"Peers Who Cheered You"} />
                  </div>

                  <EmployeeCheers />
                </div>

                <div className="box-border flex-1 flex flex-col justify-between">
                  <div className="box-border mx-[15px] mb-2 flex flex-row flex-nowrap justify-between items-center">
                    <Subheadings text={"Recent Cheer"} />

                    <button className="flex flex-row justify-center items-center h-0">
                      <p className={`${textColor} text-[13px]`}>See all</p>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className={`${fillColor} w-6 h-6`}
                      >
                        <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                      </svg>
                    </button>
                  </div>

                  <RecentCheer
                    firstName={"Marvin"}
                    lastName={"Bautista"}
                    position={"Software Engineer"}
                    points={12}
                  />
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
