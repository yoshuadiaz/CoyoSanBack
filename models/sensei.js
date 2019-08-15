module.exports = (sequelize, DataTypes) => {
  const Sensei = sequelize.define('Sensei', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_goal: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Goal',
        key: 'id'
      }
    },
    id_sensei_health: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Sensei_health',
        key: 'id'
      }
    },
    id_sensei_type: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Sensei_type',
        key: 'id'
      }
    }
  }
  )

  Sensei.associate = function (models) {
    // Code for associations (relationships)
  }
  return Sensei
}