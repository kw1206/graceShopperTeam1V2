import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../products/expandedProductSlice";

const AddProductForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [inventory, setInventory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addProduct({
      title, brand, description, price, category, inventory, thumbnail, images }))
    setTitle("");
    setBrand("");
    setDescription("");
    setPrice("");
    setCategory("");
    setInventory("");
    setThumbnail("");
    setImages([]);
  };

  const handleImageChange = (event) => {
    setImages(event.target.value.split('\n'));
  };

  return (
    <div id="addProductForm">
      <h3>Create a new product</h3>
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          name='title'
          value={title}
          required
          onChange={(event) => setTitle(event.target.value)}
        />
        <label htmlFor="brand">Brand:</label>
        <input
          name='brand'
          value={brand}
          required
          onChange={(event) => setBrand(event.target.value)}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          name='description'
          value={description}
          required
          wrap="soft"
          onChange={(event) => setDescription(event.target.value)}
        />
        <label htmlFor="price">Price:</label>
        <input
          name='price'
          value={price}
          required
          type='number'
          onChange={(event) => setPrice(event.target.value)}
        />
        <label htmlFor="category">Category:</label>
        <input
          name='category'
          value={category}
          required
          onChange={(event) => setCategory(event.target.value)}
        />
        <label htmlFor="inventory">Inventory:</label>
        <input
          name='inventory'
          value={inventory}
          type='number'
      
          onChange={(event) => setInventory(event.target.value)}
        />
        <label htmlFor="thumbnail">Thumbnail:</label>
        <input
          name='thumbnail'
          value={thumbnail}
          onChange={(event) => setThumbnail(event.target.value)}
        />
        <label htmlFor="images">Additional images:</label>
        <textarea
          name='images'
          value={images.join('\n')}
          wrap="soft"
          onChange={handleImageChange}
        />
        <br/><br/>
        <button className="productBtn" id="createProductBtn" type="submit">
          Create new product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;