const express = require("express");
const db = require("../db/models");
const jwt = require("jsonwebtoken");
const Router = express.Router();
const senei_health = require("../controlers/sensei_health");

Router.get("/", async function(request, response) {
  try {
    const token = request.headers.authorization;
    const privateKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, privateKey);
    const goal = await db.Goal.findOne({
      where: { id: decoded.id_goal },
      include: [
        {
          model: db.Sensei,
          include: [{ model: db.Sensei_type }, { model: db.Sensei_health }]
        },
        { model: db.Saving }
      ],
      order: [[db.Saving, "createdAt", "DESC"]]
    });
    return response.json(goal);
  } catch {
    response.status(400).send("Unexpected error");
  }
  response.end();
});

Router.get("/update", async function(request, response) {
  try {
    const token = request.headers.authorization;
    const privateKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, privateKey);

    const fristSaving = await db.Saving.findOne({
      where: { id_goal: decoded.id_goal },
      order: [["createdAt", "ASC"]]
    });
    //controller
    //return const result = id of the health calculated
    let result = 4;

    const sensei = await db.Sensei.update(
      { id_sensei_health: result },
      { where: { id_goal: decoded.id_goal } }
    );

    const goal = await db.Goal.findOne({
      where: { id: decoded.id_goal },
      include: [
        {
          model: db.Sensei,
          include: [{ model: db.Sensei_type }, { model: db.Sensei_health }]
        },
        { model: db.Saving }
      ],
      order: [[db.Saving, "createdAt", "DESC"]]
    });
    return response.json(goal);
  } catch {
    response.status(400).send("Unexpected error");
  }
  response.end();
});

module.exports = Router;
