import React from "react";

const NewDashboard = () => {
  return (
    <>
      <div className="box-border max-w-[1200px] m-auto flex flex-row justify-between gap-5">
        <div className="box-border flex-1">
          <Headings text={"Good morning, Marvin!"} />

          <div className="mt-16 grid grid-cols-3 gap-3">
            <MoodRate />

            <MoodRate />

            <MoodRate />
          </div>
        </div>

        <div className="box-border w-80">
          <Subheadings text={"Announcements"} />

          <div className="box-border bg-white p-3 border border-[#E4E4E4] rounded-[15px] flex flex-col juastify-center gap-2 mt-3">
            <div className="box-border flex flex-row justify-between bg-[#F4F4F4] rounded-[8px] p-2 gap-2">
              <div className="w-[50px] h-[50px] rounded-full bg-orange-500 relative">
                <div className="rounded-full w-5 h-5 bg-[#F2A91A] absolute flex justify-center items-center bottom-0 right-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="fill-white h-3 w-3"
                  >
                    <path d="M20.664 3.478 8 8v7l.748.267-1.127 2.254a1.999 1.999 0 0 0 1.156 2.792l4.084 1.361a2.015 2.015 0 0 0 2.421-1.003l1.303-2.606 4.079 1.457A1 1 0 0 0 22 18.581V4.419a1 1 0 0 0-1.336-.941zm-7.171 16.299L9.41 18.416l1.235-2.471 4.042 1.444-1.194 2.388zM4 15h2V8H4c-1.103 0-2 .897-2 2v3c0 1.103.897 2 2 2z"></path>
                  </svg>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-start">
                <p className="text-[#363636] text-[12px] line-clamp-2">
                  <b>Marvin Bautista</b> “Lorem ipsum sit dolor amet ipsum dolor
                  lorem sit dolor met amit sit amet dolor”
                </p>
                <p className="text-[#8B8B8B] text-[10px] line-clamp-2">
                  Public announcement · Just now
                </p>
              </div>
            </div>

            <div className="box-border flex flex-row justify-between bg-[#F4F4F4] rounded-[8px] p-2 gap-2">
              <div className="w-[50px] h-[50px] rounded-full bg-orange-500 relative">
                <div className="rounded-full w-5 h-5 bg-[#F2A91A] shadow-lg absolute flex justify-center items-center bottom-0 right-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="fill-white h-3 w-3"
                  >
                    <path d="M20.664 3.478 8 8v7l.748.267-1.127 2.254a1.999 1.999 0 0 0 1.156 2.792l4.084 1.361a2.015 2.015 0 0 0 2.421-1.003l1.303-2.606 4.079 1.457A1 1 0 0 0 22 18.581V4.419a1 1 0 0 0-1.336-.941zm-7.171 16.299L9.41 18.416l1.235-2.471 4.042 1.444-1.194 2.388zM4 15h2V8H4c-1.103 0-2 .897-2 2v3c0 1.103.897 2 2 2z"></path>
                  </svg>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-start">
                <p className="text-[#363636] text-[12px] line-clamp-2">
                  <b>Marvin Bautista</b> “Lorem ipsum sit dolor amet ipsum dolor
                  lorem sit dolor met amit sit amet dolor”
                </p>
                <p className="text-[#8B8B8B] text-[10px] line-clamp-2">
                  Public announcement · Just now
                </p>
              </div>
            </div>

            <div className="box-border flex flex-row justify-between bg-[#F4F4F4] rounded-[8px] p-2 gap-2">
              <div className="w-[50px] h-[50px] rounded-full bg-orange-500 relative">
                <div className="rounded-full w-5 h-5 bg-[#F2A91A] absolute flex justify-center items-center bottom-0 right-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="fill-white h-3 w-3"
                  >
                    <path d="M20.664 3.478 8 8v7l.748.267-1.127 2.254a1.999 1.999 0 0 0 1.156 2.792l4.084 1.361a2.015 2.015 0 0 0 2.421-1.003l1.303-2.606 4.079 1.457A1 1 0 0 0 22 18.581V4.419a1 1 0 0 0-1.336-.941zm-7.171 16.299L9.41 18.416l1.235-2.471 4.042 1.444-1.194 2.388zM4 15h2V8H4c-1.103 0-2 .897-2 2v3c0 1.103.897 2 2 2z"></path>
                  </svg>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-start">
                <p className="text-[#363636] text-[12px] line-clamp-2">
                  <b>Marvin Bautista</b> “Lorem ipsum sit dolor amet ipsum dolor
                  lorem sit dolor met amit sit amet dolor”
                </p>
                <p className="text-[#8B8B8B] text-[10px] line-clamp-2">
                  Public announcement · Just now
                </p>
              </div>
            </div>

            <div className="box-border flex flex-row justify-between bg-[#F4F4F4] rounded-[8px] p-2 gap-2">
              <div className="w-[50px] h-[50px] rounded-full bg-orange-500 relative">
                <div className="rounded-full w-5 h-5 bg-[#F2A91A] absolute flex justify-center items-center bottom-0 right-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="fill-white h-3 w-3"
                  >
                    <path d="M20.664 3.478 8 8v7l.748.267-1.127 2.254a1.999 1.999 0 0 0 1.156 2.792l4.084 1.361a2.015 2.015 0 0 0 2.421-1.003l1.303-2.606 4.079 1.457A1 1 0 0 0 22 18.581V4.419a1 1 0 0 0-1.336-.941zm-7.171 16.299L9.41 18.416l1.235-2.471 4.042 1.444-1.194 2.388zM4 15h2V8H4c-1.103 0-2 .897-2 2v3c0 1.103.897 2 2 2z"></path>
                  </svg>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-start">
                <p className="text-[#363636] text-[12px] line-clamp-2">
                  <b>Marvin Bautista</b> “Lorem ipsum sit dolor amet ipsum dolor
                  lorem sit dolor met amit sit amet dolor”
                </p>
                <p className="text-[#8B8B8B] text-[10px] line-clamp-2">
                  Public announcement · Just now
                </p>
              </div>
            </div>

            <div className="box-border flex flex-row justify-between bg-[#F4F4F4] rounded-[8px] p-2 gap-2">
              <div className="w-[50px] h-[50px] rounded-full bg-orange-500 relative">
                <div className="rounded-full w-5 h-5 bg-[#F2A91A] absolute flex justify-center items-center bottom-0 right-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="fill-white h-3 w-3"
                  >
                    <path d="M20.664 3.478 8 8v7l.748.267-1.127 2.254a1.999 1.999 0 0 0 1.156 2.792l4.084 1.361a2.015 2.015 0 0 0 2.421-1.003l1.303-2.606 4.079 1.457A1 1 0 0 0 22 18.581V4.419a1 1 0 0 0-1.336-.941zm-7.171 16.299L9.41 18.416l1.235-2.471 4.042 1.444-1.194 2.388zM4 15h2V8H4c-1.103 0-2 .897-2 2v3c0 1.103.897 2 2 2z"></path>
                  </svg>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-start">
                <p className="text-[#363636] text-[12px] line-clamp-2">
                  <b>Marvin Bautista</b> “Lorem ipsum sit dolor amet ipsum dolor
                  lorem sit dolor met amit sit amet dolor”
                </p>
                <p className="text-[#8B8B8B] text-[10px] line-clamp-2">
                  Public announcement · Just now
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewDashboard;
