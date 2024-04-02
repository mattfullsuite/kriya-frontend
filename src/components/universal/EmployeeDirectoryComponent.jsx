import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeDirectoryCard from "./EmployeeDirectoryCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Tree, TreeNode } from 'react-organizational-chart';

//import OrganizationChart from "@dabeng/react-orgchart";
import { OrganizationChart } from 'primereact/organizationchart';

const EmployeeDirectoryComponent = () => {
  const [flat, setFlat] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; //

  useEffect(() => {
    const setData = async () => {
      try {
        const a = await axios.get(BASE_URL + "/getDirectory");
        setFlat(a.data);
        
      } catch (e) {
        console.log(e);
      }
    };
    setData();
  });

  function checkLeftOvers(leftOvers, possibleParent){
    for (let i = 0; i < leftOvers.length; i++) {
      if(leftOvers[i].superior_id === possibleParent.emp_id) {
        delete leftOvers[i].superior_id
        possibleParent.children ? possibleParent.children.push(leftOvers[i]) : possibleParent.children = [leftOvers[i]]
        possibleParent.count = possibleParent.children.length
        const addedObj = leftOvers.splice(i, 1)
        checkLeftOvers(leftOvers, addedObj[0])
      }
    }
  }
  
  function findParent(possibleParents, possibleChild) {
    let found = false
    for (let i = 0; i < possibleParents.length; i++) {
      if(possibleParents[i].emp_id === possibleChild.superior_id) {
        found = true
        delete possibleChild.superior_id
        if(possibleParents[i].children) possibleParents[i].children.push(possibleChild)
        else possibleParents[i].children = [possibleChild]
        possibleParents[i].count = possibleParents[i].children.length
        return true
      } else if (possibleParents[i].children) found = findParent(possibleParents[i].children, possibleChild)
    } 
    return found;
  }
  
  const nested = flat.reduce((initial, value, index, original) => {
    if (value.superior_id === null) {
      if (initial.left.length) checkLeftOvers(initial.left, value)
      delete value.superior_id
      value.root = true;
      initial.nested.push(value)
    }
    else {
       let parentFound = findParent(initial.nested, value)
       if (parentFound) checkLeftOvers(initial.left, value)
       else initial.left.push(value)
    }
    return index < original.length - 1 ? initial : initial.nested
    
  }, {nested: [], left: []})

  


  return (
    <>
      <div className="my-24 flex flex-col gap-40 px-5">
          <OrganizationChart
            value={nested}
          />
      </div>
    </>
  );
};
export default EmployeeDirectoryComponent;
