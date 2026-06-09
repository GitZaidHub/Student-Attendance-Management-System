const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getSummary,
  getReport,
} = require("../controllers/attendenceController");

router.post("/", markAttendance);

router.get(
  "/summary/:date",
  getSummary
);

router.get(
  "/report",
  getReport
);

module.exports = router;