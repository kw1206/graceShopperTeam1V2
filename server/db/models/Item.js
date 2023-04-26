const Sequelize = require('sequelize');
const db = require('../db');

const Item = db.define('item', {

  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  }
});

module.exports = Item;
