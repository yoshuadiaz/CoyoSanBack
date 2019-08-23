const express = require("express");
const db = require("../db/models");
const jwt = require("jsonwebtoken");
//^w^ const bcrypt = require("bcrypt");
const Router = express.Router();

Router.post("/signup", async function(request, response) {
  const name = request.body.name;
  const mail = request.body.mail;
  const password = request.body.password;
  if (!name) {
    return response.console.error("Mandatory field");
  }
  if (!mail) {
    return response.console.error("Mandatory field");
  }
  if (!password) {
    return response.console.error("Mandatory field");
  }
  const userExist = await db.User.findOne({ where: { mail } });

  if (userExist) {
    return response.console.error("This user exist");
  }

  const newUser = await db.User.create({
    name,
    mail,
    password
  });
  console.log(newUser);

  const user = await db.User.findOne({ where: { mail } });

  const privateKey = process.env.SECRET_KEY;
  const token = jwt.sign({ id: user.id }, privateKey);
  return response.send({ token });
});

//^w^ Router.post("/login", async function(request, response) {
//   const mail = request.body.mail;
//   const password = request.body.password;
//   //verificar que el email existe en la bd
//   const userExist = await db.User.findOne({ where: { mail } });
//   if (!userExist) {
//     return response.send("This user not exist");
//   }
//   //verificar que el password consida con el password del email
//   const passwordValid = await bcrypt.compare(password, user.password);
//   if (!passwordValid) {
//     return response.send("Password dismach");
//   }
//   return response.redirect("http://coyosan.com/summary" + req.url);
//^w^ });

Router;
module.exports = Router;
