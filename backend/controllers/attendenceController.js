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
  const { date } = req.query;

  try {
    const allStudents = await Student.findAll({
      order: [["name", "ASC"]],
    });

    const allAttendance = await Attendance.findAll({
      order: [["attendanceDate", "DESC"], ["studentId", "ASC"]],
    });

    const attendanceByStudent = allAttendance.reduce((acc, record) => {
      const studentId = record.studentId;

      if (!acc[studentId]) {
        acc[studentId] = { present: 0, total: 0 };
      }

      acc[studentId].total += 1;

      if (record.status === "present") {
        acc[studentId].present += 1;
      }

      return acc;
    }, {});

    const selectedQuery = {
      include: Student,
      order: [["studentId", "ASC"]],
    };

    if (date) {
      selectedQuery.where = { attendanceDate: date };
    }

    const selectedRecords = await Attendance.findAll(selectedQuery);
    const selectedMap = new Map(
      selectedRecords.map((record) => [record.studentId, record])
    );

    const report = allStudents.map((student) => {
      const record = selectedMap.get(student.id);
      const stats = attendanceByStudent[student.id] || { present: 0, total: 0 };
      const attendancePercentage = stats.total
        ? Math.round((stats.present / stats.total) * 100)
        : 0;

      return {
        studentId: student.id,
        studentName: student.name,
        attendanceDate: date || (record ? record.attendanceDate : null),
        status: record ? record.status : "not recorded",
        attendancePercentage,
      };
    });

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};