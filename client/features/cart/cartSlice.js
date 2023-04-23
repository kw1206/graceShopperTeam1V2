//    const token = window.localStorage.getItem("token");
// use to grab token from local Storage
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCurrentCart = createAsyncThunk(
  'currentCart/fetch',
  async (id) => {
    //works when hardCoded and id is single number
    id = 3;
    try {
      const { data } = await axios.get(`api/users/${id}/cart`);
      console.log('fetch cart activated data is ', data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCartProduct = createAsyncThunk(
  'currentCart/product/delete',
  async ({ id }) => {
    id = 3;
    try {
      const { data } = await axios.delete(`/api/users/${id}/cart`);
      if (data) {
        return data;
      } else {
        console.log('unable to delete product');
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
      console.log('slice activated suceeded');
      return action.payload;
    });
  },
});

export const selectCurrentCart = (state) => {
  return state.currentCart;
};

export default currentCartSlice.reducer;
