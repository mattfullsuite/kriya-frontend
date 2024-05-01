import figma from "../../../../assets/figma.png";

const PTOSApproved = () => {
  let records = [
    {
      id: 1,
      empPic: figma,
      name: "Employee Name 1",
      jobTitle: "Software Engineer",
      leaveType: "Sick Leave",
      date: "March 22, 2024",
    },
    {
      id: 2,
      empPic: figma,
      name: "Employee Name 2",
      jobTitle: "Software Engineer",
      leaveType: "Vacation Leave",
      date: "March 22 -26, 2024",
    },
    {
      id: 3,
      empPic: figma,
      name: "Employee Name 3",
      jobTitle: "Software Engineer",
      leaveType: "Emergency Leave",
      date: "March 15-18, 2024",
    },
    {
      id: 4,
      empPic: figma,
      name: "Employee Name 4",
      jobTitle: "Software Engineer",
      leaveType: "Special Leave",
      date: "March 5-8, 2024",
    },
    {
      id: 5,
      empPic: figma,
      name: "Employee Name 5",
      jobTitle: "Software Engineer",
      leaveType: "Sick Leave",
      date: "March 26-28, 2024",
    },
    {
      id: 6,
      empPic: figma,
      name: "Employee Name 6",
      jobTitle: "Software Engineer",
      leaveType: "Sick Leave",
      date: "March 26-28, 2024",
    },
    {
      id: 7,
      empPic: figma,
      name: "Employee Name 7",
      jobTitle: "Software Engineer",
      leaveType: "Sick Leave",
      date: "March 26-28, 2024",
    },
    {
      id: 8,
      empPic: figma,
      name: "Employee Name 8",
      jobTitle: "Software Engineer",
      leaveType: "Sick Leave",
      date: "March 26-28, 2024",
    },
  ];
  return (
    <>
      <div className="w-1/2 bg-white p-5 rounded-[15px]">
        <span>PTOs Approved - Effective Upcoming Pay Run</span>
        <div>
          <table className="min-w-full">
            <thead className="">
              <tr className="text-left h-14 border-b">
                <th colspan="2">Requester</th>
                <th>Leave Type</th>
                <th>Date(s)</th>
              </tr>
            </thead>
            {records.length > 0 && (
              <tbody>
                {records.map((row) => (
                  <tr key={row.id} className="h-16 border-b">
                    <td>
                      <img
                        src={row.empPic}
                        alt="Pic"
                        className="w-[40px] h-[40px] rounded-full"
                      />
                    </td>
                    <td>
                      <span>{row.name}</span>
                      <br />
                      <span className="text-xs">{row.jobTitle}</span>
                    </td>
                    <td>{row.leaveType}</td>
                    <td>{row.date}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default PTOSApproved;
