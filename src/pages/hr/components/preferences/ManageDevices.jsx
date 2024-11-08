import DataTable from "react-data-table-component";
import moment from "moment";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageDevices = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  lightColor,
  focusBorder,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL; 

  const addModal = useRef(null);
  const deleteModalRef = useRef(null);

  const [notif, setNotif] = useState([]);

  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState({
    device_category: "",
    device_image: "",
  });

  const [image, setImage] = useState("");
  const [deleteID, setDeleteID] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")

  ///dm-addNewDeviceCategory

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const device_category_res = await axios.get(BASE_URL + "/dm-getDeviceCategoryPerCompany");
        setCategories(device_category_res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllCategories();
  }, [categories]);

  const assignNewCategory = () => {
    axios
      .post(BASE_URL + "/dm-addNewDeviceCategory", newCategory)
      .then((res) => {
        if (res.data === "success") {
          addModal.current.close();
          notifySuccess();
        } else if (res.data === "error") {
          addModal.current.close();
          notifyFailed();
        }

        setNotif(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(BASE_URL + "/deleteDeviceCategory/" + id);
      deleteModalRef.current.showModal();
    } catch (err) {
      console.log(err);
    }
  };

  const categoryColumns = [
    {
      name: "",
      selector: (row) => (
        <img src={row.device_image} className="h-20 w-20 object-contain" />
      ),
      width: "15rem",
    },

    {
      name: "Type",
      selector: (row) => (
        <p className="text-[12px] text-[#363636]">{row.device_category}</p>
      ),
      //width: "120px",
    },

    {
      name: "Image Link",
      selector: (row) => (
        <a href={row.device_image} className="link link-info">Link</a>
      ),
    },

    {
      name: "Actions",
      selector: (row) => (
        <>
        <button
            onClick={() => {
              setDeleteID(row.device_category_id);
              deleteModalRef.current.showModal();
            }}
            className="outline-none transition-all ease-in-out bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-[8px]"
          >
            Delete
          </button>

          <dialog className="modal" ref={deleteModalRef}>
            <div className="bg-white p-5 w-[500px] rounded-[15px]">
              <p className="text-[18px] text-[#363636] font-medium">
                Delete Confirmation
              </p>

              <p className="mt-5 font-medium text-[12px] text-[#363636]">
                Are you sure that you want to delete this device category?
              </p>

              <p className="mt-5 text-[12px] text-[#363636]">
                You will not be able to see or edit this device. This
                will remove it from the list.
              </p>

              <div className="mt-16 flex flex-row justify-end gap-3">
                <button
                  onClick={() => {
                    deleteModalRef.current.close();
                  }}
                  className="transition-all ease-in-out border border-slate-500 hover:border-slate-600 px-8 py-2 rounded-[8px] text-[14px] text-slate-500 hover:text-slate-600"
                >
                  Cancel
                </button>

                <button
                  className={`transition-all ease-in-out ${bgColor} ${hoverColor} ${disabledColor} outline-none rounded-[8px] text-[14px] text-white px-8 py-2`}
                  onClick={() => handleDelete(deleteID)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </dialog>
          </>
      ),
    },
  ];

  const notifySuccess = () =>
  toast.success("Success!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

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
      <div className="max-w-[1300px] m-auto p-5">
        <p className="text-[20px] font-bold text-[#363636]">
          Device Management
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
              onClick={() => addModal.current.showModal()}
              className={`outline-none transition-all ease-in-out ${bgColor} ${hoverColor} text-white rounded-[8px] text-[14px] px-3 py-2`}
            >
              Add New Device Type
            </button>
          </div>
          <div className="rounded-b-[15px] border border-[#e4e4e4]">
            <DataTable
              columns={categoryColumns}
              //data={categories}
              data={categories.filter((item) => {
                if (searchTerm === "") {
                  return item;
                } else if (
                  item?.device_category.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return item;
                }
              })}
              highlightOnHover
              pagination
            />
          </div>
        </div>
      </div>

      <dialog className="modal" ref={addModal}>
        <div className="modal-box w-10/12 max-w-xl">
          <span className="text-[18px] text-[#363636] font-bold">
            Add New Device Type
          </span>
          <button
            onClick={() => addModal.current.close()}
            className="outline-none absolute right-2 top-2 btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>

          <div className="mt-10">
            <label className="text-[12px] text-[#363636] font-medium ml-[8px]">
              New Device Type
            </label>
            <input
              type="text"
              className={`outline-none transition ease-in-out border border-[#e4e4e4] ${focusBorder} rounded-[8px] w-full px-3 py-2 text-[14px] text-[#363636]`}
              placeholder="Device Type"
              onChange={(e) => setNewCategory({ ...newCategory, device_category: e.target.value})}
            />

            <div className="mt-10 flex gap-5">
              <div className="flex-1">
                <label className="text-[12px] text-[#363636] font-medium ml-[8px]">
                  Image Link
                </label>

                <textarea
                  onChange={(e) => {
                    setNewCategory({ ...newCategory, device_image: e.target.value});
                    setImage(e.target.value)}}
                  className={`outline-none resize-none transition ease-in-out border border-[#e4e4e4] ${focusBorder} rounded-[8px] w-full h-24 px-3 py-2 text-[14px] text-[#363636]`}
                />
              </div>

              <div className="flex-1">
                <label className="text-[12px] text-[#363636] font-medium ml-[8px]">
                  Image Preview
                </label>

                {image ? (
                  <img
                    src={image}
                    className="h-24 object-contain border border-[#e4e4e4] w-full rounded-[8px] overflow-hidden"
                  />
                ) : (
                  <div className="h-24 object-contain border border-[#e4e4e4] w-full rounded-[8px] overflow-hidden flex flex-col justify-center items-center">
                    <span className="text-xs text-[#8b8b8b]">Image will be displayed here.</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10 flex justify-end gap-3">
              <button
                onClick={() => addModal.current.close()}
                className="transition ease-in-out outline-none text-[14px] text-[#363636] bg-[#e4e4e4] hover:bg-[#cccccc] rounded-[8px] px-3 py-2"
              >
                Cancel
              </button>

              <button
                className={`transition ease-in-out outline-none text-[14px] text-white rounded-[8px] px-3 py-2 ${bgColor} ${hoverColor}`}
                onClick={() => assignNewCategory()}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ManageDevices;
