// use to grab token from local Storage
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCurrentUser = createAsyncThunk(
  'admin/fetchCurrentUser',
  async ({ id }) => {
    const token = window.localStorage.getItem('token');
    try {
      if (token) {
        const { data } = await axios.get(`/api/users/${id}`, {
          headers: {
            authorization: token,
          },
        });
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const selectCurrentUser = (state) => {
  return state.auth;
};

export const fetchCurrentCart = createAsyncThunk(
  'currentCart/fetch',
  async (id) => {
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

export const selectCurrentCart = (state) => {
  return state.currentCart;
};

const initialState = {
  cart: [],
};

export const currentCartSlice = createSlice({
  name: 'currentCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentCart.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default currentCartSlice.reducer;
