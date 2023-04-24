import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../products/expandedProductSlice";
// import { addProductAsync } from "../products/allProductsSlice";

const AddProductForm = () => {
  // const loggedInAsAdmin = useSelector((state) => state.auth.me);

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState("");
  const [inventory, setInventory] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addProduct({
      title, brand, description, price, category, inventory, thumbnail, images }));
      setTitle("");
      setBrand("");
      setDescription("");
      setPrice("");
      setCategory("");
      setInventory("");
      setThumbnail("");
      setImages("");
      
  };

    // if (!newTitle || !newDesc || !newPrice || !newCategory) return;
    // if (newImages.includes(" "))
    //   return alert(
    //     "When adding additional images, please paste in image URLs separated by commas; no spaces."
    //   );
    // let formattedExtraImages = newImages.split(",");
    // const newProduct = {
    //   title: newTitle,
    //   brand: newBrand,
    //   description: newDesc,
    //   price: newPrice,
    //   category: newCategory,
    //   thumbnail: newThumbnail,
    //   images: formattedExtraImages,
    //   inventory: newInventory,
    // };
    // console.log(newProduct);

    // NEED TO CLEAR FORM AFTER SUBMIT - BELOW ISN'T WORKING YET
    

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
          value={images}
          wrap="soft"
          onChange={(event) => setImages(event.target.value)}
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