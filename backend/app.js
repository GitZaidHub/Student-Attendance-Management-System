require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database");

require("./models");

const studentRoutes = require("./routes/studentRoutes");
// const attendenceRoutes = require("./routes/attendenceRoutes");
const attendenceRoutes = require("./routes/attendenceRoutes")
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/attendance", attendenceRoutes);
app.use("/attendence", attendenceRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("DB Connected");

    app.listen(PORT, () => {
      console.log(
        `Server Running on ${PORT}`
      );
    });
  })
  .catch(console.error);