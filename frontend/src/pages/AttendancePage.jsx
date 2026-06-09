import {
  useState,
  useEffect,
} from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

import AttendanceTable from "../components/attendenceTable";

function AttendancePage() {
  const [students, setStudents] =
    useState([]);

  const [date, setDate] =
    useState("");

  const [attendance, setAttendance] =
    useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents =
    async () => {
      const res =
        await api.get("/students");

      setStudents(res.data);
    };

  const saveAttendance =
    async () => {
      if (!date) {
        return alert(
          "Select Date"
        );
      }

      const attendanceData =
        students.map(
          (student) => ({
            studentId:
              student.id,
            status:
              attendance[
                student.id
              ] || "absent",
          })
        );

      await api.post(
        "/attendance",
        {
          date,
          attendance:
            attendanceData,
        }
      );

      navigate(
        `/summary/${date}`
      );
    };

  return (
    <main className="app-card">
      <section className="page-hero hero-panel">
        <div>
          <p className="eyebrow">Daily tracking</p>
          <h1 className="page-title">Student Attendance</h1>
          <p className="page-subtitle">
            Select a date, mark each student, and save a clean attendance record
            in one pass.
          </p>
        </div>

        <div className="page-badge">
          {students.length} students loaded
        </div>
      </section>

      <section className="page-content stack">
        <div className="toolbar">
          <label className="field-label">
            Attendance date
            <input
              className="input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <button className="button-primary" onClick={saveAttendance}>
            Save Attendance
          </button>
        </div>

        <AttendanceTable
          students={students}
          attendance={attendance}
          setAttendance={setAttendance}
        />
      </section>
    </main>
  );
}

export default AttendancePage;