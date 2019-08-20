module.exports = (sequelize, DataTypes) => {
  const Sensei_health = sequelize.define('Sensei_health', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  })

  Sensei_health.associate = function (models) {
    // Code for associations (relationships)
  }
  return Sensei_health
}
