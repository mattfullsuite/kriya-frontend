import { useEffect, useState } from "react";
import { getRecords } from "./AxiosFunctions";

import Headings from "../../../components/universal/Headings";
import RecurringPayRecords from "./RecurringPayRecords";

const RecurringPay = () => {
  useEffect(async () => {
    console.log(await getRecords());
  }, []);

  return (
    <>
      <div className="p-5 min-w-[320px] max-w-[1300px]">
        <Headings text={"Recurring Pay Items"} />
        <RecurringPayRecords />
      </div>
    </>
  );
};

export default RecurringPay;
