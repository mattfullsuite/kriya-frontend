const RecurringPayRecords = ({ recurringPayList, showAddForm }) => {
  return (
    <>
      <div className=" bg-white rounded-xl mt-10 p-5">
        {/* Action Bar */}
        <div className="flex flex-col p-2 sm:flex-row gap-2">
          <div className="w-full">
            <input
              type="text"
              className="input input-bordered w-full sm:w-64 md:w-80 border mr-auto"
              placeholder="Search..."
              //   onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div
            className=" btn w-full sm:w-32 bg-[#666A40] shadow-md text-white hover:bg-[#666A40] hover:opacity-60 ml-auto"
            onClick={() => showAddForm()}
          >
            + Add
          </div>
        </div>
        <div className="p-2">Table</div>
      </div>
    </>
  );
};

export default RecurringPayRecords;
