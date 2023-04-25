import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchSingleProduct,
  selectSingleProduct,
  editProduct,
} from "../products/expandedProductSlice";

const EditProductForm = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectSingleProduct);
  const navigate = useNavigate();
  const { id } = useParams();

  // const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [inventory, setInventory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState([]);
  
  // const loggedInAsAdmin = useSelector((state) => state.auth.me);

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

  // useEffect(() => {
  //   if (selectedProduct.id > 0) {
  //     setLoading(false);
  //   }
  // }, [selectedProduct]);

  // const editThisProduct = (event) => {
  //   event.preventDefault();
  //   if (!title || !description || !price || !category) return;
  //   if (images.includes(" "))
  //     return alert(
  //       "When adding additional images, please paste in image URLs separated by commas; no spaces."
  //     );
  //   if (images !== selectedProduct.images.join(",")) {
  //     let formattedExtraImages = images.split(",");
  //     const editedProduct = {
  //       id: id,
  //       title: title,
  //       brand: brand,
  //       description: description,
  //       price: price,
  //       category: category,
  //       thumbnail: thumbnail,
  //       images: formattedExtraImages,
  //       inventory: inventory,
  //     };
  //     console.log(editedProduct);
  //     if (confirm("Are you sure you want to make these edits?") === true) {
  //       dispatch(editProduct(editedProduct));
  //       navigate("/products/");
  //     }
  //   } else {
  //     const editedProduct = {
  //       id: id,
  //       title: title,
  //       brand: brand,
  //       description: description,
  //       price: price,
  //       category: category,
  //       thumbnail: thumbnail,
  //       images: images,
  //       inventory: inventory,
  //     };
  //     console.log(editedProduct);
  //     if (confirm("Are you sure you want to make these edits?") === true) {
  //       dispatch(editProduct(editedProduct));
  //       navigate("/products/");
  //     }
  //   }
  // };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(editProduct({ id, title, brand, description, price, category, inventory, thumbnail, images }))
      .then(() => {
        dispatch(fetchSingleProduct(id));
        navigate(`/products/${id}`)
      });
  };

  const cancelEdit = () => {
    navigate("/products");
  };

  return (
    <div className="page">
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
            onChange={(event) => setTitle(event.target.value)}
          />
          <label>Brand:</label>
          <input
            name='brand'
            type="text"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
          />
          <label>Description:</label>
          <textarea
            name='description'
            wrap="soft"
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <label>Price:</label>
          <input
            name='price'
            type="text"
            required
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <label>Category:</label>
          <input
            name='category'
            type="text"
            required
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
          <label>Inventory:</label>
          <input
            name='inventory'
            type="text"
            value={inventory}
            onChange={(event) => setInventory(event.target.value)}
          />
          <label>Thumbnail:</label>
          <input
            name='thumbnail'
            type="text"
            value={thumbnail}
            onChange={(event) => setThumbnail(event.target.value)}
          />
          <label>Additional images*:</label>
          <textarea
            name='images'
            wrap="soft"
            value={images.join('\n')}
            onChange={(event) => setImages(event.target.value.split('\n'))}
          />
          <p>*paste in multiple image URLs <br/>on a new line</p>
          <button className="productBtn" id="editProductBtn" type="submit">
            Submit edits
          </button>
          <button className="productBtn" id="cancelEditBtn" onClick={cancelEdit}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
