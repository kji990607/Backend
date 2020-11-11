module.exports = (sequelize, DataTypes) => {
  const Predict = sequelize.define(
    "predict",
    {
      predictBleedStart: {
        type: DataTypes.DATEONLY,
      },
      predictBleedEnd: {
        type: DataTypes.DATEONLY,
      },
      predictEggStart: {
        type: DataTypes.DATEONLY,
      },
      predictEggEnd: {
        type: DataTypes.DATEONLY,
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

  Predict.associate = function (models) {
    Predict.belongsTo(models.User);
  };

  return Predict;
};
