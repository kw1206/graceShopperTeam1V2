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
    validate: {
      min: 0
    },
  },
  category: {
    type: Sequelize.ENUM('shirts', 'pants', 'shoes'), //not our real categories
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  images: {
    type: Sequelize.STRING,
  },
  thumbnails: {
    type: Sequelize.STRING,
  },
})

module.exports = Product