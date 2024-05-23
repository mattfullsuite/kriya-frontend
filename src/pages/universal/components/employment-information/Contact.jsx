import { useContext, useState } from "react";
import LabelInput from "./components/LabelInput";
import TextInput from "./components/TextInput";
import { ThemeContext } from "../../EmployeeInformation";

const Contact = () => {
  const theme = useContext(ThemeContext);

  const [editForm, setEditForm] = useState(false);
  const [disabled, setDisabled] = useState(true);

  function handleChange(event) {}

  return (
    <div className="box-border bg-white p-5 border border-[#e4e4e4] rounded-[15px]">
      {!theme.hrView && (!editForm && (
        <button
          onClick={() => {
            setEditForm(true);
            setDisabled(false);
          }}
          className={`ml-5 mb-10 mt-5 flex flex-row flex-nowrap justify-center items-center gap-2 ${theme.primaryColor} text-white px-3 py-2 rounded-[8px] text-[14px]`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-white"
          >
            <path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z"></path>
          </svg>

          <span>Update Profile</span>
        </button>
      ))}
      <div className="box-border grid grid-cols-2 gap-5 m-5">
        <div className="box-border">
          <LabelInput label={"Personal Email"} />

          <TextInput
            type={"email"}
            name={"personal_email"}
            changeFunction={handleChange}
            disabled={disabled}
          />
        </div>

        <div className="box-border">
          <LabelInput label={"Contact Number"} />
          <TextInput
            type={"text"}
            disabled={disabled}
            name={"contact_number"}
            changeFunction={handleChange}
          />
        </div>

        <hr className="col-span-2 my-3" />

        <div className="box-border col-span-2">
          <p className="text-red-500 text-[14px] font-semibold">
            Emergency Contact Information{" "}
          </p>
        </div>

        <div className="box-border">
          <LabelInput label={"Name"} />

          <TextInput
            type={"email"}
            disabled={disabled}
            name={"emergency_name"}
            changeFunction={handleChange}
          />
        </div>

        <div className="box-border">
          <LabelInput label={"Contact Number"} />
          <TextInput
            type={"text"}
            disabled={disabled}
            name={"emergency_number"}
            changeFunction={handleChange}
          />
        </div>
      </div>

      {editForm && (
        <button
          onClick={() => {
            setEditForm(false);
            setDisabled(true);
          }}
          className={`mr-5 mb-5 mt-5 float-right flex flex-row flex-nowrap justify-center items-center gap-2 ${theme.primaryColor} text-white px-3 py-2 rounded-[8px] text-[14px]`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-white"
          >
            <path d="M5 21h14a2 2 0 0 0 2-2V8l-5-5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zM7 5h4v2h2V5h2v4H7V5zm0 8h10v6H7v-6z"></path>
          </svg>

          <span>Save</span>
        </button>
      )}
    </div>
  );
};

export default Contact;
