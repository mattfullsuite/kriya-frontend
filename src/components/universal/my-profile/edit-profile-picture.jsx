import { useRef, useState } from "react";
import Headings from "../Headings";
import PlaceHolder from "../../../assets/Logo-transparent.png";

const EditProfilePicture = (props) => {
  const [profilePic, setProfilePic] = useState(props.emp_pic);
  const empID = useRef(props.emp_id);

  const handleEditClick = () => {
    document.getElementById("edit-profile-picture").showModal();
  };

  return (
    <>
      <button
        className="flex justify-center items-center w-8 h-8  border-2 border-[#363636] rounded-full bg-white ml-[100px] mt-[-50px]"
        onClick={() => handleEditClick()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-5 h-5 bg-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
      <dialog id="edit-profile-picture" class="modal">
        <div className="p-5 bg-white w-80 lg:w-fit  flex flex-col rounded-3xl">
          <div className="flex ">
            <Headings text="Edit Profile Picture" />
            <button
              className="ml-auto"
              onClick={() =>
                document.getElementById("edit-profile-picture").close()
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className=" items-center py-10">
            <label>Profile Picture</label>
            <div className="py-5 items-center gap-5 flex flex-col">
              <img
                alt="Profile Picture"
                className="rounded-full w-32 h-32"
                src={PlaceHolder}
                style={{
                  aspectRatio: "128/128",
                  objectFit: "cover",
                }}
              />
              <div className="">
                <input
                  id="profile-picture"
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onClick={() => ""}
                />
              </div>
            </div>
          </div>
          <button className="text-white text-[14px] rounded-[8px] bg-[#90946f]  px-4 py-2 ml-auto mt-auto">
            Update
          </button>
        </div>
      </dialog>
    </>
  );
};

export default EditProfilePicture;
