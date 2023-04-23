import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchSingleProduct,
  selectSingleProduct,
  editProduct,
} from "../products/expandedProductSlice";

const EditProductForm = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBrand, setEditedBrand] = useState("");
  const [editedDesc, setEditedDesc] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedThumbnail, setEditedThumbnail] = useState("");
  const [editedImages, setEditedImages] = useState("");
  const [editedInventory, setEditedInventory] = useState("");

  const loggedInAsAdmin = useSelector((state) => state.auth.me);
  const selectedProduct = useSelector(selectSingleProduct);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, []);
  useEffect(() => {
    if (selectedProduct.id > 0) {
      setLoading(false);
    }
  }, [selectedProduct]);
  useEffect(() => {
    if (selectedProduct.id > 0) {
      setEditedTitle(selectedProduct.title);
      setEditedBrand(selectedProduct.brand);
      setEditedDesc(selectedProduct.description);
      setEditedPrice(selectedProduct.price);
      setEditedCategory(selectedProduct.category);
      setEditedThumbnail(selectedProduct.thumbnail);
      setEditedImages(selectedProduct.images.join(","));
      setEditedInventory(selectedProduct.inventory);
    }
  }, [selectedProduct]);

  const navigate = useNavigate();

  const editThisProduct = (event) => {
    // event.preventDefault();
    if (!editedTitle || !editedDesc || !editedPrice || !editedCategory) return;
    if (editedImages.includes(" "))
      return alert(
        "When adding additional images, please paste in image URLs separated by commas; no spaces."
      );
    if (editedImages !== selectedProduct.images.join(",")) {
      let formattedExtraImages = editedImages.split(",");
      const editedProduct = {
        title: editedTitle,
        brand: editedBrand,
        description: editedDesc,
        price: editedPrice,
        category: editedCategory,
        thumbnail: editedThumbnail,
        images: formattedExtraImages,
        inventory: editedInventory,
      };
      console.log(editedProduct);
      if (confirm("Are you sure you want to make these edits?") === true) {
        dispatch(editProduct(editedProduct));
        navigate("/products/");
      }
    } else {
      const editedProduct = {
        title: editedTitle,
        brand: editedBrand,
        description: editedDesc,
        price: editedPrice,
        category: editedCategory,
        thumbnail: editedThumbnail,
        images: editedImages,
        inventory: editedInventory,
      };
      console.log(editedProduct);
      if (confirm("Are you sure you want to make these edits?") === true) {
        dispatch(editProduct(editedProduct));
        navigate("/products/");
      }
    }
  };

  const cancelEdit = () => {
    navigate("/products")
  }

  return (
    <div className="page">
      <div id="addProductForm">
        <h3>Edit product # {selectedProduct.id}</h3>
        <br />
        <form onSubmit={editThisProduct}>
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
                    value={editedTitle}
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
                    value={editedBrand}
                    onChange={(event) => setEditedBrand(event.target.value)}
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
                    value={editedDesc}
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
                    required
                    value={editedPrice}
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
                    required
                    value={editedCategory}
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
                    value={editedInventory}
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
                    value={editedThumbnail}
                    onChange={(event) => setEditedThumbnail(event.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Additional images*:</label>
                </td>
                <td>
                  <textarea
                    wrap="soft"
                    value={editedImages}
                    onChange={(event) => setEditedImages(event.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <p>*paste in image URLs separated by commas; no spaces</p>
          <button id="editProductBtn" type="submit">Submit edits</button>
          <button id="cancelEditBtn" onClick={cancelEdit}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
