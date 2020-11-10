module.exports = (sequelize, DataTypes) => {
  const Control = sequelize.define(
    "control",
    {
      controlStart: {
        type: DataTypes.DATEONLY,
      },
      controlEnd: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Control.associate = function (models) {
    Control.belongsTo(models.User);
  };

  return Control;
};
