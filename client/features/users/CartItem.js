import React from 'react';
import { useSelector } from 'react-redux';

//Need to add these to slices eventually
function addOne(n) {
  console.log("click add one");
}
function subtractOne(n) {
  console.log("click sub one");
}

const CartItem = (props) => {
  const { cartProduct } = props;
  const { id, title, price, thumbnail, orderAmount } = cartProduct;

  return (
    <>
      <span id={id}>
        <h4 className="item-Name">{title}</h4>
        <img className="cart-thumbnail" src={thumbnail} />
        <span>${price.toLocaleString()}</span>
        <button className="addOne" onClick={addOne(orderAmount)}>
          {' '}
          +{' '}
        </button>{' '}
        {orderAmount}{' '}
        <button className="subtractOne" onClick={subtractOne(orderAmount)}>
          {' '}
          -{' '}
        </button>
      </span>
    </>
  );
};

export default CartItem;
