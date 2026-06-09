import { useEffect, useState } from "react";

import api from "../services/api";

function ReportPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get("/attendance/report");
        setRecords(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) {
    return <div className="app-card loading-state">Loading...</div>;
  }

  return (
    <main className="app-card">
      <section className="page-hero hero-panel">
        <div>
          <p className="eyebrow">Records</p>
          <h1 className="page-title">Attendance Report</h1>
          <p className="page-subtitle">
            A full chronological log of every saved attendance entry.
          </p>
        </div>

        <div className="page-badge">{records.length} entries</div>
      </section>

      <section className="page-content">
        {records.length === 0 ? (
          <div className="empty-state app-card">
            No attendance records yet.
          </div>
        ) : (
          <div className="report-table-wrap">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Student</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.attendanceDate}</td>
                    <td className="attendance-name">{record.Student?.name}</td>
                    <td>
                      <span
                        className={`status-pill status-${record.status}`}
                      >
                        {record.status}
                      </span>
                    </td>
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