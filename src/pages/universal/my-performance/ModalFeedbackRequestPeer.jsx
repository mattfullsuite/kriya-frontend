import React from "react";

const ModalFeedbackRequestPeer = () => {
    const handleSubmit = (e) => {
        document.getElementById("request_feedback_peer").close();
        document.getElementById("requestPeerFeedbackForm").reset();
        e.preventDefault();
    };

    const handleCancel = () => {
        document.getElementById("request_feedback_peer").close();
        document.getElementById("requestPeerFeedbackForm").reset();
      }; 
    return (
        <>
        <div
            className="w-full p-3 flex flex-col justify-center items-center bg-white text-[14px] rounded-[15px] border border-[#e4e4e4] select-none cursor-pointer"
            onClick={() =>document.getElementById("request_feedback_peer").showModal()
        }
        >
            <span>Request Feedback From a Peer</span>
        </div>
        <dialog id="request_feedback_peer" className="modal">

            <div className="modal-box flex flex-col">
            <h3 className="font-bold text-xl">Request Feedback From a Peer </h3>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5" onClick={(e) => {handleCancel(e)}}>
                  ✕
            </button>

            <form
                    id="requestPeerFeedbackForm"
                    action=""
                    method="dialog"
                    onSubmit={handleSubmit}>

            <div className="label mt-5">
                  <p className="label-text flex-col text-[14px] justify-start text-justify">
                  Easily request constructive feedback from your colleagues. Select the peer you wish to receive
                  feedback from, provide any specific areas you’d like feedback on. This will helps facilitate
                  meaningful conversations and promotes continuous improvement within your team.</p>
                  <br/>   
            </div> 
            <label>
                    <div className="label mt-5">
                        <div className="label">
                            <h1 className="label-text font-bold text-[16px]">
                                Feedback Evaluator <span className="text-red-500"> *</span>
                            </h1>
                        </div>
                    </div>
                        <select className="select select-bordered w-full bg-[#f4f4f4] items-center">
                            <option>Select a Peer</option>
                        </select>
            </label>
            <label>
                    <div className="label mt-5">
                        <div className="label">
                            <h1 className="label-text font-bold text-[16px]">
                                Reason for Feedback or Message <span className="text-red-500"> *</span>
                            </h1>
                        </div>
                    </div>
                    <textarea
                        id="1:1_reason"
                        name="1:1_reason"
                        className="textarea textarea-bordered w-full max-w-lg mb-2"
                        placeholder="Add more information about your request here. "
                        maxLength="255"
                        required>
                  </textarea>
            </label>
            <div className="flex justify-end mt-5 gap-2">
                <button
                  id="submit-button"
                  type="submit"
                  className={`px-4 py-2 text-white rounded-[8px] bg-[#cc5500]`}
                  onClick={(e) => {handleSubmit(e)}}
                >
                  Submit
                </button>

                <button
                  className={`px-4 py-2 bg-[#e9e9e9] text-[#363636] rounded-[8px]`}
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>

            </form>
            </div>
            
        </dialog>

        </>
    );

};
export default ModalFeedbackRequestPeer;