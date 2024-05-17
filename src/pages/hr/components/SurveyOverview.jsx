import Subheadings from "../../../components/universal/Subheadings";

const SurveyOverview = () => {
  return (
    <div className="box-border bg-white border border-[#e4e4e4] rounded-[15px] p-3">
      <Subheadings text={"Survey Overview"} />

      <div className="box-border grid grid-cols-2 gap-y-5  mt-5">
        <div className="box-border flex flex-row justify-center items-start gap-2">
          <svg
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path
              d="M22.2222 25.7343C23.7542 25.7343 25 24.4908 25 22.9617V3.55338C25 2.02428 23.7542 0.780762 22.2222 0.780762H2.77778C1.24583 0.780762 0 2.02428 0 3.55338V22.9617C0 24.4908 1.24583 25.7343 2.77778 25.7343H22.2222ZM9.10139 10.0108L14.6569 12.7834L16.8139 8.47893L19.2986 9.71967L15.9 16.5056L10.3444 13.733L8.1875 18.0375L5.70278 16.7968L9.10139 10.0108Z"
              fill="#666A40"
            />
          </svg>

          <div className="box-border">
            <p className="leading-none text-[24px] font-bold text-[#666a40]">
              115
            </p>
            <p className="leading-none text-[12px] text-[#B2AC88]">responses</p>
          </div>
        </div>

        <div className="box-border flex flex-row justify-center items-start gap-2">
          <svg
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path
              d="M22.2222 25.7343C23.7542 25.7343 25 24.4908 25 22.9617V3.55338C25 2.02428 23.7542 0.780762 22.2222 0.780762H2.77778C1.24583 0.780762 0 2.02428 0 3.55338V22.9617C0 24.4908 1.24583 25.7343 2.77778 25.7343H22.2222ZM9.10139 10.0108L14.6569 12.7834L16.8139 8.47893L19.2986 9.71967L15.9 16.5056L10.3444 13.733L8.1875 18.0375L5.70278 16.7968L9.10139 10.0108Z"
              fill="#666A40"
            />
          </svg>

          <div className="box-border">
            <p className="leading-none text-[24px] font-bold text-[#666a40]">
              80%
            </p>
            <p className="leading-none text-[12px] text-[#B2AC88]">
              Participation Rate
            </p>
          </div>
        </div>

        <div className="box-border flex flex-row justify-center items-start gap-2">
          <svg
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path
              d="M17.5 0.702637H7.5C3.36375 0.702637 0 4.06013 0 8.1887V24.4085C0 24.7394 0.131696 25.0567 0.366116 25.2907C0.600537 25.5247 0.918479 25.6562 1.25 25.6562H17.5C21.6362 25.6562 25 22.2987 25 18.1701V8.1887C25 4.06013 21.6362 0.702637 17.5 0.702637ZM15 16.9224H6.25V14.4271H15V16.9224ZM18.75 11.9317H6.25V9.43637H18.75V11.9317Z"
              fill="#666A40"
            />
          </svg>

          <div className="box-border">
            <p className="leading-none text-[24px] font-bold text-[#666a40]">
              10
            </p>
            <p className="leading-none text-[12px] text-[#B2AC88]">comments</p>
          </div>
        </div>

        <div className="box-border flex flex-row justify-center items-start gap-2">
          <svg
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path
              d="M12.5019 2.8664C6.21941 2.8664 0.910566 8.08526 0.910566 14.2613C0.910566 20.4373 6.21941 25.6562 12.5019 25.6562C18.7857 25.6562 24.0933 20.4373 24.0933 14.2613C24.0933 8.08526 18.7857 2.8664 12.5019 2.8664ZM18.9416 15.5274H11.214V7.93079H13.7899V12.9952H18.9416V15.5274ZM23.1814 6.29499L19.3048 2.4967L21.1233 0.702637L25 4.50093L23.1814 6.29499ZM3.84962 0.706435L5.6759 2.49417L1.825 6.29246L0 4.50346L3.84962 0.706435Z"
              fill="#666A40"
            />
          </svg>

          <div className="box-border">
            <p className="leading-none text-[24px] font-bold text-[#666a40]">
              45s
            </p>
            <p className="leading-none text-[12px] text-[#B2AC88]">
              Completion Time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyOverview;
