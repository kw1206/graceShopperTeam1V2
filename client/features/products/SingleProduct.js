import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SingleProduct = (props) => {
  const { product } = props;
  const { id, title, price, brand, thumbnail } = product;
  const loggedInAsAdmin = useSelector((state) => state.auth.me);

  return (
    <>
      <div className="smallProductView">
        <Link to={`/products/${id}`}>
          <img className="thumbnail" src={thumbnail} />
        </Link>
        <div className="smallProductViewInfo">
          <h3>{title}</h3>
          <h4>{brand}</h4>
          <p>${price.toLocaleString()}</p>
          {loggedInAsAdmin.isAdmin ? (
            <p>Product ID#: {id}</p>
          ) : (
            <button className="smallViewAddBtn">Add to cart</button>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
