import moment from "moment"
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios"
import { useCookies } from "react-cookie";

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const SendEmailTemplate = ({interviewId, bgColor, disabledColor, hoverColor, focusBorder, applicant, position }) => {
  const { app_id } = useParams();
  const [cookie] = useCookies(["user"]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const emailTitleRef = useRef();
  const emailBodyRef = useRef();
  const emailAttachmentRef = useRef();
  const buttonRef = useRef();

  const [emailTextTitle, setEmailTextTitle] = useState('')
  const [emailTextBody, setEmailTextBody] = useState('')
  const [emailAttachment, setEmailAttachment] = useState('')

  const [newEmail, setNewEmail] = useState({ email_title: "", email_body: "" });

  const [offerLetters, setOfferLetters] = useState([]);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
  
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
 
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {

        const offer_letters_res = await Axios.get(
          BASE_URL + "/ats-getOfferLetters"
        )
        setOfferLetters(offer_letters_res.data)

      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, [interviewId]);

  //Email Integration

  const sendEmail = async (event) => {
    buttonRef.current.disabled = true;

    let formData = new FormData();

    formData.append('email_title', emailTextTitle);
    formData.append('email_body', emailTextBody);
    formData.append('email_attachment', emailAttachment);

    console.log(formData.entries());
    console.log("FORM DATA: ", formData)


    await Axios
      .post(`${BASE_URL}/ats-sendEmailLetter/${app_id}`, newEmail, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data === "success") {
          emailBodyRef.current.value = "";
          emailTitleRef.current.value = "";
          //emailAttachmentRef.current.value = "";
          toast.success("Email Sent")
          buttonRef.current.disabled = false;
        } else if (response.data === "error") {
          emailBodyRef.current.value = "";
          emailTitleRef.current.value = "";
          //emailAttachmentRef.current.value = "";
          toast.error("Something went wrong.")
          buttonRef.current.disabled = false;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };


  return (
    <>
    <div className="bg-white border border-[#e4e4e4] rounded-[15px]">
          <div className="flex">
            <div className="p-5 border-r border-[#e4e4e4] w-full">
              <p className="text-[20px] font-medium">
                Send Email to Applicant
              </p>
            </div>
          </div>
       

      <div className="flex-1 border-t border-[#e4e4e4] flex flex-col h-[500px] w-full">

        <div className="flex-1 flex flex-row h-[500px] w-full justify-start">
          <div className="flex flex-col p-5 border-r border-[#e4e4e4] w-[20%] h-[500px] overflow-auto">
            
            {offerLetters.map((ol) => (
              <button
                className={`mb-3 outline-none border border-[#e4e4e4] text-[14px] rounded-[8px] p-5 ${disabledColor}`}
                id={ol.email_title}
                value={ol.email_body}
                onClick={(e) => {
                  setEmailTextTitle(e.target.id);
                  setEmailTextBody((e.target.value).replace("<Applicant's Name>", applicant).replace("<Job Title>", position))
                  setNewEmail({...newEmail, email_title: e.target.id, email_body: (e.target.value).replace("<Applicant's Name>", applicant).replace("<Job Title>", position)})
                }}
              >
                {ol.template_name}
              </button>
            ))}

          </div>

          <div className="flex flex-col p-5 w-[80%]">

            <input 
              className={`transition-all mb-5 ease-in-out outline-none border border-[#e4e4e4] rounded-[8px] px-3 py-2 text-[14px] text-[#363636] ${focusBorder}`} 
              placeholder="Enter email text"
              value={emailTextTitle}
              onChange={(e) => {setEmailTextTitle(e.target.value);
                setNewEmail({...newEmail, email_title: e.target.value})}
              }
              ref={emailTitleRef}
            />

            <textarea
              className={`transition-all mb-5 ease-in-out flex-1 outline-none border border-[#e4e4e4] rounded-[8px] px-3 py-2 text-[14px] text-[#363636] ${focusBorder}`} 
              placeholder="Enter email body"
              value={emailTextBody}
              onChange={(e) => {setEmailTextBody(e.target.value)
                setNewEmail({...newEmail, email_body: e.target.value})}
              }
              ref={emailBodyRef}
            />
            {/* <input 
              type="file" 
              accept=".pdf" 
              onChange={(event) => 
                {
                //setEmailAttachment({ selectedFile: event.target.files[0]})
                setNewEmail({...newEmail, email_attachment: event.target.files[0]});
              }}
              ref={emailAttachmentRef}
            /> */}

            <input
                type="file"
                accept=".pdf" 
                className="file-input file-input-bordered w-full"
                onChange={async (e) => {
                    let base64 = await convertBase64(e.target.files[0]);
                    //console.log("BASE64:", base64);
                    // setFakePath(base64);
                    setEmailAttachment(base64)
                    setNewEmail({...newEmail, email_attachment_name: e.target.files[0].name, email_attachment: base64});
                }}
              />

            {/* <input 
              className={`transition-all mb-5 ease-in-out outline-none border border-[#e4e4e4] rounded-[8px] px-3 py-2 text-[14px] text-[#363636] ${focusBorder}`} 
              placeholder="Enter pdf file path attachment (Optional)"
              value={emailAttachment}
              onChange={(event) => 
                {
                setEmailAttachment(event.target.value)
                setNewEmail({...newEmail, email_attachment: event.target.value});
                }
              }
              ref={emailAttachmentRef}
            /> */}

          </div>
        </div>
        
        <div className="p-3 border-t border-[#e4e4e4] flex gap-2">
          <div className={`w-full`}></div>

          <button
            className={`outline-none ${bgColor} text-[14px] text-white rounded-[8px] px-5 py-2 ${disabledColor}`}
            onClick={() => sendEmail()}
            ref={buttonRef}
            disabled={emailTextBody == "" || emailTextTitle == ""}
          >
            Send
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default SendEmailTemplate;
