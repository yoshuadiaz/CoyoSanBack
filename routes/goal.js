const express = require("express");
const db = require("../db/models");
const jwt = require("jsonwebtoken");
const Router = express.Router();
const senei_health = require("../controlers/sensei_health");

Router.get("/", async function(request, response) {
  const token = request.headers.authorization;
  const privateKey = process.env.SECRET_KEY;
  var decoded = jwt.verify(token, privateKey);
  const goal = await db.Goal.findOne({
    where: { id: decoded.id_goal },
    include: [{ model: db.Sensei }, { model: db.Saving }]
  });

  // await db.Goal.update({});
  console.log(goal);
  return response.json(goal);
});

//Router.patch("/", sensei_health());

module.exports = Router;
