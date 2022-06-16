const sequelize = require(".");
const { DataTypes } = require("sequelize");

const { STRING, BOOLEAN, INTEGER } = DataTypes;

const Events = sequelize.define("Events", {
  name: STRING,
  adultsOnly: BOOLEAN,
  attendees: INTEGER,
  description: STRING,
});

Events.sync();

module.exports = Events;
