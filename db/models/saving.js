const Goal = require("./goal");

module.exports = (sequelize, DataTypes) => {
  const Saving = sequelize.define("Saving", {
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    id_goal: {
      type: DataTypes.INTEGER,
      references: {
        model: "Goals",
        key: "id"
      }
    }
  });

  Saving.associate = function(models) {
    Saving.belongsTo(models.Goal, {
      foreignKey: "id_goal",
      sourceKey: "id"
    });
  };

  Saving.afterCreate(saving => {
    const goal = Goal.findOne({ where: { id: saving.id } });
    goal.amountAccumReal = goal.amountAccumReal + saving.amount;
  });

  return Saving;
};
