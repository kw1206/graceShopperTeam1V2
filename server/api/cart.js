const router = require('express').Router();
const {
  models: { Cart, User },
} = require('../db');

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
