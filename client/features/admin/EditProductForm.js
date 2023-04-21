import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditProductForm = (props) => {
  const {
    id,
    title,
    brand,
    description,
    price,
    category,
    thumbnail,
    images,
    inventory,
  } = props;
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBrand, setEditedBrand] = useState(brand);
  const [editedDesc, setEditedDesc] = useState(description);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedThumbnail, setEditedThumbnail] = useState(thumbnail);
  const [editedImages, setEditedImages] = useState(images);
  const [editedInventory, setEditedInventory] = useState(inventory)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editProduct = (event) => {
    event.preventDefault();
    if (!editedTitle || !editedDesc || !editedPrice || !editedCategory) return;
    const editedProduct = {
      editedTitle,
      editedBrand,
      editedDesc,
      editedPrice,
      editedCategory,
      editedThumbnail,
      editedImages,
      editedInventory
    };
    console.log(editedProduct); // will remove this once create product functions are done
    // dispatch(editProduct(editedProduct)); // need to write this
    // navigate(`/admin/products/${id}`); // need to figure this out
  };

  return (
    <div id="addProductForm">
      <h3>Edit product</h3>
      <br />
      <form onSubmit={editProduct}>
        <table>
          <tr>
            <td>
              <label>Title:</label>
            </td>
            <td>
              <input
                type="text"
                value={title}
                onChange={(event) => setEditedTitle(event.target.value)}
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
                value={brand}
                onChange={(event) => setEditedBrand(event.target.value)}
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
                value={description}
                onChange={(event) => setEditedDesc(event.target.value)}
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
                value={price}
                onChange={(event) => setEditedPrice(event.target.value)}
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
                value={category}
                onChange={(event) => setEditedCategory(event.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Inventory:</label>
            </td>
            <td>
              <input
                type="text"
                value={inventory}
                onChange={(event) => setEditedInventory(event.target.value)}
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
                value={thumbnail}
                onChange={(event) => setEditedThumbnail(event.target.value)}
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
                value={images}
                onChange={(event) => setEditedImages(event.target.value)}
              />
            </td>
          </tr>
        </table>
        <button type="submit">Create New Product</button>
      </form>
    </div>
  );
};

export default EditProductForm;
