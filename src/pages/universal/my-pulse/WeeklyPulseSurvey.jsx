import Headings from "../../../components/universal/Headings";
import BuildingComponent from "../../../components/universal/BuildingComponent";

import { useState, useEffect } from "react";
import axios from "axios";

const WeeklyPulseSurvey = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [activeAnonSurveys, setActiveAnonSurveys] = useState([]);
  const [surveyAnswer, setSurveyAnswer] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const active_survey_res = await axios.get(
          BASE_URL + "/mp-getAllAnonActiveSurveys"
        );
        setActiveAnonSurveys(active_survey_res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleSurveyChange = (i, event) => {
    surveyAnswer[i] = {
      survey_id: event.target.id,
      answer: event.target.value,
    };
    setSurveyAnswer([...surveyAnswer]);
    console.log(JSON.stringify(surveyAnswer))
  };

  const handleSubmitSurvey = async () => {
  
    await axios
      .post(BASE_URL + "/mp-insertAnonSurveyAnswer", surveyAnswer)
      .then((response) => {
        if (response.data === "success") {
          // notifySuccess("Answer sent successfully!");
          // setPulseIsLoading(false);
          setActiveAnonSurveys([]);
          alert("Answered Survey")
        } else {
          // notifyFailed("Something went wrong!");
          // setPulseIsLoading(false);
          alert("Something Went Wrong")
        }
      })
      .catch((error) => {
        // setNotif("error");
        // notifyFailed("Something went wrong!");
        // setPulseIsLoading(false);
      });
  };

  return (
    <div className="box-border max-w-[1300px] m-auto p-5">
      <Headings text={"Weekly Pulse Survey"} />

      <div className="box-border">
        {/* <BuildingComponent /> */}

        <div className="box-border mt-5 flex flex-col justify-start gap-12">
          <span className={`text-[16px]`}>
            Thank you for taking part of our anonymous survey! Your feedback is
            crucial in helping us understand your notions and opinions about the
            company, whether positively or negatively. Your honest responses
            will guide us in providing better support for everyone. Let's get
            started!
          </span>

          {activeAnonSurveys.length !== 0 ? (
            <>
              {activeAnonSurveys.map((as, i) => (
                <div className="box-border">
                  <p className="text-[#363636] font-semibold">
                    {as.question_body}
                  </p>

                  <textarea
                    className={`bg-[#E4E4E4] rounded-[10px] resize-none w-full h-24 mt-5 text-[#363636] text-[14px] p-3 outline-none border transition ease-in border-[#e4e4e4] focus:border`}
                    placeholder="Type here..."
                    onChange={(event) => handleSurveyChange(i, event)}
                    id={as.pulse_survey_id}
                  />
                </div>
              ))}

              <div className="box-border flex justify-end">
                  <button
                    className={`btn-info disabled:cursor-not-allowed disabled:pointer-events-none transition-all ease-in active:scale-90 text-white rounded-[8px] outline-none text-[13px] py-2 px-10`}
                    onClick={handleSubmitSurvey}
                  >
                      <span>Submit</span>
                  </button>
              </div>
            </>
          ) : (
            <div>No Active Surveys Yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyPulseSurvey;
