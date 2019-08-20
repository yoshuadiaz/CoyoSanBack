const express = require("express");
const db = require("../db/models");
const Router = express.Router();

Router.post("/signup", async function(request, response) {
  //obtener name,email y password del usuario
  const name = request.body.name;
  const mail = request.body.mail;
  const password = request.body.password;
  //verificar que los campos no sean null o de diferente tipo
  if (!name) {
    return response.send("Mandatory field");
  }
  if (!mail) {
    return response.send("Mandatory field");
  }
  if (!password) {
    return response.send("Mandatory field");
  }
  //verificar con una condicionante que el mail no exista en la base de datos
  const userExist = await db.User.findOne({ where: { mail } });

  if (userExist) {
    return response.send("This user exist");
  }
  //hashear password (no tengo pluggin)
  //guardar el nuevo usuario en la base de datos
  const newUser = await db.User.create({
    name,
    mail,
    password
  });
  console.log(newUser);
  return response.send("Register success");
});

Router;
module.exports = Router;
