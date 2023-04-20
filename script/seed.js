'use strict'
const { productsForSeed, usersForSeed, cartsForSeed, itemsForSeed } =require('./seedData')
const {db, models: {User, Product, Cart, Item} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
*/

async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all(
    usersForSeed.map(async (user) => {
      await User.create(user)
    }));

  // Creating Carts
  const carts = await Promise.all(
    cartsForSeed.map(async (cart) => {
    await Cart.create(cart)
  }))

  // Creating products
  const products = await Promise.all(
    productsForSeed.map(async (product) => {
      await Product.create(product)
    }));

  // // Creating Items
  const items = await Promise.all(
    itemsForSeed.map(async (item) => {
    await Item.create(item)
  }))

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${carts.length} carts`)
  console.log(`seeded ${items.length} items`)



  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}


/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
