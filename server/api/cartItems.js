//this is what they'll view when they click on their cart
//this is where they'll increase/decrease/delete cart items

const router = require('express').Router();
const {
  models: { Item, Cart },
} = require('../db');
const User = require('../db/models/User');

const isUser = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (!user) {
      const error = new Error('Not your cart');
    }
  } catch (error) {
    next(error);
  }
};

// router.put('/:id', async (req, res, next) => {
//   try {
//     console.log("this is put route", req)
//     const item = await Item.findByPk(req.params.id);
//     if (item) {
//       if (req.body.quantity === 0) {
//         await item.destroy();
//         res.json(item);
//       }
//       res.json(await item.update(req.body.quantity));
//     }
//   } catch (err) {
//     next(err);
//   }
// });

router.put('/:id', async (req, res, next) => {
  try {
    console.log(req) //remove during cleanup
    const item = await Item.findByPk(req.params.id);
    if (item) {
      if (req.body.quantity === 0) {
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

module.exports = router;
