import React, {useState} from "react";
import Subheadings from "../../../components/universal/Subheadings";
import Rating from "react-rating";

const SelfEvaluation = () => {
    const [communicationRating, setCommunicationRating] = useState(4);
    const [teamworkRating, setTeamworkRating] = useState(3);
    const [integrityRating, setIntegrityRating] = useState(5);
    const [accountabilityRating, setAccountabilityRating] = useState(3);
return (
    <div className="lg:col-span-1 border border-[#e4e4e4] border-solid rounded-[15px] bg-white p-5">
          <Subheadings text={"Self Evaluation"} />
          <p className="mt-4 mb-4 text-[#363636]">Rate your performance for this Quarter using a scale 1-5 stars, where:</p>
            <p className="italic text-[16px]">1 - Keep on trying</p>
            <p className="italic text-[16px]">2 - Rise and Grind</p>
            <p className="italic text-[16px]">3 - In The Zone</p>
            <p className="italic text-[16px]">4 - Reach for the stars</p>
            <p className="italic text-[16px]">5 - Nailing It</p>

          <div className="mt-4">
            <p className="font-bold">Communication</p>
            <p className="italic text-[13px] text-[#898989]">Effective conveying of ideas and active listening, fostering transparent interaction within teams.</p>
            <div className="flex">
            <Rating
            initialRating={communicationRating}
            onClick={(rate) => setCommunicationRating(rate)}
            emptySymbol={<span className="text-gray-300 text-[40px] gap-5">★</span>}
            fullSymbol={<span className="text-yellow-500 text-[40px]">★</span>}
            />
            </div>
          </div>

          <div className="mt-4">
            <p className="font-bold">Teamwork</p>
            <p className="italic text-[13px] text-[#898989]">Collaborating efficiently with diverse members, contributing actively to discussions and supporting collective success.</p>

            <div className="flex">
            <Rating
            initialRating={teamworkRating}
            onClick={(rate) => setTeamworkRating(rate)}
            emptySymbol={<span className="text-gray-300 text-[40px]">★</span>}
            fullSymbol={<span className="text-yellow-500 text-[40px]">★</span>}
            />
            </div>
          </div>

          <div className="mt-4">
            <p className="font-bold">Integrity</p>
            <p className="italic text-[13px] text-[#898989]">Adherence to ethical principles, maintaining honesty and reliability in all interactions.</p>
            <div className="flex">
            <Rating
                initialRating={integrityRating}
                onClick={(rate) => setIntegrityRating(rate)}
                emptySymbol={<span className="text-gray-300 text-[40px]">★</span>}
                fullSymbol={<span className="text-yellow-500 text-[40px]">★</span>}
            />
            </div>
          </div>

          <div className="mt-4">
            <p className="font-bold">Accountability</p>
            <p className="italic text-[13px] text-[#898989]">Taking ownership of actions, meeting commitments, and proactively seeking feedback for improvement.</p>
            <div className="flex">
            <Rating
                initialRating={accountabilityRating}
                onClick={(rate) => setAccountabilityRating(rate)}
                emptySymbol={<span className="text-gray-300 text-[40px]">★</span>}
                fullSymbol={<span className="text-yellow-500 text-[40px]">★</span>}
            />
            </div>
          </div>
          <div className="mt-4">
            <p className="font-bold text-[#363636]">What's your Salient accomplishment for this quarter?</p>
            <textarea className=" bg bg-[#f4f4f4] border border-gray-300 rounded w-full p-4 mt-2 rounded-[15px] text-[#363636]" rows="4" placeholder="Collaborated with development teams to optimize UI performance, reducing load times and enhancing responsiveness, resulting in smoother user interactions."></textarea>
          </div>
          <div className="box box-border flex flex-row justify-end items-start">
          <button className="btn bg-[#CC5500] text-white px-10 py-2 rounded-[15px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: 'currentColor', marginRight: '10px' }}
              >
              <path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"></path>
              </svg>
              Submit
          </button>
          </div>
        </div>
);
};

export default SelfEvaluation;