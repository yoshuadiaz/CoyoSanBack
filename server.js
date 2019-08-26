require("dotenv").config()
const bodyParser = require("body-parser")
const db = require("./db/models")

db.sequelize.sync()

const express = require("express")
const app = express()

const SenseiTypesRouter = require("./routes/sensei_types")
const UserRouter = require("./routes/user")
const GoalRouter = require("./routes/goal")
const SavingRouter = require("./routes/saving")
//const sensei_health = require("./controlers/sensei_health");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/sensei-types", SenseiTypesRouter)
app.use("/user", UserRouter)
app.use("/goal", GoalRouter)
app.use("/saving", SavingRouter)
app.get("/", function(req, res) {
  res.send("CoyoSan App")
  res.end()
})

const port = process.env.SERVER_PORT || 3000

app.listen(port, function() {
  console.log("app running on port: " + port)
})
