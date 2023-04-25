const router = require('express').Router();
const {
  models: { Item, Cart, User, Product },
} = require('../db');

//middleware function to check if a cart belongs to the user
const isCartOwner = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const cart = await Cart.findByPk(req.params.cartId);

    if (!cart) {
      const error = new Error('Cart not found');
      error.status = 404;
      throw error;
    }

    if (cart.userId !== user.id) {
      const error = new Error('Not authorized');
      error.status = 401;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};

// middleware function to check if user isAdmin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (!user.isAdmin) {
      const error = new Error('Not authorized');
      error.status = 401;
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};

router.put('/:id', async (req, res, next) => {
  try {
    console.log(req) //remove during cleanup
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

// Create a new cartItem and add it to the user's cart
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

    // If the user does not have a cart where `isFulfilled` set to `false`, create one (will this class with the other route?)
    if (!cart) {
      const newCart = await Cart.create({ userId: user.id });
      await newCart.setUser(user);
    }

    // Get the product based on the ID provided in the request body
    const product = await Product.findByPk(req.body.productId);

    // Create a new item based on the product and add it to the user's cart
    const newItem = await Item.create({
      productId: product.id,
      quantity: req.body.quantity,
      price: product.price,
      cartId: cart.id,
    });

    res.json(newItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;