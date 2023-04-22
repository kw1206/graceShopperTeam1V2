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

const CartItem = (product) => {
  console.log("here is one prop item ", product)
  const itemInfo = product
  console.log("here is product info ", itemInfo)
  const { id, title, price, thumbnail, orderAmount } = itemInfo.product;

  return (
    <>
      <span id={id}>
        <h4 className="item-Name">{title}</h4>
        <img className="cart-thumbnail" src={thumbnail} />
        <span>${price}</span>
        <button className="addOne" onClick={addOne(orderAmount)}>
          {' '}
          +{' '}
        </button>{' '}
        {orderAmount}{' '}
        <button className="subtractOne" onClick={subtractOne(orderAmount)}>
          {' '}
          -{' '}
        </button>
        <DeleteBtn></DeleteBtn>
      </span>
    </>
  );
};

export default CartItem;
