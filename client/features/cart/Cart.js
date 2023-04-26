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
  const dispatch = useDispatch();
  //sets to check for current user
  const currentUser = useSelector(selectCurrentUser);

  // sets the current user id number and is value that changes
  const currentUserID = currentUser.me.id;

  const currentCart = useSelector((state) => state.currentCart);
  //currentCart Items are state that is tracked.
  const currentCartItems = currentCart.items;

  const [cartItems, setCartItems] = useState([]);
  console.log('cartItems ', cartItems);

  // initiates the fetch call when a userId exists.
  useEffect(() => {
    if (currentUserID) {
      console.log('user id', currentUserID);
      console.log('dispatch fetch');
      dispatch(fetchCurrentCart(currentUserID));
    }
    // here would fetch the cart from local storage maybe?
  }, [currentUserID]);

  useEffect(() => {
    if (currentCartItems) {
      console.log('currentCartItems exists', currentCartItems);
      setCartItems(currentCartItems);
      console.log('currentCart value in use effect', currentCart);
    }
  }, [currentCartItems]);
  // setCartItems(currentCartItems);
  return (
    <div className="page">
      <div id="cart-list" value={currentCart}>
        <h2> Here is your Cart {currentUser.me.firstName}!</h2>

        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem
              cartItem={cartItem}
              userId={currentUserID}
              key={cartItem.id}
            />
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
    </div>
  );

  // contains another component which has individual items.
  // each individual item is a thumbnail image the product  with a more details button? name price per unit and a + button the quanity and a - button
  // quanity could also be a form that accepts values 1-product available amount
  // also a delete item from cart button.
  //TODO a link to the home page to
};

export default Cart;
