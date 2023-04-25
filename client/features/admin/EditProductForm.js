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
  const product = useSelector(selectSingleProduct);
  const loggedInAsAdmin = useSelector((state) => state.auth.me);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [inventory, setInventory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleProduct(id)).then(() => {
      setTitle(product.title);
      setBrand(product.brand);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setInventory(product.inventory);
      setThumbnail(product.thumbnail);
      setImages(product.images);
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (product.id > 0) {
      setLoading(false);
    }
  }, [product]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (confirm("Are you sure you want to make these edits?") === true) {
      dispatch(
        editProduct({
          id,
          title,
          brand,
          description,
          price,
          category,
          inventory,
          thumbnail,
          images,
        })
      ).then(() => {
        dispatch(fetchSingleProduct(id));
        navigate(`/products/${id}`);
      });
    }
  };

  return (
    <div className="page">
      {loggedInAsAdmin.isAdmin ? (
        loading ? (
          <>
            <h3>Loading edit product form...</h3>
          </>
        ) : (
          <div id="editProductForm">
            <h3>Edit product:</h3>
            <br />
            <form onSubmit={handleSubmit}>
              <label>Title:</label>
              <input
                name="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Brand:</label>
              <input
                name="brand"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <label>Description:</label>
              <textarea
                name="description"
                wrap="soft"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label>Price:</label>
              <input
                name="price"
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <label>Category:</label>
              <input
                name="category"
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label>Inventory:</label>
              <input
                name="inventory"
                type="text"
                value={inventory}
                onChange={(e) => setInventory(e.target.value)}
              />
              <label>Thumbnail:</label>
              <input
                name="thumbnail"
                type="text"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
              <label>Additional images*:</label>
              <textarea
                name="images"
                wrap="soft"
                value={images.join("\n")}
                onChange={(e) => setImages(e.target.value.split("\n"))}
              />
              <p>
                *paste in multiple image URLs <br />
                on a new line
              </p>
              <button className="productBtn" id="editProductBtn" type="submit">
                Submit edits
              </button>
              <button
                className="productBtn"
                id="cancelEditBtn"
                onClick={() => navigate("/products")}
              >
                Cancel
              </button>
            </form>
          </div>
        )
      ) : (
        <>
          <h3>Access denied</h3>
        </>
      )}
    </div>
  );
};

export default EditProductForm;
