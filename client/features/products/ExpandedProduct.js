import React, { useState } from "react";
import { useSelector } from "react-redux";

const dummyProduct = {
    id: 12,
    title: "Brown Perfume",
    description: "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
    price: 40,
    brand: "Royal_Mirage",
    category: "fragrances",
    thumbnail: "https://i.dummyjson.com/data/products/12/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/12/1.jpg",
      "https://i.dummyjson.com/data/products/12/2.jpg",
      "https://i.dummyjson.com/data/products/12/3.png",
      "https://i.dummyjson.com/data/products/12/4.jpg",
      "https://i.dummyjson.com/data/products/12/thumbnail.jpg",
    ],
};

const ExpandedProduct = () => {
  const [imageIdx, setImageIdx] = useState(0);

  const imgBack = () => {
    if (imageIdx > 0) return setImageIdx(imageIdx - 1);
  };
  const imgFwd = () => {
    if (imageIdx < dummyProduct.images.length-1) return setImageIdx(imageIdx + 1);
  };

  return (
    <div className="expandedProduct">
      <div className="imgCarousel">
        <img src={dummyProduct.images[imageIdx]} />
        <div className="scrollImages">
          <br />
          <button onClick={imgBack}>{`<`}</button>
          <p>
            image {imageIdx + 1} of {dummyProduct.images.length}
          </p>
          <button onClick={imgFwd}>{`>`}</button>
        </div>
      </div>
      <div className="productInfo">
        <h2>{dummyProduct.title}</h2>
        <h3>{dummyProduct.brand}</h3>
        <p>{dummyProduct.description}</p>
        <p>Product ID #{dummyProduct.id}</p>
        <p>${dummyProduct.price.toLocaleString()}</p>
        <p>View more {dummyProduct.category}</p>
        <button>Add to cart</button>
      </div>
    </div>
  );
};

export default ExpandedProduct;
