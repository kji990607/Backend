module.exports = (sequelize, DataTypes) => {
  const Control = sequelize.define(
    "control",
    {
      controlStart: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      controlEnd: {
        type: DataTypes.DATEONLY,
      },
      controlHour: {
        type: DataTypes.INTEGER(2),
        allowNull: false,
      },
      controlMinute: {
        type: DataTypes.INTEGER(2),
        allowNull: false,
      },
    },
    {
      timestamps: true,
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
