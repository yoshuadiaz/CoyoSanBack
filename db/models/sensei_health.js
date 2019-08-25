module.exports = (sequelize, DataTypes) => {
  const Sensei_health = sequelize.define("Sensei_health", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Sensei_health.associate = function(models) {
    Sensei_health.hasMany(models.Sensei, {
      foreignKey: "id_sensei_health",
      sourceKey: "id"
    });
  };
  return Sensei_health;
};
