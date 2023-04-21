const router = require('express').Router()
const { models: { User, Cart, Item, Product }} = require('../db');


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

// middleware function to check if user is the same user or isAdmin
const isUserOrAdmin = async (req, res, next) => {
  try {
    console.log(req.headers)
    const user = await User.findByToken(req.headers.authorization);
    console.log(user)
    if (!user.isAdmin && user.id !== req.params.id) {
      const error = new Error('Not authorized');
      error.status = 401;
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'lastName', 'firstName']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', isUserOrAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'firstName', 'lastName', 'fullName']
    });
    res.json(user)
  } catch (err) {
    next(err)
  }
});

router.get('/:id/orderHistory', isUserOrAdmin, async (req, res, next) => {
  try {
    const orderHistory = await Cart.findAll({
      where: { 
        userId: req.params.id,
        isFulfilled: true,
      },
      include: [
        {
          model: Item,
          include: [Product],
        },
      ],
    });
    res.json(orderHistory);
  } catch (err) {
    next(err);
  }
});

// add if statement, if theres no unfilfilled cart, create a new cart
// router.get('/:id/cart', isUserOrAdmin, async (req, res, next) => {
//   try {
//     const cart = await Cart.findAll({
//       where: { 
//         userId: req.params.id,
//         isFulfilled: false,
//       },
//       include: [
//         {
//           model: Item,
//           include: [Product],
//         },
//       ],
//     });
//     res.json(cart);
//   } catch (err) {
//     next(err);
//   }
// });

//add route to users cart

module.exports = router