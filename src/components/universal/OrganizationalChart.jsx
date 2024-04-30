import React, { useState, useEffect } from 'react';
import axios from "axios";
import { OrganizationChart } from 'primereact/organizationchart';
import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function OrganizationalChart() {

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [selection, setSelection] = useState([]);
  //const [data, setData] = useState({});

  const [directorya, setDirectoryA] = useState([]);
  const [directoryb, setDirectoryB] = useState([]);
  const [directoryc, setDirectoryC] = useState([]);
  const [directoryd, setDirectoryD] = useState([]);
  const [directorye, setDirectoryE] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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


    // const [data] = useState([
    //     {
    //         label: 'Argentina',
    //         expanded: true,
    //         children: [
    //             {
    //                 label: 'Argentina',
    //                 expanded: true,
    //                 children: [
    //                     {
    //                         label: 'Argentina'
    //                     },
    //                     {
    //                         label: 'Croatia'
    //                     }
    //                 ]
    //             },
    //             {
    //                 label: 'France',
    //                 expanded: true,
    //                 children: [
    //                     {
    //                         label: 'France'
    //                     },
    //                     {
    //                         label: 'Morocco'
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ]);

    const [data] = useState([
      
      directorya.map((a) => 
        ((a.position_name === "Chief Executive Officer") && 
          {
            label: a.f_name + " " + a.s_name,
            expanded: true,
            children: [
                {
                    label: 'Argentina',
                    expanded: true,
                    children: [
                        {
                            label: 'Argentina'
                        },
                        {
                            label: 'Croatia'
                        }
                    ]
                }
            ]
          }
      ))
    ]);

    // {directorya.map((a) => ( 
    //   (a.position_name == "Chief Executive Officer") && <Tree label={<div>{a.f_name + " " + a.s_name} </div>}>
    //     {directoryb.map((b) => ( 
    //       (b.superior_id == a.emp_id == (a.position_name == "Chief Executive Officer")) && <TreeNode label={<div value={b.emp_id}>{b.f_name + " " + b.s_name}</div>}>
    //         {directoryc.map((c) => ( 
    //           (b.emp_id == c.superior_id) && <TreeNode label={<div value={c.emp_id}>{c.f_name + " " + c.s_name}</div>}>
    //             {directoryd.map((d) => ( 
    //               (c.emp_id == d.superior_id) && <TreeNode label={<div value={d.emp_id}>{d.f_name + " " + d.s_name}</div>}>
    //                 {directorye.map((e) => ( 
    //                   (d.emp_id == e.superior_id) && <TreeNode label={<div value={e.emp_id}>{e.f_name + " " + e.s_name}</div>}>
    //                   </TreeNode>
    //                 ))}
    //               </TreeNode>
    //             ))}
    //           </TreeNode>
    //         ))}
    //       </TreeNode>
    //     ))}
    //   </Tree>
    // ))}


    return (
        <div className="card overflow-x-auto">
            <OrganizationChart
                value={data}
                selectionMode="single"
            />
        </div>
    )
}