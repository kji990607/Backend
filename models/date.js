module.exports = (sequelize, DataTypes) => {
  const Date = sequelize.define(
    "date",
    {
      date: {
        type: DataTypes.DATEONLY,
      },
      isPill: {
        type: DataTypes.BOOLEAN,
      },
      isSex: {
        type: DataTypes.BOOLEAN,
      },
      dateMood: {
        type: DataTypes.INTEGER(10),
      },
      dateCondition: {
        type: DataTypes.INTEGER(10),
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
