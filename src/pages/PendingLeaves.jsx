import React, { useState, useEffect } from "react"
import axios from "axios"

const PendingLeaves = () => {
    const [leaves, setPendingLeaves] = useState([])

    useEffect(() => {
        const fetchAllPendingLeaves = async ()=> {
            try{
                const res = await axios.get("http://localhost:6197/showpendingleaves")
                setPendingLeaves(res.data)
            } catch(err){
                console.log(err)
            }
        };
        fetchAllPendingLeaves();
    }, []);

    const handleApproval = async (leave_id) => {
      try {
          await axios.post("http://localhost:6197/showpendingleaves/" + leave_id);
          window.location.reload()
      } catch(err){
          console.log(err)
      }
  }

  const handleRejection = async (leave_id) => {
    try {
        await axios.post("http://localhost:6197/rejectleave/" + leave_id);
        window.location.reload()
    } catch(err){
        console.log(err)
    }
}

    return (
        <div>Pending Leaves

        {/* ----------------------------- */}
            
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Requested Date/s</th>
        <th>Leave Details</th>
        <th>Actions</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      
      { leaves.map((leave) => (
      <tr key={ leave.leave_id} >
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{leave.s_name + ", " + leave.f_name + " " + leave.m_name}</div>
              <div className="text-sm opacity-50">{ leave.leave_reason }</div>
            </div>
          </div>
        </td>
        <td>
        { leave.leave_from + " to " }
        <br/>
        {leave.leave_to }
        </td>
        <td>{ leave.leave_type }
        <br/>
          <span className="badge badge-ghost badge-sm">{ leave.leave_reason }</span></td>
        

        <th>
          <button className="btn btn-ghost btn-xs bg-accent" onClick={() => handleApproval( leave.leave_id )} >Approve</button>
          <button className="btn btn-ghost btn-xs bg-secondary" onClick={() => handleRejection( leave.leave_id )}>Reject</button>
        </th>
      </tr>
      ))}
    </tbody>
    {/* foot */}
    <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Requested Date/s</th>
        <th>Leave Details</th>
        <th>Actions</th>
        <th></th>
      </tr>
    </tfoot>
    
  </table>
</div>

{/* ----------------------------- */}
            
        </div>
    )
}

export default PendingLeaves