import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import api from "../services/api";

import SummaryCard from "../components/SummaryCard";

function SummaryPage() {
  const { date } =
    useParams();

  const [summary, setSummary] =
    useState(null);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary =
    async () => {
      const res =
        await api.get(
          `/attendance/summary/${date}`
        );

      setSummary(
        res.data
      );
    };

  if (!summary)
    return <div className="app-card loading-state">Loading...</div>;

  return (
    <main className="app-card">
      <section className="page-hero hero-panel">
        <div>
          <p className="eyebrow">Session overview</p>
          <h1 className="page-title">Attendance Summary</h1>
          <p className="page-subtitle">Review who was present and absent on {date}.</p>
        </div>

        <div className="page-badge">Date: {date}</div>
      </section>

      <section className="page-content">
        <div className="summary-grid">
        <SummaryCard
          title="Present"
          students={
            summary.presentStudents
          }
        />

        <SummaryCard
          title="Absent"
          students={
            summary.absentStudents
          }
        />
        </div>
      </section>
    </main>
  );
}

export default SummaryPage;