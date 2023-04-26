const router = require('express').Router();
const {
  models: { Item, Cart, User, Product },
} = require('../db');

router.put('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      if (req.body.quantity <= 0) {
        await item.destroy();
        res.json(item);
      } else {
          await item.update({ quantity: req.body.quantity });
          res.json(item);
      }
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      await item.destroy();
      res.json(item);
    } else {
      console.log('item not found');
    }
  } catch (err) {
    next(err);
  }
});

// Create a new cartItem or update the quantity of an existing item in the user's cart
router.post('/', async (req, res, next) => {
  try {
    // Get the current user's cart where `isFulfilled` set to `false`
    const user = await User.findByToken(req.headers.authorization);
    const cart = await Cart.findOne({
      where: { 
        userId: user.id,
        isFulfilled: false
      },
    });

    // If the user does not have a cart where `isFulfilled` set to `false`, create one
    if (!cart) {
      const newCart = await Cart.create({ userId: user.id });
      await newCart.setUser(user);
    }

    // Get the product based on the ID provided in the request body
    const product = await Product.findByPk(req.body.productId);

    // Check if there is already an item in the cart with the same product ID
    const existingItem = await Item.findOne({
      where: {
        cartId: cart.id,
        productId: product.id,
      },
    });

    if (existingItem) {
      // If there is an existing item, update its quantity
      const updatedItem = await existingItem.update({
        quantity: existingItem.quantity + 1,
      });
      res.json(updatedItem);
    } else {
      // Otherwise, create a new item and add it to the cart
      const newItem = await Item.create({
        productId: product.id,
        quantity: req.body.quantity || 1,
        price: product.price,
        cartId: cart.id,
      });
      res.json(newItem);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;