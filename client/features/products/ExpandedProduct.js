import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchSingleProduct,
  selectSingleProduct,
  deleteProduct,
} from "./expandedProductSlice";
import { addCartItem } from "../cart/cartSlice";

const ExpandedProduct = () => {
  const { id } = useParams();
  const [imageIdx, setImageIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [allImages, setAllImages] = useState([]);

  const loggedInAsAdmin = useSelector((state) => state.auth.me);
  const selectedProduct = useSelector(selectSingleProduct);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, []);
  useEffect(() => {
    if (selectedProduct.id) {
      const thumbnail = selectedProduct.thumbnail;
      const extraImages = [...selectedProduct.images];
      const combinedImages = extraImages.unshift(thumbnail);
      setAllImages(extraImages);
    }
  }, [selectedProduct]);
  useEffect(() => {
    if (selectedProduct.id > 0) {
      setLoading(false);
    }
  }, [selectedProduct]);

  const navigate = useNavigate();
  const deleteThisProduct = async (event) => {
    event.preventDefault();
    if (confirm("Are you sure you want to delete this product?") === true) {
      console.log(id);
      dispatch(deleteProduct(id));
      navigate("/home");
    }
  };

  // image carousel functionality
  const imgBack = () => {
    if (imageIdx > 0) return setImageIdx(imageIdx - 1);
  };
  const imgFwd = () => {
    if (imageIdx < allImages.length - 1) return setImageIdx(imageIdx + 1);
  };
  
  //Elizabeth added This activates a call to api post the new item to the current logged in user
  function addToCart() {
    dispatch(addCartItem({id}))
  }

  return (
    <div className="page">
      {loggedInAsAdmin.isAdmin ? (
        <div id="goBackLinks">
          <Link className="goBack" to="/home">
            ❮❮❮ dashboard
          </Link>
          <Link className="goBack" to="/products">
            ❮❮❮ all products
          </Link>
        </div>
      ) : (
        <Link className="goBack" to="/products">
          ❮❮❮ all products
        </Link>
      )}
      <div className="expandedProductInfo">
        {loading ? (
          <h3>Product loading</h3>
        ) : selectedProduct ? (
          <>
            <div className="imgCarousel">
              <img alt={selectedProduct.title} className="expandedImages" src={allImages.length === 1 ? allImages[0] : allImages[imageIdx]} />
            </div>
            <div className="productInfo">
              <h2>{selectedProduct.title}</h2>
              <h3>{selectedProduct.brand}</h3>
              <p>{selectedProduct.description}</p>
              <p>${selectedProduct.price}</p>
              {loggedInAsAdmin.isAdmin ? (
                <>
                  <p>Inventory: {selectedProduct.inventory}</p>
                  <p>Product ID #{selectedProduct.id}</p>
                  <button id="deleteBtn" onClick={deleteThisProduct}>
                    Delete product
                  </button>
                  <Link to={`/products/${id}/editProduct`}>
                    <button id="editBtn">Edit product</button>
                  </Link>
                </>
              ) : (
                <>
                  <p>View more {selectedProduct.category}</p>
                  <button id="addBtn" onClick={addToCart}>Add to cart</button>
                </>
              )}
              {allImages.length > 1 ? (
                <div className="scrollImages">
                  <button className="imageScrollBtn" onClick={imgBack}>
                    ❮❮❮
                  </button>
                  <p>
                    image {imageIdx + 1} of {allImages.length}
                  </p>
                  <button className="imageScrollBtn" onClick={imgFwd}>
                    ❯❯❯
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <h3>Product does not exist</h3>
        )}
      </div>
    </div>
  );
};

export default ExpandedProduct;
