import { useContext } from "react";
import { ThemeContext } from "../../../EmployeeInformation";


const TextInput = ({ type, value, changeFunction, name, disabled}) => {
    const theme = useContext(ThemeContext);

    return(
        <input type={type} onClick={changeFunction}  className={`transition-all outline-none border border-[#e4e4e4] text-[#363636] text-[16px] px-3 py-2 rounded-[8px] w-full ${theme.focusBorder} ${theme.disabledBg}`} disabled={disabled} name={name} value={value}  />
    )
}

export default TextInput;