// #region Turn Pay Item Name to ID
export const ProcessDataForDBInsertion = (data, payItems) => {
  data.forEach((datum) => {
    const result = {};
    payItems.forEach((item) => {
      const payableAmount = datum["Pay Items"][item.pay_item_name];
      if (payableAmount !== undefined) {
        result[item.pay_items_id] =
          (result[item.pay_items_id] || 0) + parseFloat(payableAmount);
      }
    });
    datum["Pay Items"] = result;
  });
  // Return Processed Data
  return data;
};
// #endregion

// #region Turn Pay Item ID to Name
export const ProcessDataForSpreadsheetViewing = (data, payItems) => {
  data.forEach((datum) => {
    const result = {};
    payItems.forEach((payItem) => {
      const payItemID = payItem.pay_items_id.toString();
      const payItemName = payItem.pay_item_name;
      // result[payItemName] = datum["payables"][payItemID] || 0;
      const value = datum.payables[payItemID];
      result[payItemName] = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    });
    datum["payables"] = result;
  });
  return data;
};
// #endregion
