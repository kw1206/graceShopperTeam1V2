import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

const dummyOrder = [
  {
    id: 4,
    isFulfilled: false,
    userId: 3,
    createdAt: '2023-04-21T22:15:28.619Z',
    updatedAt: '2023-04-21T22:15:28.619Z',
    items: [
      {
        id: 4,
        quantity: '4',
        createdAt: '2023-04-21T22:15:28.801Z',
        updatedAt: '2023-04-21T22:15:28.801Z',
        productId: 3,
        cartId: 4,
        product: {
          id: 3,
          title: 'Samsung Universe 9',
          brand: 'Samsung',
          description:
            "Samsung's new variant which goes beyond Galaxy to the Universe",
          price: '1249.00',
          category: 'smartphones',
          inventory: 10,
          thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
          images: ['https://i.dummyjson.com/data/products/3/1.jpg'],
          createdAt: '2023-04-21T22:15:28.629Z',
          updatedAt: '2023-04-21T22:15:28.629Z',
        },
      },
      {
        id: 2,
        quantity: '5',
        createdAt: '2023-04-21T22:15:28.801Z',
        updatedAt: '2023-04-21T22:15:28.801Z',
        productId: 1,
        cartId: 4,
        product: {
          id: 1,
          title: 'iPhone 9',
          brand: 'Apple',
          description: 'An apple mobile which is nothing like apple',
          price: '549.00',
          category: 'smartphones',
          inventory: 10,
          thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
          images: [
            'https://i.dummyjson.com/data/products/1/1.jpg',
            'https://i.dummyjson.com/data/products/1/2.jpg',
            'https://i.dummyjson.com/data/products/1/3.jpg',
            'https://i.dummyjson.com/data/products/1/4.jpg',
            'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
          ],
          createdAt: '2023-04-21T22:15:28.628Z',
          updatedAt: '2023-04-21T22:15:28.628Z',
        },
      },
    ],
  },
];

const personInfo = {
  fullName: 'TempUser TempUserLast',
  id: 3,
  username: 'a@b.com',
  firstName: 'TempUser',
  lastName: 'TempUserLast',
};

const Cart = () => {
  console.log('orignal person info ', personInfo);
  console.log('orignal order info ', dummyOrder);
  // has a header that lists username, friendly message, and Items in cart

  const cartItems = dummyOrder[0].items;

  console.log('here is cart items List ', cartItems);
  return (
    <>
      <div id="cart-list">
        <h2> Here is your Cart {personInfo.firstName}!</h2>
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
            <CartItem cartItem={cartItem} key={cartItem.id} />
          ))
        ) : (
          <p>
            Your Cart is Empty!
            <Link to="home"> Browse the shop </Link>
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
