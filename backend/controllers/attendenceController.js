const sequelize = require("../config/database");
const { Attendance, Student } = require("../models");

exports.markAttendance = async (req, res) => {
  const { date, attendance } = req.body;

  if (!date || !Array.isArray(attendance)) {
    return res.status(400).json({
      message: "date and attendance array are required",
    });
  }

  const transaction = await sequelize.transaction();

  try {
    await Attendance.destroy({
      where: { attendanceDate: date },
      transaction,
    });

    const records = attendance.map((item) => ({
      attendanceDate: date,
      studentId: item.studentId,
      status: item.status,
    }));

    const createdRecords = await Attendance.bulkCreate(records, {
      transaction,
      returning: true,
    });

    await transaction.commit();

    res.status(201).json(createdRecords);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const { date } = req.params;

    const records = await Attendance.findAll({
      where: { attendanceDate: date },
      include: Student,
      order: [["studentId", "ASC"]],
    });

    res.json({
      presentStudents: records.filter(
        (record) => record.status === "present"
      ),
      absentStudents: records.filter(
        (record) => record.status === "absent"
      ),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReport = async (req, res) => {
  try {
    const records = await Attendance.findAll({
      include: Student,
      order: [
        ["attendanceDate", "DESC"],
        ["studentId", "ASC"],
      ],
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};