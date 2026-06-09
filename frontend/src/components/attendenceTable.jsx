function AttendanceTable({
  students,
  attendance,
  setAttendance,
}) {
  return (
    <div className="attendance-table-wrap">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student</th>
            <th className="radio-cell">Present</th>
            <th className="radio-cell">Absent</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="attendance-name">{student.name}</td>

              <td className="radio-cell">
                <input
                  className="radio-input"
                  type="radio"
                  name={`student-${student.id}`}
                  checked={attendance[student.id] === "present"}
                  onChange={() =>
                    setAttendance({
                      ...attendance,
                      [student.id]: "present",
                    })
                  }
                />
              </td>

              <td className="radio-cell">
                <input
                  className="radio-input"
                  type="radio"
                  name={`student-${student.id}`}
                  checked={attendance[student.id] === "absent"}
                  onChange={() =>
                    setAttendance({
                      ...attendance,
                      [student.id]: "absent",
                    })
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;