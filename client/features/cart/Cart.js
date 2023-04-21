import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

const dummyOrder =[
  {
    "id": 2,
    "isFulfilled": true,
    "userId": 2,
    "createdAt": "2023-04-21T21:26:02.288Z",
    "updatedAt": "2023-04-21T21:26:02.288Z",
    "items": [
      {
        "id": 2,
        "quantity": "5",
        "createdAt": "2023-04-21T21:26:02.517Z",
        "updatedAt": "2023-04-21T21:26:02.517Z",
        "productId": 1,
        "cartId": 2,
        "product": {
          "id": 1,
          "title": "Samsung Universe 9",
          "brand": "Samsung",
          "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
          "price": "1249.00",
          "category": "smartphones",
          "inventory": 10,
          "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
          "images": [
            "https://i.dummyjson.com/data/products/3/1.jpg"
          ],
          "createdAt": "2023-04-21T21:26:02.299Z",
          "updatedAt": "2023-04-21T21:26:02.299Z"
        }
      }
    ]
  }
]

const personInfo =[

]

const Cart = () => {
  // has a header that lists username, friendly message, and Items in cart
  return (
    <>
      <div id="cart-list">
        <h2> Here is your Cart {dummyCart.firstName}!</h2>
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
