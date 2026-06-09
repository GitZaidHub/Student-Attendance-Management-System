import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import AttendancePage from "./pages/AttendancePage";
import SummaryPage from "./pages/SummaryPage";
import ReportPage from "./pages/ReportPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <Routes>
          <Route path="/" element={<AttendancePage />} />

          <Route path="/summary/:date" element={<SummaryPage />} />

          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;