module.exports = (sequelize, DataTypes) => {
  const Saving = sequelize.define('Saving', {
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    id_goal: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Goal',
        key: 'id'
      }
    }
  })

  Saving.associate = function (models) {
    // Code for associations (relationships)
  }
  return Saving
}