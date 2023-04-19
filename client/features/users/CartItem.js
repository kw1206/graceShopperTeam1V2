import React from 'react';
import { useSelector } from 'react-redux';

const CartItem = (props) => {
  const { cartProduct } = props;
  const { id, title, price, thumbnail, orderAmount } = cartProduct;

  return (
    <>
      <span id={id}>
        <h4 className="item-Name">{title}</h4>
        <img className="cart-thumbnail" src={thumbnail} />
        {price}
        <button> + </button> {orderAmount} <button> - </button>
      </span>
    </>
  );
};

export default CartItem;
