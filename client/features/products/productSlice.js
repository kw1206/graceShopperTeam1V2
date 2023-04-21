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
    try {
      const { data } = await axios.delete(`/api/products/${id}`);
      if (data) {
        return data;
      } else {
        console.log("cannot find that product");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const editProduct = createAsyncThunk(
  "product/edit",
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
    try {
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
    try {
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
