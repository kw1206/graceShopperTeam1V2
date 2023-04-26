import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async ({ column, order, filter }) => {
    try {
      const { data } = await axios.get(`/api/products`);
      let sortedData = [];
      if (order === "asc") {
        sortedData = data.sort((a, b) => (a[column] > b[column] ? 1 : -1));
      } else if (order === "desc") {
        sortedData = data.sort((a, b) => (b[column] > a[column] ? 1 : -1));
      }
      if (filter != "all") {
        sortedData = sortedData.filter(
          (product) => product.category === filter
        );
      }
      return sortedData;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id) => {
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
      return error.message;
    }
  }
);

const allProducts = createSlice({
  name: "allProducts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
      return action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        return state.filter((product) => product.id !== action.payload.id);
      });
  }
});

export const selectAllProducts = (state) => {
  return state.allProducts;
};

export default allProducts.reducer;
