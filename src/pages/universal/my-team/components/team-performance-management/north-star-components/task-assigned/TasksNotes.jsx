import React from "react";


const TaskNotes = () => {

    const handleSubmit = (e) => {
        document.getElementById("task_notes").close();
        document.getElementById("taskNotesForm").reset();
        e.preventDefault();
    };
    
    const handleCloseNote = () => {
        document.getElementById("task_notes").close();
        document.getElementById("taskNotesForm").reset();
      };
    return (
        <>
            <div
            className="w-ful"
            onClick={() =>
                document.getElementById("task_notes").showModal()
            }
            >
            <a className="text-[#008080] text-[12px] underline">Review Notes</a>
            </div>

            <dialog id="task_notes" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl">Task Notes</h3>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5" onClick={(e) => {handleCloseNote(e)}}>
                        ✕
                    </button>
                    <form
                        id="taskNotesForm"
                        action=""
                        method="dialog"
                        onSubmit={handleSubmit}>
                
                    <div className="label mt-1">
                        <p className="label-text flex-col text-[12px] justify-start text-justify text-wrap">
                        This is a space for sharing task notes for the assignor and the assignee. Add messages, list more information, expound more details about the task, or keep links and files handy. You can also talk to yourself here, but please keep in mind that both you and the other party can access these notes.</p>
                        <br/>
                    </div>
                    <div className="divider mt-3 mb-3 rounded-[15px] border-[#D1D5DB]"><span className="md:text-[10px]">July 01, 2024</span></div>
                        <div className="box-border bg-[#f4f4f4] flex flex-col gap-3 p-3 rounded-[15px]">
                            <div className="flex items-center gap-3 w-full">
                                <div className="box box-border w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#CC5500]"> 
                                    <span className="font-bold text-white">MB</span>
                                </div>
                                <div className="flex flex-col items-start justify-center flex-1">
                                    <p className="font-bold text-[#363636]">Marvin Bautista</p>
                                </div>
                                <div className="flex flex-col items-start justify-start">
                                    <p className="font-light text-[10px] text-[#A9A9A9]">9:00 AM</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-center flex-1">
                                <p className="text-wrap">Hi Marvin! just received the task, are there any other things I need to take note of.</p>
                            </div>
                            
                        </div>
                    <div className="divider mt-3 mb-3 rounded-[15px] border-[#D1D5DB]"><span className="md:text-[10px]">Today</span></div>
                    <div className="box-border bg-[#f4f4f4] flex flex-col gap-3 p-3 rounded-[15px]">
                            <div className="flex items-center gap-3 w-full">
                                <div className="box box-border w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#CC5500]"> 
                                    <span className="font-bold text-white">MB</span>
                                </div>
                                <div className="flex flex-col items-start justify-center flex-1">
                                    <p className="font-bold text-[#363636]">Marvin Bautista</p>
                                </div>
                                <div className="flex flex-col items-start justify-start">
                                    <p className="font-light text-[10px] text-[#A9A9A9]">10:00 AM</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-center flex-1">
                                <p className="text-wrap">Hi Marvin! just received the task, are there any other things I need to take note of.</p>
                            </div>
                            
                        </div>
                        <div className="box box-border flex flex-row gap-3 mt-10">
                            <textarea
                                className="border border-gray-300 rounded-[15px] px-3 py-3 mb-3 w-full focus:outline-[#666a40] bg-[#F7F7F7] input input-bordered"
                                placeholder="Type here. . ."
                                >
                                

                            </textarea>
                            <button className="btn bg-[#666a40] text-white" onClick={(e) => {handleCloseNote(e)}}>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                style={{ fill: 'currentColor', marginRight: '8px' }}
                                >
                                    <path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"></path>
                                </svg>
                            Post</button>

                        </div>
                     </form>
                </div>
            </dialog>
        </>
        
    );
};

export default TaskNotes;