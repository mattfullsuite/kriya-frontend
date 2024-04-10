import Headings from "./Headings";
import Subheadings from "./Subheadings";

const AcademyScorecard = ({ color }) => {
  return (
    <>
      <Headings text={"Academy Scorecard"} />

      <div className="box-border mt-10 mb-3">
        <Subheadings text={"Current Academy Course"} />
      </div>

      <div className="box-border flex flex-row justify-between gap-3">
        <div className="box-border flex-1 bg-white p-5 border border-[#e4e4e4] rounded-[15px]">
          <p className=" font-bold text-[#008080] text-[14px] text-left">
            Security Management
          </p>

          <div className="box-border flex flex-row justify-between px-20 mt-10">
            <div className="box-border flex flex-col justify-center item-center">
              <p className="text-[14px] font-bold text-[#B2AC88] text-center">
                Team's Score Average
              </p>
              <p className="text-[50px] text-center font-bold">89%</p>

              <div className="box-border w-[100px] h-4 bg-[#EDEDED] rounded-full m-auto relative">
                <div
                  className={`absolute h-full w-[89%] bg-[#50C878] rounded-full`}
                />
              </div>
            </div>

            <div className="box-border flex flex-col justify-center item-center">
              <p className="text-[14px] font-bold text-[#B2AC88] text-center">
                Team's Score Average
              </p>
              <p className="text-[50px] text-center font-bold">75%</p>

              <div className="box-border w-[100px] h-4 bg-[#EDEDED] rounded-full m-auto relative">
                <div
                  className={`absolute h-full w-[75%] bg-[#FFDB58] rounded-full`}
                />
              </div>
            </div>
          </div>

          <p className="text-center mt-16 text-[#B2AC88]">
            Your team scored{" "}
            <span className="font-bold text-[#008080]">15% higher</span> than
            the other teams taking this course. Keep it up!
          </p>
        </div>

        <div className="box-border w-80 bg-white p-5 border border-[#e4e4e4] rounded-[15px]">
          <p className=" font-bold text-[#008080] text-[14px] text-left">
            Security Management
          </p>
        </div>
      </div>

      <div className="box-border flex flex-row justify-between gap-3 mt-10">
        <div className="box-border w-96">
          <div className="box-border mb-3">
            <Subheadings text={"Team Academy Leaderboard"} />
          </div>

          <div className="box-border bg-white p-5 border border-[#e4e4e4] rounded-[15px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
            unde voluptates ipsum et qui reiciendis perferendis enim eos
            quibusdam facilis corrupti nam aliquid saepe adipisci dolor, fugiat
            voluptatem perspiciatis hic deserunt quas nihil obcaecati optio
            cupiditate! Nulla, dolorem. Perferendis exercitationem nostrum quae
            asperiores rerum natus repudiandae veniam ullam in alias! Lorem
            ipsum, dolor sit amet consectetur adipisicing elit. Tempore fugit
            vero excepturi illum architecto officia magnam dolores? Commodi
            voluptatibus temporibus tempore quia quos, ea voluptates nisi,
            veritatis accusantium exercitationem autem placeat eum qui eligendi?
            Aliquam sequi optio mollitia aspernatur iste eos corrupti aut,
            veritatis placeat unde dolorem voluptate ab, suscipit alias deserunt
            praesentium, nostrum exercitationem tempore vitae quia. Soluta natus
            consequuntur provident, est, aliquam repudiandae enim, voluptatibus
            facere magni quibusdam quis. Sit, adipisci vero maiores eum
            doloremque odio quisquam! Deleniti a voluptatibus beatae veritatis
            suscipit repellendus voluptates minus illo ab, architecto aliquam,
            magnam ea totam alias! Esse nesciunt explicabo unde vitae
            consequuntur omnis fugiat magni, dicta quibusdam nemo quidem,
            temporibus rerum nam obcaecati error tempore hic optio
            necessitatibus aspernatur id molestiae ratione mollitia repudiandae
            debitis. Ullam adipisci dolor possimus corporis dolorum totam alias
            libero vero voluptatum eos, nostrum exercitationem, eligendi
            explicabo accusantium minima quod. Eveniet perferendis, sequi, porro
            illum ab suscipit error, eius a hic consequuntur dicta voluptates.
            Perferendis voluptates itaque veniam ad qui nulla, mollitia,
            voluptatibus necessitatibus sequi tempore et ea earum perspiciatis,
            fugit beatae est error! Unde culpa a, recusandae temporibus sapiente
            ut in veniam iusto impedit cum laboriosam possimus explicabo esse
            voluptate dicta inventore sint mollitia voluptates?
          </div>
        </div>

        <div className="box-border flex-1">
          <div className="box-border mb-3">
            <Subheadings text={"Team Academy Leaderboard"} />
          </div>

          <div className="box-border bg-white p-5 border border-[#e4e4e4] rounded-[15px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
            unde voluptates ipsum et qui reiciendis perferendis enim eos
            quibusdam facilis corrupti nam aliquid saepe adipisci dolor, fugiat
            voluptatem perspiciatis hic deserunt quas nihil obcaecati optio
            cupiditate! Nulla, dolorem. Perferendis exercitationem nostrum quae
            asperiores rerum natus repudiandae veniam ullam in alias!
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademyScorecard;
