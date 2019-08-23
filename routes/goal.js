const express = require("express");
const db = require("../db/models");
const jwt = require("jsonwebtoken");
const Router = express.Router();

Router.post("/signup", async function(request, response) {
  const token = request.headers.authorization;
  //obtener el token
  const name = request.body.name;
  const price = request.body.price;
  const months = request.body.months;
  //verificar que los campos no sean null o de diferente tipo
  if (!name) {
    return response.console.error("Mandatory field");
  }
  if (!price) {
    return response.console.error("Goal can't be $0.00");
  }
  if (months < 6 || !months) {
    return response.console.error("Goal need to be more than six months");
  }

  //guardar el nuevo usuario en la base de datos
  const privateKey = process.env.SECRET_KEY;
  var decoded = jwt.verify(token, privateKey);

  const newGoal = await db.Goal.create({
    name,
    price,
    months,
    amountToBe = price/months,
    id_user= decoded.id
  });
  console.log(newGoal);
  return response.send({token});
});

Router;
module.exports = Router;
