//    const token = window.localStorage.getItem("token");
// use to grab token from local Storage
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCurrentCart = createAsyncThunk(
  'currentCart/fetch',
  async (id) => {
    try {
      const { data } = await axios.get(`api/users/${id}/cart`);
      console.log("fetch cart activated")
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
        const { data } = await axios.delete(`/api/users/${id}/cart`);
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

const currentCartSlice = createSlice({
  name: 'currentCart',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentCart.fulfilled, (state, action) => {
        console.log("slice activated suceeded", action.payload )
      return action.payload;
    });
  },
});

export const selectCurrentCart = (state) => state.currentCart;


export default currentCartSlice.reducer;
