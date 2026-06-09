const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Attendance = sequelize.define("Attendance", {
  attendanceDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("present", "absent"),
    allowNull: false,
  },
});

module.exports = Attendance;