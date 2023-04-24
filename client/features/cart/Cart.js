import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CartItem from './CartItem';
import {
  fetchCurrentCart,
  selectCurrentCart,
  selectCurrentUser,
} from './cartSlice';

const Cart = () => {
  const currentUser = useSelector(selectCurrentUser);
  const currentUserID = currentUser.me.id;
  const dispatch = useDispatch();
  const currentCart = useSelector(selectCurrentCart);
  const [cartItems, setCartItems] = useState([]);
  const [currentUserIs, setcurrentUserIs] = useState('');
  useEffect(() => {
    if (currentUserID) {
      dispatch(fetchCurrentCart(currentUserID));
      if (currentCart[0]) {
        setCartItems(currentCart[0].items);
      }
    }
    console.log('no user');
    // here would fetch the cart from local storage maybe?
    //note api route Is NOT PROTECTED YET
  }, [currentUserID]);

  useEffect(() => {
    if (currentCart.id > 0) {
      console.log('here is cart in use effect', currentCart);
    }
  }, [currentCart]);

  return (
    <>
      <div id="cart-list" value={currentCart}>
        <h1>BLANK</h1>
        <h1>BLANK</h1>
        <h1>BLANK</h1>
        <h1>BLANK</h1>

        <h2> Here is your Cart {currentUser.me.firstName}!</h2>
        {currentCart[0] ? (
          currentCart[0].items.map((cartItem) => (
            <CartItem cartItem={cartItem} key={cartItem.id} />
          ))
        ) : (
          <p>
            Your Cart is Empty!
            <Link to="home"> Browse the shop </Link>
          </p>
        )}
      </div>
      <br></br>
      <button to="order" value={`${currentCart.id}`}>
        {' '}
        Submit your order{' '}
      </button>
    </>
  );

  // contains another component which has individual items.
  // each individual item is a thumbnail image the product  with a more details button? name price per unit and a + button the quanity and a - button
  // quanity could also be a form that accepts values 1-product available amount
  // also a delete item from cart button.
  //TODO a link to the home page to
};

export default Cart;
