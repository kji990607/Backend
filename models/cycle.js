module.exports = (sequelize, DataTypes) => {
  const Cycle = sequelize.define(
    "cycle",
    {
      cycleStart: {
        type: DataTypes.DATEONLY,
      },
      cycleEnd: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Cycle.associate = function (models) {
    Cycle.belongsTo(models.User);
  };

  return Cycle;
};
