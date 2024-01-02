import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeDirectoryCard from "./EmployeeDirectoryCard";

const EmployeeDirectoryComponent = ({color}) => {
  const [directory, setDirectory] = useState([]);
  const [division, setDivision] = useState([]);
  const [department, setDepartment] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  var deptArray = [];

  useEffect(() => {
    const setData = async () => {
      try {
        const dir = await axios.get(BASE_URL + "/getDirectory");
        const div = await axios.get(BASE_URL + "/getDivision");
        const dept = await axios.get(BASE_URL + "/getDepartment");
        setDirectory(dir.data);
        setDivision(div.data);
        setDepartment(dept.data)
      } catch (e) {
        console.log(e);
      }
    };
    setData();
  });
  return (

    <div className="my-24 flex flex-col gap-40">
      {division.map((div) => (
        <div>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center mb-2">{div.div_name}</h1>

            <div className={"h-2 w-20 bg-["+color+"]"}></div>
          </div>

          {department.map((dept) => (
            (dept.div_id == div.div_id) &&
            <div className="my-10">
              <h2 className="text-xl font-semibold text-center mb-5">{(dept.dept_name != "Not Applicable" || directory.filter(dir => (dir.dept_id == dept.dept_id) ? true : false).length > 0) && dept.dept_name}</h2>
              <div className="flex flex-row flex-wrap justify-center items-center gap-4 mb-4">
                {directory.map((d) => (
                    (dept.manager_id == d.emp_id) &&
                    <EmployeeDirectoryCard
                      image={d.emp_pic}
                      firstName={d.f_name}
                      lastName={d.s_name}
                      department={"Manager"}
                      position={d.position_name}
                      workEmail={d.work_email}
                    />
                  ))}
              </div>
              <div className="flex flex-row flex-wrap justify-center items-center gap-4">
                {directory.map((d) => (
                  (dept.dept_id == d.dept_id && dept.manager_id != d.emp_id) &&
                  <EmployeeDirectoryCard
                    image={d.emp_pic}
                    firstName={d.f_name}
                    lastName={d.s_name}
                    position={d.position_name}
                    workEmail={d.work_email}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>



    // <div className="my-24 flex flex-col gap-40">
    //   {division.map((div) => (
    //     <div>
    //       <h1 className="text-3xl font-bold text-center mb-2">{div.div_name}</h1>
    //       {department.map((dept) => (
    //         (dept.div_id == div.div_id) &&
    //         <div className="my-10">
    //           <h2 className="text-xl font-semibold text-center mb-5">{(dept.dept_name != "Not Applicable" || directory.filter(dir => (dir.dept_id == dept.dept_id) ? true : false).length > 0) && dept.dept_name}</h2>
    //           <div className="flex flex-row flex-wrap justify-center items-center gap-4 mb-4">
    //             {directory.map((d) => (
    //                 (dept.manager_id == d.emp_id) &&
    //                 <EmployeeDirectoryCard
    //                   image={d.emp_pic}
    //                   firstName={d.f_name}
    //                   lastName={d.s_name}
    //                   department={"Manager"}
    //                   position={d.position_name}
    //                   workEmail={d.work_email}
    //                 />
    //               ))}
    //           </div>
    //           <div className="flex flex-row flex-wrap justify-center items-center gap-4">
    //             {directory.map((d) => (
    //               (dept.dept_id == d.dept_id && dept.manager_id != d.emp_id) &&
    //               <EmployeeDirectoryCard
    //                 image={d.emp_pic}
    //                 firstName={d.f_name}
    //                 lastName={d.s_name}
    //                 position={d.position_name}
    //                 workEmail={d.work_email}
    //               />
    //             ))}
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   ))}
    // </div>
  );
};
export default EmployeeDirectoryComponent;
