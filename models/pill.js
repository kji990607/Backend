module.exports = (sequelize, DataTypes) => {
  const Pill = sequelize.define(
    "pill",
    {
      pillStart: {
        type: DataTypes.DATEONLY,
      },
      pillEnd: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Pill.associate = function (models) {
    Pill.belongsTo(models.User);
  };

  return Pill;
};
