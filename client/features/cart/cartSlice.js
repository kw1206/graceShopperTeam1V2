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

export const deleteCartItem = createAsyncThunk(
  'currentCart/item/delete',
  async (id) => {
    try {
      // I think to delete and indivdual item I need the route to all items?
      console.log('the id in deleteCartItem', id);
      const { data } = await axios.delete(`/api/cartItems/${id}`);
      if (data) {
        console.log(data);
        return data;
      } else {
        console.log('unable to delete product');
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  'currentCart/item/update',
  async({id, newQuantity}) => {
    try {
      console.log("update activated")
      console.log("quantity", newQuantity)
      console.log("id", id)
      const {data} = await axios.put(`api/cartItems/${id}`, {
        quantity: String(newQuantity)
      })

      if(data) {
        console.log(data);
        return data
      }
    } catch (error) {
      next(error)
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
    builder
      .addCase(fetchCurrentCart.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        console.log('action is ', action);
        console.log('state is ', state);
        // fetchCurrentCart(state.auth.me.id)
      });
  },
});

export default currentCartSlice.reducer;
