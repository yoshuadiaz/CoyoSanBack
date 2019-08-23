module.exports = (sequelize, DataTypes) => {
  const Sensei_type = sequelize.define("Sensei_type", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Sensei_type.associate = function(models) {
    Sensei_type.hasMany(models.Sensei);
  };
  return Sensei_type;
};
