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

// QUERYS TO FULL CART
export const fetchCurrentCart = createAsyncThunk(
  'currentCart/fetch',
  async (id) => {
    const token = window.localStorage.getItem('token');
    try {
      if (token) {
        const { data } = await axios.get(`/api/users/${id}/cart`, {
          headers: {
            authorization: token,
          },
        });
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

//TO DO Make a submit that updates the cart page.
export const updateCartStatus = createAsyncThunk(
  'currentCart/purchase',
  async (cartId ) => {
    const token = window.localStorage.getItem('token');
    try {
      if (token) {
        console.log(cartId)
        const { data } = await axios.put(`/api/cart/${cartId}`,{
          isFulfilled: true,
        });
        console.log('update Cart', data);
      }
    } catch (error) {}
  }
);

export const addCartItem = createAsyncThunk(
  'currentCartItem/add',
  async ({ id }) => {
    const token = window.localStorage.getItem('token');
    try {
      if (token) {
        const { data } = await axios.post(
          '/api/cartItems',
          {
            productId: id,
            quantity: 1,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        return data;
      } else {
        console.log('You are not authorized to add products.');
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  'currentCart/item/delete',
  async ({ id, userId }) => {
    try {
      const { data } = await axios.delete(`/api/cartItems/${id}`);
      if (data) {
        return userId;
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
  async ({ id, newQuantity }) => {
    try {
      const { data } = await axios.put(`api/cartItems/${id}`, {
        quantity: String(newQuantity),
      });
      if (data) {
        return data;
      }
    } catch (error) {
      next(error);
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
        fetchCurrentCart(action.payload);
      });
  },
});

export default currentCartSlice.reducer;