require("dotenv").config();

const express = require("express");
const app = express();

const SenseiTypesRouter = require("./routes/sensei_types");

app.use("/sensei-types", SenseiTypesRouter);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor conectado corectamente al puerto ${port}`);
});
