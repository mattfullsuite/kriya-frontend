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

// #region Put Pay Items inside  Categories
export const GroupPayItemsByCategories = (data, payItems) => {
  const updatedData = ProcessDataForSpreadsheetViewing(data, payItems);

  // Create a mapping of pay item names to categories
  const payItemCategoryMap = payItems.reduce((acc, item) => {
    acc[item.pay_item_name] = item.pay_item_category;
    return acc;
  }, {});

  // Extract unique categories from payItems
  const uniqueCategories = [
    ...new Set(payItems.map((item) => item.pay_item_category)),
  ];

  // Process each entry in the data array
  const transformedData = updatedData.map((entry) => {
    const { payables, ...rest } = entry;

    // Initialize categorized payables dynamically based on unique categories
    const categorizedPayables = uniqueCategories.reduce((acc, category) => {
      acc[category] = {};
      return acc;
    }, {});

    // Group payables into categories
    for (const [key, value] of Object.entries(payables)) {
      const category = payItemCategoryMap[key];
      if (!categorizedPayables[category]) {
        categorizedPayables[category] = {}; // Add missing category dynamically
      }
      categorizedPayables[category][key] = value;
    }

    return {
      ...rest,
      payables: categorizedPayables,
    };
  });

  return transformedData;
};

// #endregions
