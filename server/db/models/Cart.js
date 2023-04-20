const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  isFulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
});

module.exports = Cart;
