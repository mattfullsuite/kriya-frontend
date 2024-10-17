const RecurringPayRecords = () => {
  return (
    <>
      <div className=" bg-white rounded-xl mt-10 p-5">
        {/* Action Bar */}
        <div className="flex flex-column p-2 md:flex-row">
          <div className="w-full">
            <input
              type="text"
              className="input input-bordered w-80 border mr-auto"
              placeholder="Search..."
              //   onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div
            className=" btn flex w-28 bg-[#666A40] shadow-md text-white hover:bg-[#666A40] hover:opacity-60 ml-auto"
            // onClick={() => function()}
          >
            + Add
          </div>
        </div>
      </div>
    </>
  );
};

export default RecurringPayRecords;
