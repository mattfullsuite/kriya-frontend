import React from "react";
// import img1 from "../img/img1.png";
// import img2 from "../img/img2.png";
// import img3 from "../img/img3.png";
// import img4 from "../img/img4.png";
// import img5 from "../img/img5.png";
// import img6 from "../img/img6.png";
// import Sidebar from "./Sidebar";

export default function ClientPoliciesHandbook() {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex-1 overflow-auto">
          <div className="w-auto lg:flex flex-row justify-center mt-16 m-6 gap-24 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 h-3/6 min-h-96 min-w-48">
            <div className="max-w-80 border-2 rounded-lg relative ">
              <div className="m-12">
                <h2 className="font-semibold ">Welcome Packet</h2>
                <p className="text-justify mt-10">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <div className="float-right mt-10">
                  <a href="" className="underline text-color-burnt">
                    Read More
                  </a>
                </div>
              </div>
              <div>
                <img
                  //src={img1}
                  alt=""
                  className="absolute bottom-[-13] left-[-5rem] max-w-48"
                />
              </div>
            </div>
            <div className="max-w-80 border-2 rounded-lg relative">
              <div className="m-12">
                <h2 className="font-semibold">Company Procedures</h2>
                <p className="text-justify mt-10">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <div className="mt-10 float-right mb-10">
                  <a href="" className="underline text-color-brown">
                    Read More
                  </a>
                </div>
              </div>
              <div>
                <img
                  //src={img2}
                  alt=""
                  className="absolute bottom-[-13] left-[-5rem] max-w-48"
                />
              </div>
            </div>
            <div className="max-w-80 border-2 rounded-lg relative">
              <div className="m-12">
                <h2 className="font-semibold">Company Core Conduct</h2>
                <p className="text-justify mt-10">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <div className="mt-10 float-right mb-10">
                  <a href="" className="underline text-color-green">
                    Read More
                  </a>
                </div>
              </div>
              <div>
                <img
                  //src={img3}
                  alt=""
                  className="absolute bottom-[-13] left-[-5rem] max-w-48"
                />
              </div>
            </div>
          </div>
          {/* Second row */}
          <div className="w-auto lg:flex flex-row justify-center mt-16 m-6 gap-24 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 h-3/6 min-h-96 min-w-48">
            <div className="max-w-80 border-2 rounded-lg relative">
              <div className="m-12">
                <h2 className="font-semibold ">Workplace Health and Safety</h2>
                <p className="text-justify mt-10">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <div className="mt-10 float-right mb-10">
                  <a href="" className="underline text-color-burnt">
                    Read More
                  </a>
                </div>
              </div>
              <div>
                <img
                  //src={img4}
                  alt=""
                  className="absolute bottom-0 left-[-5rem] max-w-48"
                />
              </div>
            </div>
            <div className="max-w-80 border-2 rounded-lg relative">
              <div className="m-12">
                <h2 className="font-semibold">Leave Policies</h2>
                <p className="text-justify mt-10">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <div className="mt-10 float-right mb-10">
                  <a href="" className="underline text-color-brown">
                    Read More
                  </a>
                </div>
              </div>
              <div>
                <img
                  //src={img5}
                  alt=""
                  className="absolute bottom-[-13] left-[-5rem] max-w-48"
                />
              </div>
            </div>
            <div className="max-w-80 border-2 rounded-lg relative">
              <div className="m-12">
                <h2 className="font-semibold">
                  Confidentiality and Data Protection
                </h2>
                <p className="text-justify mt-10">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <div className="mt-10 float-right mb-10">
                  <a href="" className="underline text-color-green">
                    Read More
                  </a>
                </div>
              </div>
              <div>
                <img
                  //src={img6}
                  alt=""
                  className="absolute bottom-[-13] left-[-5rem] max-w-48"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
