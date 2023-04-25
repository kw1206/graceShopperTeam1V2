import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteCartItem, fetchCurrentCart } from './cartSlice';
import { useDispatch } from 'react-redux';

//Need to add these to slices eventually

const CartItem = (props) => {
  const dispatch = useDispatch();
  // console.log("here is one prop item ", props)
  const { cartItem } = props;
  const { quantity, id } = cartItem;
  const { product } = cartItem;
  const [amountValue, setAmountValue] = useState(parseInt(quantity)); // type is now number

  const { title, price, thumbnail } = product;
  // DELETING ITEM FUNCTIONS
  const deleteThisItem = async (event) => {
    event.preventDefault();
    console.log("deletItem ", id);
    dispatch(deleteCartItem(id));
    // dispatch(fetchCurrentCart(id));
  };

  //ADDING AND SUBTRACTING FUNCTIONS //

  useEffect(() => {
    // here is where a put request needs to go
    console.log('quantiy change');
  }, [quantity]);

  function addOne() {
    const newValue = amountValue + 1;
    setAmountValue(newValue);
  }

  function subtractOne() {
    const newValue = amountValue - 1;
    setAmountValue(newValue);
  }

  return (
    <>
      <span id={id}>
        <h4 className="item-Name">{title}</h4>
        <img className="cart-thumbnail" src={thumbnail} />
        <span>${price}</span>{' '}
        <button className="subtractOne" onClick={subtractOne}>
          {' '}
          -{' '}
        </button>{' '}
        {amountValue}{' '}
        <button className="addOne" onClick={addOne}>
          {' '}
          +{' '}
        </button>
        {'  '}
        <button id="deleteBtn" onClick={deleteThisItem}>
          Delete
        </button>
      </span>
    </>
  );
};

export default CartItem;
