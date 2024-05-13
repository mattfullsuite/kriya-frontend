import { useState } from "react";
import { useCSVReader, formatFileSize } from "react-papaparse";
import axios from "axios";
import Headings from "./Headings";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplicantCsvReader = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { CSVReader } = useCSVReader();
  const [col, setCol] = useState([]);
  const [val, setVal] = useState([]);

  const [notif, setNotif] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(BASE_URL + "/ats-insertApplicantsData", val)
      .then((response) => {
        setNotif("success");
        notifySuccess();
      })
      .catch((e) => {
        setNotif("error");
        notifyFailed();
      });
  };

  const notifySuccess = () =>
    toast.success("Successfully uploaded applicants' data.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyFailed = () =>
    toast.error("Something went wrong.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <>
      {notif != "" && notif === "success" && <ToastContainer />}
      {notif != "" && notif === "error" && <ToastContainer />}

      <Headings text={"Upload Applicants' Data CSV"} />

      <div className="box-border mt-10">
        <CSVReader
          onUploadAccepted={(results) => {
            const value = results.data;
            const filtered = value.filter((_, i) => i !== 0);
            setCol(value[0]);
            setVal(filtered);
          }}
          config={{ worker: true }}
        >
          {({ getRootProps, acceptedFile, getRemoveFileProps }) => (
            <>
              <div {...getRootProps()}>
                {acceptedFile ? (
                  <>
                    <div className="box-border bg-white border border-[#E4E4E4] rounded-[15px] p-5 flex flex-row justify-between items-center mb-5">
                      <div className="box-border">
                        <p className="text-[#363636] text-12px]">
                          <span className="font-medium">File name: </span>
                          {acceptedFile.name}
                        </p>

                        <p className="text-[#363636] text-12px]">
                          <span className="font-medium">File size: </span>
                          {formatFileSize(acceptedFile.size)}
                        </p>
                      </div>

                      <div
                        {...getRemoveFileProps()}
                        className="box-border flex flex-row justify-center gap-2"
                      >
                        <button className="text-white text-[14px] rounded-[8px] bg-red-500 px-3 py-2 flex flex-row justify-center items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="fill-white w-[14px] h-[14px]"
                          >
                            <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path>
                          </svg>
                          <span>Remove</span>
                        </button>

                        <button
                          className="text-white text-[14px] rounded-[8px] bg-green-500 px-3 py-2 flex fledx-row justify-center items-center gap-1"
                          onClick={handleSubmit}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="fill-white h-5 w-5"
                          >
                            <path d="M18.944 11.112C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5h11c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888zM13 14v3h-2v-3H8l4-5 4 5h-3z"></path>
                          </svg>
                          <span>Upload Data</span>
                        </button>
                      </div>
                    </div>

                    <div className="box-border p-5 bg-white rounded-[15px] border border-[#e4e4e4]">
                      <table className="table">
                        <thead>
                          {col.map((tableHeaders) => (
                            <td>{tableHeaders}</td>
                          ))}
                        </thead>

                        <tbody>
                          {val.map((info) => (
                            <tr>
                              {info.map((data) => (
                                <td>{data}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <div className="box-border w-full border-2 border-[#e4e4e4] border-dashed bg-white h-52 flex flex-col justify-center items-center rounded-[15px] cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="fill-[#a9a9a9] w-28 h-28"
                    >
                      <path d="M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zM8 14h3v-3h2v3h3v2h-3v3h-2v-3H8v-2z"></path>
                    </svg>
                    <p className="text-[16px] text-[#A9A9A9] select-none">
                      Click or drag and drop a file here
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </CSVReader>
      </div>
    </>
  );
};
export default ApplicantCsvReader;
