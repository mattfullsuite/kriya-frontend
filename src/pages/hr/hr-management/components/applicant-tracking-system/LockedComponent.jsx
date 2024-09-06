import moment from "moment";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useCookies } from "react-cookie";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LockedComponent = ({
  stage,
  interviewId,
  bgColor,
  disabledColor,
  hoverColor,
  focusBorder,
  status,
  interviewDate,
  interviewer,
}) => {
  const { app_id } = useParams();
  const [cookie] = useCookies(["user"]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const scrollRef = useRef();
  const messageAreaRef = useRef();
  const buttonRef = useRef();

  const [selectedLockedNotes, setSelectedLockedNotes] = useState([]);

  const [newApplicantNote, setNewApplicantNote] = useState({ note_body: "" });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const interview_notes_res = await Axios.get(
          BASE_URL + `/ats-getApplicantLockedNotes/${app_id}`
        );
        setSelectedLockedNotes(interview_notes_res.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, [interviewId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [selectedLockedNotes]);

  //Notes Integration
  const addNewNote = async (event) => {
    buttonRef.current.disabled = true;

    await Axios.post(
      `${BASE_URL}/ats-insertApplicantLockedNotes/${app_id}`,
      newApplicantNote
    )
      .then((response) => {
        messageAreaRef.current.value = "";

        setSelectedLockedNotes([
          ...selectedLockedNotes,
          {
            applicant_id: app_id,
            emp_pic: cookie.user.emp_pic,
            f_name: cookie.user.f_name,
            s_name: cookie.user.s_name,
            noted_at: moment.now(),
            note_body: newApplicantNote.note_body,
          },
        ]);
      })
      .catch((err) => {
        console.log(err.message);
      });

    buttonRef.current.disabled = false;
  };

  return (
    <>
      <div className="bg-white border border-[#e4e4e4] rounded-[15px]">
        <div className="flex bg-amber-400">
          <div className="flex items-center ml-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              className="fill-[#363636]"
            >
              <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
            </svg>
          </div>
          <div className="p-5 border-r border-[#e4e4e4] w-full">
            <p className="text-[20px] font-medium text-[#363636]">
              Locked Notes
            </p>

            <p className="text-[12px] font-xs text-[#363636]">
              This discussion box is only accessible to authorized employees.
              Confidential information like salary should be discussed here.
            </p>
          </div>
        </div>

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

            {selectedLockedNotes.length > 0 ? (
              selectedLockedNotes.map((notes) => (
                <>
                  {/* bubble post */}
                  <div className="rounded-[15px] bg-[#F7F7F7] p-5">
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex justify-start items-center gap-2">
                        <div
                          className={`${bgColor} w-10 h-10 rounded-full text-white font-bold flex justify-center items-center`}
                        >
                          {notes?.emp_pic ? (
                            <img
                              className={`box-border w-10 h-10 rounded-full`}
                              src={notes?.emp_pic}
                            />
                          ) : (
                            notes?.f_name.charAt(0) + notes?.s_name.charAt(0)
                          )}
                          {/* {notes?.f_name.charAt(0) + notes?.s_name.charAt(0)} */}
                        </div>

                        <span className="text-[14px] font-medium text-[#363636]">
                          {/* {notes.f_name + " " + notes.s_name} */}
                          {notes.f_name + " " + notes.s_name}
                        </span>
                      </div>

                      <span className="text-[12px] text-[#8b8b8b]">
                        {moment(notes.noted_at).fromNow()}
                      </span>
                    </div>

                    <div className="mt-5 text-[14px] text-[#363636]">
                    <article className="whitespace-pre-line text-balance prose lg:prose-xl"> 
                    {notes.note_body}
                    </article>
                    </div>
                  </div>
                  {/* end of bubble post */}
                </>
              ))
            ) : (
              <div className="rounded-[15px] bg-[#F7F7F7] p-5 h-full flex flex-row justify-center items-center">
                No notes yet.
              </div>
            )}

            <div ref={scrollRef} />
          </div>
          {/* end of conversation scrollable */}

          <div className="p-3 border-t border-[#e4e4e4] flex gap-2">
            <input
              className={`transition-all ease-in-out flex-1 outline-none border border-[#e4e4e4] rounded-[8px] px-3 py-2 text-[14px] text-[#363636] ${focusBorder}`}
              placeholder="Type here"
              ref={messageAreaRef}
              onChange={(e) =>
                setNewApplicantNote({
                  ...newApplicantNote,
                  note_body: e.target.value,
                  interview_id: interviewId,
                })
              }
            />

            <button
              className={`outline-none ${bgColor} text-[14px] text-white rounded-[8px] px-3 ${disabledColor}`}
              onClick={() => addNewNote()}
              ref={buttonRef}
              disabled={
                newApplicantNote.note_body == "" ||
                newApplicantNote.note_body == null
                  ? true
                  : false
              }
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LockedComponent;
