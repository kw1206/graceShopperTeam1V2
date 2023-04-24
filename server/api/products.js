const router = require('express').Router();
const { models: { Product, User }} = require('../db');

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

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (err) {
    next(err)
  }
});

router.post('/', isAdmin, async (req, res, next) => {
  try {
    console.log(req.body)
    const product = await Product.create(req.body);
    res.status(201).json(product)
  } catch (err) {
    next(err);
  }
});

router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(await product.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.json(product)
  } catch (err) {
    next(err);
  }
});

module.exports = router