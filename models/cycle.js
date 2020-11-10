module.exports = (sequelize, DataTypes) => {
  const Cycle = sequelize.define(
    "cycle",
    {
      bleedStart: {
        type: DataTypes.DATEONLY,
      },
      bleedEnd: {
        type: DataTypes.DATEONLY,
      },
      eggStart: {
        type: DataTypes.DATEONLY,
      },
      eggEnd: {
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
