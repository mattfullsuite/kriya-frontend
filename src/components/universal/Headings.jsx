import react from "react";

const Headings = ({ text }) => {
  return (
    <>
      <div className="box-border flex flex-row justify-start items-center gap-2">
        <label htmlFor="my-drawer-2" className="transition xl:hidden hover:bg-gray-200 w-8 h-8 rounded-full flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-[#363636] h-5 w-5"
          >
            <path d="M4 11h12v2H4zm0-5h16v2H4zm0 12h7.235v-2H4z"></path>
          </svg>
        </label>
        <h1 className="text-[18px] md:text-2xl font-bold text-[#363636]">{text}</h1>
      </div>
    </>
  );
};

export default Headings;
