require("dotenv").config();
const bodyParser = require("body-parser");
const db = require("./db/models");

// db.sequelize.sync({ force: true });

const express = require("express");
const app = express();

const SenseiTypesRouter = require("./routes/sensei_types");
const UserRouter = require("./routes/user");
const GoalRouter = require("./routes/goal");
const sensei_health = require("../controlers/sensei_health");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/sensei-types", SenseiTypesRouter);
app.use("/user", UserRouter);
app.use("/goal", GoalRouter);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor conectado corectamente al puerto ${port}`);
});
