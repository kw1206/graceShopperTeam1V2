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
      console.log(error);
    }
  }
);

const allProducts = createSlice({
  name: "allProducts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllProducts = (state) => {
  return state.allProducts;
};

export default allProducts.reducer;
