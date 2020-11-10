module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      userName: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      userEmail: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      userPassword: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      userBirth: {
        type: DataTypes.DATEONLY,
      },
      userWeight: {
        type: DataTypes.INTEGER(3),
      },
      userHeight: {
        type: DataTypes.INTEGER(3),
      },
      meanCycle: {
        type: DataTypes.INTEGER(2),
      },
      meanPeriod: {
        type: DataTypes.INTEGER(2),
      },
      userAlcohol: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Cycle);
  };

  User.associate = function (models) {
    User.hasMany(models.Date);
  };

  User.associate = function (models) {
    User.hasMany(models.Pill);
  };

  User.associate = function (models) {
    User.belongsTo(models.Pill);
  };

  return User;
};
