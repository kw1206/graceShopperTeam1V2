import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  deleteCartItem,
  updateCartQuantity,
  fetchCurrentCart,
} from "./cartSlice";
import { useDispatch } from "react-redux";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { cartItem, userId } = props;
  const { quantity, id } = cartItem;
  const { product } = cartItem;
  const [amountValue, setAmountValue] = useState(parseInt(quantity)); // type is now number

  const { title, price, thumbnail } = product;
  // DELETING ITEM FUNCTIONS
  const deleteThisItem = async (event) => {
    dispatch(deleteCartItem({ id, userId }));
    dispatch(fetchCurrentCart(userId));
  };

  //ADDING AND SUBTRACTING FUNCTIONS //

  useEffect(() => {
    // here is where a put request needs to go
  }, [dispatch]);

  function addOne() {
    const newValue = amountValue + 1;
    const newQuantity = parseInt(newValue);
    dispatch(updateCartQuantity({ id, newQuantity }));
    setAmountValue(newValue);
  }

  function subtractOne() {
    const newValue = amountValue - 1;
    const newQuantity = parseInt(newValue);
    dispatch(updateCartQuantity({ id, newQuantity }));
    dispatch(fetchCurrentCart(userId));
    setAmountValue(newValue);
  }

  return (
    <>
      <tr id={id}>
        <td id="thumbnailCell">
          <img className="cart-thumbnail" src={thumbnail} />
        </td>
        <td>
          <h4 className="item-Name">{title}</h4>
        </td>
        <td id="priceCell">${price}</td>
        <td>
          <button className="subtractOne" onClick={subtractOne}>
            {" "}
            -{" "}
          </button>{" "}
          {amountValue}{" "}
          <button className="addOne" onClick={addOne}>
            {" "}
            +{" "}
          </button>
          {"  "}
          <button id="deleteBtn" onClick={deleteThisItem}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default CartItem;
