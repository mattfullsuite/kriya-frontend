import { useState, useEffect, useRef } from "react";

export const CurrencyInput = ({
  textSize = "text-sm",
  width = "min-w-[100px]",
  placeholder,
  className,
  disabled = false,
  id,
  name,
  passedData,
  dataIndex,
  dataKey,
  updateList,
}) => {
  const [value, setValue] = useState(passedData);
  const inputRef = useRef(null);
  useEffect(() => {
    console.log("Passed Data:", passedData);
  }, [passedData]);

  const formatMoney = (input) => {
    // Remove all non-digit characters except the decimal point
    let cleanedValue = String(input)
      .replace(/(?!^)-|[^\d.-]/g, "")
      .replace(/(.+)-+/g, "$1");

    // Ensure only one decimal point
    const parts = cleanedValue.split(".");
    if (parts.length > 2) {
      parts[1] = parts.slice(1).join("");
      cleanedValue = parts.join(".");
    }

    // Split into whole and cents
    let [whole, cents] = cleanedValue.split(".");

    // Add commas to whole
    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Handle cents
    if (cents) {
      cents = cents.slice(0, 2); // Limit to 2 decimal places
      return `${whole}.${cents}`;
    } else if (cleanedValue.includes(".")) {
      return `${whole}.`; // Keep the decimal point if it was just added
    }

    return whole;
  };

  const convertToFloat = (str) => {
    if (!str) return;
    // Step 1: Remove the commas
    const cleanedString = str.replace(/,/g, "");

    // Step 2: Convert the cleaned string to a float
    const floatValue = parseFloat(cleanedString);

    return floatValue;
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatMoney(inputValue);
    setValue(formattedValue);
    updateList(dataIndex, dataKey, convertToFloat(inputValue));
  };

  const removeComma = (value) => {
    console.log("Remive comma", value);
    if (!value) return;
    if (String(value).includes(",")) {
      return parseFloat(value.replace(/,/g, ""));
    }
    return parseFloat(value);
  };

  useEffect(() => {
    // Ensure cursor position is maintained
    const input = inputRef.current;
    if (input) {
      const pos = input.selectionStart;
      input.setSelectionRange(pos, pos);
    }
  }, [value]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value && value != 0 ? formatMoney(value) : ""}
      id={id}
      name={name}
      onChange={(e) => {
        handleChange(e);
      }}
      onBlur={(e) =>
        value && value != ""
          ? setValue(formatMoney(removeComma(value).toFixed(2)))
          : 0
      }
      placeholder={placeholder}
      className={`${className} ${width} outline-none ${textSize} transition-all ease-in-out border border-slate-500 px-2 py-1 text-dark-gray rounded-lg disabled:cursor-not-allowed`}
      disabled={disabled}
    />
  );
};
