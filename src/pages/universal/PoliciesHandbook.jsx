import React from "react";
import PolicyCard from "../../components/universal/PolicyCard";
import Headings from "../../components/universal/Headings";

export default function PoliciesHandbook() {
  return (
    <>
      <div className="max-w-[1300px] m-auto">
        <Headings text={"Policies Handbook"} />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
          <PolicyCard
            title={"Welcome Packet"}
            content={
              "We are excited to welcome you to FullSuite’s pod (or simply referred to as “the pod”). They say luck is the great equaliser, but not all of us get lucky when we need it the most. As a first-generation entrepreneur, I founded FullSuite in 2014 with $1,000 capital. Two years later, I pondered over how we could succeed in attracting top talent, considering the competition from big corporations and heavily venture-backed startups. It became clear that relying solely on experienced hires was not feasible. Thats when a game-changing thought struck me: why limit ourselves to experienced hires?  What if we built a core team of select superstars and then open opportunities to everyone else to grow their careers here? FullSuite could serve as a launchpad: offering training, exposure, and preparation for individuals to successfully climb the corporate ladder. By doing so, we not only benefit the individuals themselves but also contribute effective managers to the worldwide talent pool."
            }
            address={"#"}
            image={"../images/welcome_packet.png"}
          />

          <PolicyCard
            title={"Acceptable Usage Policy"}
            content={
              "FullSuite is committed to safeguarding the data processed by its staff, software, or services. Our customers, partners, and other stakeholders depend on us to take appropriate measures to protect the data in our possession. Thus, each staff member needs to understand how to responsibly use our systems so that we appropriately safeguard the data in our possession."
            }
            address={"#"}
            image={"../images/company_procedures.png"}
          />

          <PolicyCard
            title={"Business Continuity Plan"}
            content={
              "The purpose of the policy is to detail the steps to undertake to be able to avoid major disruptions in operations in the event of an emergency. The Business Continuity Plan is enacted with the purpose of ensuring continued business activity in the event of an emergency and ensuring the safety of all employee. In the event of an emergency, the BCP Core Team will be responsible for declaring emergencies, evacuating or shutting down office locations as necessary, and contacting affected employees. The BCP Core Team will be led by the Incident Commander and will operate out of the designated Emergency Operations Center. The BCP Core Team has the authority to identify the critical business functions impacted by the emergency and initiate the process for recovering each function in the order laid out in the Business Continuity Plan."
            }
            address={"#"}
            image={"../images/company_core_conduct.png"}
          />

          <PolicyCard
            title={"Code of Business Conduct"}
            content={
              "FullSuite’s Code of Business Conduct policy outlines the company’s expectations regarding employees' behavior towards their colleagues, supervisors, and the overall organization. FullSuite promotes freedom of expression and open communication. All staff members are expected to follow the code of conduct. Staff members should avoid offending others, participating in serious disputes, and disrupting our workplace. FullSuite also expects all staff members to foster a well-organized, respectful, and collaborative environment. This policy outlines the expectations for all FullSuite staff and the consequences for unacceptable behavior."
            }
            address={"#"}
            image={"../images/workplace_health_and_safety.png"}
          />

          <PolicyCard
            title={"Workplace Health and Safety"}
            content={
              "The purpose of this policy is to establish the guidelines by which physical and environmental security is managed for ISMS scope systems. As a cloud-native company, FullSuite relies on the physical security measures of various cloud service providers, including the infrastructure service provider, to secure and manage production systems and customer data. No production servers or customer data are hosted on-premises. However, office premises are still secured by following guidelines for visitors, clean desks, printing, removable media, shoulder surfing, and compliance with local laws. Remote workers must ensure device security, protect customer data confidentiality,and adhere to information security policies."
            }
            address={"#"}
            image={"../images/leave_policies.png"}
          />

          <PolicyCard
            title={"HR Security Policy"}
            content={
              "The objective of this policy is to provide a framework within which the information security requirements of human resources are addressed throughout the entire lifecycle of recruitment, employment, change of employment, and termination. FullSuite shall ensure that employees (full-time and part-time) and external parties, including contractors and other third-party staff, understand the responsibilities for the roles they are considered for and are aware of and fulfill their information security responsibilities. Additionally, FullSuite shall protect the company's interests while changing or terminating employment."
            }
            address={"#"}
            image={"../images/confidentiality_and_data_protection.png"}
          />
        </div>
      </div>
    </>
  );
}
