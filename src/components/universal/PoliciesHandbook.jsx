import React from "react";
import PolicyCard from "./PolicyCard";
import Headings from "./Headings";

export default function PoliciesHandbook() {
  return (
    <>
      <Headings text={"Policies Handbook"} />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
        <PolicyCard
          title={"Welcome Packet"}
          content={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus inventore nostrum sint ut soluta autem voluptates harum vel aspernatur facere vero ipsam amet dolorem, incidunt eius cupiditate ex dolores quisquam maxime, illo pariatur odio enim qui. Quisquam repellendus nostrum perferendis. Blanditiis adipisci commodi magnam neque similique culpa quibusdam eligendi error, debitis est laboriosam voluptates repellendus nobis eaque ab quam temporibus dolor necessitatibus voluptas maiores? Natus sit unde est explicabo ex quibusdam, harum eos. Delectus exercitationem velit doloremque voluptatibus inventore, ex assumenda magnam commodi tempora nobis nesciunt ipsam sed sunt doloribus odio, aliquid ad? Cumque quidem vero fuga consectetur delectus perferendis?"
          }
          address={"#"}
          image={"../images/welcome_packet.png"}
        />

        <PolicyCard
          title={"Company Procedures"}
          content={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus inventore nostrum sint ut soluta autem voluptates harum vel aspernatur facere vero ipsam amet dolorem, incidunt eius cupiditate ex dolores quisquam maxime, illo pariatur odio enim qui. Quisquam repellendus nostrum perferendis. Blanditiis adipisci commodi magnam neque similique culpa quibusdam eligendi error, debitis est laboriosam voluptates repellendus nobis eaque ab quam temporibus dolor necessitatibus voluptas maiores? Natus sit unde est explicabo ex quibusdam, harum eos. Delectus exercitationem velit doloremque voluptatibus inventore, ex assumenda magnam commodi tempora nobis nesciunt ipsam sed sunt doloribus odio, aliquid ad? Cumque quidem vero fuga consectetur delectus perferendis?"
          }
          address={"#"}
          image={"../images/company_procedures.png"}
        />

        <PolicyCard
          title={"Company Core Conduct"}
          content={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus inventore nostrum sint ut soluta autem voluptates harum vel aspernatur facere vero ipsam amet dolorem, incidunt eius cupiditate ex dolores quisquam maxime, illo pariatur odio enim qui. Quisquam repellendus nostrum perferendis. Blanditiis adipisci commodi magnam neque similique culpa quibusdam eligendi error, debitis est laboriosam voluptates repellendus nobis eaque ab quam temporibus dolor necessitatibus voluptas maiores? Natus sit unde est explicabo ex quibusdam, harum eos. Delectus exercitationem velit doloremque voluptatibus inventore, ex assumenda magnam commodi tempora nobis nesciunt ipsam sed sunt doloribus odio, aliquid ad? Cumque quidem vero fuga consectetur delectus perferendis?"
          }
          address={"#"}
          image={"../images/company_core_conduct.png"}
        />

        <PolicyCard
          title={"Workplace Health and Safety"}
          content={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus inventore nostrum sint ut soluta autem voluptates harum vel aspernatur facere vero ipsam amet dolorem, incidunt eius cupiditate ex dolores quisquam maxime, illo pariatur odio enim qui. Quisquam repellendus nostrum perferendis. Blanditiis adipisci commodi magnam neque similique culpa quibusdam eligendi error, debitis est laboriosam voluptates repellendus nobis eaque ab quam temporibus dolor necessitatibus voluptas maiores? Natus sit unde est explicabo ex quibusdam, harum eos. Delectus exercitationem velit doloremque voluptatibus inventore, ex assumenda magnam commodi tempora nobis nesciunt ipsam sed sunt doloribus odio, aliquid ad? Cumque quidem vero fuga consectetur delectus perferendis?"
          }
          address={"#"}
          image={"../images/workplace_health_and_safety.png"}
        />

        <PolicyCard
          title={"Leave Policies"}
          content={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus inventore nostrum sint ut soluta autem voluptates harum vel aspernatur facere vero ipsam amet dolorem, incidunt eius cupiditate ex dolores quisquam maxime, illo pariatur odio enim qui. Quisquam repellendus nostrum perferendis. Blanditiis adipisci commodi magnam neque similique culpa quibusdam eligendi error, debitis est laboriosam voluptates repellendus nobis eaque ab quam temporibus dolor necessitatibus voluptas maiores? Natus sit unde est explicabo ex quibusdam, harum eos. Delectus exercitationem velit doloremque voluptatibus inventore, ex assumenda magnam commodi tempora nobis nesciunt ipsam sed sunt doloribus odio, aliquid ad? Cumque quidem vero fuga consectetur delectus perferendis?"
          }
          address={"#"}
          image={"../images/leave_policies.png"}
        />

        <PolicyCard
          title={"Confidentiality and Data Protection"}
          content={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus inventore nostrum sint ut soluta autem voluptates harum vel aspernatur facere vero ipsam amet dolorem, incidunt eius cupiditate ex dolores quisquam maxime, illo pariatur odio enim qui. Quisquam repellendus nostrum perferendis. Blanditiis adipisci commodi magnam neque similique culpa quibusdam eligendi error, debitis est laboriosam voluptates repellendus nobis eaque ab quam temporibus dolor necessitatibus voluptas maiores? Natus sit unde est explicabo ex quibusdam, harum eos. Delectus exercitationem velit doloremque voluptatibus inventore, ex assumenda magnam commodi tempora nobis nesciunt ipsam sed sunt doloribus odio, aliquid ad? Cumque quidem vero fuga consectetur delectus perferendis?"
          }
          address={"#"}
          image={"../images/confidentiality_and_data_protection.png"}
        />
      </div>
    </>
  );
}
