import moment from "moment"
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios"
import { useCookies } from "react-cookie";

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { MentionsInput, Mention } from "react-mentions";

const InterviewComponent = ({ stage, interviewId, bgColor, disabledColor, hoverColor, focusBorder, status, interviewDate, interviewer }) => {
  const { app_id } = useParams();
  const [cookie] = useCookies(["user"]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const scrollRef = useRef();
  const messageAreaRef = useRef();
  const buttonRef = useRef();

  const [selectedInterviewNotes, setSelectedInterviewNotes] = useState([])

  const [newApplicantNote, setNewApplicantNote] = useState({ note_body: "", interview_id: 1 });

  const [value, setValue] = useState('')
  const [mentions, setMentions] = useState([])

  function messageTransform(string) {
    const temp = string.replaceAll("<@", "@").replaceAll(">", "")
    const final = temp.replace(/(@)(\w)/g, (match, a, b) =>  a + b.toUpperCase())

    // const colorized = final.split(" ").map((word) => {
    //   if (word.startsWith("@")) {
    //     return `<span className="text-blue-500">${word}</span>`;
    //   }
    //   return word;
    // })
    // .join(" ");

    // const appendSpan = `<span>${colorized}</span>` 
    return final

    //const colorized = <span className={"text-blue-500"}>{final}</span>

    //return colorized
    //return string.substring(0, string.indexOf("@")).toUpperCase()
  }

 
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const interview_notes_res = await Axios.get(
          BASE_URL + `/ats-getApplicantInterviewNotes/${app_id}?interviewNo=${interviewId}`
        )
        setSelectedInterviewNotes(interview_notes_res.data)
        //console.log("NOTES: ", interview_notes_res.data)
        const mentions_res = await Axios.get(
          BASE_URL + `/ats-getMentions`
        )
        setMentions(mentions_res.data)

      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, [interviewId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView()
  }, [selectedInterviewNotes])


  //Notes Integration
  const addNewNote = async (event) => {
    buttonRef.current.disabled = true;

    await Axios
      .post(`${BASE_URL}/ats-insertApplicantNotes`, newApplicantNote)
      .then((response) => {

        setSelectedInterviewNotes([
          ...selectedInterviewNotes,
          {
            app_id: app_id,
            interview_id: interviewId,
            f_name: cookie.user.f_name,
            s_name: cookie.user.s_name,
            noted_at: moment.now(),
            note_body: newApplicantNote.note_body,
          },
        ]);

        //messageAreaRef.current.value = "";
        setValue("")
      })
      .catch((err) => {
        console.log(err.message);
      });

      buttonRef.current.disabled = true;
  };

  return (
    <>
    <div className="bg-white border border-[#e4e4e4] rounded-[15px]">

      {(stage !== 1) ? (
        <div className="flex">
          <div className="p-5 border-r border-[#e4e4e4] w-[40%]">
            <p className="text-[20px] font-medium text-[#363636]">
              Interview Notes and Feedbacks
            </p>

            <div className="mt-3 flex flex-row justify-start items-center gap-5">
              <span className="text-[14px] text-[#363636]">{"Interview " + (stage - 1)}</span>

              <select 
              value={status}
              className="outline-none text-[14px] text-[#363636] border border-[#363636] rounded-[5px] px-2">
                <option>Pending</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </div>
          </div>

          <div className="p-5 flex-1">
            <div className="w-full flex flex-row justify-start items-center">
              <span className="text-[#8b8b8b] text-[14px] w-[30%]">
                Date of Interview
              </span>

              <input
                type="date"
                className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] rounded-[5px] p-[2px] w-[150px]"
                value={moment(interviewDate).format("YYYY-MM-DD")}
                
              />
            </div>

            <div className="w-full flex flex-row justify-start items-center mt-3">
              <span className="text-[#8b8b8b] text-[14px] w-[30%]">
                Interviewer
              </span>

              <input
                type="text"
                className="outline-none text-[14px] text-[#363636] border border-[#e4e4e4] rounded-[5px] p-[2px] w-[150px]"
                value={interviewer}
                readOnly={true}
              />
            </div>
          </div>
        </div>
        ) : (
          <div className="flex">
            <div className="p-5 border-r border-[#e4e4e4] w-full">
              <p className="text-[20px] font-medium text-[#363636]">
                Discussion Box
              </p>
            </div>
  
          </div>
          ) 
      }

      <div className="flex-1 border-t border-[#e4e4e4] flex flex-col h-[500px]">
        {/* conversation scrollable */}

        <div className="flex-1 p-5 overflow-auto flex flex-col gap-3">
          {/* timestamp */}
          {/* <div className="flex flex-row justify-center items-center gap-2">
            <div className="flex-1 border-t border-[#8b8b8b]" />
            <span className="text-[#8b8b8b] text-[12px]">January 20, 2024</span>
            <div className="flex-1 border-t border-[#8b8b8b]" />
          </div> */}
          {/* end of timestamp */}

          {
          selectedInterviewNotes.length > 0 ?
          selectedInterviewNotes.map((notes) =>    
          <>
          {/* bubble post */}
          <div className="rounded-[15px] bg-[#F7F7F7] p-5">
            <div className="flex flex-row justify-between items-center">
              <div className="flex justify-start items-center gap-2">
                <div
                  className={`${bgColor} w-10 h-10 rounded-full text-white font-bold flex justify-center items-center`}
                >
                  {(notes?.emp_pic) ? <img className={`box-border w-10 h-10 rounded-full`} src={notes?.emp_pic} /> : notes?.f_name.charAt(0) + notes?.s_name.charAt(0)}
                  {/* {notes?.f_name.charAt(0) + notes?.s_name.charAt(0)} */}
                </div>

                <span className="text-[14px] font-medium text-[#363636]">
                  {/* {notes.f_name + " " + notes.s_name} */}
                  {notes.f_name + " " + notes.s_name}
                </span>
              </div>

              <span className="text-[12px] text-[#8b8b8b]">{moment(notes.noted_at).fromNow()}</span>
            </div>

            <p className="mt-5 text-[14px] text-[#363636]">
             {/* {notes.note_body.replaceAll("<@", "@").replaceAll(">", "")} */}
             <div> {messageTransform(notes.note_body)}</div>
            </p>
          </div>
          {/* end of bubble post */}
          </>
        )
        : 
        <div className="rounded-[15px] bg-[#F7F7F7] p-5 h-full flex flex-row justify-center items-center">
   
              No notes yet.

        </div>
      }

        <div
        ref={scrollRef}
        />

        </div>
        {/* end of conversation scrollable */}
        


        <div className="p-3 border-t border-[#e4e4e4] flex gap-2">
          {/* <input 
          className={`transition-all ease-in-out flex-1 outline-none border border-[#e4e4e4] rounded-[8px] px-3 py-2 text-[14px] text-[#363636] ${focusBorder}`} 
          placeholder="Type here" 
          ref={messageAreaRef}
          onChange={(e) => setNewApplicantNote({...newApplicantNote, note_body: e.target.value, interview_id: interviewId})}
          /> */}

            <MentionsInput
              name="post_body"
              value={value}
              placeholder=""
              allowSuggestionsAboveCursor={true}
              ref={messageAreaRef}
              className="border border-[#er4e4e4] text-[14px] rounded-[6px] flex-1"
              onChange={(e) => {
                setValue(e.target.value)
                setNewApplicantNote({...newApplicantNote, 
                  note_body: (e.target.value).replaceAll("@[", "<@").replaceAll("]", ">"), 
                interview_id: interviewId})
              }}
            >
              <Mention
                trigger="@"
                name="mentioned_peers"
                markup="@[__display__]"
                data={(search) => {
                  const filteredUsers = mentions.filter((m) =>
                    m.display.toLowerCase().includes(search.toLowerCase())
                  );
                  //console.log(JSON.stringify(filteredUsers));
                  return filteredUsers;
                }}
                displayTransform={(id, display) => `@${display}`}
                //onAdd={onAddPeers}
                appendSpaceOnAdd
              />
            </MentionsInput>

          <button
            className={`outline-none ${bgColor} text-[14px] text-white rounded-[8px] px-3 ${disabledColor}`}
            onClick={() => addNewNote()}
            ref={buttonRef}
            disabled={(value == "" || newApplicantNote.note_body == "" || newApplicantNote.note_body == null) ? true : false}
          >
            Post
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default InterviewComponent;
