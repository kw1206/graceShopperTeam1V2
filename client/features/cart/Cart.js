import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

const dummyOrder = [
  {
    // from cart  need id number (so that user can look at details more)
    id: 1,
    // Item info of title, price and thumbnail image
    title: 'iPhone 9',
    price: 549,
    thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    orderAmount: 1,
  },
  {
    id: 2,
    title: 'iPhone X',
    price: 899,
    thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
    orderAmount: 2,
  },
  {
    id: 3,
    title: 'Samsung Universe 9',
    price: 1249,
    thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
    orderAmount: 2,
  },
];
const dummyCart = {
  // for now dummy cart just needs to pull the Cart and Order and current cart.
  // TODO pull default address and default payment method
  // TODO prompt to reenter password to complete purchase?
  username: 'atuny0@sohu.com',
};

const Cart = () => {
  // has a header that lists username, friendly message, and Items in cart
  return (
    <>
      <div id="cart-list">
        <h2> Here is your Cart {dummyCart.username}!</h2>
        {dummyOrder.length > 0 ? (
          dummyOrder.map((cartProduct) => (
            <CartItem cartProduct={cartProduct} key={cartProduct.id} />
          ))
        ) : (
          <p>
            Your Cart is Empty!
            <Link to="allProducts"> Browse the shop </Link>
          </p>
        )}
      </div>
    </>
  );

  // contains another component which has individual items.
  // each individual item is a thumbnail image the product  with a more details button? name price per unit and a + button the quanity and a - button
  // quanity could also be a form that accepts values 1-product available amount
  // also a delete item from cart button.
  //TODO a link to the home page to
};

export default Cart;
