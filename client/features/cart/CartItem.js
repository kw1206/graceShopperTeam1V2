import React from 'react';
import { useSelector } from 'react-redux';
import DeleteBtn from './DeleteBtn';

//Need to add these to slices eventually
function addOne(n) {
  console.log("click add one");
}
function subtractOne(n) {
  console.log("click sub one");
}

const CartItem = (props) => {
  console.log("here is one prop item ", props)
  const { cartItem } = props;
  const {quantity} = cartItem;
  const { product } = cartItem;

  console.log("here is product info ", product)
  const { id, title, price, thumbnail} = product;

  return (
    <>
      <span id={id}>
        <h4 className="item-Name">{title}</h4>
        <img className="cart-thumbnail" src={thumbnail} />
        <span>${price}</span>
        <button className="addOne" onClick={addOne(quantity)}>
          {' '}
          +{' '}
        </button>{' '}
        {quantity}{' '}
        <button className="subtractOne" onClick={subtractOne(quantity)}>
          {' '}
          -{' '}
        </button>
        <DeleteBtn/>
      </span>
    </>
  );
};

export default CartItem;
