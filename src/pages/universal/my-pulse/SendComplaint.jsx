const SendComplaint = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  accentColor,
  focusBorder,
}) => {
  return (
    <div className="min-h-screen flex flex-col justify-center gap-10 p-5 max-w-[500px] m-auto">
      <div className="flex flex-col justify-center items-center gap-2">
        <svg
          viewBox="0 0 37 37"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
        >
          <path
            d="M18.5 0C8.2991 0 0 8.2991 0 18.5C0 28.7009 8.2991 37 18.5 37C28.7009 37 37 28.7009 37 18.5C37 8.2991 28.7009 0 18.5 0ZM20.35 27.75H16.65V16.65H20.35V27.75ZM20.35 12.95H16.65V9.25H20.35V12.95Z"
            fill="#8B8B8B"
          />
        </svg>

        <p className="text-center text-[11px] text-[#8b8b8b]">
          All complaints submitted to HR will be treated with the utmost
          confidentiality. However, it is important to note that in certain
          circumstances, confidentiality may be limited by legal or
          organizational requirements. HR will make every effort to protect your
          privacy within the bounds of these obligations.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <p className="text-[14px] text-[#363636] font-medium ml-[8px]">
            Type of Complaint
          </p>

          <select
            className={`w-full outline-none transition border border-[#e4e4e4] ${focusBorder} rounded-[8px] text-[12px] px-3 py-2 mt-2`}
          >
            <option>Profanity</option>
            <option>Bullying</option>
            <option>Violence</option>
          </select>
        </div>

        <div>
          <p className="text-[14px] text-[#363636] font-medium ml-[8px]">
            Reason
          </p>

          <textarea
            placeholder="Explain your request"
            className={`w-full outline-none transition border border-[#e4e4e4] ${focusBorder} rounded-[8px] text-[12px] h-[120px] resize-none p-3 mt-2`}
          />
        </div>

        <div>
          <p className="text-[14px] text-[#363636] font-medium ml-[8px]">
            Send to:
          </p>

          <select
            className={`w-full outline-none transition border border-[#e4e4e4] ${focusBorder} rounded-[8px] text-[12px] px-3 py-2 mt-2`}
          >
            <option>All HR</option>
            <option>Mira Capiral</option>
            <option>Elizabeth II</option>
          </select>
        </div>
      </div>

      <button
        className={`self-end transition-all outline-none ${bgColor} ${hoverColor} px-3 py-2 rounded-[8px] flex justify-center items-center gap-2`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="fill-white h-5 w-5"
        >
          <path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"></path>
        </svg>

        <span className="leading-none text-[14px] text-white">Send</span>
      </button>
    </div>
  );
};

export default SendComplaint;
