import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../products/expandedProductSlice";

const AddProductForm = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newThumbnail, setNewThumbnail] = useState("");
  const [newImages, setNewImages] = useState("");
  const [newInventory, setNewInventory] = useState("");

  const createNewProduct = (event) => {
    event.preventDefault();
    if (!newTitle || !newDesc || !newPrice || !newCategory) return;
    if (newImages.includes(" "))
      return alert(
        "When adding additional images, please paste in image URLs separated by commas; no spaces."
      );
    let formattedExtraImages = newImages.split(",");
    const newProduct = {
      title: newTitle,
      brand: newBrand,
      description: newDesc,
      price: newPrice,
      category: newCategory,
      thumbnail: newThumbnail,
      images: formattedExtraImages,
      inventory: newInventory,
    };
    console.log(newProduct);

    const dispatch = useDispatch();
    dispatch(addProduct(newProduct));

    // NEED TO CLEAR FORM AFTER SUBMIT - BELOW ISN'T WORKING YET
    setNewTitle("");
    setNewBrand("");
    setNewDesc("");
    setNewPrice("");
    setNewCategory("");
    setNewThumbnail("");
    setNewImages("");
    setNewInventory("");
  };

  return (
    <div id="addProductForm">
      <h3>Create a new product</h3>
      <br />
      <form onSubmit={createNewProduct}>
        <label>Title:</label>
        <input
          type="text"
          required
          onChange={(event) => setNewTitle(event.target.value)}
        />
        <label>Brand:</label>
        <input
          type="text"
          onChange={(event) => setNewBrand(event.target.value)}
        />
        <label>Description:</label>
        <textarea
          wrap="soft"
          required
          onChange={(event) => setNewDesc(event.target.value)}
        />
        <label>Price:</label>
        <input
          type="number"
          min="0"
          required
          onChange={(event) => setNewPrice(event.target.value)}
        />
        <label>Category:</label>
        <input
          type="text"
          required
          onChange={(event) => setNewCategory(event.target.value)}
        />
        <label>Inventory:</label>
        <input
          type="number"
          min="0"
          onChange={(event) => setNewInventory(event.target.value)}
        />
        <label>Thumbnail:</label>
        <input
          type="text"
          onChange={(event) => setNewThumbnail(event.target.value)}
        />
        <label>Additional images:</label>
        <textarea
          wrap="soft"
          onChange={(event) => setNewImages(event.target.value)}
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
