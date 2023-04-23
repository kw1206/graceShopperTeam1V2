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

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(addProduct(newProduct)); // need to write this
    navigate("/admin/products"); // need to figure this out

    // NEED TO CLEAR FORM AFTER SUBMIT - BELOW ISN'T WORKING YET
    // setNewTitle("");
    // setNewBrand("");
    // setNewDesc("");
    // setNewPrice("");
    // setNewCategory("");
    // setNewThumbnail("");
    // setNewImages("");
    // setNewInventory("");
  };

  return (
    <div id="addProductForm">
      <h3>Create a new product</h3>
      <br/>
      <form onSubmit={createNewProduct}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Title:</label>
              </td>
              <td>
                <input
                  type="text"
                  required
                  onChange={(event) => setNewTitle(event.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Brand:</label>
              </td>
              <td>
                <input
                  type="text"
                  onChange={(event) => setNewBrand(event.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Description:</label>
              </td>
              <td>
                <textarea
                  wrap="soft"
                  required
                  onChange={(event) => setNewDesc(event.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Price:</label>
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  required
                  onChange={(event) => setNewPrice(event.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Category:</label>
              </td>
              <td>
                <input
                  type="text"
                  required
                  onChange={(event) => setNewCategory(event.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Inventory:</label>
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  onChange={(event) => setNewInventory(event.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Thumbnail:</label>
              </td>
              <td>
                <input
                  type="text"
                  onChange={(event) => setNewThumbnail(event.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Additional images:</label>
              </td>
              <td>
                <textarea
                  wrap="soft"
                  onChange={(event) => setNewImages(event.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br/>
        <button id="createProductBtn" type="submit">Create new product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
