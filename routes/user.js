const express = require("express");
const db = require("../db/models");
const jwt = require("jsonwebtoken");
//^w^ const bcrypt = require("bcrypt");
const Router = express.Router();

Router.post("/signup", async function(request, response) {
  const name = request.body.name;
  const mail = request.body.mail;
  const password = request.body.password;
  const goal_name = request.body.goal_name;
  const goal_price = request.body.goal_price;
  const goal_months = request.body.goal_months;

  if (!name) {
    return response.status(400).send("Mandatory field");
  }
  if (!mail) {
    return response.status(400).send("Mandatory field");
  }
  if (!password) {
    return response.status(400).send("Mandatory field");
  }
  if (!goal_name) {
    return response.status(400).send("Mandatory field");
  }
  if (!goal_price) {
    return response.status(400).send("Goal can't be $0.00");
  }
  if (goal_months < 6 || !goal_months) {
    return response.status(400).send("Goal need to be more than six months");
  }

  const userExist = await db.User.findOne({ where: { mail } });
  if (userExist) {
    return response.status(400).send("This user exist");
  }
  const transaction = await db.sequelize.transaction();
  try {
    const newUser = await db.User.create(
      {
        name,
        mail,
        password
      },
      { transaction }
    );

    await db.Goal.create(
      {
        name: goal_name,
        price: goal_price,
        months: goal_months,
        amountToBe: goal_price / goal_months,
        id_user: newUser.id
      },
      { transaction }
    );
    transaction.commit();

    const privateKey = process.env.SECRET_KEY;
    const token = jwt.sign({ id: newUser.id }, privateKey);
    return response.send({ token });
  } catch (error) {
    trasaction.rollback();
    response.status(400).send("Unexpected error");
    response.end();
    console.error(error);
  }
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
