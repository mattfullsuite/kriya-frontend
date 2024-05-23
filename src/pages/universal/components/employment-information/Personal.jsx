import moment from "moment";
import TextInput from "./components/TextInput";
import LabelInput from "./components/LabelInput";
import { useState, useContext } from "react";
import { ThemeContext } from "../../EmployeeInformation";

const Personal = () => {
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
          <LabelInput label={"Date of Birth"} />

          <TextInput
            type={"date"}
            changeFunction={handleChange}
            disabled={disabled}
            name={"date_of_birth"}
          />
        </div>

        <div className="box-border">
          <LabelInput label={"Sex"} />
          <TextInput
            type={"text"}
            changeFunction={handleChange}
            disabled={disabled}
            name={"sex"}
          />
        </div>

        <div class="grid grid-cols-subgrid gap-5 col-span-2">
          <div className="box-border col-start-1">
            <LabelInput label={"Civil Status"} />
            <TextInput
              type={"text"}
              changeFunction={handleChange}
              disabled={disabled}
              name={"civil_status"}
            />
          </div>
        </div>

        <div className="box-border">
          <LabelInput label={"Permanent Address"} />
          <TextInput
            type={"text"}
            changeFunction={handleChange}
            disabled={disabled}
            name={"p_address"}
          />
        </div>

        <div className="box-border">
          <LabelInput label={"Currrent Address"} />
          <TextInput
            type={"text"}
            changeFunction={handleChange}
            disabled={disabled}
            name={"c_address"}
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

export default Personal;
