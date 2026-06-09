const Student = require("./Student");
// const Attendance = require("./Attendance");
const Attendance = require("./Attendence");

Student.hasMany(Attendance, {
  foreignKey: "studentId",
});

Attendance.belongsTo(Student, {
  foreignKey: "studentId",
});

module.exports = {
  Student,
  Attendance,
};