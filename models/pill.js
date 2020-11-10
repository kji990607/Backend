module.exports = (sequelize, DataTypes) => {
  const Pill = sequelize.define(
    "pill",
    {
      pillName: {
        type: DataTypes.STRING(10),
      },
      isAlcohol: {
        type: DataTypes.BOOLEAN,
      },
      pillEffect1: {
        type: DataTypes.INTEGER(2),
      },
      pillEffect2: {
        type: DataTypes.INTEGER(2),
      },
    },
    {
      timestamps: false,
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Pill.associate = function (models) {
    Pill.hasMany(models.User);
  };

  return Pill;
};
