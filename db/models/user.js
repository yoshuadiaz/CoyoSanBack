const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Goal, {
      foreignKey: "id_user",
      sourceKey: "id"
    });
  };

  User.beforeCreate(async user => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  return User;
};
