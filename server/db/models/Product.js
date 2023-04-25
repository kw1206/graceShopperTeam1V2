const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
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
      notEmpty: true,
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
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 10,
    validate: {
      min: 0
    },
  },
  thumbnail: {
    type: Sequelize.STRING,
    defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg',
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'],
  },
})

module.exports = Product