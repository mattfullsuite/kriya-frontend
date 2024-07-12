import React from "react";

const handleSubmit = (e) => {
    document.getElementById("request_feedback_superior").close();
    document.getElementById("requestFeedbackSuperiorForm").reset();
    e.preventDefault();
};

const handleCancel = () => {
    document.getElementById("request_feedback_superior").close();
    document.getElementById("requestFeedbackSuperiorForm").reset();
  };
const ModalFeedbackRequestSuperior = () => {
    return (
        <>
        <div
          className="w-full p-3 flex flex-col justify-center items-center bg-white text-[14px] rounded-[15px] border border-[#e4e4e4] select-none cursor-pointer"
          onClick={() =>
            document.getElementById("request_feedback_superior").showModal()
          }
        >
          <span>Request Feedback</span>
        </div>

    <dialog id="request_feedback_superior" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-xl">Request Confirmation </h3>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5" onClick={(e) => {handleCancel(e)}}>
                  ✕
            </button>
            <form
                id="requestFeedbackSuperiorForm"
                action=""
                method="dialog"
                onSubmit={handleSubmit}>
                
                <br />
                <div className="mb-3">
                <div className="label">
                  <h1 className="label-text font-bold flex-col">
                  Are you sure that you want to request a feedback to your superior now?
                  </h1>
                  <br/>
                </div>
                <div className="label">
                  <h1 className="label-text">
                  Sending this request will immediately notify your superior<span className="font-bold"> Deon Sadcopen</span> . Do your want to continue this request?                  </h1>
                  <br/>
                </div>
                </div>
                <div className="flex justify-end mt-5 gap-2">
                <button
                  id="submit-button"
                  type="submit"
                  className={`px-4 py-2 text-white font-bold rounded-[8px] bg-[#cc5500]`}
                  onClick={(e) => {handleSubmit(e)}}
                >
                  Confirm
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
export default ModalFeedbackRequestSuperior;