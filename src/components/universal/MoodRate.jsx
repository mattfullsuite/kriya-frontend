const MoodRate = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-[#FFB800] to-[#FFC83C] box-border p-5 rounded-[15px] flex flex-col justify-between relative overflow-hidden">
        <span className="font-medium text-[14px] text-white">Mood Rate</span>

        <p className="text-white text-left text-3xl font-bold mt-5">
          3.8<span className="text-white text-[12px] font-medium">/5.0</span>
        </p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="fill-white w-32 h-32 absolute right-[-18px] bottom-[-30px]"
        >
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM8 9c2.201 0 3 1.794 3 3H9c-.012-.45-.194-1-1-1s-.988.55-1 1.012L5 12c0-1.206.799-3 3-3zm4 9c-4 0-5-4-5-4h10s-1 4-5 4zm5-6c-.012-.45-.194-1-1-1s-.988.55-1 1.012L13 12c0-1.206.799-3 3-3s3 1.794 3 3h-2z"></path>
        </svg>
      </div>
    </>
  );
};

export default MoodRate;
