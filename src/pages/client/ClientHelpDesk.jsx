import { useState } from "react";
// import FAQ from "../src/assets/FAQ.png";
// import Frame from "../src/assets/Frame.png";
// import Frame1 from "../src/assets/Frame1.png";
// import Frame2 from "../src/assets/Frame2.png";
// import Frame3 from "../src/assets/Frame3.png";
// import question from "../src/assets/question.png";

function ClientHelpDesk() {
  return (
    <>
      <div className="">
        <div className="relative">
          <div className="h-[40vh] bg-gradient-to-r from-[#CC5500] to-[#e3863f] text-[#FFFFFF] flex justify-between items-center">
            <div className="md:px-10 px-2 py-10 max-w-screen-2xl text-center my-8">
              <p className="text-justify mb-6 text-lg font-normal text-white-500 lg:text-xl sm:px-16 xl:px-30 dark:text-gray-400">
                How can we help you?
              </p>
              <label className="relative block w-96  mb-2 text-4xl md:text-5xl lg:text-6xl sm:px-16 xl:px-48s">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    className="h-5 w-5 fill-slate-900"
                    viewBox="0 0 20 20"
                  ></svg>
                </span>
                <input
                  className="text-black placeholder-italic placeholder-slate-00 block bg-white-96 w-96 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Search for anything..."
                  type="text"
                  name="search"
                />
              </label>
              <br />
              <h1 className="text-justify mb-2 text-4xl font-extrabold leading-none tracking-tight text-white-500 md:text-5xl lg:text-6xl sm:px-16 xl:px-30 dark:text-gray-400">
                FAQs
              </h1>
              <p className="text-justify mb-6  font-normal lg:text-xl sm:px-16 xl:px-30 dark:text-gray-400">
                Have a question? Here you’ll find your answer most valued by our{" "}
                <br />
                partners along with access to step-by-step instructions and
                support.
              </p>
            </div>
            <div className="sm:px-14 px-4 py-40 max-w-screen-2xl m-6">
              <img
                //src={FAQ}
                alt=""
                className="mr-40 w-full h-full object-cover"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
          <br />
          <br />
          <div className="text-justify mb-6 text-3xl font-bold leading-none tracking-tight mx-10 sm:px-16 xl:px-30 text-[#303030]">
            Popular Topics
          </div>
          <div className="w-auto lg:flex  mt-5 m-6 gap-32 justify-stretch grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mx-10 sm:px-16 xl:px-30">
            <div className="w-80 h-32 border-2 rounded-lg shadow-lg  relative">
              <div className="m-4 flex items-start">
                <img
                  //src={Frame1}
                  alt=""
                  className="w-16 h-auto mt-4"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <div className="pl-2">
                  <h2 className="font-semibold mt-6">Getting started </h2>
                  <p className="text-justify text-yellow-600">Take a tour</p>
                </div>
              </div>
            </div>
            <div className="w-80 h-32 border-2 rounded-lg shadow-lg relative">
              <div className="m-4 flex items-start">
                <img
                  //src={Frame}
                  alt=""
                  className="w-16 h-auto mt-4"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <div className="pl-2">
                  <h2 className="font-semibold mt-6">Support </h2>
                  <p className="text-justify text-yellow-600">
                    Check was Kriya has
                  </p>
                </div>
              </div>
            </div>
            <div className="w-80 h-32 border-2 rounded-lg shadow-lg relative">
              <div className="m-4 flex items-start">
                <img
                  //src={Frame2}
                  alt=""
                  className="w-16 h-auto mt-4"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <div className="pl-2">
                  <h2 className="font-semibold mt-6">Available Modules </h2>
                  <p className="text-justify text-yellow-600">See More</p>
                </div>
              </div>
            </div>
            <div className="w-80 h-32 border-2 rounded-lg shadow-lg relative">
              <div className="m-4 flex items-start">
                <img
                  //src={Frame3}
                  alt=""
                  className="w-16 h-auto mt-4"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <div className="pl-2">
                  <h2 className="font-semibold mt-6">Communities </h2>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className=" ml-32 mr-32 my-8 shadow-2xl rounded-lg text-start mx-10 mb-6  flex justify-start border border-base-300">
            <div className="max-w-screen-2xl m-6">
              <img
                //src={question}
                alt=""
                className="mr-80 w-full h-full pt-16 "
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
            <div className="join-vertical w-full md:w-auto m-9 pt-14">
              <h2 className="text-5xl font-normal">FAQ's</h2>
              <br />
              <div className="collapse collapse-arrow join-item border border-base-300">
                <input type="checkbox" id="collapse1" />
                <label
                  htmlFor="collapse1"
                  className="collapse-title text-xl font-medium"
                >
                  What is Kriya?
                </label>
                <div className="collapse-content">
                  <p className="font-light">hello</p>
                </div>
              </div>
              <div className="collapse collapse-arrow join-item border border-base-300">
                <input type="checkbox" id="collapse2" />
                <label
                  htmlFor="collapse2"
                  className="collapse-title text-xl font-medium"
                >
                  What features does Kriya offer?
                </label>
                <div className="collapse-content">
                  <p className="font-light">hello</p>
                </div>
              </div>
              <div className="collapse collapse-arrow join-item border border-base-300">
                <input type="checkbox" id="collapse3" />
                <label
                  htmlFor="collapse3"
                  className="collapse-title text-xl font-medium"
                >
                  CIs Kriya suitable for small, medium, and large businesses?
                </label>
                <div className="collapse-content ">
                  <p className="font-light">hello</p>
                </div>
              </div>
              <div className="collapse collapse-arrow join-item border border-base-300">
                <input type="checkbox" id="collapse3" />
                <label
                  htmlFor="collapse3"
                  className="collapse-title text-xl font-medium"
                >
                  How secure is the data stored in Kriya?
                </label>
                <div className="collapse-content">
                  <p className="font-light">hello</p>
                </div>
              </div>
              <div className="collapse collapse-arrow join-item border border-base-300">
                <input type="checkbox" id="collapse3" />
                <label
                  htmlFor="collapse3"
                  className="collapse-title text-xl font-medium"
                >
                  Can Kriya be customized to fit our organization's unique
                  requirements?
                </label>
                <div className="collapse-content">
                  <p className="font-light">hello</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientHelpDesk;
