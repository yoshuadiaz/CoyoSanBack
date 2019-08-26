// const express = require("express");
// const db = require("./db/models");
// const moment = require("moment");

// async function(req,resp){
//     const goal = await req.body.goal_id
//     const savings = await req.Saving.FindAll({where:{id_goal:goal}})
//     if (!savings){
//         return error ("This user hasnt start game")
//     } else {
//         const {price, savingAccumReal, createAt} = await req.Goal.FindOne({where:{id:goal}})

//         const today = moment()
//         const mounthsDif = today.diff(createAt,"M");

//         const savingAccumToBe = goal_savingToBe * mounthsDif;
//         const savingAccumSick = savingAccumToBe - goal_savingToBe*3;

//         if (savingAccumReal==savingAccumToBe){
//             return (name.sensei_health = "FINE");
//         }
//         if (savingAccumSick<savingAccumReal<savingAccumToBe){
//             return (name.sensei_health = "SICK");
//         }
//         if (savingAccumReal < savingAccumSick) {
//             return (name.sensei_health = "DEAD");
//         }
//         if (price > savingAccumReal > savingAccumToBe) {
//             return (name.sensei_health = "HAPPY");
//         }
//         if (price =< savingAccumReal){
//             return (name.sensei_health = "PROUD");
//         }
//     }

//     resp.end()
// });
