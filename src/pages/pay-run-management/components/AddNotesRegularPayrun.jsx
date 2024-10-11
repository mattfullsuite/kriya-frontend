import { useEffect, useState } from "react";

const AddNotes = ({ dataIndex, notes, submitNotes }) => {
  const [input, setInput] = useState([]);
  useEffect(() => {
    console.log("Notes", dataIndex);
    setInput(notes);
  }, [dataIndex]);
  const onValueChange = (value) => {
    setInput(value);
  };
  return (
    <>
      <dialog
        id="add-notes"
        className="modal flex flex-col p-4 w-full overflow-y-auto"
      >
        <div className="flex flex-row p-2 w-full">
          <button
            className="ml-auto mr-[30px]"
            onClick={() => document.getElementById("add-notes").close()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="5"
              stroke="currentColor"
              className="w-6 h-6 text-white fixed"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col my-2 p-2 w-[600px] h-full mx-auto bg-white gap-2 rounded-[15px]">
          <span className="text-2xl mx-auto">Notes {dataIndex}</span>
          <textarea
            className="mx-auto w-full h-full border-2"
            value={input}
            onChange={(e) => onValueChange(e.target.value)}
          />
          <button
            className="btn bg-[rgb(102,106,64)] text-white"
            onClick={() => submitNotes(dataIndex, input)}
          >
            Submit
          </button>
        </div>
      </dialog>
    </>
  );
};

export default AddNotes;
