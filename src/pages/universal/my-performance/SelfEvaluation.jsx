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
            <div className="rating rating-lg gap-5">
                <input type="radio" name="rating-1" className="mask mask-star-2 bg-yellow-400" />
                <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star-2 bg-yellow-400"
                    defaultChecked />
                <input type="radio" name="rating-1" className="mask mask-star-2 bg-yellow-400" />
                <input type="radio" name="rating-1" className="mask mask-star-2 bg-yellow-400" />
                <input type="radio" name="rating-1" className="mask mask-star-2 bg-yellow-400" />
            </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-bold">Teamwork</p>
            <p className="italic text-[13px] text-[#898989]">Collaborating efficiently with diverse members, contributing actively to discussions and supporting collective success.</p>

            <div className="flex">
            <div className="rating rating-lg gap-5">
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
                <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    defaultChecked />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
            </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-bold">Integrity</p>
            <p className="italic text-[13px] text-[#898989]">Adherence to ethical principles, maintaining honesty and reliability in all interactions.</p>
            <div className="flex">
            <div className="rating rating-lg gap-5">
                <input type="radio" name="rating-3" className="mask mask-star-2 bg-yellow-400" />
                <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-star-2 bg-yellow-400"
                    defaultChecked />
                <input type="radio" name="rating-3" className="mask mask-star-2 bg-yellow-400" />
                <input type="radio" name="rating-3" className="mask mask-star-2 bg-yellow-400" />
                <input type="radio" name="rating-3" className="mask mask-star-2 bg-yellow-400" />
            </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-bold">Accountability</p>
            <p className="italic text-[13px] text-[#898989]">Taking ownership of actions, meeting commitments, and proactively seeking feedback for improvement.</p>
            <div className="flex">
            <div className="rating rating-lg gap-5">
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-yellow-400" />
                <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-yellow-400"
                    defaultChecked />
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-yellow-400" />
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-yellow-400" />
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-yellow-400" />
            </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-bold text-[#363636]">What's your Salient accomplishment for this quarter?</p>
            <textarea className=" bg bg-[#f4f4f4] border border-gray-300 rounded w-full p-4 mt-2 rounded-[15px] text-[#363636] textarea textarea-bordered" rows="11" placeholder="Collaborated with development teams to optimize UI performance, reducing load times and enhancing responsiveness, resulting in smoother user interactions."></textarea>
          </div>
          <div className="box box-border flex flex-row justify-end items-start pt-3">
          <button className="button bg-[#CC5500] text-white px-10 py-2 rounded-[5px]">
              Submit
          </button>
          </div>
        </div>
);
};

export default SelfEvaluation;