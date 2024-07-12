import React from "react";

const handleSubmit = (e) => {
    document.getElementById("request_one_on_one").close();
    document.getElementById("requestOneOnOneForm").reset();
    e.preventDefault();
};
const handleCancel = () => {
    document.getElementById("request_one_on_one").close();
    document.getElementById("requestOneOnOneForm").reset();
  };
const ModalRequestOneOnOne = () => {
return (
    <>
    <div
          className="w-full p-3 flex flex-col justify-center items-center bg-white text-[14px] rounded-[15px] border border-[#e4e4e4] select-none cursor-pointer"
          onClick={() =>
            document.getElementById("request_one_on_one").showModal()
          }
        >
          <span>Request 1:1</span>
    </div>

    <dialog id="request_one_on_one" className="modal">
        <div className="modal-box flex flex-col">
            <h3 className="font-bold text-xl">Request 1:1 </h3>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5" onClick={(e) => {handleCancel(e)}}>
                  ✕
            </button>
            <form
                    id="requestOneOnOneForm"
                    action=""
                    method="dialog"
                    onSubmit={handleSubmit}>
               
                <div className="label mt-5">
                  <p className="label-text flex-col text-[14px] justify-start text-justify">
                  To request a 1:1 you must first wait for the approval of your superior before proceeding. Indicate and add your preferred date and time for your 1:1.  
                  Add a short message why you need to schedule one.</p>
                  <br/>
                </div>
                <label>
                    <div className="label mt-5">
                        <div className="label">
                            <h1 className="label-text font-bold text-[16px]">
                                Superior <span className="text-red-500"> *</span>
                            </h1>
                        </div>
                    </div>
                        <select className="select select-bordered w-full bg-[#f4f4f4] items-center">
                            <option>Deon Sadcopen</option>
                        </select>
                </label>
                <label>
                    <div className="label mt-5">
                        <div className="label">
                            <h1 className="label-text font-bold text-[16px]">
                                Preferred Meeting Date  & Time <span className="text-red-500"> *</span>
                            </h1>
                        </div>
                    </div>
                </label>

                <div className="flex flex-col md:flex-row gap-5">

                    <label>
                        <div   div className="label">
                            <input 
                            className="input input-bordered" type="date">
                            </input>
                        </div>
                    </label>

                    <label>
                        <div   div className="label">
                            <input 
                            className="input input-bordered" type="time">
                            </input>
                        </div>
                    </label>
                </div>

                <label>
                    <div className="label mt-5">
                        <div className="label">
                            <h1 className="label-text font-bold text-[16px]">
                                Reason for 1:1 <span className="text-red-500"> *</span>
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
                  className={`px-4 py-2 text-white font-bold rounded-[8px] bg-[#cc5500]`}
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

export default ModalRequestOneOnOne;