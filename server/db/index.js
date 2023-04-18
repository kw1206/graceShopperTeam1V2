const db = require('./db');
const User = require('./models/User');
const Product = require('./models/Product');

//associations could go here!
User.belongsToMany(Product)
Product.belongsToMany(User)

module.exports = {
  db,
  models: {
    User,
    Product,
  },
}
