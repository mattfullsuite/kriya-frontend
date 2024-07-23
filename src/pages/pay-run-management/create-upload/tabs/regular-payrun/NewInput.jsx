import { useEffect, useState } from "react";
import {
  addComma,
  removeComma,
  formatDecimal,
} from "../../../assets/addCommaAndFormatDecimal";

export const NewInput = ({ dataIndex, dataKey, data, onValueChange }) => {
  let initialValue = {
    pay_item_name: "",
    last_pay_amount: 0,
  };
  const [inputData, setInputData] = useState(initialValue);
  useEffect(() => {
    setInputData({
      pay_item_name: dataKey,
      last_pay_amount: data,
    });
  }, [dataKey, data]);

  const handleOnChange = (value) => {
    if (!value) return;
    // Update input data state
    setInputData((prevState) => ({
      ...prevState,
      last_pay_amount: addComma(value.toString()),
    }));

    // Notify parent component of the change
    if (onValueChange) {
      onValueChange(dataIndex, dataKey, removeComma(value));
    }
  };

  const handleOnLeave = (value) => {
    handleOnChange(formatDecimal(value));
  };

  return (
    <>
      <div>
        <input
          type="text"
          name={inputData.pay_item_name}
          value={
            inputData.last_pay_amount != null && inputData.last_pay_amount != 0
              ? addComma(inputData.last_pay_amount.toString())
              : "0"
          }
          className="p-1"
          onChange={(e) => handleOnChange(e.target.value)}
          onBlur={(e) => handleOnLeave(e.target.value)}
        />
      </div>
    </>
  );
};
