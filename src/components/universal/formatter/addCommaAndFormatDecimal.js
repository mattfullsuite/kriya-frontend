export const addCommaAndFormatDecimal = (number) => {
  if (typeof number == "number") {
    let parts = number.toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  } else {
    return number;
  }
};

export const addComma = (value) => {
  if (!value) return;
  if (value.length > 0) {
    if (value.includes(",")) {
      value = value.replace(/,/g, "");
    }
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedValue;
  }
};

export const removeComma = (value) => {
  if (!value) return;
  if (value.includes(",")) {
    return parseFloat(value.replace(/,/g, ""));
  }
  return value;
};

export const formatDecimal = (value) => {
  if (!value) return;
  value = removeComma(value);

  return parseFloat(value).toFixed(2);
};
