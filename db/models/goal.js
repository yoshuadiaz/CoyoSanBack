module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define("Goal", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    months: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },

    amountToBe: {
      type: DataTypes.REAL(10, 2),
      allowNull: false
    },

    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }
    }
  });

  Goal.associate = function(models) {
    Goal.hasOne(models.user);
    Goal.hasMany(models.saving);
    Goal.hasOne(models.sensei);
  };
  return Goal;
};
