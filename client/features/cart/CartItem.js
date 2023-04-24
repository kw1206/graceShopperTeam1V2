import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DeleteBtn from './DeleteBtn';

//Need to add these to slices eventually

const CartItem = (props) => {
  // console.log("here is one prop item ", props)
  const { cartItem } = props;
  const { quantity } = cartItem;
  const { product } = cartItem;
  const [amountValue, setAmountValue] = useState(parseInt(quantity)); // type is now number

  const { id, title, price, thumbnail } = product;

  useEffect(() => {
    console.log('quantiy change');
  }, [quantity]);

  //ADDING AND SUBTRACTING FUNCTIONS //
  function addOne() {
    const newValue = amountValue + 1;
    setAmountValue(newValue)
  }

  function subtractOne() {
    const newValue = amountValue - 1;
    setAmountValue(newValue);
    // return n-1
  }

  return (
    <>
      <span id={id}>
        <h4 className="item-Name">{title}</h4>
        <img className="cart-thumbnail" src={thumbnail} />
        <span>${price}</span>
        <button className="addOne" onClick={addOne}>
          {' '}
          +{' '}
        </button>{' '}
        {amountValue}{' '}
        <button className="subtractOne" onClick={subtractOne}>
          {' '}
          -{' '}
        </button>
        {/* <DeleteBtn/> */}
      </span>
    </>
  );
};

export default CartItem;
