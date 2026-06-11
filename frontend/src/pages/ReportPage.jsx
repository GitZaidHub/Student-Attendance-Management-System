import { useEffect, useState } from "react";

import api from "../services/api";

function ReportPage() {
  const today = new Date().toISOString().split("T")[0];
  const [records, setRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async (date) => {
      setLoading(true);

      try {
        const res = await api.get("/attendance/report", {
          params: { date },
        });

        setRecords(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchReport(selectedDate);
  }, [selectedDate]);

  if (loading) {
    return <div className="app-card loading-state">Loading...</div>;
  }

  return (
    <main className="app-card">
      <section className="page-hero hero-panel">
        <div>
          <p className="eyebrow">Report</p>
          <h1 className="page-title">Attendance Report</h1>
          <p className="page-subtitle">
            Select a date to view attendance for that day and percentage per student.
          </p>
        </div>

        <div>
          <div className="date-picker-row">
            <label className="date-picker-label" htmlFor="report-date">
              Select date
            </label>
            <input
              id="report-date"
              className="date-picker"
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            />
          </div>
          <div className="page-badge">{records.length} students</div>
        </div>
      </section>

      <section className="page-content">
        {records.length === 0 ? (
          <div className="empty-state app-card">
            No attendance records found for {selectedDate}.
          </div>
        ) : (
          <div className="report-table-wrap">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Student</th>
                  <th>Status</th>
                  <th>Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.studentId}>
                    <td>{record.attendanceDate || selectedDate}</td>
                    <td className="attendance-name">{record.studentName}</td>
                    <td>
                      <span
                        className={`status-pill status-${
                          record.status === "not recorded"
                            ? "not-recorded"
                            : record.status
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td>{record.attendancePercentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default ReportPage;