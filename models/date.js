module.exports = (sequelize, DataTypes) => {
  const Date = sequelize.define(
    "date",
    {
      date: {
        type: DataTypes.DATEONLY,
      },
      isSex: {
        type: DataTypes.BOOLEAN,
      },
      isControl: {
        type: DataTypes.BOOLEAN,
      },
      dateMood: {
        type: DataTypes.INTEGER(2),
      },
      dateCondition: {
        type: DataTypes.INTEGER(2),
      },
      isEgg: {
        type: DataTypes.BOOLEAN,
      },
      isBleed: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Date.associate = function (models) {
    Date.belongsTo(models.User);
  };

  return Date;
};
