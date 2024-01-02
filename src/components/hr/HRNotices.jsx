import React, {useState, useEffect} from "react";
import HRPTONotices from "./HRPTONotices";
import DashBRemainingOffset from "../universal/DashBRemainingOffset";
import DashBremainingPTO from "../universal/DashBRemainingPTO";
import DashBBirthdays from "../universal/DashBBirthdays";
import DashBAnniversaries from "../universal/DashBAnniversaries";

const HRNotices = () => {

    const [ptos, setPtos] = useState([])

    return (
        <>
            <div className="grow p-2 flex flex-col">
                <HRPTONotices></HRPTONotices>
            </div>
        </>
    );
}

export default HRNotices;