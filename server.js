require("dotenv").config();
const bodyParser = require("body-parser");

const express = require("express");
const app = express();

const SenseiTypesRouter = require("./routes/sensei_types");
const UserRouter = require("./routes/user");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/sensei-types", SenseiTypesRouter);
app.use("/user", UserRouter);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor conectado corectamente al puerto ${port}`);
});
