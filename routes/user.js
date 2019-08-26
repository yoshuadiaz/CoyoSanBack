const express = require("express")
const db = require("../db/models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Router = express.Router()

Router.post("/signup", async function(request, response) {
  const name = request.body.name
  const mail = request.body.mail
  const password = request.body.password
  const goal_name = request.body.goal_name
  const goal_price = request.body.goal_price
  const goal_months = request.body.goal_months
  const sensei_name = request.body.sensei_name
  const sensei_type_id = request.body.sensei_type_id

  if (!name) {
    return response.status(400).send("Mandatory field")
  }
  if (!mail) {
    return response.status(400).send("Mandatory field")
  }
  if (!password) {
    return response.status(400).send("Mandatory field")
  }
  if (!goal_name) {
    return response.status(400).send("Mandatory field")
  }
  if (!goal_price) {
    return response.status(400).send("Goal can't be $0.00")
  }
  if (goal_months < 6 || !goal_months) {
    return response.status(400).send("Goal need to be more than six months")
  }
  if (!sensei_name) {
    return response.status(400).send("Mandatory field")
  }
  const userExist = await db.User.findOne({ where: { mail } })
  if (userExist) {
    return response.status(400).send("This user exist")
  }
  const senesiTypeExist = await db.Sensei_type.findOne({
    where: { id: sensei_type_id }
  })
  if (!senesiTypeExist) {
    return response.status(400).send("Don't have this type of Sensei")
  }
  let transaction = null

  try {
    try {
      transaction = await db.sequelize.transaction()
    } catch (error) {
      throw new Error("I cant create transaction")
    }
    const newUser = await db.User.create(
      {
        name,
        mail,
        password
      },
      { transaction }
    )

    const newGoal = await db.Goal.create(
      {
        name: goal_name,
        price: goal_price,
        months: goal_months,
        amountToBe: goal_price / goal_months,
        id_user: newUser.id
      },
      { transaction }
    )

    await db.Sensei.create(
      {
        name: sensei_name,
        id_goal: newGoal.id,
        id_sensei_type: sensei_type_id
      },
      { transaction }
    )
    transaction.commit()

    const privateKey = process.env.SECRET_KEY
    const token = jwt.sign({ id: newUser.id, id_goal: newGoal.id }, privateKey)
    return response.send({ token })
  } catch (error) {
    transaction.rollback()
    response.status(400).send("Unexpected error")
    response.end()
    console.error(error)
  }
})

Router.post("/login", async function(request, response) {
  try {
    const mail = request.body.mail
    const password = request.body.password
    const userExist = await db.User.findOne({ where: { mail } })

    if (!userExist) {
      return response.status(400).send("This user not exist")
    }

    const passwordValid = await bcrypt.compare(password, userExist.password)

    if (!passwordValid) {
      return response.status(400).send("Password dismach")
    }

    const goal = await db.Goal.findOne({ where: { id_user: userExist.id } })
    const privateKey = process.env.SECRET_KEY
    const token = jwt.sign({ id: userExist.id, id_goal: goal.id }, privateKey)
    return response.send({ token })
  } catch {
    response.status(400).send("Unexpected error")
    response.end()
  }
})

Router
module.exports = Router
