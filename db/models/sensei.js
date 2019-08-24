module.exports = (sequelize, DataTypes) => {
  const Sensei = sequelize.define("Sensei", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_goal: {
      type: DataTypes.INTEGER,
      references: {
        model: "Goals",
        key: "id"
      }
    },
    id_sensei_health: {
      type: DataTypes.INTEGER,
      references: {
        model: "Sensei_healths",
        key: "id"
      }
    },
    id_sensei_type: {
      type: DataTypes.INTEGER,
      references: {
        model: "Sensei_types",
        key: "id"
      }
    }
  });

  Sensei.associate = function(models) {
    Sensei.belongsTo(models.Goal, {
      foreignKey: "id_user",
      sourceKey: "id"
    });
    Sensei.belongsTo(models.Sensei_health, {
      foreignKey: "id_sensei_health",
      sourceKey: "id"
    });
    Sensei.belongsTo(models.Sensei_type, {
      foreignKey: "id_sensei_type",
      sourceKey: "id"
    });
  };
  return Sensei;
};
