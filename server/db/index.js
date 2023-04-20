const db = require('./db');
const User = require('./models/User');
const Product = require('./models/Product');
const Item = require('./models/Item')
const Cart = require('./models/Cart')

//whats wrong with these?
// User.hasMany(Cart)
// Cart.belongsTo(User)

Product.hasMany(Item)
Item.belongsTo(Product)

//whats wrong with these?
// Cart.hasMany(Item)
// Item.belongsTo(Cart)


module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    Item
  },
}
