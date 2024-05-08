import CheerAPeerPostComponent from "../temp/CheerAPeerPostComponent";
import Headings from "./Headings";
import Subheadings from "./Subheadings";
import EmployeeCheers from "../temp/EmployeeCheers";
import { createContext } from "react";
import HeartbitsCounter from "../temp/HeartbitsCounter";
import RecentCheer from "../temp/RecentCheer";

export const ThemeContext = createContext(null);

const CheerAPeer = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  accentColor,
  focusBorder,
}) => {
  return (
    <ThemeContext.Provider
      value={{
        bgColor: bgColor,
        hoverColor: hoverColor,
        focusBorder: focusBorder,
      }}
    >
      <div className="box-border max-w-[1300px] m-auto">
        <Headings text={"Cheer a Peer"} />

        <div className="box-border mt-10">
          <div className="box-border grid grid-cols-1 lg:grid-cols-3 gap-y-5 lg:gap-5">
            <div className="box-border col-span-2 flex flex-col gap-8">
              <div className="box-border flex flex-row justify-between gap-5">
                <CheerAPeerPostComponent />

                <HeartbitsCounter />
              </div>

              <div className="box-border flex flex-row justify-between gap-5">
                <div className="box-border flex-1 flex flex-col justify-between">
                  <div className="box-bordee mx-[15px] mb-2">
                    <Subheadings text={"Peers Who Cheered You"} />
                  </div>

                  <EmployeeCheers />
                </div>

                <div className="box-border flex-1 flex flex-col justify-between">
                  <div className="box-border mx-[15px] mb-2 flex flex-row flex-nowrap justify-between items-center">
                    <Subheadings text={"Recent Cheer"} />

                    <button className="flex flex-row justify-center items-center h-0">
                      <p className={`${textColor} text-[13px]`}>See all</p>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className={`${fillColor} w-6 h-6`}
                      >
                        <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                      </svg>
                    </button>
                  </div>

                  <RecentCheer
                    firstName={"Marvin"}
                    lastName={"Bautista"}
                    position={"Software Engineer"}
                    points={12}
                  />
                </div>
              </div>
            </div>

            <div className="box-border p-5 bg-white border border-[#e4e4e4] rounded-[15px] line-clamp-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos in unde odio temporibus nobis reiciendis! Numquam aliquam neque adipisci nemo vel alias quos a officia dignissimos itaque, ut non dolore quibusdam praesentium, odio quasi ab? Vel aliquam quo optio quos corporis impedit animi reiciendis dolores consectetur labore ipsa excepturi error hic ipsam, libero voluptatibus fugiat sapiente. Suscipit aliquam ipsa vitae sed voluptatum laudantium quam fuga repudiandae cum culpa. Aliquam dolores voluptate atque voluptatem veniam quaerat, magni dignissimos aspernatur nostrum minus odit fugiat enim at eveniet in repellat quis rem qui nulla, tenetur rerum soluta. Vel quidem velit id impedit quia provident. Dicta nihil hic commodi deleniti officiis cupiditate corrupti atque enim voluptatum ea? Fugiat aliquam tempora dolor ipsam quam omnis consectetur doloremque, corporis veniam libero voluptatem quidem quia repellendus. Officiis labore aliquam commodi ratione? Odio illo suscipit rem maiores nostrum ipsa nemo dolorem vero, quasi doloribus ea saepe qui. Soluta quibusdam quam laudantium, repellat at omnis eius. Dignissimos suscipit maiores ducimus consectetur, rem fuga sit saepe delectus nobis aliquam ipsa, labore vitae, expedita obcaecati fugit? Reprehenderit nesciunt deserunt architecto omnis vero suscipit necessitatibus magni optio eos, consectetur fugiat, impedit asperiores officia a laborum facere eaque. Quis voluptates ex provident excepturi beatae dolorum accusamus aut in, reiciendis ut consectetur, repellendus labore non incidunt deserunt! Commodi dolores consequuntur delectus autem in praesentium ullam aperiam, unde fuga non repellendus rerum pariatur nesciunt quaerat odio ad placeat, laboriosam ipsam explicabo facere esse sed excepturi magnam officia? Repellendus corporis reiciendis animi voluptatibus eum, officia vero nam? Quia nam eligendi officia, quasi facere vel velit incidunt illum blanditiis, ea asperiores tempora nobis dolor, quod voluptas! Asperiores qui in dolore labore enim optio autem, velit suscipit aperiam nihil ea laboriosam quibusdam nemo soluta aspernatur ut nulla esse sapiente nesciunt et! Earum doloremque cupiditate nulla molestiae at suscipit, est ratione error dicta deleniti odio corporis mollitia omnis nisi consectetur facere quod praesentium quibusdam quis quia! Distinctio necessitatibus odio corrupti expedita nam sapiente, nostrum nihil eius cum mollitia vero laborum quae vitae officiis fuga odit iste error obcaecati provident? Recusandae, facere eaque. Voluptas labore harum hic maxime, est sequi rem in similique sint, rerum ipsum, quia corporis cumque itaque! Dolor eum quidem error, omnis aliquam tenetur ut quis nostrum enim, quibusdam, mollitia maiores autem esse! Porro odio consequatur recusandae fugiat, quae earum eveniet in corporis officiis, esse fugit autem repellat laudantium eaque eligendi harum et hic dignissimos. A earum et odio repellendus unde, harum magni mollitia quam. Corrupti doloribus similique consectetur pariatur distinctio vel tempora id voluptatum, ab, magnam dolorum numquam at adipisci officia molestias a provident assumenda temporibus iure repudiandae! Culpa, porro quas. Tenetur debitis voluptates voluptas eligendi odit laborum nobis perferendis impedit sapiente a? Praesentium eligendi dolorum unde, reiciendis nesciunt commodi adipisci nam itaque doloribus quidem illo in magni sint dolores debitis nostrum non et rem. Quidem laborum nobis esse quibusdam consequuntur odio qui voluptates quae, libero quo temporibus voluptatibus itaque excepturi, optio eligendi voluptate, perspiciatis reiciendis non quam! Architecto corrupti quo assumenda reprehenderit dolorum magnam in dolore harum nesciunt facere! Laudantium amet, nostrum voluptates incidunt cumque saepe veritatis aperiam iste aut porro debitis consequatur dolorum reprehenderit beatae ad, illo quos laborum. Ut officiis, quas ad magnam error quam quasi veniam quaerat odit eveniet eius sed dignissimos a doloribus provident et minima rerum fugiat, earum saepe quibusdam velit sapiente ullam. Aliquid earum similique culpa quos! Reiciendis doloribus debitis pariatur illo accusamus, consequatur sit consequuntur architecto nostrum ducimus doloremque! Dolorem at dicta sapiente mollitia nobis soluta reiciendis distinctio ut aperiam consectetur non quasi nemo ipsa omnis beatae quisquam delectus ad voluptatum, qui quod. Esse at sunt pariatur incidunt illum vero qui odio cumque impedit animi soluta quaerat fuga, illo possimus, labore repudiandae perferendis placeat ut veniam, in inventore quos! Unde, porro officia delectus tenetur commodi nulla officiis veritatis consequatur fugit quod est sunt deserunt nemo alias quidem. Voluptate alias, iure eaque, fugiat molestias enim cumque autem voluptatibus consectetur doloribus harum dignissimos facere quos sunt perferendis vitae perspiciatis tempore, rem dolores non hic tenetur est. Commodi error doloribus beatae ullam totam! Vel earum obcaecati est dolore vitae molestiae veniam odit eaque libero quibusdam sed enim nihil dignissimos, praesentium blanditiis mollitia ratione natus at provident eum eveniet ab adipisci consectetur saepe? Asperiores, soluta animi quae laudantium vero, quaerat eveniet, quos illo nisi quidem sapiente! Rerum neque doloribus magni laboriosam esse dolorum expedita accusamus repellendus ut facilis consectetur aliquam, recusandae voluptate, dolores iste, praesentium cum dolor? Consequatur odio, delectus assumenda quidem nulla voluptate vero ab rerum accusamus corporis explicabo a impedit harum esse veniam reprehenderit reiciendis? Optio qui temporibus est enim! Placeat voluptatem libero recusandae optio corporis in consequatur dolorum corrupti alias eaque voluptate, minima dolorem non eum, eius laboriosam ipsum autem voluptates ratione vel obcaecati? Eveniet officia a quas, suscipit, quod sapiente dolorum corrupti qui vitae quis, obcaecati nesciunt! Voluptate quam ab laboriosam, odit corrupti odio consequuntur quod consequatur sequi, quisquam, aliquam maxime iusto error? Tempore ut tenetur labore illum dolore ab voluptas voluptatum recusandae illo asperiores molestias accusantium, voluptatem, debitis officia nesciunt ipsum suscipit explicabo voluptates velit iusto atque reiciendis doloremque saepe! Ullam perspiciatis facere dolor eligendi, veniam assumenda fuga, deserunt harum iusto reprehenderit consectetur alias animi dicta minima? Facere, impedit? Iusto, neque velit. Ipsam blanditiis incidunt quia ducimus. Exercitationem voluptatibus molestias reiciendis, id totam veritatis expedita impedit numquam maiores? Saepe vero quas recusandae inventore, facilis ullam explicabo nihil consectetur deserunt dolor velit tempora ducimus totam, error hic iste provident, qui neque sint repellendus iure odio reiciendis quia placeat! Nostrum quam, dolorum, soluta earum animi beatae odio quisquam ipsa eos impedit eius dignissimos, architecto reprehenderit. Aliquid odit quibusdam nulla repudiandae minus. Voluptas, aut. Sequi illo vel, facere vero quasi adipisci natus minima ducimus rem autem aut dicta. Recusandae soluta modi culpa ipsa aperiam cum. Accusamus perspiciatis reprehenderit laborum doloremque porro molestiae eum iure incidunt quo ratione blanditiis facilis pariatur corrupti quos optio adipisci cumque et animi, nulla mollitia. Maiores nostrum facere voluptatibus. Dolore qui fugiat quidem maiores aut illo veritatis! Aspernatur magni, earum quos eum quidem nobis soluta exercitationem.</div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default CheerAPeer;
