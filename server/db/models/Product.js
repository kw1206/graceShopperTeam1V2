const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  brand: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 10,
    validate: {
      min: 0
    },
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  thumbnails: {
    type: Sequelize.STRING,
  },
})

module.exports = Product