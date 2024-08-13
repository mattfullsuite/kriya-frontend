import { useEffect, useState } from "react";
import {
  addComma,
  removeComma,
  formatDecimal,
} from "./formatter/addCommaAndFormatDecimal";

export const NumberInput = ({ data, onValueChange }) => {
  const [inputData, setInputData] = useState({});

  useEffect(() => {
    if (data) {
      setInputData(data);
    }
  }, [data]);

  const handleOnChange = (value) => {
    if (!value) return;
    // Update input data state
    setInputData((prevState) => ({
      ...prevState,
      item_amount: addComma(value),
    }));

    // Notify parent component of the change
    if (onValueChange) {
      onValueChange(inputData.item_name, removeComma(value));
    }
  };

  const handleOnLeave = (value) => {
    handleOnChange(formatDecimal(value));
  };

  return (
    <>
      {inputData && (
        <div>
          <input
            type="text"
            className="input input-bordered w-full"
            name="salary"
            value={
              inputData.item_amount &&
              Math.trunc(parseFloat(inputData.item_amount)) != 0
                ? addComma(inputData.item_amount)
                : "0"
            }
            onChange={(e) => handleOnChange(e.target.value)}
            onBlur={(e) => handleOnLeave(e.target.value)}
          />
        </div>
      )}
    </>
  );
};
