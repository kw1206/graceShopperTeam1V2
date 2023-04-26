import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CartItem from './CartItem';
import {
  fetchCurrentCart,
  selectCurrentCart,
  selectCurrentUser,
  updateCartStatus,
} from './cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //sets to check for current user
  const currentUser = useSelector(selectCurrentUser);

  // sets the current user id number and is value that changes
  const currentUserID = currentUser.me.id;

  const currentCart = useSelector(selectCurrentCart);
  //currentCart Items are state that is tracked.
  const currentCartItems = currentCart.items;

  const [cartItems, setCartItems] = useState([]);

  // initiates the fetch call when a userId exists.
  useEffect(() => {
    if (currentUserID) {
      dispatch(fetchCurrentCart(currentUserID));
    }
    // here would fetch the cart from local storage maybe?
  }, [currentUserID]);

  useEffect(() => {
    if (currentCartItems) {
      setCartItems(currentCartItems);
    }
  }, [currentCartItems]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const cartId = currentCart.id;
    if (confirm('ready to purchase?') === true) {
      dispatch(updateCartStatus(cartId)).then(() => {
        navigate('/products');
      });
    }
  };

  return (
    <div className="page">
      <div id="cart-list" value={currentCart}>
        <h2> Here is your Cart {currentUser.me.firstName}!</h2>
        <div>
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
              <button>
                <Link to="/products"> Browse the shop </Link>
              </button>
            </p>
          )}
        </div>
      </div>
      <br></br>
      <button to="order" onClick={handleSubmit} value={`${currentCart.id}`}>
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
