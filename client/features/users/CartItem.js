import React from "react";
import { useSelector } from "react-redux";

const CartItem = (props) => {
  const { product } = props;
  const { id, title, description, price, brand, category, thumbnail } = product;

  return (
    <>
      <div className="smallProductView">
        <img className="thumbnail" src={thumbnail} />
        <h3>{title}</h3>
        <h4>{brand}</h4>
        <p>${price.toLocaleString()}</p>
        <button className="smallViewAddBtn">+</button>
      </div>
    </>
  );
};

export default CartItem;
