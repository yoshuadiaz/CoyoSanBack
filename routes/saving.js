const jwt = require("jsonwebtoken");
const express = require("express");
const db = require("../db/models");
const Router = express.Router();

Router.get("/", async function(request, response) {
  try {
    const token = request.headers.authorization;
    const privateKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, privateKey);
    const savings = await db.Saving.findAll({
      where: { id_goal: decoded.id_goal }
    });
    response.json(savings);
    return response.end();
  } catch (error) {
    response.status(400).send("Unexpected error");
    response.end();
  }
});

Router.post("/", async function(request, response) {
  try {
    const token = request.headers.authorization;
    const privateKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, privateKey);
    const amount = request.body.amount;
    const newSaving = await db.Saving.create({
      amount,
      id_goal: decoded.id_goal
    });

    response.json(newSaving);
  } catch (error) {
    console.error(error);
    response.status(400).send("Unexpected error");
  }
  response.end();
});

module.exports = Router;
