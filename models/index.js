const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.js")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Cycle = require("./cycle")(sequelize, Sequelize);
db.Control = require("./control")(sequelize, Sequelize);
db.Date = require("./date")(sequelize, Sequelize);
db.Pill = require("./pill")(sequelize, Sequelize);
db.Predict = require("./predict")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
