//this will serve as their order history (purchased cart)
//if a user doesnt have a cart thats unfilled, create new cart (post request)

//if a user does have a cart thats unfilled, serve up that cart

const router = require('express').Router();
const {
  models: { Cart, User },
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

router.put('/:id', async (req, res, next) => {
  try {
    console.log("put router", req); //remove during cleanup
    const cart = await Cart.findByPk(req.params.id);
    if (cart) {
      await cart.update({ isFulfilled: true });
      res.json(cart);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
