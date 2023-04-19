const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  isFulfilled: {
    type: Sequelize.Boolean
  }
})

module.export = Cart