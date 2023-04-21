import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    const newProduct = {
      newTitle,
      newBrand,
      newDesc,
      newPrice,
      newCategory,
      newThumbnail,
      newImages,
      newInventory
    };
    console.log(newProduct); // will remove this once create product functions are done
    // dispatch(addProduct(newProduct)); // need to write this
    // navigate("/admin/products"); // need to figure this out
  };

  return (
    <div id="addProductForm">
      <h3>Create a new product</h3>
      <br />
      <form onSubmit={createNewProduct}>
        <table>
          <tr>
            <td>
              <label>Title:</label>
            </td>
            <td>
              <input
                type="text"
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
              <input
                type="textarea"
                wrap="soft"
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
                type="text"
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
                onChange={(event) => setNewCategory(event.target.value)}
              />
            </td>
          </tr>
          </tr>
          <tr>
            <td>
              <label>Inventory:</label>
            </td>
            <td>
              <input
                type="text"
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
              <input
                type="text"
                onChange={(event) => setNewImages(event.target.value)}
              />
            </td>
          </tr>
        </table>
        <button type="submit">Create New Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
