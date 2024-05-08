import EmployeeCheersTile from "./EmployeeCheersTile";

const EmployeeCheers = () => {

  return (
    <div className="bg-white border border-[#e4e4e4] rounded-[15px] p-3 flex flex-col gap-2 w-full flex-1">
        <EmployeeCheersTile firstName={"Marvin"} lastName={"Bautista"} position={"Software Engineer"} points={5} />

        <EmployeeCheersTile firstName={"Marvin"} lastName={"Bautista"} position={"Software Engineer"} points={5} />

        <EmployeeCheersTile firstName={"Marvin"} lastName={"Bautista"} position={"Software Engineer"} points={5} />

        <EmployeeCheersTile firstName={"Marvin"} lastName={"Bautista"} position={"Software Engineer"} points={5} /> 
    </div>
  );
};

export default EmployeeCheers;
