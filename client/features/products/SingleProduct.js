import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCartItem } from '../cart/cartSlice';
import { useDispatch } from 'react-redux';

const SingleProduct = (props) => {
  const { product } = props;
  const { id, title, price, brand, thumbnail } = product;
  const loggedInAsAdmin = useSelector((state) => state.auth.me);

  //Elizabeth added This activates a call to api post the new item to the current logged in user
  const dispatch = useDispatch()
  function addToCart() {
    dispatch(addCartItem({id}))
  }

  return (
    <>
      <div className="smallProductView">
        <Link to={`/products/${id}`}>
          <img alt={title} className="thumbnail" src={thumbnail} />
        </Link>
        <div className="smallProductViewInfo">
          <h3>{title}</h3>
          <h4>{brand}</h4>
          <p>${price.toLocaleString()}</p>
          {loggedInAsAdmin.isAdmin ? (
            <p>Product ID#: {id}</p>
          ) : (
            //Elizabeth added activates api post request to create new item.
            <button className="smallViewAddBtn" onClick={addToCart}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
