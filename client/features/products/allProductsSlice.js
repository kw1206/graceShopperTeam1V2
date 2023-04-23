import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  "admin/fetchAllProducts",
  async () => {
    try {
      const { data } = await axios.get(`/api/products`);
      return data;
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
