import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DeleteBtn from './DeleteBtn';

//Need to add these to slices eventually
function addOne(n) {
  console.log('quantity is', n, 'user click add one now quant is', n++);
  return n + 1;
  // this should dispatch a put request for the item to update it's quantity
  // the the state that is updated is the quantiy number.
}
function subtractOne(n) {
  let newNum= n - 1;
  console.log(newNum)
  return newNum
}

const CartItem = (props) => {
  // console.log("here is one prop item ", props)
  const { cartItem } = props;
  const { quantity } = cartItem;
  const { product } = cartItem;
  const [amountValue, setAmountValue] = useState(parseInt(quantity)); // type is string

  console.log(typeof amountValue);

  // console.log("here is product info ", product)
  const { id, title, price, thumbnail } = product;

  useEffect(() => {
    
    console.log("quantiy change")
  }, [quantity]);
  return (
    <>
      <span id={id}>
        <h4 className="item-Name">{title}</h4>
        <img className="cart-thumbnail" src={thumbnail} />
        <span>${price}</span>
        <button className="addOne" onClick={() => addOne(quantity)}>
          {' '}
          +{' '}
        </button>{' '}
        {amountValue}{' '}
        <button className="subtractOne" onClick={() => subtractOne(quantity)}>
          {' '}
          -{' '}
        </button>
        {/* <DeleteBtn/> */}
      </span>
    </>
  );
};

export default CartItem;
