import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageSuperiors = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  lightColor,
  focusBorder,
}) => {
  const addingSuperiorRef = useRef(null);
  const editingSuperiorRef = useRef(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL; //
  const [superiorData, setSuperiorData] = useState([]);
  const [emp, setEmp] = useState([]);
  const [newSuperior, setNewSuperior] = useState({
    emp_id: "",
    superior_id: "",
  });
  const [notif, setNotif] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const superior_res = await axios.get(
          BASE_URL + "/getInferiorAndSuperior"
        );
        const emp_res = await axios.get(BASE_URL + "/req-allemployees");
        setSuperiorData(superior_res.data);
        setEmp(emp_res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllData();
  }, [superiorData]);

  const superiorColumns = [
    {
      name: "Employee",
      selector: (row) =>
        row.f_name !== null ? row.f_name + " " + row.s_name : "",
      sortable: true,
    },
    {
      name: "Superior",
      selector: (row) =>
        row.s_f_name !== null ? row.s_f_name + " " + row.s_s_name : "",
      sortable: true,
    },
  ];

  const assignNewSuperior = () => {
    axios
      .post(BASE_URL + "/addSuperior", newSuperior)
      .then((res) => {
        if (res.data === "success") {
          addingSuperiorRef.current.close()
          notifySuccess();
        } else if (res.data === "error") {
          addingSuperiorRef.current.close()
          notifyFailed();
        }
        setNotif(res.data);
      })
      .catch((err) => console.log(err));
  };

  const notifySuccess = () =>
    toast.success(
      "Success!"
      ,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );

  const notifyFailed = () =>
    toast.error("Something went wrong!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <>
      {notif != "" && notif === "success" && <ToastContainer />}
      {notif != "" && notif === "error" && <ToastContainer />}
      <div className="p-5 grid">
        <p className="text-[20px] font-bold text-[#363636]">
          Employee Superior List
        </p>

        <div className="mt-10">
          <div className={`${lightColor} p-3 rounded-t-[15px] flex gap-2`}>
            <input
              type="text"
              className="flex-1 outline-none border border-[#e4e4e4] rounded-[8px] px-3 text-[14px] text-[#363636]"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* <select className="outline-none border border-[#e4e4e4] text-[#363636] text-[14px] rounded-[8px] px-3">
              <option>Filter</option>
            </select> */}

            <button
              onClick={() => addingSuperiorRef.current.showModal()}
              className={`outline-none transition-all ease-in-out ${bgColor} ${hoverColor} text-white rounded-[8px] text-[14px] px-3 py-2`}
            >
              Assign a Superior
            </button>
          </div>
          <div className="bg-white border border-[#e4e4e4] rounded-b-[15px] overflow-hidden">
            <DataTable
              columns={superiorColumns}
              //data={superiorData}
              data={superiorData.filter((item) => {
                if (searchTerm === "") {
                  return item;
                } else if (
                  item?.f_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item?.s_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item?.s_f_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item?.s_s_name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return item;
                }
              })}
              pagination
              highlightOnHover
            />
          </div>
        </div>
      </div>

      {/* modal for adding a superior */}
      <dialog className="modal" ref={addingSuperiorRef}>
        <div className="bg-white w-[550px] p-5 rounded-[15px]">
          <p className="text-[20px] text-[#363636] font-medium">
            Assign a Superior
          </p>

          <div className="mt-10">
            <div>
              <label className="text-[12px] text-[#363636] font-medium">
                Employee Name
              </label>
              <select
                id="emp_id"
                name="emp_id"
                onChange={(e) => setNewSuperior({ ...newSuperior, emp_id: e.target.value })}
                className={`transition-all ease-in-out w-full border border-[#e4e4e4] outline-none text-[14px] text-[#363636] px-3 py-2 rounded-[8px] ${focusBorder}`}
              >
                <option>Type in or select the employee’s name</option>
                {emp.map((e) => (
                  <option value={e.emp_id}>
                    {e.s_name +
                      ", " +
                      e.f_name +
                      " " +
                      e.m_name +
                      "     |      " +
                      e.position_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label className="text-[12px] text-[#363636] font-medium">
                Superior to be Assigned
              </label>

              <select
                id="superior_id"
                name="superior_id"
                onChange={(e) => setNewSuperior({ ...newSuperior, superior_id: e.target.value })}
                className={`transition-all ease-in-out w-full border border-[#e4e4e4] outline-none text-[14px] text-[#363636] px-3 py-2 rounded-[8px] ${focusBorder}`}
              >
                <option>Type in or select the superior to be assigned</option>

                {emp.map((e) => (
                  <option value={e.emp_id}>
                    {e.s_name +
                      ", " +
                      e.f_name +
                      " " +
                      e.m_name +
                      "     |      " +
                      e.position_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-16 flex flex-row justify-end gap-3">
              <button
                onClick={() => addingSuperiorRef.current.close()}
                className={`outline-none px-8 py-2 transition-all ease-in-out text-[#363636] bg-[#e7e7e7] hover:bg-[#dadada] text-[14px] rounded-[8px]`}
              >
                Cancel
              </button>

              <button
                onClick={() => assignNewSuperior()}
                className={`${bgColor} ${hoverColor} px-8 py-2 transition-all ease-in-out rounded-[8px] text-[14px] text-white`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </dialog>

      {/* modal for editing a superior */}
      <dialog className="modal" ref={editingSuperiorRef}>
        <div className="bg-white w-[550px] p-5 rounded-[15px]">
          <p className="text-[20px] text-[#363636] font-medium">
            Edit Superior
          </p>

          <div className="mt-10">
            <div>
              <label className="text-[12px] text-[#363636] font-medium">
                Employee Name
              </label>
              <input
                className={`transition-all ease-in-out w-full border border-[#e4e4e4] outline-none text-[14px] text-[#363636] px-3 py-2 rounded-[8px] ${focusBorder}`}
                disabled={true}
                value={"Marvin Bautista"}
              />
            </div>

            <div className="mt-5">
              <label className="text-[12px] text-[#363636] font-medium">
                Superior to be Assigned
              </label>

              <select
                className={`transition-all ease-in-out w-full border border-[#e4e4e4] outline-none text-[14px] text-[#363636] px-3 py-2 rounded-[8px] ${focusBorder}`}
              >
                <option>Type in or select the superior to be assigned</option>
              </select>
            </div>

            <div className="mt-16 flex flex-row justify-end gap-3">
              <button
                //onClick={() => editingSuperiorRef.current.close()}
                className={`outline-none px-8 py-2 transition-all ease-in-out text-[#363636] bg-[#e7e7e7] hover:bg-[#dadada] text-[14px] rounded-[8px]`}
              >
                Cancel
              </button>

              <button
                className={`${bgColor} ${hoverColor} px-8 py-2 transition-all ease-in-out rounded-[8px] text-[14px] text-white`}
                onClick={() => assignNewSuperior()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ManageSuperiors;
