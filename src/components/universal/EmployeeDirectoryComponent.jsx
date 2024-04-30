import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeDirectoryCard from "./EmployeeDirectoryCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Tree, TreeNode } from 'react-organizational-chart';
import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from "react-headless-accordion";

const EmployeeDirectoryComponent = ({ color }) => {
  const [directorya, setDirectoryA] = useState([]);
  const [directoryb, setDirectoryB] = useState([]);
  const [directoryc, setDirectoryC] = useState([]);
  const [directoryd, setDirectoryD] = useState([]);
  const [directorye, setDirectoryE] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  var deptArray = [];

  useEffect(() => {
    const setData = async () => {
      try {
        const a = await axios.get(BASE_URL + "/getDirectory");
        const b = await axios.get(BASE_URL + "/getDirectory");
        const c = await axios.get(BASE_URL + "/getDirectory");
        const d = await axios.get(BASE_URL + "/getDirectory");
        const e = await axios.get(BASE_URL + "/getDirectory");
        setDirectoryA(a.data);
        setDirectoryB(b.data);
        setDirectoryC(c.data);
        setDirectoryD(d.data);
        setDirectoryE(e.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    setData();
  });
  
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center">
          
        </div>
      ) : (
        // <div className="my-24 flex flex-col gap-40 px-5">
        //   {directorya.map((a) => ( 
        //     (a.position_name == "Chief Executive Officer") && <Tree label={<div>{a.f_name + " " + a.s_name} </div>}>
        //       {directoryb.map((b) => ( 
        //         (b.superior_id == a.emp_id == (a.position_name == "Chief Executive Officer")) && <TreeNode label={<div value={b.emp_id} >{b.f_name + " " + b.s_name}</div>}>
        //           {directoryc.map((c) => ( 
        //             (b.emp_id == c.superior_id) && <TreeNode label={<div value={c.emp_id}>{c.f_name + " " + c.s_name}</div>}>
        //               {directoryd.map((d) => ( 
        //                 (c.emp_id == d.superior_id) && <TreeNode label={<div value={d.emp_id}>{d.f_name + " " + d.s_name}</div>}>
        //                   {directorye.map((e) => ( 
        //                     (d.emp_id == e.superior_id) && <TreeNode label={<div value={e.emp_id}>{e.f_name + " " + e.s_name}</div>}>
        //                     </TreeNode>
        //                   ))}
        //                 </TreeNode>
        //               ))}
        //             </TreeNode>
        //           ))}
        //         </TreeNode>
        //       ))}
        //     </Tree>
        //   ))}
        // </div>

        //New Tree

        <div className="my-24 flex flex-col gap-40 px-5">
          {directorya.map((a) => ( 
            (a.position_name == "Chief Executive Officer") && <Accordion alwaysOpen={true} transition={{duration: "300ms", timingFunction: "cubic-bezier(0, 0, 0.2, 1)"}}>
              <AccordionItem isActive={true}>
                  <AccordionHeader>
                      <h1 className={`accordion-title font-bold`}>{a.f_name + " " + a.s_name} <span>{a.position_name}</span> </h1>
                  </AccordionHeader>

                  <AccordionBody>
                      {directoryb.map((b) => ( 
                        (b.superior_id == a.emp_id == (a.position_name == "Chief Executive Officer")) && 
                        <AccordionItem isActive={true}>
                          <AccordionHeader>
                              <h2 className={`accordion-title ml-10`}>{b.f_name + " " + b.s_name} <span>{b.position_name}</span></h2>
                          </AccordionHeader>

                              <AccordionBody>
                              {directoryc.map((c) => ( 
                                //(b.emp_id == c.superior_id) && <TreeNode label={<div value={c.emp_id}>{c.f_name + " " + c.s_name}</div>}>
                                (b.emp_id == c.superior_id) && 
                                <AccordionItem isActive={true}>
                                  <AccordionHeader>
                                      <h2 className={`accordion-title ml-16`}>{c.f_name + " " + c.s_name}</h2>
                                  </AccordionHeader>

                                  <AccordionBody>
                                      {directoryd.map((d) => ( 
                                    //(b.emp_id == c.superior_id) && <TreeNode label={<div value={c.emp_id}>{c.f_name + " " + c.s_name}</div>}>
                                    (c.emp_id == d.superior_id) && 
                                    <AccordionItem isActive={true}>
                                      <AccordionHeader>
                                          <h3 className={`accordion-title ml-20`}>{d.f_name + " " + d.s_name}</h3>
                                      </AccordionHeader>

                                      <AccordionBody>
                                          <div className="accordion-body">
                                              
                                          </div>
                                      </AccordionBody>
                                  </AccordionItem>
                                  ))}
                                  </AccordionBody>
                              </AccordionItem>
                              ))}
                          </AccordionBody>
                      </AccordionItem>
                   ))}
                  </AccordionBody>

                  
              </AccordionItem>

            </Accordion>
          ))}
        </div>
      )}
    </>
  );
};
export default EmployeeDirectoryComponent;
