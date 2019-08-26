const db = require("../db/models");
const moment = require("moment");

const sensei_health = async (firstSavingDate, goalId) => {
  if (!firstSavingDate) {
    throw new Error("This user hasn't start game");
  } else {
    const today = moment();
    const mounthsDif = today.diff(firstSavingDate, "M");
    let healthStatus = null;
    try {
      const { price, amountAccumReal, amountToBe } = await db.Goal.findOne({
        where: { id: goalId }
      });
      const savingAccumToBe = amountToBe * mounthsDif;
      const savingAccumLessThreeMonths = savingAccumToBe - amountToBe * 3;

      if (amountAccumReal === savingAccumToBe) {
        healthStatus = "FINE";
      }
      if (savingAccumLessThreeMonths <= amountAccumReal < savingAccumToBe) {
        healthStatus = "SICK";
      }
      if (amountAccumReal < savingAccumLessThreeMonths) {
        healthStatus = "DEAD";
      }
      if (price > amountAccumReal > savingAccumToBe) {
        healthStatus = "HAPPY";
      }
      if (price <= amountAccumReal) {
        healthStatus = "PROUD";
      }

      const sensei_health = await db.Sensei_health.findOne({
        where: { name: healthStatus }
      });
      return sensei_health.id;
    } catch (error) {
      console.log(error);
      throw new Error("Failure");
    }
  }
};

module.exports = sensei_health;
