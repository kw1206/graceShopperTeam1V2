import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetch",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async ({ id }) => {
    const token = window.localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await axios.delete(`/api/products/${id}`, {
          headers: {
            authorization: token,
          },
        });
        return data;
      } else {
        console.log("You are not authorized to delete products.");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const editProduct = createAsyncThunk(
  "product/edit",
  async ({
    id,
    title,
    brand,
    description,
    price,
    category,
    thumbnail,
    images,
    inventory,
  }) => {
    const token = window.localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await axios.put(`/api/products/${id}`, {
          title,
          brand,
          description,
          price,
          category,
          thumbnail,
          images,
          inventory,
        });
        return data;
      } else {
        console.log("You are not authorized to edit products.");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/add",
  async ({
    title,
    brand,
    description,
    price,
    category,
    thumbnail,
    images,
    inventory,
  }) => {
    const token = window.localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await axios.post("/api/products", {
          title,
          brand,
          description,
          price,
          category,
          thumbnail,
          images,
          inventory,
        });
        return data;
      } else {
        console.log("You are not authorized to add products.");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const expandedProductSlice = createSlice({
  name: "expandedProduct",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectSingleProduct = (state) => {
  return state.expandedProduct;
};

export default expandedProductSlice.reducer;
